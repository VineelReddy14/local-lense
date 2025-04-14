import React, { useState, useEffect } from "react";
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
  const [postToEdit, setPostToEdit] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});

  const currentUser = "Teddy Diallo"; // to replace with auth later

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

  //Handle the deletion of a post
  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  //Handles editing of a post
  const handleEditPost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
    );
    setPostToEdit(null); // Close modal
  };

  const handleToggleSave = (post) => {
    const alreadySaved = savedPosts.some((p) => p.id === post.id);
    if (alreadySaved) {
      setSavedPosts(savedPosts.filter((p) => p.id !== post.id));
    } else {
      setSavedPosts([...savedPosts, post]);
    }
  };

  const handleToggleLike = (postId) => {
    setLikedPostIds((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  
    // Update like count in posts state
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPostIds.includes(postId)
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
  
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentText],
    }));
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#f7f7f7", // lighter and softer gray
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center", // center content horizontally
          paddingX: "16px"
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
                onDelete = {() => handleDeletePost(post.id)}
                onEdit={() => setPostToEdit(post)}
                onSaveToggle={() => handleToggleSave(post)}
                isSaved={savedPosts.some((p) => p.id === post.id)} //For styling
                isLiked={likedPostIds.includes(post.id)} 
                onToggleLike={() => handleToggleLike(post.id)} 
                comments={commentsMap[post.id] || []} 
                onAddComment={(comment) => handleAddComment(post.id, comment)} 
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
      {/* Modal to edit an existing post */}
      <CreatePostModal
        open={Boolean(postToEdit)}
        onClose={() => setPostToEdit(null)}
        onSubmit={handleEditPost}
        initialData={postToEdit}
      />
    </>
  );
}

export default PostPage;
