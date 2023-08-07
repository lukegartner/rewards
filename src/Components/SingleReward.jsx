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
  const { selectedReward } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_SELECTED_REWARD", payload: id });
  }, []);

  return (
    <Container sx={{ my: 1 }}>
      <Typography variant="h3">{selectedReward.reward_title}</Typography>
      <Typography sx={{}}>{selectedReward.reward_description}</Typography>
      <Box
        component="img"
        display="flex"
        src={selectedReward.reward_image}
        alt={selectedReward.reward_title}
        sx={{ width: 250, mx: "auto", my: 8 }}
      />
      <Button variant="contained" sx={{ width: "100%", mx: "auto" }}>
        Redeem {selectedReward.reward_value}
      </Button>
    </Container>
  );
};

export default SingleReward;
