import React, { useState } from 'react';
import FormInputGroup from '../atoms/FormInputGroup';
import Checkbox from '../atoms/Checkbox';
import Button from '../atoms/Button';
import { authAPI } from '../../services/api';

const CreateAccountForm = ({ setPage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.register(name, email, password);
            if (response.success) {
                alert('Akun berhasil dibuat! Silakan login.');
                setPage('login');
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSignUp}>
            {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

            <FormInputGroup
                label="Email address:"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <FormInputGroup
                label="Username"
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <FormInputGroup
                label="Password"
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <Checkbox id="terms" label="I accept terms and conditions" defaultChecked required />

            <Button
                type="submit"
                className="signup-button"
                style={{ margin: '55px auto 18px auto' }}
                disabled={loading}
            >
                {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <div className="login-section">
                <span className="login-text">Already have an account?</span>
                <a onClick={() => setPage('login')} className="login-link">Login</a>
            </div>
        </form>
    );
};

export default CreateAccountForm;