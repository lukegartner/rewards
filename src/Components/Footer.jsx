import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
// MUI
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
      sx={{ width: "100vw", position: "fixed", bottom: 0 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction label="Home" value="" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="History"
        value="history"
        icon={<HistoryIcon />}
      />
      <BottomNavigationAction
        label="Friends"
        value="friends"
        icon={<GroupIcon />}
      />
      <BottomNavigationAction
        label="Rewards"
        value="rewards"
        icon={<WorkspacePremiumIcon />}
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
      />
    </BottomNavigation>
  );
};

export default Footer;
