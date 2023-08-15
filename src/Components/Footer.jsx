import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
// MUI
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const Footer = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const isUser = isAuthenticated && user;
  const history = useHistory();
  const [value, setValue] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${newValue}`);
  };

  return (
    <BottomNavigation
      sx={{
        width: "100vw",
        position: "sticky",
        bottom: 0,
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value=""
        icon={<HomeIcon />}
        sx={{ color: "primary.contrastText" }}
      />
      <BottomNavigationAction
        label="History"
        value="history"
        icon={<HistoryIcon />}
        sx={{ color: "primary.contrastText" }}
      />
      <BottomNavigationAction
        label="Friends"
        value="friends"
        icon={<GroupIcon />}
        sx={{ color: "primary.contrastText" }}
      />
      <BottomNavigationAction
        label="Rewards"
        value="rewards"
        icon={<WorkspacePremiumIcon />}
        sx={{ color: "primary.contrastText" }}
      />
      <BottomNavigationAction
        label={isUser ? "Logout" : "Login"}
        value={isUser ? "logout" : "login"}
        icon={
          isUser ? (
            <LogoutIcon
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            />
          ) : (
            <LoginIcon
              onClick={() => {
                loginWithRedirect({});
              }}
            />
          )
        }
        sx={{ color: "primary.contrastText" }}
      />
    </BottomNavigation>
  );
};

export default Footer;
