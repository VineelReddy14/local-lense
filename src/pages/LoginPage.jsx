// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  Link
} from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/local-posts';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/backend/users.json");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        navigate(redirectPath);
      } else {
        alert("Invalid username or password.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("An error occurred while logging in.");
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Logo and App Name */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <img
            src="src/assets/logo.png"
            alt="Logo"
            style={{ height: "60px", marginRight: "12px" }}
          />
          <Typography variant="h4" fontWeight="bold">
            Local Lense
          </Typography>
        </Box>

        {/* "Login" title */}
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: 500, marginBottom: "20px" }}
        >
          Login
        </Typography>

        {/* Username Input */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "20px" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "8px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Forgot Password link */}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <Link href="#" color="primary" underline="hover" variant="body2">
            Forgot Password?
          </Link>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: "48%" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "48%" }}
          >
            Login
          </Button>
        </Box>

        {/* Sign-up Link */}
        <Typography
          variant="body2"
          sx={{ color: "primary.main", marginTop: "20px" }}
        >
          Not on Local Lense?{" "}
          <Link href="/signup" color="primary" underline="hover">
            Create an account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
