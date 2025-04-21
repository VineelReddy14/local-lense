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
    fetch("/data/News_data.json")
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.error("Error fetching news data:", error));
  }, []);

  const filteredNews = selectedCategory === "ALL"
    ? newsData
    : newsData.filter((article) => article.category === selectedCategory);

  return (
    <>
      <Navbar />
      <Filterbar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <Box
        sx={{
          marginTop: { xs: "130px", sm: "130px", md: "110px" }, // Navbar + Filterbar
          paddingX: { xs: "10px", sm: "20px", md: "40px" },
          paddingBottom: "30px",
          backgroundColor: "#efefef",
          minHeight: "100vh",
        }}
      >
        {filteredNews.map((article) => (
          <Link
            to={`/news/${article.id}`}
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
    </>
  );
}

export default HomePage;