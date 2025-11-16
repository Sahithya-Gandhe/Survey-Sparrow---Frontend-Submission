import React from 'react';
import { format, parseISO } from 'date-fns';
import '../styles/Dashboard.css';

const Dashboard = ({ events, onEventClick }) => {
  const currentDate = new Date();
  const todayString = format(currentDate, 'yyyy-MM-dd');

  // Calculate statistics
  const statistics = {
    total: events.length,
    today: events.filter(e => e.date === todayString).length,
    upcoming: events.filter(e => e.date > todayString).length,
    dayOfWeek: format(currentDate, 'EEEE'),
    dateString: format(currentDate, 'MMM dd, yyyy')
  };

  // Get today's scheduled events
  const todaysAgenda = events
    .filter(e => e.date === todayString)
    .sort((x, y) => (x.startTime || '').localeCompare(y.startTime || ''));

  // Get next upcoming events
  const futureEvents = events
    .filter(e => e.date >= todayString)
    .sort((x, y) => {
      const dateCompare = (x.date || '').localeCompare(y.date || '');
      if (dateCompare !== 0) return dateCompare;
      return (x.startTime || '').localeCompare(y.startTime || '');
    })
    .slice(0, 10);

  const StatCard = ({ icon, value, label }) => (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-details">
        <h3 className="metric-value">{value}</h3>
        <p className="metric-label">{label}</p>
      </div>
    </div>
  );

  const EventListItem = ({ event }) => (
    <div 
      className="agenda-item" 
      onClick={() => onEventClick(event)}
    >
      <div 
        className="event-marker" 
        style={{ backgroundColor: event.color }} 
      />
      <div className="agenda-details">
        <h4 className="agenda-title">{event.title}</h4>
        <p className="agenda-time">
          {event.date !== todayString && `${format(parseISO(event.date), 'MMM dd, yyyy')} • `}
          {event.startTime} - {event.endTime}
        </p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <h1 className="section-heading">Dashboard</h1>
      
      <div className="metrics-grid">
        <StatCard icon="📅" value={statistics.total} label="Total Events" />
        <StatCard icon="📌" value={statistics.today} label="Today's Events" />
        <StatCard icon="🎯" value={statistics.upcoming} label="Upcoming Events" />
        <StatCard icon="✓" value={statistics.dayOfWeek} label={statistics.dateString} />
      </div>

      <div className="agenda-sections">
        <div className="agenda-panel">
          <h2 className="panel-title">Today's Schedule</h2>
          {todaysAgenda.length > 0 ? (
            <div className="agenda-list">
              {todaysAgenda.map(event => (
                <EventListItem key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="no-data-message">No events scheduled for today</p>
          )}
        </div>

        <div className="agenda-panel">
          <h2 className="panel-title">Upcoming Events</h2>
          {futureEvents.length > 0 ? (
            <div className="agenda-list">
              {futureEvents.map(event => (
                <EventListItem key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="no-data-message">No upcoming events</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
