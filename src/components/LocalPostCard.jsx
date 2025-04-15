import React, { useState, useEffect } from "react";
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
import {
  addDoc,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { updateDoc, doc, increment, getDoc } from "firebase/firestore";

function LocalPostCard({
  post,
  canEdit,
  onToggleLike,
  isLiked,
  onDelete,
  onEdit,
  onSaveToggle,
  isSaved,
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);

  const currentUser = auth.currentUser;

  const fetchComments = async () => {
    try {
      const q = query(
        collection(db, "posts", post.id, "comments"),
        orderBy("timestamp", "asc")
      );
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((doc) => doc.data());
      setComments(fetched);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    if (showComments && post.id) fetchComments();
  }, [showComments, post.id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
  
    try {
      // Get full user data from Firestore
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
  
      const comment = {
        text: newComment,
        username: userData?.username || currentUser.displayName || currentUser.email,
        timestamp: new Date(),
      };
  
      await addDoc(collection(db, "posts", post.id, "comments"), comment);
      await updateDoc(doc(db, "posts", post.id), {
        commentCount: increment(1),
      });
  
      // Update UI
      post.commentCount = (post.commentCount || 0) + 1;
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };
  
  
  
  

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          padding: "20px",
          borderBottom: "1px solid #eee",
          width: "100%",
          maxWidth: "750px",
        }}
      >
        {/* Top Row: Avatar, Author, Verified, Date, Category */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Avatar
            src={post.avatar}
            alt={post.author}
            sx={{
              width: 45,
              height: 45,
              fontSize: "1rem",
              bgcolor: "#1e3a8a",
            }}
          />

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                fontWeight="bold"
                fontSize="16px"
                color="text.primary"
              >
                {post.author}
              </Typography>

              {post.verified && (
                <Box
                  component="span"
                  sx={{
                    backgroundColor: "#1DA1F2",
                    color: "white",
                    borderRadius: "999px",
                    padding: "1px 5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  ✓
                </Box>
              )}

              <Typography fontSize="14px" color="text.secondary">
                · {post.date}
              </Typography>
            </Box>

            {/* Post category */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  color: "#555",
                  fontStyle: "italic",
                  marginRight: "6px",
                }}
              >
                Post category:
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#7b4b28",
                  color: "white",
                  px: 1,
                  py: 0.3,
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {post.category}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ fontWeight: 500, mt: 0, mb: 0.5, color: "gray" }}
        >
          {post.title}
        </Typography>

        {/* Content */}
        <Typography variant="body1" sx={{ fontSize: "15.5px", lineHeight: 1.6 }}>
          {showFullContent
            ? post.content
            : post.content.length > 220
            ? `${post.content.slice(0, 220)}...`
            : post.content}
        </Typography>

        {/* Show more / less */}
        {post.content.length > 180 && !canEdit && (
          <Button
            onClick={() => setShowFullContent((prev) => !prev)}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: "medium",
              color: "#1a73e8",
              mt: 0,
              px: 0,
              minWidth: "unset",
            }}
          >
            {showFullContent ? "Show less" : "Show more"}
          </Button>
        )}

        {/* Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        )}

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          {canEdit ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button size="small" onClick={onEdit}>
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this post?")
                  ) {
                    onDelete();
                  }
                }}
              >
                Delete
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                <Tooltip title="Like">
                  <Box
                    onClick={onToggleLike}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                      color: isLiked ? "red" : "inherit",
                    }}
                  >
                    <FavoriteBorderIcon
                      fontSize="small"
                      color={isLiked ? "error" : "inherit"}
                    />
                    <Typography variant="body2">{post.likes}</Typography>
                  </Box>
                </Tooltip>

                <Tooltip title="Comment">
                  <Box
                    onClick={() => setShowComments((prev) => !prev)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <Typography variant="body2">{post.commentCount || 0}</Typography>
                  </Box>
                </Tooltip>
              </Box>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Tooltip title={isSaved ? "Unsave" : "Save"}>
                  <IconButton onClick={onSaveToggle} size="small">
                    <BookmarkBorderIcon
                      fontSize="small"
                      color={isSaved ? "primary" : "inherit"}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Share">
                  <IconButton size="small">
                    <ShareOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Box>

        {/* Comments Section */}
        {showComments && (
          <Box sx={{ mt: 2 }}>
            <Box className="flex space-x-2 items-center">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-grow border border-gray-300 rounded px-3 py-1 text-sm"
              />
              <Button size="small" onClick={handleAddComment} variant="contained">
                Post
              </Button>
            </Box>

            <Box sx={{ mt: 1, maxHeight: "150px", overflowY: "auto" }}>
              {comments.map((comment, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    mt: 0.5,
                    background: "#f1f1f1",
                    padding: "6px 10px",
                    borderRadius: "6px",
                  }}
                >
                  <strong>{comment.username}</strong>: {comment.text}{" "}
                  <span style={{ color: "#888", fontSize: "11px" }}>
                    · {new Date(comment.timestamp?.toDate?.() || comment.timestamp).toLocaleString()}
                  </span>
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default LocalPostCard;
