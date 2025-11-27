import React from 'react';

const AuthCard = ({ title, subtitle, children }) => (
    <div className="signup-card">
        <h1 className="signup-title">{title}</h1>
        <p className="signup-subtitle">{subtitle}</p>
        {children}
    </div>
);

export default AuthCard;