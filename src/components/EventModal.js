import React from 'react';
import '../styles/EventModal.css';

const EventModal = ({ 
  isOpen, 
  onClose, 
  eventData, 
  onChange, 
  onSave, 
  isEditing 
}) => {
  if (!isOpen) return null;

  const colorPalette = [
    { hex: '#f6be23', name: 'Orange' },
    { hex: '#f6501e', name: 'Red' },
    { hex: '#4A90E2', name: 'Blue' },
    { hex: '#7ED321', name: 'Green' },
    { hex: '#9013FE', name: 'Purple' },
    { hex: '#50E3C2', name: 'Cyan' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <h3 className="modal-heading">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Event Title *</label>
            <input
              type="text"
              className="text-input"
              value={eventData.title}
              onChange={(e) => onChange({ ...eventData, title: e.target.value })}
              placeholder="Enter event title"
              required
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Date *</label>
            <input
              type="date"
              className="text-input"
              value={eventData.date}
              onChange={(e) => onChange({ ...eventData, date: e.target.value })}
              required
            />
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Start Time *</label>
              <input
                type="time"
                className="text-input"
                value={eventData.startTime}
                onChange={(e) => onChange({ ...eventData, startTime: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">End Time *</label>
              <input
                type="time"
                className="text-input"
                value={eventData.endTime}
                onChange={(e) => onChange({ ...eventData, endTime: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="input-group">
            <label className="input-label">Color Theme</label>
            <div className="color-palette">
              {colorPalette.map((clr) => (
                <div
                  key={clr.hex}
                  className={`color-swatch ${eventData.color === clr.hex ? 'selected-color' : ''}`}
                  style={{ backgroundColor: clr.hex }}
                  onClick={() => onChange({ ...eventData, color: clr.hex })}
                  title={clr.name}
                />
              ))}
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {isEditing ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
