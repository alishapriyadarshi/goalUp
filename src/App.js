import './App.css';
import { useState , useEffect} from 'react';
import Button from './components/Button';
import GoalDialog from './components/GoalDialog';
import GoalList from './components/GoalList';
import LoginForm from './components/LoginForm';
import { db, app} from './firebase';
import { collection, addDoc,  onSnapshot, query, where } from 'firebase/firestore';
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(app);


function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goals, setGoals] = useState([]);
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dialogColor, setDialogColor] = useState('#222831'); // default dark color
  const [dateTime, setDateTime] = useState('');


  const handleSubmit = async () => {
  if (!title.trim() || !description.trim() || !dateTime) {
    alert('Please fill in all fields.');
    return;
  }

  const newGoal = {
    title,
    description,
    completed: false,
    userId: user.uid,
    color: dialogColor,
    dateTime // ✅ Save the selected date and time
  };

  try {
    await addDoc(collection(db, 'goals'), newGoal);
    setTitle('');
    setDescription('');
    setDateTime('');
    setShowDialog(false);
  } catch (error) {
    console.error("Error adding goal:", error);
  }
};



  const toggleComplete = async (goal) => {
  try {
    const goalRef = doc(db, 'goals', goal.id);
    await updateDoc(goalRef, {
      completed: !goal.completed,
    });
  } catch (error) {
    console.error("Error updating goal status:", error);
  }
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);


    useEffect(() => {
    if (user) {
      const q = query(collection(db, 'goals'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedGoals = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGoals(fetchedGoals);
      });

      return () => unsubscribe(); // clean up listener on unmount
    }
  }, [user]);  

 const handleGoogleLogin = (googleUser) => {
  setUser(googleUser);

};

const handleDelete = async (goalId) => {
  try {
    await deleteDoc(doc(db, 'goals', goalId));
    // Firestore will auto-update the UI
  } catch (error) {
    console.error("Error deleting goal:", error);
  }
};

  return (
    <div className="App">
      {!user ? (
        <LoginForm onGoogleLogin={handleGoogleLogin}
          
        />
      ) : (
        <>
          <header className="App-header">
            <p>Welcome, {user.displayName}</p>
            <Button className="round-button" onClick={() => setShowDialog(true)}>
              +
            </Button>

            {showDialog && (
              <GoalDialog
                title={title}
                description={description}
                onTitleChange={(e) => setTitle(e.target.value)}
                onDescChange={(e) => setDescription(e.target.value)}
                onClose={() => {
                  setShowDialog(false);
                  setTitle('');
                  setDescription('');
                  setDateTime('');
                }}
                onSubmit={handleSubmit}
                 bgColor={dialogColor}
                onColorChange={setDialogColor} 
                dateTime={dateTime}
                onDateTimeChange={(e) => setDateTime(e.target.value)}
              />
            )}

            <GoalList 
            goals={goals} 
            toggleComplete={toggleComplete} 
            handleDelete={handleDelete}
            color={dialogColor}
            />
            <h1>Let's Progress together.</h1>
            <button className="logout-button" onClick={() => signOut(auth)}>
  🔓 Logout
</button>

          </header>
        </>
      )}
    </div>)}
 

export default App;
