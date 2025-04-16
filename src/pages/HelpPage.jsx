import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box,
  Divider,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Navbar from "../components/Navbar";

const HelpPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      < Navbar />
      {/* Help Section Content */}
      <Box sx={{ mt: 10, px: 3, display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 800,
            border: "1px solid #ccc",
            borderRadius: 1,
            backgroundColor: "#fff",
            boxShadow: 1,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Help
            </Typography>
            <Tooltip title="Information about navigating the site">
              <InfoOutlinedIcon fontSize="small" />
            </Tooltip>
          </Box>

          {/* Help Sections */}
          <Box sx={{ px: 3, py: 2 }}>
            {/* News Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                News
              </Typography>
              <Typography variant="body2">
                This page has a list of news articles on different topics. You
                can scroll down to see more articles as you go. Each article has
                a short summary to give you an idea of what it’s about. If you
                want to read the full story, just click on the article. Stay
                updated with the latest news and interesting stories!
              </Typography>
            </Box>

            <Divider />

            {/* Local Posts Section */}
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Local Posts
              </Typography>
              <Typography variant="body2">
                This page has two components, “feed” and “your posts”. In the
                feed page, you can view others’ posts, like, share, comment and
                share the posts. In the “your posts” section, you can see the
                posts you uploaded and you also have the option to upload a new
                post. Just click on the “create a post” button to do so. You
                will have the chance to edit and delete your own post as well.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HelpPage;