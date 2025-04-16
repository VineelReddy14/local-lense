import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import LocalPostCard from "../components/LocalPostCard";

function SavedPostsPage() {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const savedIds = userDoc.data()?.savedPosts || [];

      const postsSnapshot = await getDocs(collection(db, "posts"));
      const matchedPosts = postsSnapshot.docs
        .filter((doc) => savedIds.includes(doc.id))
        .map((doc) => ({ id: doc.id, ...doc.data() }));

      setSavedPosts(matchedPosts);
    };

    fetchSavedPosts();
  }, []);

  const handleToggleSave = async (postId) => {
    const user = auth.currentUser;
    if (!user) return;

    await updateDoc(doc(db, "users", user.uid), {
      savedPosts: arrayRemove(postId),
    });

    setSavedPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Posts</h2>
      {savedPosts.length === 0 ? (
        <p>No saved posts yet.</p>
      ) : (
        savedPosts.map((post) => (
          <LocalPostCard
            key={post.id}
            post={post}
            canEdit={false}
            isSaved={true}
            onSaveToggle={() => handleToggleSave(post.id)}
            isLiked={false}
            onToggleLike={() => {}}
          />
        ))
      )}
    </div>
  );
}

export default SavedPostsPage;
