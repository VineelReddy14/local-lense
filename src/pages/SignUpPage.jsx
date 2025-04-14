// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Link
} from '@mui/material';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).+$/;

    if (!fullName || !username || !email || !password) {
      alert('Please fill in all the fields.');
      return;
    }

    if (!emailPattern.test(email)) {
      alert('Enter a valid email address.');
      return;
    }

    if (!passwordPattern.test(password)) {
      setShowPasswordError(true);
      alert('Did not fulfill conditions');
      return;
    }

    setShowPasswordError(false);

    const newUser = { fullName, username, email, password };

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      alert(data.message);

      setFullName('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      alert('Error signing up');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setFullName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setShowPasswordError(false);
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
        onSubmit={handleSignUp}
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

        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: 500, marginBottom: "20px" }}
        >
          Create Account
        </Typography>

        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "20px" }}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "20px" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Email ID"
          type="email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "20px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: showPasswordError ? "8px" : "20px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Typography
          variant="body2"
          sx={{ width: "100%", color: "gray", marginBottom: "4px" }}
        >
          Must have at least one capital letter and one number.
        </Typography>

        {showPasswordError && (
          <Typography variant="body2" color="error" sx={{ marginBottom: "16px" }}>
            Did not fulfill conditions
          </Typography>
        )}

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
            Sign up
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "primary.main", marginTop: "20px" }}
        >
          Already have an account?{" "}
          <Link href="/login" color="primary" underline="hover">
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;
