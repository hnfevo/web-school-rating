import React from 'react';

const SidebarMenu = ({ activeContent, setActiveContent, onLogout }) => {
    const menuItems = ['dashboard', 'lembaga', 'penilaian'];

    return (
        <div className="sidebar-menu">
            {menuItems.map(item => (
                <div 
                    key={item}
                    className={`sidebar-item ${activeContent === item ? 'active' : ''}`}
                    onClick={() => setActiveContent(item)}
                >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
            ))}
            <div className="sidebar-divider" style={{ margin: '50px 0 30px 0' }}></div>
            <div className="sidebar-item" onClick={onLogout}>Log out</div>
        </div>
    );
};

export default SidebarMenu;