import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// MUI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import RedeemIcon from "@mui/icons-material/Redeem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
import { TextField } from "@mui/material";

const FriendsSummary = () => {
  const dispatch = useDispatch();
  const { adminUsers, rewardsUser } = useSelector((store) => store);
  // For Send Gift Form Modal
  const [userToGift, setUserToGift] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = (user) => {
    setOpen(true);
    setUserToGift(user);
  };
  const handleClose = () => setOpen(false);

  // Fetches Users to display as friends
  useEffect(() => {
    dispatch({ type: "FETCH_USERS_ADMIN" });
  }, []);

  return (
    <Container sx={{ mt: 1 }}>
      <Typography variant="h5" color="secondary">
        Leaderboard
      </Typography>
      {adminUsers.length > 0 && (
        <Grid container spacing={1}>
          {adminUsers
            .sort((a, b) => b.balance - a.balance)
            .slice(0, 3)
            .map((user) => (
              <Grid item xs={4}>
                <Card sx={{ backgroundImage: "none" }}>
                  <Typography
                    align="center"
                    sx={{ py: 1, fontWeight: "medium" }}
                  >
                    {user.username}
                  </Typography>
                  <Avatar
                    src={user.avatar}
                    alt={user.username}
                    sx={{ mx: "auto", height: 56, width: 56 }}
                  ></Avatar>
                  <Typography align="center" color="primary.contrastText">
                    {user.balance} points{" "}
                  </Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default FriendsSummary;
