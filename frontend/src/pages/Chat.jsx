import React, { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { API_PATH } from '../data/Apipath';
import Navbar from './Navbar';


// Socket instance outside the component to avoid re-creation on re-renders
const socket = io('http://localhost:3122', {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

const Chat = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch user data
    const getUserData = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }

        setLoading(true);
        try {
            const decoded = jwtDecode(token);
            const id = decoded.userId;
            const response = await axios.get(`${API_PATH}/user/getuserbyid/${id}`);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Join chat when user is set
    useEffect(() => {
        if (user) {
            socket.emit('join_chat', user._id);
        }
    }, [user]);

    // Listen for incoming messages
    useEffect(() => {
        const handleMessage = (data) => {
            // Check if the message already exists in the state to avoid duplicates
            setMessages((prev) => {
                const isDuplicate = prev.some(
                    (msg) => msg.userId === data.userId && msg.text === data.text && msg.sender === data.sender
                );
                return isDuplicate ? prev : [...prev, data];
            });
        };

        // Add the event listener
        socket.on('receive_message', handleMessage);

        // Cleanup function to remove the listener
        return () => {
            socket.off('receive_message', handleMessage);
        };
    }, []); // Empty dependency array ensures this runs only once

    // Fetch user on component mount
    useEffect(() => {
        getUserData();
    }, [getUserData]);

    // Send message function
    const sendMessage = () => {
        if (!user) {
            alert('User not found. Please log in again.');
            return;
        }
        if (!message.trim()) {
            alert('Message cannot be empty.');
            return;
        }

        const chatData = { sender: user.username, userId: user._id, text: message };
        socket.emit('send_message', chatData);
        setMessage('');
    };

    return (
        <>
            <Navbar />
            <div className="chat-container">
                <h2 className="chat-header">Chat with Admin</h2>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={`${msg.userId}-${Date.now()}-${index}`}
                            className={`message ${msg.sender === user?.username ? 'user-message' : 'admin-message'}`}
                        >
                            <strong>{msg.sender}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input-container">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        aria-label="Type your message"
                        className="chat-input"
                    />
                    <button onClick={sendMessage} className="chat-send-button" aria-label="Send message">
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chat;