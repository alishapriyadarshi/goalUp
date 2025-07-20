import React, { useState } from 'react';


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
  const [showColors, setShowColors] = useState(false);
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

      {/* 🎨 Color Theme Toggle */}
<div style={{ margin: '15px 0' }}>
  <button
    onClick={() => setShowColors(!showColors)}
    style={{
      backgroundColor: 'transparent',
      color: 'white',
      border: '1px solid white',
      padding: '6px 12px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px'
    }}
  >
    🎨 Choose Theme
  </button>

  {showColors && (
    <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
      {['#f44336', '#ff9800', '#ffeb3b', '#03a9f4', '#9c27b0'].map((color) => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: color,
            border: bgColor === color ? '2px solid white' : '1px solid #ccc',
            cursor: 'pointer'
          }}
          title={color}
        />
      ))}
    </div>
  )}
</div>


        <button className="dialog-button add" onClick={onSubmit}>Add</button>
        <button className="dialog-button close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default GoalDialog;
