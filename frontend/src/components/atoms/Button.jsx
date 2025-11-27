import React from 'react';

const Button = ({ children, type = 'button', className = 'btn-add', onClick }) => (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
        {children}
    </button>
);

export default Button;