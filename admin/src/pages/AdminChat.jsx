import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Navbar from './Navbar';


const socket = io("http://localhost:3122", { 
    autoConnect: false, 
    reconnection: true, 
    reconnectionAttempts: 5, 
    reconnectionDelay: 1000 
});

const AdminChat = () => {
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        socket.connect();

        // Fetch previous messages for the selected user
        const fetchMessages = (userId) => {
            socket.emit('get_messages', userId);
        };

        // Listen for incoming messages
        const handleMessage = (data) => {
            setMessages((prev) => [...prev, data]);
        };

        // Listen for loaded messages
        const handleLoadMessages = (loadedMessages) => {
            setMessages(loadedMessages);
        };

        socket.on("receive_message", handleMessage);
        socket.on("load_messages", handleLoadMessages);
        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

        // Cleanup
        return () => {
            socket.off("receive_message", handleMessage);
            socket.off("load_messages", handleLoadMessages);
            socket.disconnect();
        };
    }, []);

    // Fetch messages when a user is selected
    useEffect(() => {
        if (selectedUser) {
            socket.emit('get_messages', selectedUser);
        }
    }, [selectedUser]);

    const sendReply = () => {
        if (!reply.trim() || !selectedUser) {
            alert("No user selected or empty reply");
            return;
        }

        const replyData = { sender: 'Admin', userId: selectedUser, text: reply };
        socket.emit("send_message", replyData);
        setReply('');
    };

    return (
        <>
            <Navbar />
            <div className="chat-container">
                <h2 className="chat-header">Admin Chat Panel</h2>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={msg._id || `${msg.userId}-${index}`}
                            className={`message ${msg.sender === 'Admin' ? 'admin-message' : 'user-message'}`}
                            onClick={() => setSelectedUser(msg.userId)}
                        >
                            <strong>{msg.sender}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
                {selectedUser && (
                    <div className="chat-input-container">
                        <input
                            type="text"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Type message"
                            aria-label="Type your reply"
                            className="chat-input"
                        />
                        <button onClick={sendReply} className="chat-send-button" aria-label="Send reply">
                            Send
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminChat;