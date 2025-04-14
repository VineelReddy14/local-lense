// src/pages/SignUpPage.jsx
import React, { useState } from 'react';

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

    setShowPasswordError(false); // Reset error message

    const newUser = { fullName, username, email, password };

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      alert(data.message);

      // Clear form
      setFullName('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      alert('Error signing up');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center mb-6">
        <img src="/logo.svg" alt="logo" className="w-10 h-10 mr-2" />
        <h1 className="text-2xl font-bold">LOCAL LENSE</h1>
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="Enter full name"
          className="border px-4 py-2 rounded w-64"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Create username"
          className="border px-4 py-2 rounded w-64"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email ID"
          className="border px-4 py-2 rounded w-64"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col items-start w-64">
          <input
            type="password"
            placeholder="Password"
            className="border px-4 py-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-gray-600 mt-1">
            Must have at least one capital letter and one number.
          </p>
          {showPasswordError && (
            <p className="text-sm text-red-600 mt-1">Did not fulfill conditions</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-700 text-white px-6 py-2 rounded-full font-semibold"
        >
          Sign up
        </button>
      </form>

      <div className="mt-4 text-sm">
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default SignUpPage;
