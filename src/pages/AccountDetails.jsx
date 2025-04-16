import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function AccountDetails() {
  const [userData, setUserData] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2>Account Details</h2>
      {userData ? (
        <div style={{ lineHeight: "1.8" }}>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Followers:</strong> {userData.followers || 0}</p>
          <p><strong>Following:</strong> {userData.following || 0}</p>
          <p><strong>User ID:</strong> {userData.uid}</p>
        </div>
      ) : (
        <p>Loading account info...</p>
      )}
    </div>
  );
}

export default AccountDetails;
