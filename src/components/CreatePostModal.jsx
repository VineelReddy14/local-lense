import React, { useState, useEffect } from "react";
import {
  Modal, Box, Typography, IconButton, TextField, MenuItem, Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addDoc, collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getDoc } from "firebase/firestore";

const categoryOptions = ["General", "Education", "Entertainment", "Politics", "Weather", "Sports", "Crime", "Business", "Health", "Technology", "Environment"];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function CreatePostModal({ open, onClose, onPostCreated, onPostUpdated, initialData }) {
  const [category, setCategory] = useState("General");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (open && !initialData) {
      setCategory("General");
      setCaption("");
      setDescription("");
      setImage("");
    }

    if (initialData) {
      setCategory(initialData.category || "General");
      setCaption(initialData.title || "");
      setDescription(initialData.content || "");
      setImage(initialData.image || "");
    }
  }, [open, initialData]);

  const handlePost = async () => {
    if (!caption.trim() || !description.trim()) return;

    try {
      const user = auth.currentUser;

      const postData = {
        title: caption,
        content: description,
        category,
        image,
        timestamp: serverTimestamp(),
      };

      if (initialData) {
        // UPDATE existing post
        const postRef = doc(db, "posts", initialData.id);
        await updateDoc(postRef, postData);
        if (onPostUpdated) onPostUpdated({ ...initialData, ...postData });
      } else {
        // CREATE new post
        const newPost = {
          ...postData,
          date: new Date().toLocaleDateString("en-US", {
            month: "short", day: "numeric"
          }),
          author: user?.displayName || user?.email || "Anonymous",
          authorId: user?.uid,
          likes: 0,
          comments: [],
          commentCount: 0
        };
        await addDoc(collection(db, "posts"), newPost);
        if (onPostCreated) onPostCreated();
      }

      onClose(); // Close modal after save
    } catch (err) {
      console.error("Failed to save post:", err);
      alert("Could not save your post. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" mb={2}>
          {initialData ? "Edit Post" : "Create A Post"}
        </Typography>

        <Typography fontWeight="500" mb={0.5}>Post category:</Typography>
        <TextField fullWidth select value={category} onChange={(e) => setCategory(e.target.value)} size="small" sx={{ mb: 2 }}>
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>

        <Typography fontWeight="500" mb={0.5}>Caption:</Typography>
        <TextField fullWidth value={caption} onChange={(e) => setCaption(e.target.value)} size="small" sx={{ mb: 2 }} />

        <Typography fontWeight="500" mb={0.5}>Description:</Typography>
        <TextField fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 2 }} />

        <Box
          sx={{
            border: "2px dashed #ccc", borderRadius: "10px",
            py: 2, px: 3, mb: 3, textAlign: "center"
          }}
        >
          <Typography fontWeight="bold" mb={1}>Upload Image</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImage(reader.result);
                reader.readAsDataURL(file);
              }
            }}
          />
          {image && (
            <Box mt={2}>
              <img src={image} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: "8px" }} />
            </Box>
          )}
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Button
            onClick={handlePost}
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#388e3c" },
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: "bold",
              px: 4,
            }}
          >
            {initialData ? "Save Changes" : "Post"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreatePostModal;
