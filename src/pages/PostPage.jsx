import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import PostTabs from "../components/PostTabs";
import UserHeader from "../components/UserHeader";
import LocalPostCard from "../components/LocalPostCard";
import CreatePostModal from "../components/CreatePostModal";
import localPostsData from "../data/localPostsData.json"; // initial data

function PostPage() {
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("Feed");
  const currentUser = "Teddy Diallo"; // replace with auth later

  // Prepare initial posts with user info attached
  const allPostsFlattened = localPostsData.flatMap((user) =>
    user.posts.map((post) => ({
      ...post,
      author: user.user,
      verified: user.verified,
      avatar: user.avatar,
    }))
  );

  // Manage posts state
  const [posts, setPosts] = useState(allPostsFlattened);

  // Filter visible posts
  const visiblePosts =
    currentTab === "Feed"
      ? posts
      : posts.filter((post) => post.author === currentUser);

  // Get current user info
  const currentUserData = localPostsData.find(
    (u) => u.user === currentUser
  );

  // Add new post
  const handleCreatePost = (newPost) => {
    const completePost = {
      ...newPost,
      author: currentUser,
      verified: true,
      avatar: "/default-avatar.png", // default avatar
    };
    setPosts([completePost, ...posts]);
  };

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
          {/* Main white content container */}
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

            {/* User Header */}
            <UserHeader
              name={currentUser}
              postCount={currentUserData?.posts.length || 0}
              followers={182}
              following={256}
              onCreatePostClick={() => setShowModal(true)}
            />

            {/* Separator */}
            <Box sx={{ borderBottom: "1px solid #ddd" }} />

            {/* Render all visible posts */}
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

      {/* Modal to create new post */}
      <CreatePostModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
}

export default PostPage;
