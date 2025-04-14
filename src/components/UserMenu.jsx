import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function UserMenu({ currentUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const displayName = currentUser.displayName || currentUser.email;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          background: "#eee",
          border: "none",
          cursor: "pointer",
        }}
      >
        Hello, {displayName?.split("@")[0]}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: "10px" }}>
            <li style={{ padding: "8px 12px", cursor: "pointer" }} onClick={() => navigate("/saved")}>
              Saved Posts
            </li>
            <li style={{ padding: "8px 12px", cursor: "pointer" }} onClick={handleLogout}>
              Log Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
