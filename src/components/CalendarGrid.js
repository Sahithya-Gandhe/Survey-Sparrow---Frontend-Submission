import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay
} from 'date-fns';
import '../styles/CalendarGrid.css';

const CalendarGrid = ({ 
  currentMonth, 
  onMonthChange, 
  events, 
  selectedDate, 
  onDateSelect, 
  onEventClick,
  onAddEvent,
  searchActive 
}) => {
  const today = new Date();
  
  const navigateMonth = (direction) => {
    const newMonth = direction === 'next' 
      ? addMonths(currentMonth, 1) 
      : subMonths(currentMonth, 1);
    onMonthChange(newMonth);
  };

  const getEventsForDay = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return events.filter(e => e.date === dateStr);
  };

  const weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderWeekDays = () => (
    <div className="weekday-header">
      {weekDayLabels.map((day, idx) => (
        <div key={idx} className="weekday-cell">
          {day}
        </div>
      ))}
    </div>
  );

  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const weeks = [];
    let currentDay = calendarStart;

    while (currentDay <= calendarEnd) {
      const week = [];
      
      for (let i = 0; i < 7; i++) {
        const dayToRender = currentDay;
        const dayEvents = getEventsForDay(dayToRender);
        const isCurrentMonth = isSameMonth(dayToRender, monthStart);
        const isToday = isSameDay(dayToRender, today);
        const isSelected = isSameDay(dayToRender, selectedDate);

        week.push(
          <div
            key={dayToRender.toString()}
            className={`
              day-cell 
              ${!isCurrentMonth ? 'other-month' : ''} 
              ${isToday ? 'current-day' : ''} 
              ${isSelected ? 'selected-day' : ''}
            `}
            onClick={() => onDateSelect(dayToRender)}
          >
            <span className="day-number">{format(dayToRender, 'd')}</span>
            <div className="day-events">
              {dayEvents.map((evt, idx) => (
                <div
                  key={evt.id}
                  className="event-badge"
                  style={{
                    backgroundColor: evt.color,
                    marginTop: idx > 0 ? '3px' : '0'
                  }}
                  title={`${evt.title} - ${evt.startTime} to ${evt.endTime}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(evt);
                  }}
                >
                  <span className="event-dot">●</span>
                  <span className="event-name">{evt.title}</span>
                  <span className="event-start-time">{evt.startTime}</span>
                </div>
              ))}
            </div>
          </div>
        );
        
        currentDay = addDays(currentDay, 1);
      }
      
      weeks.push(
        <div key={currentDay.toString()} className="calendar-week">
          {week}
        </div>
      );
    }
    
    return weeks;
  };

  return (
    <div className="calendar-grid-container">
      {searchActive && (
        <div className="filter-notification">
          <span>🔍 Filtering events: "{searchActive}"</span>
          <button onClick={() => onDateSelect(today)}>Clear</button>
        </div>
      )}
      
      <div className="month-controls">
        <button className="month-nav-btn" onClick={() => navigateMonth('prev')}>
          ←
        </button>
        <button className="month-nav-btn" onClick={() => navigateMonth('next')}>
          →
        </button>
      </div>
      
      <div className="calendar-header-section">
        <div className="month-display">
          <h2 className="month-title">{format(currentMonth, 'MMMM yyyy')}</h2>
          <p className="event-count">
            {events.length} Events {searchActive && 'Found'}
          </p>
        </div>
        <div className="header-actions">
          <button className="create-event-btn" onClick={onAddEvent}>
            + Add Event
          </button>
        </div>
      </div>
      
      {renderWeekDays()}
      <div className="days-grid">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarGrid;
