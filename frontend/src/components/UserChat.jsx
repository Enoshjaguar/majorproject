import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); 

function UserChat({ userId }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("join", userId);

        socket.on("private message", ({ senderId, message }) => {
            setMessages((prev) => [...prev, { senderId, message }]);
        });

        return () => {
            socket.off("private message");
        };
    }, [userId]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("private message", { senderId: userId, message });
            setMessages((prev) => [...prev, { senderId: userId, message }]);
            setMessage("");
        }
    };

    return (
        <div className="p-5">
            <h2>User Chat with Admin</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}><b>{msg.senderId}:</b> {msg.message}</li>
                ))}
            </ul>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default UserChat;
