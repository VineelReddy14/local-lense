// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        // Fetch the users data from the JSON file
        const response = await fetch("/backend/users.json");
        const users = await response.json();
  
        // Check if the entered credentials match any user
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
  
        if (user) {
          // Navigate to the homepage on successful login
          navigate("/home");
        } else {
          alert("Invalid username or password.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        alert("An error occurred while logging in.");
      }
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center mb-6">
        <img src="/logo.svg" alt="logo" className="w-10 h-10 mr-2" />
        <h1 className="text-2xl font-bold">LOCAL LENSE</h1>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="border px-4 py-2 rounded w-64"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded w-64"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-gray-700 text-white px-6 py-2 rounded-full font-semibold">
          Login
        </button>
      </form>
      <div className="mt-4 text-sm">
        <a href="#">Forgot password</a> | <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default LoginPage;
