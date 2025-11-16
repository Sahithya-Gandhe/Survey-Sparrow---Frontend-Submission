import React from 'react';
import { format, parseISO } from 'date-fns';
import '../styles/EventDetailsModal.css';

const EventDetailsModal = ({ 
  isOpen, 
  onClose, 
  event, 
  onEdit, 
  onDelete 
}) => {
  if (!isOpen || !event) return null;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <h3 className="modal-heading">Event Details</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="details-content">
          <div className="detail-row">
            <div 
              className="color-indicator" 
              style={{ backgroundColor: event.color }} 
            />
            <h2 className="event-heading">{event.title}</h2>
          </div>
          
          <div className="detail-row">
            <span className="detail-symbol">📅</span>
            <span className="detail-text">
              {format(parseISO(event.date), 'MMMM dd, yyyy')}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-symbol">🕐</span>
            <span className="detail-text">
              {event.startTime} - {event.endTime}
            </span>
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="delete-btn" onClick={handleDelete}>
            Delete Event
          </button>
          <button className="edit-btn" onClick={() => onEdit(event)}>
            Edit Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
