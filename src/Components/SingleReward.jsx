import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useState } from "react";

// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
// MUI Success Dialogue
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const SingleReward = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { selectedReward, rewardsUser } = useSelector((store) => store);

  const [openDialogue, setOpenDialogue] = useState(false);

  useEffect(() => {
    dispatch({ type: "FETCH_SELECTED_REWARD", payload: id });
  }, []);

  const redeemReward = () => {
    dispatch({
      type: "ADD_REDEMPTION_ADMIN",
      payload: {
        complete: false,
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
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpenDialogue(true);
  };

  const handleClose = () => {
    setOpenDialogue(false);
  };

  return (
    <Container sx={{ my: 1 }}>
      <Link onClick={history.goBack}>
        <IconButton sx={{ py: 0.5, px: 0.5 }}>
          <ArrowBackIcon sx={{ color: "primary.main" }} />
        </IconButton>
      </Link>
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
      <Dialog
        open={openDialogue}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Congratulations!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have successfully redeemed {selectedReward.reward_title}! A
            staff memeber will reach out to you to deliver your reward shortly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SingleReward;
