import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import LocalPostCard from "../components/LocalPostCard";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

  function SavedPosts() {
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchSavedPosts = async () => {
        try {
          const user = auth.currentUser;
          if (!user) return;
  
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const savedIds = userDoc.data()?.savedPosts || [];
  
          const postsSnapshot = await getDocs(collection(db, "posts"));
          const matched = postsSnapshot.docs
            .filter((doc) => savedIds.includes(doc.id))
            .map((doc) => ({ id: doc.id, ...doc.data() }));
  
          setSavedPosts(matched);
        } catch (err) {
          console.error("Failed to load saved posts:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchSavedPosts();
    }, []);
  
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
  
            {loading ? (
              <Typography>Loading...</Typography>
            ) : savedPosts.length === 0 ? (
              <Typography>No saved posts yet.</Typography>
            ) : (
              savedPosts.map((post) => (
                <LocalPostCard
                  key={post.id}
                  post={post}
                  canEdit={false}
                  isSaved={true}
                  onSaveToggle={() => {}} 
                />
              ))
            )}
          </Box>
        </Box>
      </>
    );
  }  

export default SavedPosts;
