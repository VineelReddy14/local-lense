import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Navbar from "../components/Navbar";

const HelpPage = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [helpContent, setHelpContent] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState({});

  useEffect(() => {
    fetch("/data/FAQs.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error("Failed to load FAQs:", err));

    fetch("/data/HelpContent.json")
      .then((res) => res.json())
      .then((data) => setHelpContent(data))
      .catch((err) => console.error("Failed to load Help content:", err));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleTopicToggle = (sectionIndex, topicIndex) => {
    const key = `${sectionIndex}-${topicIndex}`;
    setExpandedTopics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      <Navbar />

      <Box sx={{ mt: 10, px: 3, display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 800,
            border: "1px solid #ccc",
            borderRadius: 1,
            backgroundColor: "#fff",
            boxShadow: 1,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Help
            </Typography>
            <Tooltip title="Information about navigating the site">
              <InfoOutlinedIcon fontSize="small" />
            </Tooltip>
          </Box>

          {/* Tabs */}
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Help Info" />
            <Tab label="FAQs" />
          </Tabs>

          {/* Tab Panels */}
          <Box sx={{ px: 3, py: 2 }}>
            {tabIndex === 0 && (
              <Box>
                {helpContent.map((section, sectionIndex) => (
                  <Box key={sectionIndex} sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {section.section}
                    </Typography>
                    {section.topics.map((topic, topicIndex) => {
                      const key = `${sectionIndex}-${topicIndex}`;
                      const isExpanded = expandedTopics[key] || false;
                      return (
                        <Box key={topicIndex} sx={{ mb: 2 }}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            sx={{ cursor: "pointer", color: "#1976d2" }}
                            onClick={() => handleTopicToggle(sectionIndex, topicIndex)}
                          >
                            {topic.heading}
                          </Typography>
                          {isExpanded && (
                            <Typography variant="body2" sx={{ ml: 2, mt: 0.5 }}>
                              {topic.body}
                            </Typography>
                          )}
                        </Box>
                      );
                    })}
                    {sectionIndex !== helpContent.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
              </Box>
            )}

            {tabIndex === 1 && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Frequently Asked Questions
                </Typography>
                {faqs.map((faq, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="body1" fontWeight="bold">
                      Q{index + 1}: {faq.question}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      {faq.answer}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HelpPage;