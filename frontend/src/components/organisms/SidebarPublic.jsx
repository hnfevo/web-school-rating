import React from 'react';
import SidebarMenu from '../molecules/SidebarMenu';

const Sidebar = ({ isVisible, activeContent, setActiveContent, onLogout }) => (
    <div className={`sidebar ${isVisible ? 'show' : ''}`}>
         <div className="logo"><span className="text-blue">Dash</span>Publik</div>
         <div className="sidebar-divider"></div>
         <SidebarMenu 
            activeContent={activeContent} 
            setActiveContent={setActiveContent} 
            onLogout={onLogout} 
         />
    </div>
);

export default Sidebar;