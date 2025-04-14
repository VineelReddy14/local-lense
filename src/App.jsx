import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NewsDetails from "./pages/NewsDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/local-posts" element={<PostPage />} />
        <Route path="/news/:id" element={<NewsDetails />} /> {/* Route for NewsDetails */}
      </Routes>
    </Router>
  );
}

export default App;
