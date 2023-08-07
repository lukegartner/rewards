import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const SingleReward = () => {
  return (
    <Container sx={{ my: 1 }}>
      <Typography variant="h3">SingleReward</Typography>
      <Typography sx={{}}>single reward description</Typography>
      <Box
        component="img"
        display="flex"
        src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/800px-Chipotle_Mexican_Grill_logo.svg.png"
        alt="chipotle"
        sx={{ width: 250, mx: "auto", my: 8 }}
      />
      <Button variant="contained" sx={{ width: "100%", mx: "auto" }}>
        Redeem 300
      </Button>
    </Container>
  );
};

export default SingleReward;
