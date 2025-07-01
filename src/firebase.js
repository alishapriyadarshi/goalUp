// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-oyA_j7AA8uihmz7hLG7-fAIT06efDgU",
  authDomain: "mygoalhub.firebaseapp.com",
  projectId: "mygoalhub",
  storageBucket: "mygoalhub.firebasestorage.app",
  messagingSenderId: "206681857908",
  appId: "1:206681857908:web:164977079f64d316759621",
  measurementId: "G-SGHGYXKEYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, db , app};