import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard"; // Import the PostCard component
import { Box } from "@mui/material";
import newsData from "../data/News_data.json"; // Import the JSON data

function HomePage() {
    return (
        <>
            <Navbar />
            <Box
                sx={{ backgroundColor: '#efefef', minHeight: '100vh', display: 'flex', flexDirection: 'column', marginLeft: '-10px', marginRight: '-10px' }} // Set background color to gray, ensure full height, and set left and right margins to 0px
            >
                <Box
                    paddingTop={{ xs: "20px", sm: "70px", md: "70px" }}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    {newsData.map((article, index) => (
                        <PostCard
                            key={article.id}
                            image={`src/data/News_Images/${index + 1}.jpeg`} // Add image path
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
