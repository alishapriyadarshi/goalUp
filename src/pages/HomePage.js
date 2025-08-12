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

  // sync form when editing changes (edit vs add)
  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        description: editing.description || '',
        dateTime: editing.dateTime || '',
        color: editing.color || '#76ff03',
      });
    } else {
      setForm({
        title: '',
        description: '',
        dateTime: '',
        color: '#76ff03',
      });
    }
  }, [editing]);

  const filtered = goals.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = goals.filter(g => g.completed).length;
  const totalCount = goals.length;

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.dateTime)  { alert('Please fill in all the fields.'); return; }
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

  const firstName = user?.displayName ? user.displayName.split(' ')[0] : 'User';

  return (
    <div className="app-layout">
      <Sidebar user={user} onLogout={() => signOut(auth)} />

      <main className="main-content">
        <header className="top-bar" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="logo">
            <h1>GoalUp</h1>
            <span>Welcome, {firstName}</span>
          </div>
           <div className="search-add-container" style={{ marginTop: 0 }}>
    <input
      className="search-input"
      placeholder="🔍 Search your goals..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{ flex: 1, minWidth: 0 }} // make it take available space
    />
    <button
      className="add-btn"
      onClick={() => {
        setEditing(null);
        setShowDialog(true);
      }}
      style={{ marginLeft: '12px' }}
    >
      + Add Goal
    </button>
  </div>
          {/* <div className="actions">
            <button
              className="add-btn"
              onClick={() => {
                setEditing(null);
                setShowDialog(true);
              }}
            >
              + Add Goal
            </button>
          </div> */}
        </header>

        {/* <div className="search-container">
          <input
            className="search-input"
            placeholder="🔍 Search your goals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div> */}

        <section className="summary">
          <div className="summary-item">
            Total Goals: <strong>{totalCount}</strong>
          </div>
          <div className="summary-item">
            Achieved: <strong>{completedCount}</strong>
          </div>
        </section>

        <GoalList
          goals={filtered}
          toggleComplete={async g => await updateDoc(doc(db, 'goals', g.id), { completed: !g.completed })}
          handleDelete={async id => await deleteDoc(doc(db, 'goals', id))}
          setEditing={g => {
            setEditing(g);
            setShowDialog(true);
          }}
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