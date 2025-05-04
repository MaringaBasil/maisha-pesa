import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToLoginButton = () => {
    const navigate = useNavigate();

    return React.createElement('button', {
        className: 'btn btn-secondary',
        onClick: () => navigate('/')
    }, 'Back to Login');
};

export default BackToLoginButton;