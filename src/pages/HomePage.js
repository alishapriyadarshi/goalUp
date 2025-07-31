// 
// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import GoalDialog from '../components/GoalDialog';
import GoalList from '../components/GoalList';
import Sidebar from '../components/Sidebar';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../firebase'; // Assuming db is exported from firebase config
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';


export default function HomePage({ user }) {
  const auth = getAuth();
  const [goals, setGoals] = useState([]);
  const [search, setSearch] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dateTime: '',
    color: '#76ff03'
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'goals'),
      where('userId', '==', user.uid)
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setGoals(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const filtered = goals.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = goals.filter(g => g.completed).length;
  const totalCount = goals.length;

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.dateTime) return;
    const payload = { ...form, userId: user.uid, completed: editing?.completed || false };
    if (editing) {
      await updateDoc(doc(db, 'goals', editing.id), payload);
    } else {
      await addDoc(collection(db, 'goals'), payload);
    }
    setForm({ title: '', description: '', dateTime: '', color: '#76ff03' });
    setEditing(null);
    setShowDialog(false);
  };

  return (
    <div className="app-layout">
      {/* The Sidebar is now permanent and receives the logout function */}
      <Sidebar user={user} onLogout={() => signOut(auth)} />

      {/* All other content goes inside this main-content wrapper */}
      <main className="main-content">
        <header className="top-bar">
          <div className="logo">
            <h1>KeepSGoal</h1>
            <span>Welcome, {user.displayName.split(' ')[0]}</span>
          </div>
          <div className="actions">
            <button
              className="add-btn"
              onClick={() => { setEditing(null); setShowDialog(true); }}
            >+ Add Goal</button>
            {/* The old logout button is removed from here */}
          </div>
        </header>

        <div className="search-container">
          <input
            className="search-input"
            placeholder="🔍 Search your goals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <section className="summary">
          <div className="summary-item">Total Goals: <strong>{totalCount}</strong></div>
          <div className="summary-item">Achieved: <strong>{completedCount}</strong></div>
        </section>

        <GoalList
          goals={filtered}
          toggleComplete={async g => await updateDoc(doc(db, 'goals', g.id), { completed: !g.completed })}
          handleDelete={async id => await deleteDoc(doc(db, 'goals', id))}
          setEditing={g => { setEditing(g); setForm(g); setShowDialog(true); }}
        />
      </main>

      {showDialog && (
        <GoalDialog
          {...form}
          onTitleChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          onDescChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          onDateTimeChange={e => setForm(f => ({ ...f, dateTime: e.target.value }))}
          onColorChange={c => setForm(f => ({ ...f, color: c }))}
          onSubmit={handleSubmit}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}
