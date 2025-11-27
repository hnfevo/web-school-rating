import React from 'react';

const Checkbox = ({ id, label, defaultChecked, required }) => (
    <div className="terms-checkbox">
        <input type="checkbox" id={id} className="checkbox-input" defaultChecked={defaultChecked} required={required} />
        <label htmlFor={id} className="checkbox-label">{label}</label>
    </div>
);

export default Checkbox;