import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Default image

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px'
});

export default function PostCard({ image, category, title, brief_content, author, date }) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 1100,
        minHeight: 150, // Increased Height
        width: "100%", // Allows it to take full width of container
        flexGrow: 1,
        backgroundColor: '#fff',
        border: '1px solid #ddd'
      }}
    >
      <Grid container spacing={2}>
        {/* Image Section */}
        <Grid item>
          <ButtonBase sx={{ width: 200, height: 150 }}>
            <Img alt="news-thumbnail" src={image || logo} />
          </ButtonBase>
        </Grid>

        {/* Content Section */}
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              {/* Category */}
              <Typography variant="caption" color="text.secondary" fontWeight="bold" textTransform="uppercase">
                Topic: {category}
              </Typography>

              {/* Title */}
              <Typography variant="h6" fontWeight="bold">
                {title}
              </Typography>

              {/* Content Brief */}
              <Typography variant="body2" color="black.secondary">
                {brief_content}
              </Typography>
            </Grid>

            {/* Author & Date */}
            <Grid item>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {author} | {date}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
