import React from 'react';
import AuthTemplate from '../templates/AuthTemplate';
import AuthCard from '../molecules/AuthCard';
import CreateAccountForm from '../organisms/CreateAccountForm';

const CreateAccountPage = ({ setPage }) => (
    <AuthTemplate>
        <AuthCard 
            title="Create an Account" 
            subtitle="Create an account to continue"
        >
            <CreateAccountForm setPage={setPage} />
        </AuthCard>
    </AuthTemplate>
);

export default CreateAccountPage;