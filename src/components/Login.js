import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();

            if (userData) {
                switch (userData.role) {
                    case 'Admin':
                        navigate('/admin');
                        break;
                    case 'Investor':
                        navigate('/investor');
                        break;
                    case 'Contractor':
                        navigate('/contractor');
                        break;
                    case 'Broker':
                        navigate('/broker');
                        break;
                    case 'Sourcing Agent':
                        navigate('/sourcing-agent');
                        break;
                    case 'Client':
                        navigate('/client-dashboard');
                        break;
                    default:
                        navigate('/');
                }
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Login'),
        React.createElement('form', { onSubmit: handleLogin },
            React.createElement('div', { className: 'mb-3' },
                React.createElement('input', {
                    type: 'email',
                    className: 'form-control',
                    placeholder: 'Email',
                    onChange: (e) => setEmail(e.target.value),
                    required: true
                })
            ),
            React.createElement('div', { className: 'mb-3' },
                React.createElement('input', {
                    type: 'password',
                    className: 'form-control',
                    placeholder: 'Password',
                    onChange: (e) => setPassword(e.target.value),
                    required: true
                })
            ),
            React.createElement('button', {
                type: 'submit',
                className: 'btn btn-primary w-100'
            }, 'Login')
        ),
        React.createElement('p', { className: 'text-center mt-3' },
            "Don't have an account? ",
            React.createElement(Link, { to: '/register', className: 'link-primary' }, 'Register here')
        )
    );
};

export default Login;