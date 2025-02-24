import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import hamburger icon
import { Box } from "@mui/material";

function Navbar() {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
            <Toolbar>
                {/* Hamburger Menu Icon */}
                <IconButton edge="start" sx={{ color: 'black' }}>
                    <MenuIcon />
                </IconButton>

                <Button color="inherit" component={Link} to="/" sx={{ color: 'black' }}>
                    News
                </Button>

                <Button color="inherit" component={Link} to="/profile" sx={{ color: 'black' }}>
                    Local-Posts
                </Button>

                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 0, color: 'black', fontFamily: 'Roboto', fontWeight: 'bold' }}>
                    Local Lense
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Button color="inherit" component={Link} to="/profile" sx={{ color: 'black' }}>
                    Account
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
