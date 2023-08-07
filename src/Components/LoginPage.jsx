import { useAuth0 } from "@auth0/auth0-react";

// MUI
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Container sx={{ width: "90vw", mt: "33vh" }}>
      <Typography align="center" variant="h2">
        Welcome
      </Typography>
      <Button
        sx={{ width: "100%" }}
        variant="contained"
        onClick={() => {
          loginWithRedirect({});
        }}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default LoginPage;
