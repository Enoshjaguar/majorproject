import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function AdminChat() {
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.emit("join", "admin_room");

        socket.on("private message", ({ senderId, message }) => {
            setMessages((prev) => [...prev, { senderId, message }]);
        });

        return () => {
            socket.off("private message");
        };
    }, []);

    const sendMessageToUser = () => {
        if (message.trim() && userId.trim()) {
            socket.emit("admin message", { userId, message });
            setMessages((prev) => [...prev, { senderId: "Admin", message }]);
            setMessage("");
        }
    };

    return (
        <div className="p-5">
            <h2>Admin Chat</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}><b>{msg.senderId}:</b> {msg.message}</li>
                ))}
            </ul>
            <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessageToUser}>Send</button>
        </div>
    );
}

export default AdminChat;
