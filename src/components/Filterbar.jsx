import React from "react";
import { Box, Button } from "@mui/material";

function Filterbar({ selectedCategory, onCategoryChange }) {
  const categories = [
    "ALL", "Education", "Entertainment", "Politics", "Weather",
    "Sports", "Crime", "Business", "Health", "Technology", "Environment"
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: "64px",
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        paddingX: "10px",
        paddingY: "8px",
        borderBottom: "1px solid #ddd",
        overflowX: "auto",
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": {
          display: "none" // Chrome/Safari
        }
      }}
    >
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          sx={{
            marginX: "6px",
            color: selectedCategory === category ? "white" : "black",
            backgroundColor: selectedCategory === category ? "black" : "transparent",
            borderRadius: "20px",
            paddingX: { xs: "12px", sm: "16px" },
            paddingY: "6px",
            fontSize: { xs: "12px", sm: "14px" },
            fontWeight: 600,
            textTransform: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: selectedCategory === category ? "black" : "#eee",
            }
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
}

export default Filterbar;