import React from 'react';
import LoginForm from '../components/LoginForm';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import styles from './AuthPage.module.css';

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
    <div className={styles.authPage}>
      <div className={styles.card}>
        <h1 className={styles.title}>Ready to Level Up?</h1>
        <LoginForm onGoogleLogin={handleGoogleLogin} />
      </div>
    </div>
  );
}