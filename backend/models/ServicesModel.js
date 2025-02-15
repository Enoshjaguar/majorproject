const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    servicename:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:[{
            type:String,
            enum:["bike",'car','auto']
        }]
    },
    image:{
        type:String,
        required:true
    }
})

const Service = new mongoose.model('Service',ServiceSchema)
module.exports = Service