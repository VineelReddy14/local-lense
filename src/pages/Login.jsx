import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Box, TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/local-posts");
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "auth/user-not-found") setError("No account found with this email.");
      else if (err.code === "auth/wrong-password") setError("Incorrect password.");
      else setError("Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName || user.email.split("@")[0],
          followers: 0,
          following: 0
        });
      }

      navigate("/local-posts");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google sign-in failed.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent.");
      setError("");
    } catch (err) {
      setMessage("");
      setError("Could not send reset email. Check the email address.");
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-card">
        <img src="/logo.svg" alt="Logo" className="login-logo" />
        <Typography variant="h5" fontWeight="bold" className="login-title">Local Lense</Typography>
        <Typography variant="h6" className="login-subtitle">Login</Typography>

        <form onSubmit={handleLogin} className="login-form">
          <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
          <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
          
          <Box className="login-footer">
            <MuiLink onClick={handlePasswordReset} className="forgot-link">Forgot Password?</MuiLink>
          </Box>

          <Box className="login-actions">
            <Button variant="outlined" fullWidth onClick={() => navigate("/")} className="cancel-button">Cancel</Button>
            <Button type="submit" variant="contained" fullWidth className="login-button">Login</Button>
          </Box>

          <Button onClick={handleGoogleLogin} fullWidth sx={{ mt: 1 }} variant="outlined">
            Sign in with Google
          </Button>
        </form>

        {error && <Typography className="error-text">{error}</Typography>}
        {message && <Typography className="success-text">{message}</Typography>}

        <Typography className="signup-prompt">
          Not on Local Lense?{" "}
          <MuiLink onClick={() => navigate("/signup")} className="signup-link">
            Create an account
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;

