import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const PrivateRoute = ({ element }) => {
    const user = auth.currentUser;

    if (!user) {
        return React.createElement(Navigate, { to: "/login" });
    }

    const checkKYC = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        return userDoc.data().kycVerified;
    };

    const kycVerified = checkKYC();

    if (!kycVerified) {
        return React.createElement(Navigate, { to: "/login" });
    }

    return element;
};

export default PrivateRoute;