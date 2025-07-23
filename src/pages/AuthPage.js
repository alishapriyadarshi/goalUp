import React from 'react';
import LoginForm from '../components/LoginForm';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';


const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export default function AuthPage() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Login error', err);
    }
  };

  return (
    <div className="auth-page">
      <h1>Please Sign In</h1>
      <LoginForm onGoogleLogin={handleGoogleLogin} />
    </div>
  );
}