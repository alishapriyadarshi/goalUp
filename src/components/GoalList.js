
import React from 'react';

const isOverdue = (goal) => {
  return (
    goal.dateTime &&
    new Date(goal.dateTime) < new Date() &&
    !goal.completed
  );
};

function formatDateTime(datetime) {
  const date = new Date(datetime);
  return `${date.toLocaleDateString()} — ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function GoalList({ goals, toggleComplete, handleDelete, setEditingGoal }) {
  return (
    <div className="goal-list">
      {goals.map((goal, index) => (
        // <div
        //   key={index}
        //   className={`goal-item ${isOverdue(goal) ? 'overdue' : ''}`}
        //   style={{
        //     backgroundColor: goal.color || '#222',
        //     border: isOverdue(goal) ? '2px solid red' : '1px solid #444',
        //     padding: '12px 16px',
        //     marginBottom: '12px',
        //     borderRadius: '10px',
        //     color: '#fff',
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'space-between',
        //     cursor: 'pointer',
        //   }}
        // >
        //   {/* Left Section: Checkbox */}
        //   <input
        //     type="checkbox"
        //     checked={goal.completed}
        //     onChange={() => toggleComplete(goal)}
        //     style={{
        //       marginRight: '12px',
        //       transform: 'scale(1.3)',
        //       accentColor: '#0f0',
        //     }}
        //   />

        //   {/* Middle Section: Goal Details */}
        //   <div
        //     onClick={() => setEditingGoal(goal)}
        //     style={{ flex: 1 }}
        //   >
        //     <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{goal.title}</div>
        //     <div style={{ fontSize: '14px', color: '#ccc' }}>{goal.description}</div>
        //     {goal.dateTime && (
        //       <div style={{ marginTop: '4px', fontSize: '13px', color: '#ffcc00' }}>
        //         🕒 {formatDateTime(goal.dateTime)}
        //       </div>
        //     )}
        //   </div>

        //   {/* Right Section: Delete */}
        //   <button
        //     onClick={(e) => {
        //       e.stopPropagation(); // prevent opening edit when deleting
        //       handleDelete(goal.id);
        //     }}
        //     style={{
        //       marginLeft: '16px',
        //       background: 'transparent',
        //       border: 'none',
        //       color: '#f66',
        //       fontSize: '20px',
        //       cursor: 'pointer',
        //     }}
        //   >
        //     🗑️
        //   </button>
        // </div>
     
     
      <div
      key={index}
      className={`goal-item ${isOverdue(goal) ? 'overdue' : ''}`}
      onClick={() => setEditingGoal(goal)}
      style={{
        backgroundColor: goal.color || '#333',
      }}
    >
      <div className="goal-item-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id={`goal-${index}`}
            checked={goal.completed}
            onChange={(e) => {
              e.stopPropagation();
              toggleComplete(goal);
            }}
          />
          <label
            htmlFor={`goal-${index}`}
            className={goal.completed ? 'completed' : ''}
          style={{
    cursor: 'pointer',
    display: 'block',
    maxWidth: '100%',
    wordBreak: 'break-word',
    whiteSpace: 'normal'
  }}
          >
            <strong>{goal.title}</strong><br />
            {goal.description}
          </label>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(goal.id);
          }}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'white' }}
        >
          🗑️
        </button>
      </div>

      {/* Due date shown below */}
      {goal.dateTime && (
        <div className="goal-date">
          📅 Due: {new Date(goal.dateTime).toLocaleString()}
        </div>
      )}
    </div>
     ))}
    </div>
  );
}

export default GoalList;
