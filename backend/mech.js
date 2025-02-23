const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const userRegisterRoutes = require('./routes/userRoutes');
const serviceroutes = require('./routes/ServiceRoutes');
const bookingroutes = require('./routes/Bookingroutes');
const mechroutes = require('./routes/MechRoutes');
const sparepartroutes = require('./routes/SparePartRoutes');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const port = 3122;
const app = express();

// Server setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use('/user', userRegisterRoutes);
app.use('/services', serviceroutes);
app.use('/book', bookingroutes);
app.use('/mech', mechroutes);
app.use('/spareparts', sparepartroutes);
app.use('/uploads', express.static('uploads'));

// Store users with their socket IDs
let users = new Map();

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_chat", (userId) => {
        users.set(userId, socket.id);
        console.log(`User ${userId} joined with socket ID: ${socket.id}`);
    });

    socket.on("send_message", (data) => {
        console.log("Message received:", data);

        // Broadcast message to admin
        io.emit("receive_message", data);

        // If admin replies, send message directly to the user
        if (data.sender === "Admin" && users.has(data.userId)) {
            io.to(users.get(data.userId)).emit("receive_message", data);
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        for (let [userId, id] of users) {
            if (id === socket.id) {
                users.delete(userId);
                break;
            }
        }
    });
});

// MongoDB connection
console.log("Mongo URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error connecting to the database:", err));

// Start the server
server.listen(port, () => {
    console.log('Server is running at port', port);
});
