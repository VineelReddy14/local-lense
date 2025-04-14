import React, { useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { auth, db } from "../firebase";

import Navbar from "../components/Navbar";
import PostTabs from "../components/PostTabs";
import UserHeader from "../components/UserHeader";
import LocalPostCard from "../components/LocalPostCard";
import CreatePostModal from "../components/CreatePostModal";

function PostPage() {
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("Feed");
  const [postToEdit, setPostToEdit] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [posts, setPosts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const user = auth.currentUser;
  const currentUser = user?.displayName || user?.email || "Anonymous";

  // Extract fetchPosts so we can call it anytime
  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const visiblePosts =
    currentTab === "Feed"
      ? posts
      : posts.filter((post) => post.authorId === user?.uid);

  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

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
          backgroundColor: "#f7f7f7",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          paddingX: "16px",
        }}
      >
        <Box
          paddingTop={{ xs: "20px", sm: "70px", md: "70px" }}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
            <PostTabs currentTab={currentTab} onChange={setCurrentTab} />

            <UserHeader
              name={currentUser}
              postCount={visiblePosts.length}
              followers={182}
              following={256}
              onCreatePostClick={() => setShowModal(true)}
            />

            <Box sx={{ borderBottom: "1px solid #ddd" }} />

            {visiblePosts.map((post) => (
              <LocalPostCard
                key={post.id}
                post={post}
                canEdit={currentTab === "Your Posts"}
                onDelete={() => handleDeletePost(post.id)}
                onEdit={() => setPostToEdit(post)}
                onSaveToggle={() => handleToggleSave(post)}
                isSaved={savedPosts.some((p) => p.id === post.id)}
                isLiked={likedPostIds.includes(post.id)}
                onToggleLike={() => handleToggleLike(post.id)}
                comments={commentsMap[post.id] || []}
                onAddComment={(comment) => handleAddComment(post.id, comment)}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Create Post Modal: Now with post refresh and success message */}
      <CreatePostModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onPostCreated={() => {
          fetchPosts();               
          setShowModal(false);        
          setShowSuccess(true);       
        }}
      />

      {/* Edit Post Modal (optional for now) */}
      <CreatePostModal
        open={Boolean(postToEdit)}
        onClose={() => setPostToEdit(null)}
        onSubmit={handleEditPost}
        initialData={postToEdit}
      />

      {/*Snackbar for user feedback */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Post created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default PostPage;
