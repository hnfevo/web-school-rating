import React from 'react';

const FormInputGroup = ({ label, type = 'text', placeholder, required, forgetPasswordLink = false, value, onChange, name }) => (
    <div className="form-group">
        <div className="password-header">
            <label className="form-label">{label}</label>
            {forgetPasswordLink && <a className="forget-password">Forget Password?</a>}
        </div>
        <input
            type={type}
            className="form-input"
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            name={name}
        />
    </div>
);

export default FormInputGroup;