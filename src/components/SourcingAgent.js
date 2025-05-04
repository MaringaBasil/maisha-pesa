import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const SourcingAgent = () => {
    const [orders, setOrders] = useState([]);
    const [allocatedItems, setAllocatedItems] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState('');

    const fetchOrders = async () => {
        const ordersCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList.filter(order => order.status === 'Funded'));
    };

    const handleAllocateItems = async (orderId) => {
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, { allocatedItems });
        alert('Items allocated successfully!');
        setAllocatedItems('');
        setSelectedOrderId('');
        fetchOrders(); //
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Allocate Items'),
        React.createElement('ul', { className: 'list-group' },
            orders.map(order =>
                React.createElement('li', { key: order.id, className: 'list-group-item' },
                    `${order.details} - ${order.status}`,
                    React.createElement('input', {
                        type: 'text',
                        placeholder: 'Allocated Items',
                        onChange: (e) => setAllocatedItems(e.target.value),
                        className: 'form-control mt-2'
                    }),
                    React.createElement('button', {
                        onClick: () => handleAllocateItems(order.id),
                        className: 'btn btn-success btn-sm mt-2'
                    }, 'Allocate')
                )
            )
        )
    );
};

export default SourcingAgent;