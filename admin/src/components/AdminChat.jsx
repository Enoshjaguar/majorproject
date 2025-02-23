import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Ensure correct backend URL
const socket = io("http://localhost:3122", { autoConnect: false });

function AdminChat() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.connect();

    // Join admin room
    socket.emit("join", "admin_room");

    // Event listener for messages
    const handlePrivateMessage = ({ senderId, message }) => {
      setMessages((prev) => [...prev, { senderId, message }]);
    };

    socket.on("private message", handlePrivateMessage);

    return () => {
      // Cleanup to avoid multiple listeners
      socket.off("private message", handlePrivateMessage);
    };
  }, []);

  const sendMessageToUser = () => {
    if (message.trim() && userId.trim()) {
      const msgData = { userId, message };

      // Send message only once
      socket.emit("admin message", msgData);

      // Update UI (but prevent duplicate display)
      setMessages((prev) => [...prev, { senderId: "Admin", message }]);

      setMessage("");
    }
  };

  return (
    <div className="p-5">
      <h2>Admin Chat</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={`${msg.senderId}-${index}`}>
            <b>{msg.senderId}:</b> {msg.message}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessageToUser}>Send</button>
    </div>
  );
}

export default AdminChat;
