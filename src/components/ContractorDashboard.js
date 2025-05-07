import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const ContractorDashboard = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const ordersCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList.filter(order => order.status === 'Pending'));
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
        React.createElement('h1', { className: 'text-center' }, 'Contractor Dashboard'),
        React.createElement('h2', null, 'Pending Orders'),
        React.createElement('ul', { className: 'list-group' },
            orders.map(order =>
                React.createElement('li', { key: order.id, className: 'list-group-item' },
                    `${order.details} - Status: ${order.status}`,
                    React.createElement('div', null,
                        React.createElement('button', { onClick: () => handleApproveOrder(order.id), className: 'btn btn-success btn-sm me-2' }, 'Approve'),
                        React.createElement('button', { onClick: () => handleRejectOrder(order.id), className: 'btn btn-danger btn-sm' }, 'Reject')
                    )
                )
            )
        )
    );
};

export default ContractorDashboard;