// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>AIMoney</title>
          <meta name="description" content="Your go-to app for financial data" />
        </head>
        <body className={inter.className}>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Box flexGrow={1}>
              {children}
            </Box>
            <Footer />
          </Box>
        </body>
      </html>
    </ClerkProvider>
  );
}
