import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PostTabs from "../components/PostTabs";
import { Box, Typography } from "@mui/material";

function PostPage() {
  const [currentTab, setCurrentTab] = useState("Feed");

  return (
    <>
      <Navbar />
      {/* Outer gray background container */}
      <Box
        sx={{
          backgroundColor: "#efefef",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          marginLeft: "-10px",
          marginRight: "-10px",
        }}
      >
        {/* Centered inner content box (like HomePage) */}
        <Box
          paddingTop={{ xs: "20px", sm: "70px", md: "70px" }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* White container for all local-posts content */}
          <Box
            className="w-full"
            sx={{
              backgroundColor: "white",
              width: "100%",
              maxWidth: "900px",
              borderRadius: "6px",
              boxShadow: 1,
              overflow: "hidden",
            }}
          >
            {/* Feed / Your Posts toggle buttons */}
            <PostTabs currentTab={currentTab} onChange={setCurrentTab} />

            {/* Placeholder for next section like profile or posts */}
            <Box sx={{ padding: "20px" }}>
              <Typography variant="body1">
                You are viewing: <strong>{currentTab}</strong>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PostPage;
