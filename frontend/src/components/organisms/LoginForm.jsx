import React, { useState } from 'react';
import FormInputGroup from '../atoms/FormInputGroup';
import Checkbox from '../atoms/Checkbox';
import Button from '../atoms/Button';
import { authAPI } from '../../services/api';

const LoginForm = ({ onLogin, setPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.login(email, password);
            if (response.success) {
                onLogin();
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

            <FormInputGroup
                label="Email address:"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <FormInputGroup
                label="Password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                forgetPasswordLink
            />
            <Checkbox id="remember" label="Remember Password" />

            <Button
                type="submit"
                className="signup-button"
                style={{ margin: '55px auto 18px auto' }}
                disabled={loading}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            <div className="login-section">
                <span className="login-text">Don't have an account?</span>
                <a onClick={() => setPage('create')} className="login-link">Create Account</a>
            </div>
        </form>
    );
};

export default LoginForm;