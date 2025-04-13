import React from "react";
import { Box, Button } from "@mui/material";

/**
 * Tab component using MUI Button and sx styling, to match Navbar look.
 * Highlights selected tab with black background and white text.
 */
function PostTabs({ currentTab, onChange }) {
  return (
    <Box
      className="max-w-5xl w-full"
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        paddingTop: "10px",
        paddingLeft: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Button
        onClick={() => onChange("Feed")}
        sx={{
          color: currentTab === "Feed" ? "white" : "black",
          backgroundColor: currentTab === "Feed" ? "black" : "transparent",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: "20px",
          paddingX: "16px",
          paddingY: "4px",
          marginRight: "10px",
          "&:hover": {
            backgroundColor: currentTab === "Feed" ? "black" : "#f0f0f0",
          },
        }}
      >
        Feed
      </Button>

      <Button
        onClick={() => onChange("Your Posts")}
        sx={{
          color: currentTab === "Your Posts" ? "white" : "black",
          backgroundColor: currentTab === "Your Posts" ? "black" : "transparent",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: "20px",
          paddingX: "16px",
          paddingY: "4px",
          "&:hover": {
            backgroundColor: currentTab === "Your Posts" ? "black" : "#f0f0f0",
          },
        }}
      >
        Your Posts
      </Button>
    </Box>
  );
}

export default PostTabs;
