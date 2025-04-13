import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import SavedPosts from "./pages/SavedPosts";
import useSavedPosts from "./hooks/useSavedPosts"; 

function App() {
  const { savedPosts, toggleSave } = useSavedPosts();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/local-posts"
          element={<PostPage savedPosts={savedPosts} onToggleSave={toggleSave} />}
        />
        <Route
          path="/saved"
          element={<SavedPosts savedPosts={savedPosts} onToggleSave={toggleSave} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
