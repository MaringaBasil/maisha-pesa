import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp();

export const calculateRevenueShare = functions.firestore
    .document('orders/{orderId}')
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        if (newValue.status === 'Delivered') {
            const revenue = newValue.totalAmount;
            const shares = {
                sourcingAgent: revenue * 0.2,
                investor: revenue * 0.5,
                platform: revenue * 0.3,
            };

            await admin.firestore().collection('revenueShares').add({
                orderId: context.params.orderId,
                shares,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
        }
    });