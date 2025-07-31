


// function GoalList({ goals, toggleComplete, handleDelete, setEditing }) {
//   const onProgressGoals = goals.filter((goal) => !goal.completed);
//   const doneGoals = goals.filter((goal) => goal.completed);

//   const renderGoalCard = (goal, index) => (
//     <div key={goal.id} className="goal-card">

//       <div className="left">
//         <input
//           type="checkbox"
//           checked={goal.completed}
//           onChange={(e) => {
//             e.stopPropagation();
//             toggleComplete(goal);
//           }}
//         />
//         <div onClick={() => setEditing(goal)} className="info">
//           <h3 className={goal.completed ? 'done' : ''}>{goal.title}</h3>
//           <p>{goal.description}</p>
//         </div>
//       </div>
//       <div className="right">
//   <div className="tag-time-wrapper">
//     <span
//       className="tag-dot"
//       style={{ backgroundColor: goal.color || '#76ff03' }}
//     ></span>
//     <time>{new Date(goal.dateTime).toLocaleString(undefined, {
//   dateStyle: 'medium',
//   timeStyle: 'short'
// })}</time>

//   </div>
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       handleDelete(goal.id);
//     }}
//   >
//     🗑️
//   </button>
// </div>

//     </div>
//   );

//   return (
//     <div className="goal-list-container">
//       <h2 style={{ color: 'white' }}> On Progress</h2>
//       {onProgressGoals.length > 0 ? (
//         onProgressGoals.map(renderGoalCard)
//       ) : (
//         <p className="no-goals">No on-progress goals.</p>
//       )}

//       <h2 style={{ marginTop: '20px', color: 'white' }}> Done Goals</h2>
//       {doneGoals.length > 0 ? (
//         doneGoals.map(renderGoalCard)
//       ) : (
//         <p className="no-goals">No completed goals yet.</p>
//       )}
//     </div>
//   );
// }

// export default GoalList;

import React, { useState } from 'react';

export default function GoalList({ goals, toggleComplete, handleDelete, setEditing }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null); // State to track which menu is open

  const onProgressGoals = goals.filter((goal) => !goal.completed);
  const doneGoals = goals.filter((goal) => goal.completed);

  const handleEditClick = (goal) => {
    setEditing(goal);
    setMenuOpenFor(null); // Close menu after clicking edit
  };

  const renderGoalCard = (goal) => (
    <div key={goal.id} className="goal-card">
      <div className="left">
        <input
          type="checkbox"
          checked={goal.completed}
          onChange={(e) => {
            e.stopPropagation();
            toggleComplete(goal);
          }}
        />
        {/* The onClick handler for editing has been removed from here */}
        <div className="info">
          <h3 className={goal.completed ? 'done' : ''}>{goal.title}</h3>
          <p>{goal.description}</p>
        </div>
      </div>
      <div className="right">
        <div className="tag-time-wrapper">
          <span
            className="tag-dot"
            style={{ backgroundColor: goal.color || '#76ff03' }}
          ></span>
          <time>{new Date(goal.dateTime).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}</time>
        </div>

        {/* This is the new menu container */}
        <div className="menu-container">
          <button
            className="menu-button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpenFor(menuOpenFor === goal.id ? null : goal.id);
            }}
          >
            ⋮
          </button>

          {/* This dropdown menu appears conditionally */}
          {menuOpenFor === goal.id && (
            <div className="menu-dropdown">
              <button onClick={() => handleEditClick(goal)}>Edit</button>
              <button onClick={() => handleDelete(goal.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="goal-list-container">
      <h2 style={{ color: 'white' }}> On Progress</h2>
      {onProgressGoals.length > 0 ? (
        onProgressGoals.map(renderGoalCard)
      ) : (
        <p className="no-goals">No on-progress goals.</p>
      )}

      <h2 style={{ marginTop: '20px', color: 'white' }}> Done Goals</h2>
      {doneGoals.length > 0 ? (
        doneGoals.map(renderGoalCard)
      ) : (
        <p className="no-goals">No completed goals yet.</p>
      )}
    </div>
  );
}
