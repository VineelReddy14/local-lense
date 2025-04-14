import { useState, useEffect } from "react";

function useSavedPosts() {
  const [savedPosts, setSavedPosts] = useState(() => {
    const stored = localStorage.getItem("savedPosts");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
  }, [savedPosts]);

  const toggleSave = (post) => {
    const alreadySaved = savedPosts.some((p) => p.id === post.id);
    if (alreadySaved) {
      setSavedPosts(savedPosts.filter((p) => p.id !== post.id));
    } else {
      setSavedPosts([...savedPosts, post]);
    }
  };

  return { savedPosts, toggleSave };
}

export default useSavedPosts;
