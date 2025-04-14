import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, IconButton } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";

function NewsDetails() {
    const { id } = useParams(); // Get the news ID from the URL
    const location = useLocation(); // Access the state passed via Link
    const navigate = useNavigate(); // Hook to navigate programmatically
    const articleId = location.state?.id || id; // Use state ID or fallback to URL ID

    const [newsArticle, setNewsArticle] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false); // State for bookmark toggle

    useEffect(() => {
        // Fetch the JSON file from the public folder
        fetch("/data/News_data.json")
            .then((response) => response.json())
            .then((data) => {
                const article = data.find((article) => article.id === parseInt(articleId));
                setNewsArticle(article);
            })
            .catch((error) => console.error("Error fetching news data:", error));
    }, [articleId]);

    if (!newsArticle) {
        return <Typography variant="h5">Loading...</Typography>;
    }

    // Dynamically construct the image path
    const imagePath = `/data/News_Images/${articleId}.jpeg`;

    return (
        <Box sx={{ padding: "20px" }}>
            {/* Back Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                sx={{
                    position: "fixed",
                    top: "20px",
                    left: "20px",
                    zIndex: 1000,
                }}
            >
                Back
            </Button>

            {/* Bookmark Icon */}
            <IconButton
                onClick={() => setIsBookmarked(!isBookmarked)} // Toggle bookmark state
                sx={{
                    position: "fixed",
                    top: "10px",
                    right: "20px",
                    zIndex: 1000,
                }}
                aria-label="Bookmark this article"
            >
                save {isBookmarked ? (
                    <BookmarkOutlinedIcon sx={{ color: "black", fontSize: "2rem" }} />
                ) : (
                    <BookmarkBorderOutlinedIcon sx={{ color: "black", fontSize: "2rem" }} />
                )}
            </IconButton>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    marginBottom: "20px",
                    textAlign: "center",
                }}
            >
                {newsArticle.title}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    marginBottom: "10px",
                    textAlign: "center",
                    color: 'text.secondary'
                }}
            >
                Topic: {newsArticle.category} | By '{newsArticle.author}' | {newsArticle.date}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    marginBottom: "20px",
                    paddingLeft: "70px",
                    paddingRight: "70px",
                    textAlign: "justify",
                }}
            >
                {newsArticle.brief_content}
            </Typography>
            {/* Use the dynamically constructed image path */}
            <img
                src={imagePath}
                alt={newsArticle.title}
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "350px",
                    display: "block",
                    margin: "0 auto",
                }}
            />
            <Typography
                variant="body1"
                sx={{
                    marginTop: "20px",
                    textAlign: "justify",
                    paddingLeft: "70px",
                    paddingRight: "90px",
                }}
            >
                {newsArticle.details}
            </Typography>
        </Box>
    );
}

export default NewsDetails;