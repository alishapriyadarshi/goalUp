
function GoalList({ goals, toggleComplete, handleDelete, color }) {
  return (
    <div className="goal-list">
      {goals.map((goal, index) => (
        <div
  key={index}
  className="goal-item"
  style={{
    backgroundColor: goal.color || '#333', // ✅ Use saved color from Firestore
    color: '#fff',
    border: '1px solid white'
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
