import React from 'react';
import Sidebar from '../organisms/Sidebar';
import TopBar from '../organisms/TopBar';

const DashboardTemplate = ({ 
    activeContent, 
    setActiveContent, 
    onLogout, 
    isSidebarVisible, 
    toggleSidebar, 
    searchQuery, 
    setSearchQuery, 
    children,
    view
}) => (
    <div className="dashboard-layout">
        <Sidebar 
            isVisible={isSidebarVisible}
            activeContent={activeContent}
            setActiveContent={(content) => { 
                setActiveContent(content); 
                // Reset view ke 'table' saat ganti menu
                if(view !== 'table') { 
                    setSearchQuery(''); 
                }
            }}
            onLogout={onLogout}
        />
        <div className="main-content">
            <TopBar 
                toggleSidebar={toggleSidebar} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className="content-area">
                {children}
            </div>
        </div>
    </div>
);

export default DashboardTemplate;