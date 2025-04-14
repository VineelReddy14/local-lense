import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function NewsDetails() {
    const { id } = useParams(); // Get the news ID from the URL
    const location = useLocation(); // Access the state passed via Link
    const articleId = location.state?.id || id; // Use state ID or fallback to URL ID

    const [newsArticle, setNewsArticle] = useState(null);

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
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
                {newsArticle.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
                {newsArticle.category} | {newsArticle.author} | {newsArticle.date}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                {newsArticle.brief_content}
            </Typography>
            {/* Use the dynamically constructed image path */}
            <img
                src={imagePath}
                alt={newsArticle.title}
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    borderRadius: "10px",
                    display: "block",
                    margin: "0 auto",
                }}
            />
            <Typography variant="body1" sx={{ marginTop: "20px" }}>
                {newsArticle.details}
            </Typography>
        </Box>
    );
}

export default NewsDetails;