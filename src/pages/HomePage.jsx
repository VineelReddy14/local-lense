import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Filterbar from "../components/Filterbar"; // Import the Filterbar component
import PostCard from "../components/PostCard";
import { Box, Typography } from "@mui/material"; // Import Typography for the heading
import newsData from "../data/News_data.json";

function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState("ALL");

    // Filter the news data based on the selected category
    const filteredNews = selectedCategory === "ALL"
        ? newsData
        : newsData.filter((article) => article.category === selectedCategory);

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", backgroundColor: "#efefef", minHeight: "100vh" }}>
                {/* Add the Filterbar on the left */}
                <Box
                    sx={{
                        position: "fixed", // Make the Filterbar fixed
                        top: "40px", // Adjust based on Navbar height
                        left: 0,
                        width: "250px",
                        height: "calc(100vh - 70px)", // Full height minus Navbar height
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
                {/* Main content area */}
                <Box
                    sx={{
                        marginLeft: "250px", // Add margin to account for the fixed Filterbar
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px",
                        paddingTop: { xs: "20px", sm: "70px", md: "70px" },
                    }}
                >
                    {/* Heading for the selected category */}
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
                        <PostCard
                            key={article.id}
                            image={`src/data/News_Images/${article.id}.jpeg`} // Use article.id for the image path
                            category={article.category}
                            title={article.title}
                            brief_content={article.brief_content}
                            author={article.author}
                            date={article.date}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default HomePage;
