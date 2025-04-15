import React from "react";
import { Box, Typography } from "@mui/material";

function HelpPage() {
  return (
    <Box sx={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Help & Support
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Welcome to the Help page! Here you’ll find answers to common questions and support options. 
        If you need further assistance, please contact our support team at support@local-lense.com.
      </Typography>
    </Box>
  );
}

export default HelpPage;
