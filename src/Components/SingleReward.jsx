import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleReward = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedReward, rewardsUser } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_SELECTED_REWARD", payload: id });
  }, []);

  const redeemReward = () => {
    dispatch({
      type: "ADD_REDEMPTION_ADMIN",
      payload: {
        user_id: rewardsUser.id,
        reward_id: selectedReward.id,
        redeemed_value: selectedReward.reward_value,
      },
    });
    dispatch({
      type: "EDIT_USER_ADMIN",
      payload: {
        ...rewardsUser,
        balance: rewardsUser.balance - selectedReward.reward_value,
      },
    });
    dispatch({
      type: "SET_REWARDS_USER",
      payload: {
        ...rewardsUser,
        balance: rewardsUser.balance - selectedReward.reward_value,
      },
    });
  };

  return (
    <Container sx={{ my: 1 }}>
      <Typography variant="h3">{selectedReward.reward_title}</Typography>
      <Typography sx={{}}>{selectedReward.reward_description}</Typography>
      <Box
        component="img"
        display="flex"
        src={selectedReward.reward_image}
        alt={selectedReward.reward_title}
        sx={{
          height: 250,
          maxWidth: "100%",
          mx: "auto",
          my: 8,
          objectFit: "cover",
        }}
      />
      <Button
        variant="contained"
        disabled={rewardsUser.balance < selectedReward.reward_value}
        sx={{ width: "100%", mx: "auto" }}
        onClick={redeemReward}
      >
        Redeem {selectedReward.reward_value}
      </Button>
    </Container>
  );
};

export default SingleReward;
