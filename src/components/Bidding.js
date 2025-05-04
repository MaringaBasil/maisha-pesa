import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

const Bidding = ({ orderId }) => {
    const [bids, setBids] = useState([]);
    const [bidAmount, setBidAmount] = useState('');

    const fetchBids = async () => {
        const bidsCollection = collection(db, 'bids');
        const bidSnapshot = await getDocs(bidsCollection);
        const bidList = bidSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBids(bidList.filter(bid => bid.orderId === orderId));
    };

    const handlePlaceBid = async (e) => {
        e.preventDefault();
        if (bidAmount && selectedOrderId) {
            await addDoc(collection(db, 'bids'), {
                orderId: selectedOrderId,
                amount: Number(bidAmount), // Convert to number
                status: 'Pending'
            });
            setBidAmount('');
            setSelectedOrderId('');
            fetchBids();
        }
    };

    const handleWinningBid = async (bidId) => {
        const bidRef = doc(db, 'bids', bidId);
        await updateDoc(bidRef, { status: 'Winning' });

        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, { status: 'Funded' });

        fetchBids();
    };

    useEffect(() => {
        fetchBids();
    }, [orderId]);

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Place a Bid'),
        React.createElement('form', { onSubmit: handlePlaceBid },
            React.createElement('input', {
                type: 'number',
                className: 'form-control mb-3',
                placeholder: 'Bid Amount',
                value: bidAmount,
                onChange: (e) => setBidAmount(e.target.value),
                required: true
            }),
            React.createElement('button', { type: 'submit', className: 'btn btn-primary w-100' }, 'Place Bid')
        ),
        React.createElement('ul', { className: 'list-group mt-3' },
            bids.map(bid =>
                React.createElement('li', { key: bid.id, className: 'list-group-item d-flex justify-content-between align-items-center' },
                    `Bid: ${bid.amount} - Status: ${bid.status}`,
                    bid.status === 'Pending' && React.createElement('button', {
                        onClick: () => handleWinningBid(bid.id),
                        className: 'btn btn-success btn-sm'
                    }, 'Mark as Winning')
                )
            )
        )
    );
};

export default Bidding;