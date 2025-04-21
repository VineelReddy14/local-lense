import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from "../assets/logo.png";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px'
});

export default function PostCard({ image, category, title, brief_content, author, date }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        marginBottom: 2, // 🔧 Reduced from 3 to 2
        maxWidth: 1100,
        width: "100%",
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
        borderRadius: "10px"
      }}
    >
      <Grid
        container
        spacing={2}
        direction={isSmallScreen ? "column" : "row"}
        alignItems="center"
      >
        {/* Image Section */}
        <Grid item xs={12} sm={4} md={3}>
          <ButtonBase sx={{ width: "100%", height: isSmallScreen ? 180 : 150 }}>
            <Img alt="news-thumbnail" src={image || logo} />
          </ButtonBase>
        </Grid>

        {/* Content Section */}
        <Grid item xs={12} sm={8} md={9} container>
          <Grid item xs={12} container direction="column" spacing={1}>
            <Grid item>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Topic: {category}
              </Typography>

              <Typography variant="h6" fontWeight="bold">
                {title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'black',
                  textAlign: 'justify'
                }}
              >
                {brief_content}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary'
                }}
              >
                {author} | {date}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
