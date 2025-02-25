import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard"; // Import the PostCard component
import { Box } from "@mui/material";

function HomePage() {
    const articles = [
        {
            id: 1,
            category: "Politics",
            title: "Oklahoma Legislature Approves New Budget Plan",
            brief_content: "The Oklahoma Legislature has passed a new budget plan, focusing on education and infrastructure improvements.",
            author: "John Carter",
            date: "2025-02-24"
        },
        {
            id: 2,
            category: "Weather",
            title: "Severe Storms Expected Across Oklahoma This Week",
            brief_content: "Meteorologists warn of heavy storms and possible tornado activity in central Oklahoma.",
            author: "Sarah Anderson",
            date: "2025-02-23"
        }
    ];
    return (
        <>
            <Navbar />
            <Box paddingTop={{ xs: "20px", sm: "70px", md: "70px" }} marginLeft="20px" marginRight="20px">
                {articles.map(article => (
                    <PostCard
                        key={article.id}
                        category={article.category}
                        title={article.title}
                        brief_content={article.brief_content}
                        author={article.author}
                        date={article.date}
                    />
                ))}
            </Box>
        </>
    );
}

export default HomePage;
