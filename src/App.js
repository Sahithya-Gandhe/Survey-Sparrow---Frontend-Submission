import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CalendarGrid from './components/CalendarGrid';
import TaskList from './components/TaskList';
import EventModal from './components/EventModal';
import EventDetailsModal from './components/EventDetailsModal';
import ConflictModal from './components/ConflictModal';
import initialData from './data/events.json';
import './styles/App.css';

function App() {
  // State management
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [pickedDate, setPickedDate] = useState(new Date());
  const [allEvents, setAllEvents] = useState(() => {
    const cached = localStorage.getItem('calendarEvents');
    return cached ? JSON.parse(cached) : initialData;
  });
  const [currentView, setCurrentView] = useState('calendar');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  
  // Modal states
  const [formModal, setFormModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [conflictModal, setConflictModal] = useState(false);
  
  // Event states
  const [activeEvent, setActiveEvent] = useState(null);
  const [conflictList, setConflictList] = useState([]);
  const [draftEvent, setDraftEvent] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '10:00',
    color: '#f6be23'
  });

  // Persist events to localStorage
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(allEvents));
  }, [allEvents]);

  // Filter events based on search
  const getFilteredEventList = () => {
    if (!filterQuery.trim()) return allEvents;
    
    const searchTerm = filterQuery.toLowerCase();
    return allEvents.filter(evt => 
      evt && evt.title && evt.title.toLowerCase().includes(searchTerm)
    );
  };

  // Detect time conflicts
  const detectConflicts = (candidateEvent) => {
    return allEvents.filter(evt => {
      if (activeEvent && evt.id === activeEvent.id) return false;
      if (evt.date !== candidateEvent.date) return false;
      
      const start1 = candidateEvent.startTime;
      const end1 = candidateEvent.endTime;
      const start2 = evt.startTime;
      const end2 = evt.endTime;
      
      return (start1 < end2 && end1 > start2);
    });
  };

  // Event handlers
  const handleOpenForm = () => {
    setDraftEvent({
      title: '',
      date: format(pickedDate, 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00',
      color: '#f6be23'
    });
    setActiveEvent(null);
    setFormModal(true);
  };

  const handleShowDetails = (event) => {
    setActiveEvent(event);
    setDetailsModal(true);
  };

  const handleEditEvent = (event) => {
    setDraftEvent({
      title: event.title,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      color: event.color
    });
    setActiveEvent(event);
    setDetailsModal(false);
    setFormModal(true);
  };

  const handleSaveEvent = () => {
    if (!draftEvent.title.trim()) {
      alert('Please enter an event title');
      return;
    }

    if (draftEvent.startTime >= draftEvent.endTime) {
      alert('End time must be after start time');
      return;
    }

    const conflicts = detectConflicts(draftEvent);
    if (conflicts.length > 0) {
      setConflictList(conflicts);
      setConflictModal(true);
      return;
    }

    commitEventToStorage();
  };

  const commitEventToStorage = () => {
    if (activeEvent) {
      // Update existing event
      setAllEvents(allEvents.map(evt => 
        evt.id === activeEvent.id ? { ...draftEvent, id: activeEvent.id } : evt
      ));
    } else {
      // Create new event
      const newEntry = { ...draftEvent, id: Date.now() };
      setAllEvents([...allEvents, newEntry]);
    }
    
    resetFormState();
  };

  const resetFormState = () => {
    setFormModal(false);
    setConflictModal(false);
    setConflictList([]);
    setDraftEvent({
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00',
      color: '#f6be23'
    });
  };

  const handleRemoveEvent = (eventId) => {
    setAllEvents(allEvents.filter(evt => evt.id !== eventId));
    setDetailsModal(false);
  };

  const displayedEvents = getFilteredEventList();

  return (
    <div className="main-app">
      <Sidebar 
        isOpen={sidebarVisible}
        activeSection={currentView}
        onNavigate={setCurrentView}
      />
      
      <main className="content-area">
        <Header 
          onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
          searchText={filterQuery}
          onSearchChange={setFilterQuery}
        />
        
        {currentView === 'dashboard' && (
          <Dashboard 
            events={displayedEvents}
            onEventClick={handleShowDetails}
          />
        )}
        
        {currentView === 'tasks' && (
          <TaskList 
            events={displayedEvents}
            onEventClick={handleShowDetails}
            onEventDelete={handleRemoveEvent}
            onAddTask={handleOpenForm}
          />
        )}
        
        {currentView === 'calendar' && (
          <CalendarGrid 
            currentMonth={displayMonth}
            onMonthChange={setDisplayMonth}
            events={displayedEvents}
            selectedDate={pickedDate}
            onDateSelect={setPickedDate}
            onEventClick={handleShowDetails}
            onAddEvent={handleOpenForm}
            searchActive={filterQuery}
          />
        )}

        <EventModal 
          isOpen={formModal}
          onClose={() => setFormModal(false)}
          eventData={draftEvent}
          onChange={setDraftEvent}
          onSave={handleSaveEvent}
          isEditing={!!activeEvent}
        />

        <EventDetailsModal 
          isOpen={detailsModal}
          onClose={() => setDetailsModal(false)}
          event={activeEvent}
          onEdit={handleEditEvent}
          onDelete={handleRemoveEvent}
        />

        <ConflictModal 
          isOpen={conflictModal}
          onClose={() => setConflictModal(false)}
          conflicts={conflictList}
          onProceed={commitEventToStorage}
        />
      </main>
    </div>
  );
}

export default App;
