import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
    };

    const handleVerifyKYC = async (userId) => {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, { kycVerified: true });
        alert('KYC verified successfully!');
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h1', { className: 'text-center' }, 'Admin Dashboard'),
        React.createElement('h2', null, 'User Management'),
        React.createElement('ul', { className: 'list-group' },
            users.map(user =>
                React.createElement('li', { key: user.id, className: 'list-group-item d-flex justify-content-between align-items-center' },
                    `${user.email} - Role: ${user.role} - KYC Verified: ${user.kycVerified ? 'Yes' : 'No'}`,
                    !user.kycVerified && React.createElement('button', { onClick: () => handleVerifyKYC(user.id), className: 'btn btn-success btn-sm' }, 'Verify KYC')
                )
            )
        )
    );
};

export default AdminDashboard;