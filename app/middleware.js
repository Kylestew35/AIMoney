// src/middleware.js (or app/middleware.js)
import { withClerkMiddleware } from '@clerk/nextjs/server';

export default withClerkMiddleware((req, res, next) => {
  // Custom middleware logic can go here
  next();
});

// This is a workaround for Next.js middleware to work with Clerk
export const config = {
  matcher: ['/dashboard', '/profile', '/api/(.*)'], // Add the routes you want to protect
};

