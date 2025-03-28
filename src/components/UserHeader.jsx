import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/**
 * Displays the user's profile header with avatar, name, stats, and "Create a post" button.
 * Props:
 * - name: string
 * - postCount: number
 * - followers: number
 * - following: number
 */
function UserHeader({ name, postCount, followers, following }) {
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
      {/* Left side: Avatar + Name + Stats */}
      <Box className="flex items-center space-x-4">
        <Avatar
          sx={{ width: 60, height: 60 }}
          alt={name}
          src="/default-avatar.png" // Use a real image path if needed
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

      {/* Right side: Create a Post button */}
      <Button
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
