// app/_app.js
import { ClerkProvider } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ClerkProvider publishableKey={clerkFrontendApi} navigate={(to) => router.push(to)}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
