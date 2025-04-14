import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Filterbar from "../components/Filterbar";
import PostCard from "../components/PostCard";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        // Fetch the JSON file from the public folder
        fetch("/data/News_data.json")
            .then((response) => response.json())
            .then((data) => setNewsData(data))
            .catch((error) => console.error("Error fetching news data:", error));
    }, []);

    // Filter the news data based on the selected category
    const filteredNews = selectedCategory === "ALL"
        ? newsData
        : newsData.filter((article) => article.category === selectedCategory);

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", backgroundColor: "#efefef", minHeight: "100vh" }}>
                <Box
                    sx={{
                        position: "fixed",
                        top: "40px",
                        left: 0,
                        width: "250px",
                        height: "calc(100vh - 70px)",
                        backgroundColor: "#f5f5f5",
                        borderRight: "1px solid #ddd",
                        padding: "20px",
                    }}
                >
                    <Filterbar
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                </Box>
                <Box
                    sx={{
                        marginLeft: "250px",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px",
                        paddingTop: { xs: "20px", sm: "70px", md: "70px" },
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            marginBottom: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "black",
                        }}
                    >
                        {selectedCategory === "ALL" ? "All Categories" : selectedCategory}
                    </Typography>
                    {filteredNews.map((article) => (
                        <Link
                            to={{
                                pathname: `/news/${article.id}`,
                                state: { id: article.id }, // Pass the article ID correctly
                            }}
                            key={article.id}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <PostCard
                                image={`/data/News_Images/${article.id}.jpeg`}
                                category={article.category}
                                title={article.title}
                                brief_content={article.brief_content}
                                author={article.author}
                                date={article.date}
                            />
                        </Link>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default HomePage;
