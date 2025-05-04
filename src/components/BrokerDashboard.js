import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const BrokerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const fetchOrders = async () => {
        const ordersCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'orders'), {
                details: orderDetails,
                status: 'Pending'
            });
            setOrderDetails('');
            fetchOrders();
            setNotification({ message: 'Order created successfully!', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Failed to create order. Please try again.', type: 'error' });
        }
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
            default:
                return '';
        }
    };

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Broker Dashboard'),
        React.createElement('h2', null, 'Create New Order'),
        notification.message && React.createElement('div', { className: `alert ${notification.type === 'success' ? 'alert-success' : 'alert-danger'}` }, notification.message),
        React.createElement('form', { onSubmit: handleCreateOrder },
            React.createElement('div', { className: 'mb-3' },
                React.createElement('input', {
                    type: 'text',
                    className: 'form-control',
                    placeholder: 'Order Details',
                    value: orderDetails,
                    onChange: (e) => setOrderDetails(e.target.value),
                    required: true
                })
            ),
            React.createElement('button', { type: 'submit', className: 'btn btn-primary w-100' }, 'Create Order')
        ),
        React.createElement('h2', null, 'Your Orders'),
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

export default BrokerDashboard;