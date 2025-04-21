import React, { useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

import Navbar from "../components/Navbar";
import PostTabs from "../components/PostTabs";
import UserHeader from "../components/UserHeader";
import LocalPostCard from "../components/LocalPostCard";
import CreatePostModal from "../components/CreatePostModal";

function PostPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("Feed");
  const [postToEdit, setPostToEdit] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [posts, setPosts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [followerData, setFollowerData] = useState({ followers: 0, following: 0 });
  //const user = auth.currentUser;

  // Track auth user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) fetchUserData(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const fetchSavedPosts = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    const saved = userDoc.data()?.savedPosts || [];
    setSavedPosts(saved);
  };
  
  useEffect(() => {
    if (currentUser) {
      fetchPosts();
      fetchSavedPosts(currentUser.uid);
    }
  }, [currentUser]);
  
  // Fetch posts once user is known
  // useEffect(() => {
  //   if (currentUser) {
  //     fetchPosts();
  //   }
  // }, [currentUser]);

  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      const userData = userDoc.data();
      setFollowerData({
        followers: userData?.followers || 0,
        following: userData?.following || 0,
      });
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const visiblePosts =
    currentTab === "Feed"
      ? posts
      : posts.filter((post) => post.authorId === currentUser?.uid);

  const handleDeletePost = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Could not delete the post.");
    }
  };

  const handleEditPost = async (updatedPost) => {
    try {
      const postRef = doc(db, "posts", updatedPost.id);
      await updateDoc(postRef, {
        title: updatedPost.title,
        content: updatedPost.content,
        category: updatedPost.category,
        image: updatedPost.image,
        timestamp: serverTimestamp(),
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? { ...post, ...updatedPost } : post
        )
      );

      setPostToEdit(null);
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Could not update the post.");
    }
  };

  const handleToggleSave = async (post) => {
    const alreadySaved = savedPosts.includes(post.id);
    if (!currentUser) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      const saved = userSnap.data()?.savedPosts || [];
      const isSaved = saved.includes(post.id);
  
      await updateDoc(userRef, {
        savedPosts: isSaved ? saved.filter(id => id !== post.id) : [...saved, post.id],
      });
  
      setSavedPosts((prev) =>
        alreadySaved ? prev.filter((id) => id !== post.id) : [...prev, post.id]
      );      
    } catch (err) {
      console.error("Failed to toggle save:", err);
    }
  };
  

  const handleToggleLike = async (postId) => {
    if (!currentUser) return;
    const userId = currentUser.uid;
  
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;
  
    const postData = postSnap.data();
    const likedBy = postData.likedBy || [];
    const alreadyLiked = likedBy.includes(userId);
  
    try {
      await updateDoc(postRef, {
        likedBy: alreadyLiked
          ? likedBy.filter((uid) => uid !== userId)
          : [...likedBy, userId],
        likes: alreadyLiked
          ? (postData.likes || 1) - 1
          : (postData.likes || 0) + 1,
      });
  
      // update local state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: alreadyLiked ? post.likes - 1 : post.likes + 1,
                likedBy: alreadyLiked
                  ? post.likedBy.filter((uid) => uid !== userId)
                  : [...(post.likedBy || []), userId],
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
    }
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
          backgroundColor: "white",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto", 
          borderRadius: "6px",
          boxShadow: 1,
          overflow: "hidden",
        }}
      >
        <Box
          paddingTop={{ xs: "70px", sm: "70px", md: "70px" }}
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
              name={currentUser?.displayName || currentUser?.email || "Anonymous"}
              //postCount={posts.filter((post) => post.authorId === user?.uid).length}
              postCount={posts.filter((post) => post.authorId === currentUser?.uid).length}

              followers={followerData.followers}
              following={followerData.following}
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
                isSaved={savedPosts.includes(post.id)}
                isLiked={post.likedBy?.includes(currentUser?.uid)}
                onToggleLike={() => handleToggleLike(post.id)}
                comments={commentsMap[post.id] || []}
                onAddComment={(comment) => handleAddComment(post.id, comment)}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <CreatePostModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onPostCreated={() => {
          fetchPosts();
          setShowModal(false);
          setShowSuccess(true);
        }}
      />

      <CreatePostModal
        open={Boolean(postToEdit)}
        onClose={() => setPostToEdit(null)}
        onPostUpdated={(updatedPost) => {
          fetchPosts(); // Refresh after edit
          setPostToEdit(null); // Close modal
          setShowSuccess(true); // Show success message
        }}
        initialData={postToEdit}
      />


      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Post saved successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default PostPage;
