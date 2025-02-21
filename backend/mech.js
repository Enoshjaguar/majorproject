const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const {Server} = require('socket.io')
const userRegisterRoutes = require('./routes/userRoutes')
const serviceroutes = require('./routes/ServiceRoutes')
const bookingroutes = require('./routes/Bookingroutes')
const mechroutes = require('./routes/MechRoutes')
const sparepartroutes = require('./routes/SparePartRoutes')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const port = 3122
const app = express()

//code related to socket.io
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

//middlewares
app.use(express.json())
app.use(cors())
app.use('/user',userRegisterRoutes)
app.use('/services',serviceroutes)
app.use('/book',bookingroutes)
app.use('/mech',mechroutes)
app.use('/spareparts',sparepartroutes)
app.use('/uploads',express.static('uploads'))

//mongoose connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("database connected successfully"))
    .catch((err)=>console.log("error connecting to the database ",err))

//again socket code
let users = {} //empty object for users to join the room
io.on("connection",(socket)=>{
    console.log("A user connected",socket.id)

    //user join the room
    socket.on("join",(userId)=>{
        users[userId] = socket.id
        socket.join(userId)
        console.log(`user ${userId} joined room ${userId}`)
    })

    //user sends a message

    socket.on("private message",({senderId,message})=>{
       io.to("admin_room").emit("privare message",{senderId,message})
    })
    //admin send message to a user

    socket.on("admin message",({userId,message})=>{
        if(users[userId]){
            io.to(users[userId]).emit("private message",{senderId:"Admin",message})
        }
    })

    //handle disconnect 
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        for (let userId in users){
            if(users[userId]===socket.id){
                delete users[userId]
                break
            }
        }
    })
})
app.listen(port,()=>{
    console.log('server is running at',port)
})
