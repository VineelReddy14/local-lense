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
    if (location.pathname === "/" || location.pathname === "/home") setSelectedPage("News");
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
    <AppBar position="fixed" sx={{ backgroundColor: 'white', minHeight: "64px" }} className="shadow-md">
      <Toolbar
        sx={{
          minHeight: "64px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: { xs: "12px", sm: "24px" }
        }}
      >
        {/* Left: Logo and App Name (title hidden on mobile) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link to="/home">
            <img src="/logo.png" alt="Logo" style={{ height: '28px' }} />
          </Link>
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              fontWeight: 600,
              fontSize: { xs: "15px", sm: "17px", md: "20px" },
              display: { xs: "none", md: "inline" }
            }}
          >
            Local Lense
          </Typography>
        </Box>

        {/* Center: Navigation Buttons */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Button
            component={Link}
            to="/home"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              paddingX: { xs: "8px", sm: "12px" },
              paddingY: "4px",
              color: selectedPage === "News" ? 'white' : 'black',
              backgroundColor: selectedPage === "News" ? 'black' : 'transparent',
              borderRadius: "8px"
            }}
          >
            News
          </Button>

          <Button
            component={Link}
            to="/local-posts"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              paddingX: { xs: "8px", sm: "12px" },
              paddingY: "4px",
              color: selectedPage === "Local-Posts" ? 'white' : 'black',
              backgroundColor: selectedPage === "Local-Posts" ? 'black' : 'transparent',
              borderRadius: "8px"
            }}
          >
            Local-Posts
          </Button>
        </Box>

        {/* Right: Avatar */}
        {currentUser && (
          <Box sx={{ marginLeft: "auto" }}>
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
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;