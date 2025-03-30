import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";

const categoryOptions = ["General", "Technology", "Infrastructure", "Public Safety"];

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

function CreatePostModal({ open, onClose, onSubmit }) {
  const [category, setCategory] = useState("General");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handlePost = () => {
    if (!caption.trim() || !description.trim()) return;

    const newPost = {
      id: Date.now(),
      category,
      title: caption,
      content: description,
      image,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      likes: 0,
      comments: 0,
    };

    onSubmit(newPost);
    // Clear form
    setCategory("General");
    setCaption("");
    setDescription("");
    setImage("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" mb={2}>
          Create A Post
        </Typography>

        <Typography fontWeight="500" mb={0.5}>Post category:</Typography>
        <TextField
          fullWidth
          select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          size="small"
          sx={{ mb: 2 }}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>

        <Typography fontWeight="500" mb={0.5}>Caption:</Typography>
        <TextField
          fullWidth
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography fontWeight="500" mb={0.5}>Description:</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

{/* Upload Image */}
<Box
  sx={{
    border: "2px dashed #ccc",
    borderRadius: "10px",
    py: 2,
    px: 3,
    mb: 3,
    textAlign: "center",
  }}
>
  <Typography fontWeight="bold" mb={1}>
    Upload Image
  </Typography>

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

  {/* Preview if image exists */}
    {image && (
        <Box mt={2}>
        <img
            src={image}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: 200, borderRadius: "8px" }}
        />
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
            Post
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreatePostModal;
