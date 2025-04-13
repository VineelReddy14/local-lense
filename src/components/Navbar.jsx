import { use, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import hamburger icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/material";

function Navbar() {
    const location = useLocation();
    const [selectedPage, setSelectedPage] = useState("");

    useEffect(() => {
        if (location.pathname === "/") setSelectedPage("News");
        else if (location.pathname === "/local-posts") setSelectedPage("Local-Posts");
        else if (location.pathname === "/profile") setSelectedPage("Account");
    }, [location.pathname]);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'white', minHeight: "40px" }} className="shadow-md">
            <Toolbar className="flex items-center" sx={{ minHeight: "40px" }}>
            
                <Button
                    component={Link}
                    to="/"
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

                <Button
                    component={Link}
                    to="/profile"
                    sx={{
                        color: selectedPage === "Account" ? 'white' : 'black',
                        backgroundColor: selectedPage === "Account" ? 'black' : 'transparent'
                    }}
                >
                    Account
                </Button>
                <IconButton edge="end" className="text-black">
                    <ExpandMoreIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
