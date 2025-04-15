import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/local-posts"); 
      })
      .catch((err) => {
        console.error("Login error:", err);
        if (err.code === "auth/user-not-found") {
          setError("No account found with this email.");
        } else if (err.code === "auth/wrong-password") {
          setError("Incorrect password.");
        } else {
          setError("Login failed. Please try again.");
        }
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      // If user doesn't exist in Firestore, create them
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName || user.email.split("@")[0], // fallback
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
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <button type="button" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
        <p onClick={handlePasswordReset} style={{ color: "blue", cursor: "pointer" }}>
          Forgot Password?
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
      <p style={{ marginTop: "1rem" }}>
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/signup")}
    style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
  >
    Create one
  </span>
</p>

    </div>
  );
}

export default Login;
