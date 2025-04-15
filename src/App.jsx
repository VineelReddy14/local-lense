// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NewsDetails from "./pages/NewsDetails";
import SavedPosts from "./pages/SavedPosts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HelpPage from "./pages/HelpPage";
import useSavedPosts from "./hooks/useSavedPosts"; //hey new comment

function App() {
  const [currentUser, setCurrentUser] = useState(null); //second comment
  const { savedPosts, toggleSave } = useSavedPosts(); // third comm

  // Track user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("Logged in:", user.email); //4th comment
      } else {
        setCurrentUser(null);
        console.log("Logged out.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/local-posts"
          element={
            currentUser ? (
              <PostPage savedPosts={savedPosts} onToggleSave={toggleSave} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/saved"
          element={
            currentUser ? (
              <SavedPosts savedPosts={savedPosts} onToggleSave={toggleSave} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/news/:id"
          element={
            currentUser ? <NewsDetails /> : <Navigate to="/login" />
          }
        />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
