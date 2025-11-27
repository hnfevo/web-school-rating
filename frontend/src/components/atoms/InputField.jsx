import React from 'react';

const InputField = ({ label, type = 'text', name, value, onChange, placeholder, required, min, max }) => (
    <div className="form-field">
        <label>{label}</label>
        <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            required={required} 
            min={min} 
            max={max}
        />
    </div>
);

export default InputField;