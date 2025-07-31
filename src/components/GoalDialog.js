import React, { useState } from 'react';


export default function GoalDialog({
  title,
  description,
  dateTime,
  color,
  onTitleChange,
  onDescChange,
  onDateTimeChange,
  onColorChange,
  onSubmit,
  onClose
}) {
  const [showPalette, setShowPalette] = useState(false);
  const colors = ['#f44336', '#ff9800', '#ffeb3b', '#76ff03', '#03a9f4'];

  return (
    <div className="overlay">
      <div className="dialog">
        <h2> Add / Edit Goal</h2>
        <input value={title} onChange={onTitleChange} placeholder="Title" />
        <textarea value={description} onChange={onDescChange} placeholder="Description" />
        <input type="datetime-local" step="60" value={dateTime} onChange={onDateTimeChange} />
        <div className="color-picker">
          <span>Color:</span>
          <div
            className="dot"
            style={{ background: color }}
            onClick={() => setShowPalette(!showPalette)}
          />
          {showPalette && (
            <div className="palette">
              {colors.map(c => (
                <span
                  key={c}
                  className={`palette-dot ${c === color ? 'selected' : ''}`}
                  style={{ background: c }}
                  onClick={() => { onColorChange(c); setShowPalette(false); }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="dialog-actions">
          <button className="save-btn" onClick={onSubmit}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
