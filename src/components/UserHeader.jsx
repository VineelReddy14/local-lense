import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


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

<Box sx={{ display: "flex", gap: 4, mt: 1, fontSize: "15px" }}>
  {[
    { label: "posts", value: postCount },
    { label: "followers", value: followers },
    { label: "following", value: following },
  ].map((stat, i) => (
    <Box key={i}>
      <Typography component="span" fontWeight="bold" color="text.primary">
        {stat.value.toLocaleString()}
      </Typography>{" "}
      <Typography component="span" color="text.secondary">
        {stat.label}
      </Typography>
    </Box>
  ))}
</Box>


      </Box>

      {/* Right: Create Post Button */}
      <Button
        onClick={onCreatePostClick} // trigger modal
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
