import React from 'react';
import { format, parseISO } from 'date-fns';
import '../styles/TaskList.css';

const TaskList = ({ events, onEventClick, onEventDelete, onAddTask }) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');

  // Categorize tasks by timeline
  const categorizedTasks = {
    overdue: events.filter(e => e.date < currentDate),
    today: events.filter(e => e.date === currentDate),
    upcoming: events.filter(e => e.date > currentDate)
  };

  // Sort tasks within each category
  const sortTasks = (taskArray) => 
    taskArray.sort((x, y) => {
      const dateCompare = (x.date || '').localeCompare(y.date || '');
      if (dateCompare !== 0) return dateCompare;
      return (x.startTime || '').localeCompare(y.startTime || '');
    });

  Object.keys(categorizedTasks).forEach(key => {
    categorizedTasks[key] = sortTasks(categorizedTasks[key]);
  });

  const TaskItem = ({ task }) => (
    <div 
      className="task-card" 
      onClick={() => onEventClick(task)}
    >
      <div 
        className="task-indicator" 
        style={{ backgroundColor: task.color }} 
      />
      <div className="task-info">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-schedule">
          {format(parseISO(task.date), 'MMM dd, yyyy')} • {task.startTime} - {task.endTime}
        </p>
      </div>
      <button 
        className="task-remove-btn" 
        onClick={(e) => {
          e.stopPropagation();
          onEventDelete(task.id);
        }}
      >
        ×
      </button>
    </div>
  );

  const TaskSection = ({ title, tasks, statusClass }) => (
    <div className="task-group">
      <h2 className={`group-header ${statusClass}`}>
        {title} ({tasks.length})
      </h2>
      <div className="task-items">
        {tasks.length > 0 ? (
          tasks.map(task => <TaskItem key={task.id} task={task} />)
        ) : (
          <p className="no-data-message">No {title.toLowerCase()}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="tasks-container">
      <div className="tasks-heading">
        <h1 className="section-heading">Tasks & Events</h1>
        <button className="add-task-btn" onClick={onAddTask}>
          + Add Task
        </button>
      </div>

      {categorizedTasks.overdue.length > 0 && (
        <TaskSection 
          title="Overdue" 
          tasks={categorizedTasks.overdue} 
          statusClass="overdue-status" 
        />
      )}

      <TaskSection 
        title="Today" 
        tasks={categorizedTasks.today} 
        statusClass="today-status" 
      />

      <TaskSection 
        title="Upcoming" 
        tasks={categorizedTasks.upcoming} 
        statusClass="upcoming-status" 
      />
    </div>
  );
};

export default TaskList;
