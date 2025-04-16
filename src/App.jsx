import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NewsDetails from "./pages/NewsDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HelpPage from "./pages/HelpPage";
import SavedPosts from "./pages/SavedPosts";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user ? `Logged in: ${user.email}` : "Logged out.");
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/local-posts" element={currentUser ? <PostPage /> : <Navigate to="/login" />} />
        <Route path="/news/:id" element={currentUser ? <NewsDetails /> : <Navigate to="/login" />} />
        <Route path="/saved" element={currentUser ? <SavedPosts /> : <Navigate to="/login" />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
