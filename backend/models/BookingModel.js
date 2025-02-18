const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    serviceId : {type:mongoose.Schema.Types.ObjectId,ref:'Service',required:true},
    serviceName:{type:String,required:true},
    price : {type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    userName:{type:String,required:true},   
     userMobile: { type: String, required: false },
    userLocation: { type: String, required: true },
    bookingStatus: { type: String, default: "Pending" }
},{timestamps:true})

const Booking = mongoose.model('Booking',BookingSchema)
module.exports = Booking