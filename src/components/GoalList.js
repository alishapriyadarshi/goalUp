// src/components/GoalList.js

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function DropdownMenu({ anchorRect, onEdit, onDelete, onClose }) {
  const ref = useRef(null);

  // close if clicked outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [onClose]);

  const style = {
    position: 'fixed',
    top: anchorRect ? anchorRect.bottom + 6 : 0,
    left: anchorRect ? Math.max(8, anchorRect.right - 150) : 0,
    background: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '4px 0',
    minWidth: '140px',
    zIndex: 4000, // above sidebar/backdrop
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  };

  return createPortal(
    <div ref={ref} style={style} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => {
          onEdit();
          onClose();
        }}
        style={{
          display: 'block',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '10px 16px',
          textAlign: 'left',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          onDelete();
          onClose();
        }}
        style={{
          display: 'block',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '10px 16px',
          textAlign: 'left',
          color: '#f66',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </div>,
    document.body
  );
}

export default function GoalList({ goals, toggleComplete, handleDelete, setEditing }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);
  const buttonRefs = useRef({});
  
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10000); // Update every 10 seconds (10000 milliseconds)

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, []);
  
  const onProgressGoals = goals.filter((goal) => !goal.completed);
  const doneGoals = goals.filter((goal) => goal.completed);

  const openMenu = (goalId) => {
    const btn = buttonRefs.current[goalId];
    if (btn) {
      setAnchorRect(btn.getBoundingClientRect());
    }
    setMenuOpenFor((prev) => (prev === goalId ? null : goalId));
  };

  const closeMenu = () => setMenuOpenFor(null);

  const handleEdit = (goal) => {
    setEditing(goal);
  };

  const renderGoalCard = (goal) => {
    // Logic to calculate the time-based progress
    const startDate = goal.createdAt?.toDate() || new Date();
    const endDate = new Date(goal.dateTime);
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = now.getTime() - startDate.getTime();

    let progress = 0;
    if (totalDuration > 0) {
      progress = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
    }

    if (goal.completed || now.getTime() >= endDate.getTime()) {
      progress = 100;
    }

    const progressColor = goal.completed ? '#555' : '#388e3c'; // CHANGE: new darker green hex code

    return (
      <div
        key={goal.id}
        className="goal-card"
        style={{ position: 'relative', cursor: 'pointer' }}
        onClick={() => {
          setEditing(goal);
          closeMenu();
        }}
      >
        <div className="left">
          <input
            type="checkbox"
            checked={goal.completed}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              toggleComplete(goal);
            }}
          />
          <div className="info">
            <h3 className={goal.completed ? 'done' : ''}>{goal.title}</h3>
            <p>{goal.description}</p>
          </div>
        </div>

        <div className="right">
          <div className="tag-time-wrapper">
            <span
              className="tag-dot"
              style={{ backgroundColor: progressColor }}
            ></span>
            <time>
              {new Date(goal.dateTime).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </time>
          </div>

          <div className="menu-container">
            <button
              className="menu-button"
              ref={(el) => (buttonRefs.current[goal.id] = el)}
              onClick={(e) => {
                e.stopPropagation();
                openMenu(goal.id);
              }}
              aria-label="options"
              style={{
                background: 'none',
                border: 'none',
                color: '#aeb3b9',
                cursor: 'pointer',
                padding: 6,
                fontSize: 18,
              }}
            >
              ⋮
            </button>
            {menuOpenFor === goal.id && anchorRect && (
              <DropdownMenu
                anchorRect={anchorRect}
                onEdit={() => handleEdit(goal)}
                onDelete={() => handleDelete(goal.id)}
                onClose={closeMenu}
              />
            )}
          </div>
        </div>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              backgroundColor: progressColor,
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="goal-list-container">
      <h2 style={{ color: 'white' }}>On Progress</h2>
      {onProgressGoals.length > 0 ? (
        onProgressGoals.map(renderGoalCard)
      ) : (
        <p className="no-goals">No on-progress goals.</p>
      )}

      <h2 style={{ marginTop: '20px', color: 'white' }}>Done Goals</h2>
      {doneGoals.length > 0 ? (
        doneGoals.map(renderGoalCard)
      ) : (
        <p className="no-goals">No completed goals yet.</p>
      )}
    </div>
  );
}