const mongoose = require('mongoose')
const Booking = require('../models/BookingModel')
const bookservice = async(req,res)=>{
    try {
        const {serviceId,serviceName,price,userId,userName,userMobile,userLocation,bookingStatus} = req.body
        const validserviceid =new mongoose.Types.ObjectId(serviceId)
        const validuserid =new mongoose.Types.ObjectId(userId)
        const newBooking = new Booking({
            serviceId:validserviceid,
            serviceName,
            price,
            userId:validuserid,
            userName,
            userMobile,
            userLocation,
            bookingStatus:'pending'
        })
        await newBooking.save()
        return res.status(200).json({message:"Booking successfull",booking:newBooking})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to create booking" ,error});
        
    }
}

const getallbookings = async(req,res)=>{
    try {
        const allbookings = await Booking.find()
        console.log("all bookings fetched")
        return res.status(200).json({message:"all bookings fetched",allbookings})
    } catch (error) {
        console.error("bookings fetching failed",error)
        return res.status(500).json({message:"booking fetching failed"})
        
    }
}
const getbookingsbyuser = async(req,res)=>{
    try{
        const {userid} = req.params
        
        const userbookings = await Booking.find({userId:userid})
        if(!userbookings.length){
            return res.status(404).json({ message: "No bookings found for this user" ,userid:userid});
        }
        console.log("user bookings fetched")
        return res.status(200).json({message:"all bookings of the user fetched",userbookings})
    }
    catch (error) {
        
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ message: "Internal Server Error" ,error:error.message});
    }
}

module.exports = {bookservice,getallbookings,getbookingsbyuser}