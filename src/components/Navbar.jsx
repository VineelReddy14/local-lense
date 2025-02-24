import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import hamburger icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/material";

function Navbar() {
    const [selectedPage, setSelectedPage] = useState("News");

    const handleButtonClick = (pageName) => {
        setSelectedPage(pageName);
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'white' }} className="shadow-md">
            <Toolbar className="flex items-center">
                {/* Hamburger Menu Icon */}
                <IconButton edge="start" className="text-black">
                    <MenuIcon />
                </IconButton>

                <Button
                    component={Link}
                    to="/"
                    sx={{
                        color: selectedPage === "News" ? 'white' : 'black',
                        backgroundColor: selectedPage === "News" ? 'black' : 'transparent'
                    }}
                    onClick={() => handleButtonClick("News")}
                >
                    News
                </Button>

                <Button
                    component={Link}
                    to="/profile"
                    sx={{
                        color: selectedPage === "Local-Posts" ? 'white' : 'black',
                        backgroundColor: selectedPage === "Local-Posts" ? 'black' : 'transparent'
                    }}
                    onClick={() => handleButtonClick("Local-Posts")}
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
                    onClick={() => handleButtonClick("Account")}
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
