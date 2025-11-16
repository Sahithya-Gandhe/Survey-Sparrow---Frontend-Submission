import React from 'react';
import '../styles/ConflictModal.css';

const ConflictModal = ({ 
  isOpen, 
  onClose, 
  conflicts, 
  onProceed 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="conflict-alert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <h3 className="modal-heading">⚠️ Schedule Conflict Detected</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="conflict-content">
          <p className="conflict-description">
            This event has a time overlap with {conflicts.length} existing event(s):
          </p>
          
          <div className="conflicts-display">
            {conflicts.map(evt => (
              <div key={evt.id} className="conflict-entry">
                <div 
                  className="conflict-color-bar" 
                  style={{ backgroundColor: evt.color }} 
                />
                <div className="conflict-info">
                  <strong className="conflict-title">{evt.title}</strong>
                  <p className="conflict-timing">
                    {evt.startTime} - {evt.endTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="conflict-prompt">
            Would you like to proceed and create this event anyway?
          </p>
        </div>
        
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Go Back
          </button>
          <button className="proceed-btn" onClick={onProceed}>
            Create Anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;
