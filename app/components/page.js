import { Box, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: 'lightblue', // You can use the light blue background image here if you prefer
      }}
    >
      <Typography variant="h1" align="center" sx={{ fontWeight: 'bold' }}>
        Coming Soon!
      </Typography>
    </Box>
  );
}
