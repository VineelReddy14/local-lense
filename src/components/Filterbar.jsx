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
        top: "64px", // right below navbar
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "white", // ✅ match page background
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingX: { xs: "8px", sm: "20px" },
        paddingY: "10px",
        borderBottom: "1px solid #ddd",
        overflowX: "auto",
        gap: "12px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none"
        }
      }}
    >
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          sx={{
            flexShrink: 0,
            fontSize: { xs: "13px", sm: "14px" },
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "20px",
            paddingX: "16px",
            paddingY: "6px",
            whiteSpace: "nowrap",
            backgroundColor: selectedCategory === category ? "black" : "transparent",
            color: selectedCategory === category ? "white" : "black",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: selectedCategory === category ? "black" : "#f0f0f0",
              textDecoration: selectedCategory === category ? "none" : "underline"
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
