import React from "react";
import { Box, Typography } from "@mui/material";
import LocalPostCard from "../components/LocalPostCard";
import Navbar from "../components/Navbar";

function SavedPosts({ savedPosts, onToggleSave }) {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          paddingTop: "80px",
          backgroundColor: "#efefef",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "900px", backgroundColor: "white", borderRadius: "8px", padding: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            {savedPosts.length} Saved Posts
          </Typography>

          {savedPosts.map((post) => (
            <LocalPostCard
              key={post.id}
              post={post}
              canEdit={false}
              onSaveToggle={() => onToggleSave(post)}
              isSaved={true}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default SavedPosts;
