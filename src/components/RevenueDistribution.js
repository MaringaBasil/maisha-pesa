import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

const RevenueDistribution = () => {
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDeliveredOrders();
    }, []);

    const fetchDeliveredOrders = async () => {
        setLoading(true);
        try {
            const ordersCollection = collection(db, 'orders');
            const orderSnapshot = await getDocs(query(ordersCollection, where("status", "==", "Delivered")));
            const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDeliveredOrders(orderList);
        } catch (err) {
            setError('Failed to fetch delivered orders');
            console.error('Error fetching delivered orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const calculateAndDistributeRevenue = async (order) => {
        setLoading(true);
        try {
            // Calculate revenue shares
            const totalRevenue = order.totalAmount;
            const investorShare = totalRevenue * 0.7; // 70% to investor
            const platformShare = totalRevenue * 0.2; // 20% to platform
            const sourcingAgentShare = totalRevenue * 0.1; // 10% to sourcing agent

            // Update order with revenue distribution
            const orderRef = doc(db, 'orders', order.id);
            await updateDoc(orderRef, {
                status: 'RevenueDistributed',
                investorShare,
                platformShare,
                sourcingAgentShare,
                distributionDate: new Date()
            });

            // Here you would typically also update the balances of the involved parties
            // This is a simplified example and should be expanded based on your specific requirements
            // For example:
            // await updateInvestorBalance(order.investorId, investorShare);
            // await updatePlatformBalance(platformShare);
            // await updateSourcingAgentBalance(order.sourcingAgentId, sourcingAgentShare);

            alert('Revenue distributed successfully!');
            fetchDeliveredOrders(); // Refresh the list of delivered orders
        } catch (err) {
            setError('Failed to distribute revenue');
            console.error('Error distributing revenue:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return React.createElement('div', { className: 'text-center mt-5' }, 'Loading...');
    }

    if (error) {
        return React.createElement('div', { className: 'alert alert-danger mt-5' }, `Error: ${error}`);
    }

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center mb-4' }, 'Revenue Distribution Dashboard'),
        deliveredOrders.length === 0
            ? React.createElement('p', { className: 'text-center' }, 'No delivered orders to distribute revenue.')
            : React.createElement('ul', { className: 'list-group' },
                deliveredOrders.map(order =>
                    React.createElement('li', { key: order.id, className: 'list-group-item' },
                        React.createElement('div', { className: 'mb-2' },
                            `Order ID: ${order.id}`,
                            React.createElement('br'),
                            `Details: ${order.details}`,
                            React.createElement('br'),
                            `Total Amount: $${order.totalAmount.toFixed(2)}`
                        ),
                        React.createElement('button', {
                            onClick: () => calculateAndDistributeRevenue(order),
                            className: 'btn btn-primary'
                        }, 'Distribute Revenue')
                    )
                )
            )
    );
};

export default RevenueDistribution;
