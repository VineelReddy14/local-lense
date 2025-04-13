import React from "react";
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
function LocalPostCard({ post, canEdit , onDelete, onEdit}) {
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
              <Box className="flex items-center space-x-1 text-sm">
                <FavoriteBorderIcon fontSize="small" />
                <span>{post.likes >= 1000000 ? `${(post.likes / 1000000).toFixed(1)}m` : post.likes}</span>
              </Box>
            </Tooltip>
            <Tooltip title="Comment">
              <Box className="flex items-center space-x-1 text-sm">
                <ChatBubbleOutlineIcon fontSize="small" />
                <span>{post.comments}</span>
              </Box>
            </Tooltip>
            <Tooltip title="Save">
                <IconButton>
                <BookmarkBorderIcon fontSize="small" />
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
    </Box>
  );
}

export default LocalPostCard;
