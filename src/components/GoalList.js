const isOverdue = (goal) => {
  return (
    goal.dateTime &&
    new Date(goal.dateTime) < new Date() &&
    !goal.completed
  );
};


function GoalList({ goals, toggleComplete, handleDelete, setEditingGoal }) {

  return (
    <div className="goal-list">
      {goals.map((goal, index) => (
       <div
  key={index}
  className={`goal-item ${isOverdue(goal) ? 'overdue' : ''}`}
  onClick={() => setEditingGoal(goal)}
  style={{
    backgroundColor: goal.color || '#333',
    color: '#fff',
    border: isOverdue(goal) ? '2px solid red' : '1px solid white',
    animation: isOverdue(goal) ? 'pulse 1.5s infinite' : 'none',
    cursor: 'pointer',
  }}
>

          <input
            type="checkbox"
            id={`goal-${index}`}
            checked={goal.completed}
            onChange={() => toggleComplete(goal)}
          />
          <label
            htmlFor={`goal-${index}`}
            className={goal.completed ? 'completed' : ''}
          >
            <strong>{goal.title}</strong><br />
            {goal.description}
          </label>
          <button onClick={() => handleDelete(goal.id)} style={{ marginLeft: 'auto' }}>
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

export default GoalList;
