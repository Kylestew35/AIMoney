// app/login.js
import { SignIn } from '@clerk/clerk-react';

export default function Login() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
      <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
  );
}
