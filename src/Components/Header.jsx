import { pcoImg } from "../utils/images/index";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI import AppBar from '@mui/material/AppBar';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const history = useHistory();
  const { me, rewardsUser } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Avatar src={pcoImg} alt="planning center" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Rewards
        </Typography>
        {rewardsUser.balance && (
          <Typography>{rewardsUser.balance}pts</Typography>
        )}
        {/* <Avatar src={me.attributes.avatar} alt="avatar"  /> */}
      </Toolbar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem component={Link} to="/" onClick={handleClose}>
          Home
        </MenuItem>
        <MenuItem component={Link} to="/history" onClick={handleClose}>
          History
        </MenuItem>
        {rewardsUser.admin && (
          <MenuItem component={Link} to="/admin/users" onClick={handleClose}>
            Users - Admin
          </MenuItem>
        )}

        {rewardsUser.admin && (
          <MenuItem component={Link} to="/admin/rewards" onClick={handleClose}>
            Rewards - Admin
          </MenuItem>
        )}
        {rewardsUser.admin && (
          <MenuItem component={Link} to="/admin/redeemed" onClick={handleClose}>
            Redeemed - Admin
          </MenuItem>
        )}
        {rewardsUser.admin && (
          <MenuItem component={Link} to="/admin/awarded" onClick={handleClose}>
            Awarded - Admin
          </MenuItem>
        )}
        {rewardsUser.admin && (
          <MenuItem
            component={Link}
            to="/admin/categories"
            onClick={handleClose}
          >
            Categories - Admin
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
};

export default Header;
