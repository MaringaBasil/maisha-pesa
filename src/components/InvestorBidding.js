import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const SourcingAgent = () => {
    const [fundedOrders, setFundedOrders] = useState([]);
    const [allocatedItems, setAllocatedItems] = useState({});

    const fetchFundedOrders = async () => {
        const ordersCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFundedOrders(orderList.filter(order => order.status === 'Funded'));
    };

    const handleAllocateItems = async (orderId) => {
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, {
            allocatedItems: allocatedItems[orderId],
            status: 'Allocated'
        });
        setAllocatedItems(prev => ({ ...prev, [orderId]: '' }));
        fetchFundedOrders();
    };

    useEffect(() => {
        fetchFundedOrders();
    }, []);

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Sourcing Agent Dashboard'),
        React.createElement('ul', { className: 'list-group' },
            fundedOrders.map(order =>
                React.createElement('li', { key: order.id, className: 'list-group-item' },
                    `${order.details} - Status: ${order.status}`,
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