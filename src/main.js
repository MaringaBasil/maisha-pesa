import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { UserProvider } from './UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    React.createElement(React.StrictMode, null,
        React.createElement(UserProvider, null,
            React.createElement(Router, null,
                React.createElement(App),
                React.createElement(ToastContainer)
            )
        )
    )
);