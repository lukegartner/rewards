import { useDispatch, useSelector } from "react-redux";

// MUI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import RedeemIcon from "@mui/icons-material/Redeem";
import { useEffect } from "react";

const UserFriends = () => {
  const dispatch = useDispatch();
  const { adminUsers } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_USERS_ADMIN" });
  });
  return (
    <Container sx={{ mt: 1 }}>
      <Grid container spacing={1}>
        {adminUsers
          .sort((a, b) => b.balance - a.balance)
          .map((user) => (
            <Grid item xs={6}>
              <Card>
                <Typography variant="h6" align="center" sx={{ py: 1 }}>
                  {user.username}
                </Typography>
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  sx={{ mx: "auto" }}
                ></Avatar>
                <Typography align="center">
                  {user.balance} points{" "}
                  <IconButton sx={{}}>
                    <RedeemIcon fontSize="small" color="primary" />
                  </IconButton>
                </Typography>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default UserFriends;
