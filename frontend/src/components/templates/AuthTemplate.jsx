import React from 'react';
import BackgroundShapes from '../atoms/BackgroundShapes';

const AuthTemplate = ({ children }) => (
    <div className="create-account-page">
        <div className="main-background">
            <BackgroundShapes />
            <div className="signup-container">
                {children}
            </div>
        </div>
    </div>
);

export default AuthTemplate;