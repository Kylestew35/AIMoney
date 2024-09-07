import { Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box
      width="100%"
      bgcolor="gold"
      color="black"
      p={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="body1">
        © 2024 AIMoney. All rights reserved.
      </Typography>
    </Box>
  )
}
