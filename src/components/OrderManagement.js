import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

const OrderManagement = () => {
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

    const handleApproveOrder = async (orderId) => {
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, { status: 'Approved' });
        fetchOrders();
    };

    const handleRejectOrder = async (orderId) => {
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, { status: 'Rejected' });
        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Order Management'),
        React.createElement('form', { onSubmit: handleCreateOrder },
            React.createElement('input', { type: 'text', placeholder: 'Order Details', value: orderDetails, onChange: (e) => setOrderDetails(e.target.value), required: true }),
            React.createElement('button', { type: 'submit', className: 'btn btn-primary w-100' }, 'Create Order')
        ),
        React.createElement('h2', null, 'Your Orders'),
        React.createElement('ul', { className: 'list-group' },
            orders.map(order =>
                React.createElement('li', { key: order.id, className: 'list-group-item' },
                    `${order.details} - Status: ${order.status}`,
                    order.status === 'Pending' && React.createElement('div', null,
                        React.createElement('button', { onClick: () => handleApproveOrder(order.id), className: 'btn btn-success btn-sm me-2' }, 'Approve'),
                        React.createElement('button', { onClick: () => handleRejectOrder(order.id), className: 'btn btn-danger btn-sm' }, 'Reject')
                    )
                )
            )
        )
    );
};

export default OrderManagement;