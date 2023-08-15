import { pcoImg } from "../utils/images";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// MUI
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Paper } from "@mui/material";

const UserProfileSummary = () => {
  const { user, isAuthenticated } = useAuth0();
  const isUser = isAuthenticated && user;
  const { me, rewardsUser } = useSelector((store) => store);

  useEffect(() => {}, []);
  return (
    <Box>
      <Paper
        sx={{
          width: "95%",
          mx: "auto",
          my: 2,
          py: 0.5,
          px: 1,
          backgroundImage: "none",
        }}
      >
        <Typography variant="h5">{isUser ? user.nickname : "user"}</Typography>
        <Avatar
          src={me.attributes ? me.attributes.avatar : pcoImg}
          alt="avatar"
        />
        <Typography>{rewardsUser.balance} points</Typography>
      </Paper>
    </Box>
  );
};

export default UserProfileSummary;
