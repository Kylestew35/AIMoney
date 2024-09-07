// app/signup.js
import { SignUp } from '@clerk/clerk-react';

export default function Signup() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
      <SignUp path="/signup" routing="path" signInUrl="/login" />
    </div>
  );
}
