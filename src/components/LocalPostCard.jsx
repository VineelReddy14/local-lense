import React, { useState } from "react";

import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

/**
 * A post card used to display news feed or user posts.
 * Props:
 * - post: { title, category, content, image(s), author, date, likes, comments }
 * - canEdit: boolean (if true, show Edit/Delete instead of Like/Comment/Share)
 */
function LocalPostCard({ post, canEdit , onToggleLike, isLiked, onDelete, onEdit, 
                         onSaveToggle, isSaved, comments, onAddComment}) {

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  return (
    <Box sx={{ padding: "20px", borderBottom: "1px solid #eee" }}>
      {/* Top section: Author info and bookmark */}
      <Box className="flex justify-between items-start">
        <Box className="flex items-center space-x-2">
          <Avatar src={post.avatar} alt={post.author} />
          <Box>
            <Typography fontWeight="bold">
              {post.author}
              {post.verified && (
                <span className="text-blue-500 ml-1">✔️</span>
              )}
              <span className="text-gray-500 font-normal ml-2 text-sm">· {post.date}</span>
            </Typography>
            <Typography variant="body2" className="italic text-sm">
              Post category:{" "}
              <span className="bg-gray-300 text-black px-2 rounded">
                {post.category}
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Title */}
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ fontWeight: "500", marginTop: "10px" }}
      >
        {post.title}
      </Typography>

      {/* Content */}
      <Typography variant="body1" sx={{ marginY: "10px" }}>
        {post.content}
      </Typography>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px" }}
        />
      )}

      {/* Buttons */}
      <Box sx={{ marginTop: "10px", display: "flex", gap: 2, alignItems: "center" }}>
        {canEdit ? (
          <>
            <Button size="small" onClick={onEdit} >
              Edit
            </Button>
            
            <Button
            size="small"
            color="error"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this post?")) {
                onDelete();
              }
            }}
          >
            Delete
          </Button>

          </>
        ) : (
          <>
            <Tooltip title="Like">
              <Box
                onClick={onToggleLike}
                className="flex items-center space-x-1 text-sm cursor-pointer"
                sx={{ color: isLiked ? "red" : "inherit" }}
              >
                <FavoriteBorderIcon
                  fontSize="small"
                  color={isLiked ? "error" : "inherit"}
                />
                <span>{post.likes}</span>
              </Box>
            </Tooltip>

            <Tooltip title="Comment">
              <Box
                onClick={() => setShowComments((prev) => !prev)}
                className="flex items-center space-x-1 text-sm cursor-pointer"
              >
                <ChatBubbleOutlineIcon fontSize="small" />
                <span>{comments.length}</span>
              </Box>
            </Tooltip>

            <Tooltip title={isSaved ? "Unsave" : "Save"}>
              <IconButton onClick={onSaveToggle}>
                {isSaved ? (
                  <BookmarkBorderIcon color="primary" />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Share">
              <IconButton>
                <ShareOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>

      {showComments && (
  <Box sx={{ mt: 2 }}>
    {/* Write a new comment */}
    <Box className="flex space-x-2 items-center">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-grow border border-gray-300 rounded px-3 py-1 text-sm"
      />
      <Button
        size="small"
        onClick={() => {
          onAddComment(newComment);
          setNewComment("");
        }}
        variant="contained"
      >
        Post
      </Button>
    </Box>

    {/* Display existing comments */}
    <Box sx={{ mt: 1, maxHeight: "150px", overflowY: "auto" }}>
      {comments.map((comment, index) => (
        <Typography
          key={index}
          variant="body2"
          sx={{ mt: 0.5, background: "#f1f1f1", padding: "6px 10px", borderRadius: "6px" }}
        >
          • {comment}
        </Typography>
      ))}
    </Box>
  </Box>
)}
    </Box>
  );
}

export default LocalPostCard;
