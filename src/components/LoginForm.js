// components/LoginForm.js
import { auth, provider, signInWithPopup } from "../firebase";

function LoginForm({ onGoogleLogin }) {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onGoogleLogin(user); // Pass user to parent
    } catch (error) {
      console.error("Google Sign-in failed", error);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="signin-page">
      <h1>Login to My Goal Hub</h1>
      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginForm;
