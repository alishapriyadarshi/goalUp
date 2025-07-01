// components/GoalItem.js
function GoalItem({ goal, index, toggleComplete }) {
  return (
    <div className="goal-item">
      <input
        type="checkbox"
        id={`goal-${index}`}
        checked={goal.completed}
        onChange={() => toggleComplete(index)}
     />
      <label
        htmlFor={`goal-${index}`}
        className={goal.completed ? 'completed' : ''}
      >
        <strong>{goal.title}</strong><br />
        {goal.description}
      </label>
    </div>
  );
}

export default GoalItem;
