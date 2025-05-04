import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const InvestorBidding = () => {
    const [approvedOrders, setApprovedOrders] = useState([]);
    const [bidAmount, setBidAmount] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState('');

    const fetchApprovedOrders = async () => {
        const ordersCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApprovedOrders(orderList.filter(order => order.status === 'Approved'));
    };

    const handlePlaceBid = async (e) => {
        e.preventDefault();
        if (selectedOrderId) {
            await addDoc(collection(db, 'bids'), {
                orderId: selectedOrderId,
                amount: bidAmount,
                status: 'Pending'
            });
            setBidAmount('');
            setSelectedOrderId('');
            fetchApprovedOrders();
        }
    };

    useEffect(() => {
        fetchApprovedOrders();
    }, []);

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Investor Dashboard'),
        React.createElement('h2', { className: 'text-center' }, 'Approved Orders for Bidding'),
        React.createElement('ul', { className: 'list-group mb-3' },
            approvedOrders.map(order =>
                React.createElement('li', { key: order.id, className: 'list-group-item d-flex justify-content-between align-items-center' },
                    `${order.details} - Status: ${order.status}`,
                    React.createElement('button', {
                        onClick: () => {
                            setSelectedOrderId(order.id);
                            setBidAmount('');
                        },
                        className: 'btn btn-primary btn-sm'
                    }, 'Bid')
                )
            )
        ),
        React.createElement('form', { onSubmit: handlePlaceBid },
            React.createElement('div', { className: 'input-group mb-3' },
                React.createElement('input', {
                    type: 'number',
                    className: 'form-control',
                    placeholder: 'Bid Amount',
                    value: bidAmount,
                    onChange: (e) => setBidAmount(e.target.value),
                    required: true
                }),
                React.createElement('button', { type: 'submit', className: 'btn btn-success' }, 'Place Bid')
            )
        )
    );
};

export default InvestorBidding;