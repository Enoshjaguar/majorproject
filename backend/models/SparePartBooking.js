const mongoose = require('mongoose')
const sparepartbookingschema = new mongoose.Schema({
    ProductName : {
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true
    },
    userMobile:{
        type:String,
        required:true
    },
    ProductPrice:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
 
})

const  SparePartBooking = mongoose.model('sparepartbooking',sparepartbookingschema)
module.exports = SparePartBooking