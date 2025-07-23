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
    <Router>
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



// import './App.css';
// import { useState , useEffect} from 'react';
// import GoalDialog from './components/GoalDialog';
// import GoalList from './components/GoalList';
// import LoginForm from './components/LoginForm';
// import { db, app} from './firebase';
// import { collection, addDoc,  onSnapshot, query, where } from 'firebase/firestore';
// import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// const auth = getAuth(app);


// function App() {
//   const [showDialog, setShowDialog] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [goals, setGoals] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//  const filteredGoals = goals.filter((goal) =>
//   (goal.title && goal.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
//   (goal.description && goal.description.toLowerCase().includes(searchQuery.toLowerCase()))
// );

// const onProgressGoals = filteredGoals.filter((goal) => !goal.completed);
// const doneGoals = filteredGoals.filter((goal) => goal.completed);
// const [showOnProgress, setShowOnProgress] = useState(false);
// const [showDoneGoals, setShowDoneGoals] = useState(false);



//   // const [isSignedIn, setIsSignedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dialogColor, setDialogColor] = useState('#222831'); // default dark color
//   const [dateTime, setDateTime] = useState('');
//   const [selectedGoal, setSelectedGoal] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [newDateTime, setNewDateTime] = useState('');
//   const [editingGoal, setEditingGoal] = useState(null);
  

//   const handleSubmit = async () => {
//   if (!title.trim() || !description.trim() || !dateTime) {
//     alert('Please fill in all fields.');
//     return;
//   }

  



//   const goalData = {
//     title,
//     description,
//     completed: editingGoal?.completed || false,
//     userId: user.uid,
//     color: dialogColor,
//     dateTime,
//   };

//   try {
//     if (editingGoal) {
//       // Update existing
//       const docRef = doc(db, 'goals', editingGoal.id);
//       await updateDoc(docRef, goalData);
//       console.log("Goal updated successfully:", docRef.id);
//     } else {
//       // Add new
//       await addDoc(collection(db, 'goals'), goalData);
//             console.log("Goal added successfully");
//     }

//     // Reset
//     setTitle('');
//     setDescription('');
//     setDateTime('');
//     setDialogColor('#000'); // or any default
//     setEditingGoal(null);
//     setShowDialog(false);
//   } catch (error) {
//     console.error("Error saving goal:", error);
//   }
// };


//   const toggleComplete = async (goal) => {
//   try {
//     const goalRef = doc(db, 'goals', goal.id);
//     await updateDoc(goalRef, {
//       completed: !goal.completed,
//     });
//   } catch (error) {
//     console.error("Error updating goal status:", error);
//   }
// };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser);
//     });
//     return () => unsubscribe();
//   }, []);


//     useEffect(() => {
//     if (user) {
//       const q = query(collection(db, 'goals'), where('userId', '==', user.uid));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const fetchedGoals = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setGoals(fetchedGoals);
//       });

//       return () => unsubscribe(); // clean up listener on unmount
//     }
//   }, [user]);  

//  const handleGoogleLogin = (googleUser) => {
//   setUser(googleUser);

// };

// const handleDelete = async (goalId) => {
//   setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));

//   try {
//     await deleteDoc(doc(db, 'goals', goalId));
//     // Firestore will auto-update the UI
//   } catch (error) {
//     console.error("Error deleting goal:", error);
//   }
// };

//   return (
//     <div className="App">
//       {!user ? (
//         <LoginForm onGoogleLogin={handleGoogleLogin}
          
//         />
//       ) : (
//         <>

//           <header className="App-header">
//             <p>Welcome, {user.displayName}</p>

//        <div className="top-bar">
//         <input
//           type="text"
//           placeholder="Search goal..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="search-input"
//         />
//         <button onClick={() => {
//               setEditingGoal(null);
//               setTitle('');
//               setDescription('');
//               setDateTime('');
//               setDialogColor('#222831');
//               setShowDialog(true);
//                 }} className="add-goal-button">
//           + Add Goal
//         </button>
//       </div>
//            {/* <Button className="round-button" onClick={() => setShowDialog(true)}>
//               +
//             </Button> */}


//        {/* <GoalList goals={filteredGoals}
//         toggleComplete={toggleComplete}
//         handleDelete={handleDelete}
//         setEditingGoal={setEditingGoal}
//         color={dialogColor} 
//       /> */}

//             {showDialog && (
//               <GoalDialog
//                 title={title}
//                 description={description}
//                 onTitleChange={(e) => setTitle(e.target.value)}
//                 onDescChange={(e) => setDescription(e.target.value)}
//                 onClose={() => {
//                   setShowDialog(false);
//                   setTitle('');
//                   setDescription('');
//                   setDateTime('');
//                 }}
//                 onSubmit={handleSubmit}
//                  bgColor={dialogColor}
//                 onColorChange={setDialogColor} 
//                 dateTime={dateTime}
//                 onDateTimeChange={(e) => setDateTime(e.target.value)}
//               />
//             )}
//          {/* 🟡 On Progress */}
// {/* <div className="goal-section">
//   <div className="section-header" onClick={() => setShowOnProgress(!showOnProgress)}>
//     🟡 On Progress
//     <span>{showOnProgress ? '▲' : '▼'}</span>
//   </div>
//   {showOnProgress && (
//     <GoalList
//       goals={filteredGoals.filter((goal) => !goal.completed)}
//       toggleComplete={toggleComplete}
//       handleDelete={handleDelete}
//       setEditingGoal={setEditingGoal}
//       color={dialogColor}
//     />
//   )}
// </div> */}

// {/* ✅ Goal Done */}
// {/* <div className="goal-section">
//   <div className="section-header" onClick={() => setShowDoneGoals(!showDoneGoals)}>
//     ✅ Goal Done
//     <span>{showDoneGoals ? '▲' : '▼'}</span>
//   </div>
//   {showDoneGoals && (
//     <GoalList
//       goals={filteredGoals.filter((goal) => goal.completed)}
//       toggleComplete={toggleComplete}
//       handleDelete={handleDelete}
//       setEditingGoal={setEditingGoal}
//       color={dialogColor}
//     />
//   )}
// </div> */}

// {/* On Progress Section */}
// <h2 style={{ color: '#ffaa00', marginTop: '20px' }}>🟡 On Progress</h2>
// <GoalList
//   goals={filteredGoals.filter((goal) => !goal.completed)}
//   toggleComplete={toggleComplete}
//   handleDelete={handleDelete}
//   setEditingGoal={setEditingGoal}
//   color={dialogColor}
// />

// {/* Done Goal Section */}
// <h2 style={{ color: '#00dd99', marginTop: '20px' }}>✅ Goal Done</h2>
// <GoalList
//   goals={filteredGoals.filter((goal) => goal.completed)}
//   toggleComplete={toggleComplete}
//   handleDelete={handleDelete}
//   setEditingGoal={setEditingGoal}
//   color={dialogColor}
// />

            
//       {filteredGoals.length === 0 && <p>No matching goals found.</p>}
//             <h1>Let's Progress together.</h1>
//             <button className="logout-button" onClick={() => signOut(auth)}>
//   🔓 Logout
// </button>

//           </header>
//         </>
//       )}
//     </div>)}
 

// export default App;
