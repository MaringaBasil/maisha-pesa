import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import OrderManagement from './components/OrderManagement';
import Bidding from './components/Bidding';
import SourcingAgent from './components/SourcingAgent';
import ClientDashboard from './components/ClientDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './components/AdminDashboard';
import InvestorDashboard from './components/InvestorDashboard';
import ContractorDashboard from './components/ContractorDashboard';
import BrokerDashboard from './components/BrokerDashboard';
import RevenueDistribution from './components/RevenueDistribution';
import BackToLoginButton from './components/BackToLoginButton';
import { useUser } from './UserContext';

function App() {
    const { user, loading } = useUser();
    const location = useLocation();

    if (loading) {
        return React.createElement('div', null, 'Loading...');
    }

    return React.createElement('div', null,
        React.createElement('h1', { className: 'title text-center mt-4' }, 'Maisha Pesa - Tenderpreneur Transaction Platform'),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Login) }),
            React.createElement(Route, { path: "/register", element: React.createElement(Register) }),
            React.createElement(Route, { path: "/orders", element: React.createElement(PrivateRoute, { element: React.createElement(OrderManagement) }) }),
            React.createElement(Route, { path: "/bidding/:orderId", element: React.createElement(PrivateRoute, { element: React.createElement(Bidding) }) }),
            React.createElement(Route, { path: "/sourcing-agent", element: React.createElement(PrivateRoute, { element: React.createElement(SourcingAgent) }) }),
            React.createElement(Route, { path: "/client-dashboard", element: React.createElement(PrivateRoute, { element: React.createElement(ClientDashboard) }) }),
            React.createElement(Route, { path: "/admin", element: React.createElement(PrivateRoute, { element: React.createElement(AdminDashboard) }) }),
            React.createElement(Route, { path: "/investor", element: React.createElement(PrivateRoute, { element: React.createElement(InvestorDashboard) }) }),
            React.createElement(Route, { path: "/contractor", element: React.createElement(PrivateRoute, { element: React.createElement(ContractorDashboard) }) }),
            React.createElement(Route, { path: "/broker", element: React.createElement(PrivateRoute, { element: React.createElement(BrokerDashboard) }) }),
            React.createElement(Route, { path: "/revenue-distribution", element: React.createElement(PrivateRoute, { element: React.createElement(RevenueDistribution) }) })
        ),
        location.pathname !== '/' && React.createElement(BackToLoginButton, { className: 'd-flex justify-content-end mt-3' })
    );
}

export default App;