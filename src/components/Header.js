import React from 'react';
import '../styles/Header.css';

const Header = ({ filterQuery, onFilterChange, onToggleSidebar }) => {
  const clearSearch = () => onFilterChange('');

  return (
    <header className="app-header">
      <button 
        className="hamburger-menu" 
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className="search-container">
        <span className="search-symbol">🔍</span>
        <input 
          type="text"
          className="search-input"
          placeholder="Search events..." 
          value={filterQuery}
          onChange={(e) => onFilterChange(e.target.value)}
        />
        {filterQuery && (
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
