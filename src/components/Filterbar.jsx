import React from "react";
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

function Filterbar({ selectedCategory, onCategoryChange }) {
    const categories = ["ALL", "Education", "Entertainment"]; // Updated category

    return (
        <Box
            paddingTop={{ xs: "20px", sm: "20px", md: "20px" }}
            sx={{
                width: "250px",
                backgroundColor: "white",
                padding: "20px",
                borderRight: "2px solid #ddd",
                minHeight: "100vh",
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: "20px",  fontWeight: "bold" }}>
                Category
            </Typography>
            <List>
                {categories.map((category) => (
                    <ListItem key={category} disablePadding>
                        <ListItemButton
                            selected={selectedCategory === category}
                            onClick={() => onCategoryChange(category)}
                            sx={{
                                borderRadius: "5px",
                                "&.Mui-selected": {
                                    backgroundColor: "black",
                                    color: "white",
                                },
                            }}
                        >
                            <ListItemText primary={category} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Filterbar;