// components/GoalDialog.js
function GoalDialog({ title, description, onTitleChange, onDescChange, onClose, onSubmit }) {
  return (
    <div className="overlay">
      <div className="center-dialog">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={onDescChange}
        />
        <button onClick={onSubmit}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default GoalDialog;
