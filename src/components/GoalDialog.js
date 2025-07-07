// components/GoalDialog.js
function GoalDialog({
  title,
  description,
  onTitleChange,
  onDescChange,
  onSubmit,
  onClose,
  bgColor,
  onColorChange,
   dateTime,          
  onDateTimeChange   
}) {
  return (
    <div className="overlay">
      <div className="center-dialog" style={{ backgroundColor: bgColor }}>
        <h2 style={{ color: '#ffcc00' }}>🎯 Add Your Goal</h2>

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
{/* 📅 Date and Time Picker */}
<div style={{ marginTop: '10px' }}>
  <label style={{ color: 'white', fontSize: '14px' }}>📆 Set Goal Date & Time</label><br />
  <input
    type="datetime-local"
    value={dateTime}
    onChange={onDateTimeChange}
    style={{ marginTop: '5px', padding: '5px', borderRadius: '6px', border: 'none' }}
  />
</div>


        {/* ✅ Small Color Picker inside Dialog */}
        <div style={{ margin: '10px 0', textAlign: 'left' }}>
          <label style={{ color: 'white', fontSize: '14px', marginRight: '8px' }}>🎨 Theme</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => onColorChange(e.target.value)}
            style={{ width: '40px', height: '25px', border: 'none' }}
          />
        </div>

        <button className="dialog-button add" onClick={onSubmit}>Add</button>
        <button className="dialog-button close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default GoalDialog;
