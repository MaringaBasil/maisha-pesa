import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ClientDashboard = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const ordersCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'badge bg-warning';
            case 'Approved':
                return 'badge bg-success';
            case 'Rejected':
                return 'badge bg-danger';
            case 'Funded':
                return 'badge bg-info';
            default:
                return '';
        }
    };

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Client Dashboard'),
        React.createElement('h3', { className: 'text-center' }, 'Your Orders'),
        React.createElement('ul', { className: 'list-group' },
            orders.map(order =>
                React.createElement('li', { key: order.id, className: 'list-group-item d-flex justify-content-between align-items-center' },
                    `${order.details}`,
                    React.createElement('span', { className: getStatusClass(order.status) }, order.status)
                )
            )
        )
    );
};

export default ClientDashboard;