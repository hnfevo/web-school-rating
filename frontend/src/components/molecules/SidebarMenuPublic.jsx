import React from 'react';

const SidebarMenu = ({ activeContent, setActiveContent, onLogout }) => {
    const menuItems = ['dashboard']; // <-- Ubah menjadi huruf kecil untuk konsistensi

    return (
        <div className="sidebar-menu">
            {menuItems.map(item => (
                <div 
                    key={item}
                    // Pastikan perbandingan menggunakan 'dashboard'
                    className={`sidebar-item ${activeContent.toLowerCase() === item ? 'active' : ''}`}
                    onClick={() => setActiveContent(item)}
                >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
            ))}
        </div>
    );
};

export default SidebarMenu;