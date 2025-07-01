



function GoalList({ goals, toggleComplete, handleDelete }) {
  return (
    <div className="goal-list">
      {goals.length === 0 ? (
        <p style={{ color: 'gray' }}>No goals yet. Click + to add your first goal!</p>
      ) : (
        <p style={{ color: 'white' }}>You have {goals.length} goal(s)</p>
      )}

      {goals.map((goal, index) => (
  <div key={goal.id} className="goal-item">
    <input
      type="checkbox"
      id={`goal-${index}`}
      checked={goal.completed}
      onChange={() => toggleComplete(goal)}
    />
    <label htmlFor={`goal-${index}`} className={goal.completed ? 'completed' : ''}>
      <strong>{goal.title}</strong><br />
      {goal.description}
    </label>

    {/* Delete button */}
    <button
      style={{ marginLeft: 'auto', color: 'red', background: 'transparent', border: 'none', cursor: 'pointer' }}
      onClick={() => handleDelete(goal.id)}
    >
      🗑️
    </button>

    </div>
      ) 
   
  ) }

  </div>)}




export default GoalList;
