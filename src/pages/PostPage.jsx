import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import PostTabs from "../components/PostTabs";
import UserHeader from "../components/UserHeader";
import localPostsData from "../data/localPostsData.json"; // <-- your post data

function PostPage() {
  const [currentTab, setCurrentTab] = useState("Feed");
  const currentUser = "Teddy Diallo"; // This can be dynamic later

  // Flatten all posts and tag them with user info
  const allPosts = localPostsData.flatMap((user) =>
    user.posts.map((post) => ({
      ...post,
      author: user.user,
      verified: user.verified,
      avatar: user.avatar,
    }))
  );

  // Filter posts based on tab
  const visiblePosts =
    currentTab === "Feed"
      ? allPosts
      : allPosts.filter((post) => post.author === currentUser);

  return (
    <>
      <Navbar />

      {/* Outer background container */}
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
        {/* Centered content area */}
        <Box
          paddingTop={{ xs: "20px", sm: "70px", md: "70px" }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* White main content box */}
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              maxWidth: "900px",
              borderRadius: "6px",
              boxShadow: 1,
              overflow: "hidden",
            }}
          >
            {/* Tabs */}
            <PostTabs currentTab={currentTab} onChange={setCurrentTab} />

            {/* User Profile Header */}
            <UserHeader
              name={currentUser}
              postCount={localPostsData.find(u => u.user === currentUser)?.posts.length || 0}
              followers={182}
              following={256}
            />

            {/* Separator line under header */}
            <Box sx={{ borderBottom: "1px solid #ddd" }} />

            {/* Render visible posts */}
            {visiblePosts.map((post) => (
              <Box
                key={post.id}
                sx={{
                  padding: "20px",
                  borderBottom: "1px solid #eee",
                }}
              >
                {/* Title */}
                <Typography variant="h6" fontWeight="bold">
                  {post.title}
                </Typography>

                {/* Category */}
                <Typography variant="body2" sx={{ fontStyle: "italic", marginBottom: "4px" }}>
                  Post category:{" "}
                  <span className="bg-gray-300 px-2 py-0.5 rounded">{post.category}</span>
                </Typography>

                {/* Content + Image row */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    {post.content}
                  </Typography>

                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{ width: "200px", borderRadius: "8px", objectFit: "cover" }}
                    />
                  )}
                </Box>

                {/* Edit/Delete actions */}
                <Box sx={{ marginTop: "8px" }}>
                  <Button size="small" sx={{ textTransform: "none" }}>
                    Edit
                  </Button>
                  <Button size="small" sx={{ textTransform: "none" }}>
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PostPage;
