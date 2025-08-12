import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);


export default function App() {
  const [user, setUser] = React.useState(null);
  

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, u => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/login"
          element={!user ? <AuthPage /> : <Navigate to="/" replace />}  
        />
        <Route
          path="/"
          element={user ? <HomePage user={user} /> : <Navigate to="/login" replace />}  
        />
      </Routes>
    </Router>
  );
}

