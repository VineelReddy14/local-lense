import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/**
 * User profile info with "Create a post" button.
 * Props:
 * - name: string
 * - postCount: number
 * - followers: number
 * - following: number
 * - onCreatePostClick: function (to trigger modal)
 */
function UserHeader({ name, postCount, followers, following, onCreatePostClick }) {
  return (
    <Box
      className="flex justify-between items-center w-full border-b border-gray-300"
      sx={{
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {/* Left: Avatar + Stats */}
      <Box className="flex items-center space-x-4">
        <Avatar
          sx={{ width: 60, height: 60 }}
          alt={name}
          src="/default-avatar.png"
        />
        <Box>
          <Typography fontWeight="bold">{name}</Typography>
          <Typography component="span">
            <strong>{postCount}</strong> Posts{" "}
            <strong>{followers}</strong> Followers{" "}
            <strong>{following}</strong> Following
          </Typography>
        </Box>
      </Box>

      {/* Right: Create Post Button */}
      <Button
        onClick={onCreatePostClick} // 💥 trigger modal
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          fontWeight: "bold",
          borderRadius: "10px",
          marginTop: { xs: "12px", sm: "0" },
        }}
      >
        Create a post
      </Button>
    </Box>
  );
}

export default UserHeader;
