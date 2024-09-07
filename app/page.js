'use client'
import { Box, Button, Typography, Link } from '@mui/material';

export default function Home() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: '', // Add your background image path here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'black',
      }}
    >
      <Box
        position="absolute"
        top={100}
        left={16}
        right={16}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          '@media (max-width: 600px)': {
            alignItems: 'flex-start',
            right: 16,
          },
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: 'gold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          WELCOME TO AIMONEY - YOUR AI-DRIVEN FINANCIAL ADVISOR!
        </Typography>
        <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4, color: 'gold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          Imagine having access to real-time financial insights, personalized investment advice, and market trends, all at your fingertips. AIMoney leverages advanced AI technology to provide you with tailored financial recommendations, helping you make smarter investment decisions effortlessly. Whether you are looking to grow your portfolio, manage your assets, or stay updated with the latest market news, AIMoney is here to guide you every step of the way.
        </Typography>
        <Button href="" variant="contained" sx={{ mt: 2, mb: 4, bgcolor: 'gold', color: 'black' }}>
          GET STARTED
        </Button>
        <Typography variant="h3" align="center" sx={{ mt: 2, color: 'gold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          Discover the power of AI-driven financial insights with AIMoney!
        </Typography>
      </Box>
    </Box>
  );
}
