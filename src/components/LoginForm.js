import React from 'react';
import styles from './LoginForm.module.css';
import { auth, provider, signInWithPopup } from '../firebase';

export default function LoginForm({ onGoogleLogin }) {
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      onGoogleLogin(user);
    } catch (error) {
      console.error('Google Sign-in failed', error);
      alert('Login failed. Try again.');
    }
  };

  return (
    <div className={styles.container}>
    <h1
  className={styles.title}
  data-text="Login to GoalUp"
>
  Login to GoalUp
</h1>
      <button
        className={styles.googleButton}
        onClick={handleGoogleSignIn}
      >
        {/* inline Google “G” */}
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 533.5 544.3"
        >
          <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34-4.7-50.2H272v95h146.9c-6.3 34-25 62.8-53.4 82v68h86.3c50.4-46.5 79.7-115 79.7-195.8z"/>
          <path fill="#34A853" d="M272 544.3c72.6 0 133.7-24 178.2-65.1l-86.3-68c-24 16-54.6 25-91.9 25-70.6 0-130.4-47.6-151.8-111.4H32.7v69.8C77.1 487 168 544.3 272 544.3z"/>
          <path fill="#FBBC05" d="M120.2 324.8c-11.2-33.5-11.2-69.7 0-103.2V151.8H32.7c-42.9 85.7-42.9 187.3 0 273l87.5-69.9z"/>
          <path fill="#EA4335" d="M272 107.7c39.6-.6 77.6 14.4 106.5 41.6l79.6-79.6C406 24.9 343.8-.5 272 0 168 0 77.1 57.3 32.7 151.8l87.5 69.8C141.6 155.3 201.4 107.7 272 107.7z"/>
        </svg>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}