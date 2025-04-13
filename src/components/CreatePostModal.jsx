import React from "react";
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

function CreatePostModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Create A Post
        </Typography>

        {/* Post Category */}
        <Typography fontWeight="500" mb={0.5}>Post category:</Typography>
        <TextField
          fullWidth
          select
          defaultValue="General"
          size="small"
          sx={{ mb: 2 }}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Caption */}
        <Typography fontWeight="500" mb={0.5}>Caption:</Typography>
        <TextField fullWidth size="small" sx={{ mb: 2 }} />

        {/* Description */}
        <Typography fontWeight="500" mb={0.5}>Description:</Typography>
        <TextField fullWidth multiline rows={4} sx={{ mb: 2 }} />

        {/* Upload area */}
        <Box
          sx={{
            textAlign: "center",
            border: "2px dashed #ccc",
            borderRadius: "10px",
            py: 4,
            mb: 3,
            cursor: "pointer",
          }}
        >
          <UploadIcon sx={{ fontSize: 40, color: "#888" }} />
          <Typography mt={1}>Upload image</Typography>
        </Box>

        {/* Submit */}
        <Box sx={{ textAlign: "right" }}>
          <Button
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
