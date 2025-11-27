import React from 'react';
import AuthTemplate from '../templates/AuthTemplate';
import AuthCard from '../molecules/AuthCard';
import LoginForm from '../organisms/LoginForm';

const LoginPage = ({ setPage, onLogin }) => (
    <AuthTemplate>
        <AuthCard 
            title="Login to Account" 
            subtitle="Please enter your email and password to continue"
        >
            <LoginForm onLogin={onLogin} setPage={setPage} />
        </AuthCard>
    </AuthTemplate>
);

export default LoginPage;