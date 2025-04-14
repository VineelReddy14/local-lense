import { use, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import hamburger icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Navbar() {
    const location = useLocation();
    const [selectedPage, setSelectedPage] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);


    useEffect(() => {
        if (location.pathname === "/home") setSelectedPage("News");
        else if (location.pathname === "/local-posts") setSelectedPage("Local-Posts");
        else if (location.pathname === "/profile") setSelectedPage("Account");
    }, [location.pathname]);

     // Handlers for dropdown menu
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
                    to="/login?redirect=/local-posts" //so now when user clicks on Local-Posts, it will redirect to the login page
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

                     {/* Dropdown for Account */}
                     <Button
                    onClick={handleMenuOpen}
                    sx={{
                        color: selectedPage === "Account" ? 'white' : 'black',
                        backgroundColor: selectedPage === "Account" ? 'black' : 'transparent'
                    }}
                >
                    Account
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose} component={Link} to="/login">Login</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/saved-posts">Saved Posts</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/help">Help</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/login">Logout</MenuItem>
                </Menu>

                <IconButton edge="end" className="text-black">
                    <ExpandMoreIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
