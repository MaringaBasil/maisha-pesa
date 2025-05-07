import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const BrokerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState('');

    const fetchOrders = async () => {
        const ordersCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'orders'), {
            details: orderDetails,
            status: 'Pending'
        });
        setOrderDetails('');
        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Broker Dashboard'),
        React.createElement('h2', null, 'Create New Order'),
        React.createElement('form', { onSubmit: handleCreateOrder },
            React.createElement('input', { type: 'text', placeholder: 'Order Details', value: orderDetails, onChange: (e) => setOrderDetails(e.target.value), required: true }),
            React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Create Order')
        ),
        React.createElement('h2', null, 'Your Orders'),
        React.createElement('ul', { className: 'list-group' },
            orders.map(order =>
                React.createElement('li', { key: order.id, className: 'list-group-item' },
                    `${order.details} - Status: ${order.status}`
                )
            )
        )
    );
};

export default BrokerDashboard;