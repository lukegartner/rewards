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

const UserFriends = () => {
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

  // For Gift Amount Slider Inputs
  const [value, setValue] = useState(10);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  // Sends Gift and logs in awarded
  const sendGift = () => {
    dispatch({
      type: "ADD_AWARD_ADMIN",
      payload: {
        user_id: userToGift.id,
        awarded_value: value,
        service_id: 0,
        award_description: `Gift From ${rewardsUser.username}`,
      },
    });
    dispatch({
      type: "ADD_REDEMPTION_ADMIN",
      payload: {
        user_id: rewardsUser.id,
        reward_id: 0,
        redeemed_value: value,
        complete: true,
      },
    });

    dispatch({
      type: "EDIT_USER_ADMIN",
      payload: { ...rewardsUser, balance: rewardsUser.balance - value },
    });
    dispatch({
      type: "EDIT_USER_ADMIN",
      payload: { ...userToGift, balance: userToGift.balance + value },
    });
    handleClose();
  };

  // Fetches Users to display as friends
  useEffect(() => {
    dispatch({ type: "FETCH_USERS_ADMIN" });
  }, []);

  return (
    <Container sx={{ mt: 1 }}>
      {adminUsers.length > 0 && (
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
                    <IconButton
                      onClick={() => handleOpen(user)}
                      disabled={user.id === rewardsUser.id ? true : false}
                    >
                      <RedeemIcon fontSize="small" color="primary" />
                    </IconButton>
                  </Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h5" align="center">
            Send Gift
          </Typography>
          <Container sx={{ width: "38%" }}>
            <TextField
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                min: 0,
                max: rewardsUser.balance,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
              sx={{ width: "100%", mb: 3, mt: 2, mx: "auto" }}
            />
          </Container>
          <Slider
            max={rewardsUser.balance}
            defaultValue={50}
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
          />
          {/* <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              min: 0,
              max: rewardsUser.balance,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          /> */}
          <Button
            variant="contained"
            onClick={sendGift}
            sx={{ width: "100%", mt: 3 }}
          >
            Send {value} Points To {userToGift.username}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default UserFriends;
