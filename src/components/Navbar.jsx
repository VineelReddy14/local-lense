import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Box,
  Menu,
  MenuItem
} from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [selectedPage, setSelectedPage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const userInitial =
    currentUser?.displayName?.[0]?.toUpperCase() ||
    currentUser?.email?.[0]?.toUpperCase() ||
    "U";

  useEffect(() => {
    if (location.pathname === "/home") setSelectedPage("News");
    else if (location.pathname === "/local-posts") setSelectedPage("Local-Posts");
    else if (location.pathname === "/profile") setSelectedPage("Account");
  }, [location.pathname]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', minHeight: "40px" }} className="shadow-md">
      <Toolbar className="flex items-center" sx={{ minHeight: "40px" }}>
        <Button
          component={Link}
          to="/home"
          sx={{
            color: selectedPage === "News" ? 'white' : 'black',
            backgroundColor: selectedPage === "News" ? 'black' : 'transparent'
          }}
        >
          News
        </Button>

        <Button
          component={Link}
          to="/local-posts"
          sx={{
            color: selectedPage === "Local-Posts" ? 'white' : 'black',
            backgroundColor: selectedPage === "Local-Posts" ? 'black' : 'transparent'
          }}
        >
          Local-Posts
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        <img src="src/assets/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
        <Typography variant="h5" sx={{ color: 'black' }} className="font-roboto font-bold">
          Local Lense
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        {/* Show account only if user is logged in */}
        {currentUser && (
          <>
            <Tooltip title="Account options">
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "black", width: 32, height: 32 }}>
                  {userInitial}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Profile</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/saved">Saved Posts</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/help">Help</MenuItem>
              <MenuItem
                onClick={() => {
                  signOut(auth);
                  handleMenuClose();
                  navigate("/login");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
