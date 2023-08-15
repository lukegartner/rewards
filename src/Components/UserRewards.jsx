import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import { Paper } from "@mui/material";

const UserHome = () => {
  const dispatch = useDispatch();
  const { adminRewards, adminCategories } = useSelector((store) => store);

  const rewardsByCategory = adminCategories
    .filter(
      ({ category_active, id }) =>
        category_active &&
        adminRewards.some(
          (reward) => reward.category_id === id && reward.reward_active
        )
    )
    .map((category) =>
      adminRewards.filter((reward) => reward.category_id === category.id)
    );

  const rewardsReady =
    adminRewards.length > 0 && adminCategories.length > 0 && rewardsByCategory;

  useEffect(() => {
    dispatch({ type: "FETCH_REWARDS_ADMIN" });
    dispatch({ type: "FETCH_CATEGORIES_ADMIN" });
  }, []);
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 1 }}>
        Rewards
      </Typography>
      {rewardsReady &&
        rewardsByCategory.map((rewards, index) => (
          <Container sx={{ mt: 1 }}>
            <Typography variant="h5" color="secondary">
              {
                adminCategories.filter(
                  ({ category_active }) => category_active
                )[index].reward_category
              }
            </Typography>
            <Grid container spacing={1}>
              {rewards
                .filter((reward) => reward.reward_active)
                .map((reward) => (
                  <Grid
                    item
                    xs={6}
                    component={Link}
                    to={`/reward/${reward.id}`}
                    sx={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        backgroundImage: "none",
                      }}
                    >
                      <Typography variant="h6" align="center" sx={{ pt: 1 }}>
                        {reward.reward_title}
                      </Typography>
                      <Avatar
                        src={reward.reward_image}
                        alt={reward.reward_title}
                        sx={{ mx: "auto", width: 56, height: 56 }}
                      ></Avatar>
                      <Typography align="center" color="primary.contrastText">
                        {reward.reward_value} points
                      </Typography>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        ))}
    </>
  );
};

export default UserHome;
