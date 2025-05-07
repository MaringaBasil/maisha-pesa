import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, 'users', user.uid), {
                email,
                role,
                kycVerified: false
            });
            alert('User registered successfully!');
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Detailed error:", error);
            setError(`Registration failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Register'),
        error && React.createElement('div', { className: 'alert alert-danger' }, error),
        React.createElement('form', { onSubmit: handleRegister },
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
            React.createElement('div', { className: 'mb-3' },
                React.createElement('select', {
                        className: 'form-select',
                        onChange: (e) => setRole(e.target.value),
                        required: true
                    },
                    React.createElement('option', { value: '' }, 'Select Role'),
                    React.createElement('option', { value: 'Contractor' }, 'Contractor'),
                    React.createElement('option', { value: 'Broker' }, 'Broker'),
                    React.createElement('option', { value: 'Sourcing Agent' }, 'Sourcing Agent'),
                    React.createElement('option', { value: 'Investor' }, 'Investor'),
                    React.createElement('option', { value: 'Client' }, 'Client'),
                    React.createElement('option', { value: 'Admin' }, 'Admin')
                )
            ),
            React.createElement('button', {
                type: 'submit',
                className: 'btn btn-primary w-100',
                disabled: loading
            }, loading ? 'Registering...' : 'Register')
        ),
        React.createElement('p', { className: 'text-center mt-3' },
            'Already have an account? ',
            React.createElement(Link, { to: '/login', className: 'link-primary' }, 'Login here')
        )
    );
};

export default Register;