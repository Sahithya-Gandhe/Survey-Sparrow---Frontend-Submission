import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, activeSection, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', emoji: '📊' },
    { id: 'calendar', label: 'Calendar', emoji: '📅' },
    { id: 'tasks', label: 'Tasks', emoji: '✓' },
    { id: 'settings', label: 'Settings', emoji: '⚙️' }
  ];

  return (
    <aside className={`app-sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="brand-section">
        <span className="brand-icon">📅</span>
        <span className="brand-name">TaskCalendar</span>
      </div>
      <nav className="sidebar-navigation">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`menu-button ${activeSection === item.id ? 'active-item' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="menu-icon">{item.emoji}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
