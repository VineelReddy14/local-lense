import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Navbar from "../components/Navbar";

function NewsDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const articleId = location.state?.id || id;

  const [newsArticle, setNewsArticle] = useState(null);

  useEffect(() => {
    fetch("/data/News_data.json")
      .then((response) => response.json())
      .then((data) => {
        const article = data.find((a) => a.id === parseInt(articleId));
        setNewsArticle(article);
      })
      .catch((error) => console.error("Error fetching news data:", error));
  }, [articleId]);

  if (!newsArticle) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  const imagePath = `/data/News_Images/${articleId}.jpeg`;

  return (
    <>
      <Navbar />

      {/* Fixed Back Button at top-left below navbar */}
      <Box
        sx={{
          position: "fixed",
          top: "70px", // slightly below navbar
          left: "20px",
          zIndex: 1200,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>

      {/* Main Content Container */}
      <Box
        sx={{
          backgroundColor: "#efefef",
          minHeight: "100vh",
          paddingTop: "110px", // leave space for navbar + back button
          paddingBottom: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: {
              xs: "95%",
              sm: "90%",
              md: "85%",
              lg: "75%",
              xl: "65%",
            },
            maxWidth: "1200px",
            backgroundColor: "#fff",
            boxShadow: 2,
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
            >
              {newsArticle.title}
            </Typography>

            <Typography
              variant="subtitle2"
              textAlign="center"
              color="text.secondary"
              mb={2}
            >
              Topic: {newsArticle.category} | By {newsArticle.author} | {newsArticle.date}
            </Typography>

            <Typography
              variant="body1"
              textAlign="justify"
              sx={{ mb: 2, px: { xs: 1, sm: 3, md: 5 } }}
            >
              {newsArticle.brief_content}
            </Typography>

            <CardMedia
              component="img"
              image={imagePath}
              alt={newsArticle.title}
              sx={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "8px",
                margin: "0 auto",
                mb: 3,
              }}
            />

            <Typography
              variant="body1"
              textAlign="justify"
              sx={{ px: { xs: 1, sm: 3, md: 5 } }}
            >
              {newsArticle.details}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default NewsDetails;