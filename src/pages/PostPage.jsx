import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import PostTabs from "../components/PostTabs";
import UserHeader from "../components/UserHeader";
import LocalPostCard from "../components/LocalPostCard";
import localPostsData from "../data/localPostsData.json"; // Post data

function PostPage() {
  const [currentTab, setCurrentTab] = useState("Feed");
  const currentUser = "Teddy Diallo"; // Replace later with dynamic auth

  // Flatten posts and attach user metadata
  const allPosts = localPostsData.flatMap((user) =>
    user.posts.map((post) => ({
      ...post,
      author: user.user,
      verified: user.verified,
      avatar: user.avatar,
    }))
  );

  // Filter visible posts based on tab
  const visiblePosts =
    currentTab === "Feed"
      ? allPosts
      : allPosts.filter((post) => post.author === currentUser);

  // Get current user info for UserHeader
  const currentUserData = localPostsData.find(
    (u) => u.user === currentUser
  );

  return (
    <>
      <Navbar />
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
        <Box
          paddingTop={{ xs: "20px", sm: "70px", md: "70px" }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* White container holding all post content */}
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
            {/* Top Tabs */}
            <PostTabs currentTab={currentTab} onChange={setCurrentTab} />

            {/* Profile Header (only for Your Posts) */}
            <UserHeader
              name={currentUser}
              postCount={currentUserData?.posts.length || 0}
              followers={182}
              following={256}
            />

            {/* Separator line */}
            <Box sx={{ borderBottom: "1px solid #ddd" }} />

            {/* Render posts */}
            {visiblePosts.map((post) => (
              <LocalPostCard
                key={post.id}
                post={post}
                canEdit={currentTab === "Your Posts"}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PostPage;
