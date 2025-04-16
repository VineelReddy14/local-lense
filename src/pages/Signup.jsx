// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         email: user.email,
//         username: username,
//         followers: 0, 
//         following: 0   
//       });
      

//       navigate("/local-posts");
//     } catch (err) {
//       console.error("Signup error:", err);

//       if (err.code === "auth/email-already-in-use") {
//         setError("This email is already in use.");
//       } else if (err.code === "auth/weak-password") {
//         setError("Password should be at least 6 characters.");
//       } else {
//         setError("Signup failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <h2>Create Account</h2>
//       <input
//         type="email"
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         value={email}
//         required
//       />
//       <input
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         value={password}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <button type="submit">Sign Up</button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </form>
//   );
// }

// export default Signup; test

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        followers: 0,
        following: 0,
      });

      navigate("/local-posts");
    } catch (err) {
      console.error("Signup error:", err);

      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">LOCAL LENSE</h2>
          <p className="text-sm text-gray-500">Create your account</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="px-4 py-3 rounded-full border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-full border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-3 rounded-full border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition"
          >
            Sign Up
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#4B5563" }}>
            Already have an account?{" "}
            <span
                onClick={() => navigate("/login")}
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline", fontWeight: "500", fontSize:"18px" }}
            >
                Login
            </span>
            </p>

      </div>
    </div>
  );
}

export default Signup;
