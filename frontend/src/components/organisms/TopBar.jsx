import React from 'react';
import SearchBar from '../molecules/SearchBar';

const TopBar = ({ toggleSidebar, searchQuery, setSearchQuery }) => (
    <div className="top-bar">
        <div className="menu-icon" onClick={toggleSidebar}>☰</div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
);

export default TopBar;