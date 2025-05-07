import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

const SourcingAgent = () => {
    const [fundedOrders, setFundedOrders] = useState([]);
    const [allocatedItems, setAllocatedItems] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFundedOrders();
    }, []);

    const fetchFundedOrders = async () => {
        setLoading(true);
        try {
            const ordersCollection = collection(db, 'orders');
            const orderSnapshot = await getDocs(query(ordersCollection, where("status", "==", "Funded")));
            const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFundedOrders(orderList);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Failed to fetch funded orders');
        } finally {
            setLoading(false);
        }
    };

    const handleAllocateItems = async (orderId) => {
        if (!allocatedItems[orderId] || allocatedItems[orderId].trim() === '') {
            alert('Please enter allocated items before submitting.');
            return;
        }

        setLoading(true);
        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, {
                allocatedItems: allocatedItems[orderId],
                status: 'Allocated'
            });
            alert('Items allocated successfully!');
            setAllocatedItems(prev => ({ ...prev, [orderId]: '' }));
            fetchFundedOrders();
        } catch (err) {
            setError('Failed to allocate items');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return React.createElement('div', null, 'Loading...');
    if (error) return React.createElement('div', null, 'Error: ', error);

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Sourcing Agent Dashboard'),
        React.createElement('ul', { className: 'list-group' },
            fundedOrders.map(order =>
                React.createElement('li', { key: order.id, className: 'list-group-item' },
                    React.createElement('div', null, `Order: ${order.details} - Status: ${order.status}`),
                    React.createElement('input', {
                        type: 'text',
                        placeholder: 'Allocated Items',
                        value: allocatedItems[order.id] || '',
                        onChange: (e) => setAllocatedItems(prev => ({ ...prev, [order.id]: e.target.value })),
                        className: 'form-control mt-2'
                    }),
                    React.createElement('button', {
                        onClick: () => handleAllocateItems(order.id),
                        className: 'btn btn-primary mt-2'
                    }, 'Allocate Items')
                )
            )
        )
    );
};

export default SourcingAgent;