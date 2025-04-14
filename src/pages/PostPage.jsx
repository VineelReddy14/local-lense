import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import PostTabs from "../components/PostTabs";
import UserHeader from "../components/UserHeader";
import LocalPostCard from "../components/LocalPostCard";
import CreatePostModal from "../components/CreatePostModal";

function PostPage() {
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("Feed");
  const currentUser = "Teddy Diallo";
  const [localPostsData, setLocalPostsData] = useState([]);

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch("/data/localPostsData.json")
      .then((response) => response.json())
      .then((data) => setLocalPostsData(data))
      .catch((error) => console.error("Error fetching local posts data:", error));
  }, []);

  const allPosts = localPostsData.flatMap((user) =>
    user.posts.map((post) => ({
      ...post,
      author: user.user,
      verified: user.verified,
      avatar: user.avatar,
    }))
  );

  const visiblePosts =
    currentTab === "Feed"
      ? allPosts
      : allPosts.filter((post) => post.author === currentUser);

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

            {/* Profile Header with modal trigger passed down */}
            <UserHeader
              name={currentUser}
              postCount={currentUserData?.posts.length || 0}
              followers={182}
              following={256}
              onCreatePostClick={() => setShowModal(true)} // 🔥 Here!
            />

            <Box sx={{ borderBottom: "1px solid #ddd" }} />

            {/* Posts */}
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

      {/* 🔥 Create Post Modal */}
      <CreatePostModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default PostPage;
