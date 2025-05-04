import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Chat = ({ brokerId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        const messagesCollection = collection(db, 'messages');
        const messageSnapshot = await getDocs(messagesCollection);
        const messageList = messageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(messageList.filter(msg => msg.brokerId === brokerId)); // Filter messages for the specific broker
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'messages'), {
            brokerId,
            text: newMessage,
            timestamp: new Date()
        });
        setNewMessage('');
        fetchMessages(); // Refresh messages
    };

    useEffect(() => {
        fetchMessages();
    }, [brokerId]);

    return React.createElement('div', { className: 'container mt-5' },
        React.createElement('h2', { className: 'text-center' }, 'Chat with Broker'), // Centered heading
        React.createElement('ul', { className: 'list-group mb-3' }, // Bootstrap list group
            messages.map(message =>
                React.createElement('li', { key: message.id, className: 'list-group-item' },
                    message.text
                )
            )
        ),
        React.createElement('form', { onSubmit: handleSendMessage },
            React.createElement('div', { className: 'input-group' },
                React.createElement('input', {
                    type: 'text',
                    className: 'form-control',
                    placeholder: 'Type your message...',
                    value: newMessage,
                    onChange: (e) => setNewMessage(e.target.value),
                    required: true
                }),
                React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Send') // Send button
            )
        )
    );
};

export default Chat;