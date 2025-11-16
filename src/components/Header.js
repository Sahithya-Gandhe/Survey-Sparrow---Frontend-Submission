import React from 'react';
import '../styles/Header.css';

const Header = ({ onToggleSidebar, searchText, onSearchChange }) => {
  const clearSearch = () => onSearchChange('');

  return (
    <header className="app-header">
      <button 
        className="sidebar-toggle-btn" 
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      
      <div className="search-container">
        <span className="search-symbol">🔍</span>
        <input 
          type="text"
          className="search-input"
          placeholder="Search events..." 
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchText && (
          <button 
            className="clear-search-btn" 
            onClick={clearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="user-profile">
        <div className="profile-badge">
          <span>ME</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
