const mongoose = require('mongoose')

const sparepartSchema = new mongoose.Schema({
    sparepartname:{
        type:String,
        required:true
    },
    sparepartprice:{
        type:String,
        required:true
    },
    sparepartdescription:{
        type:String,
        required:true
    },
    sparepartimage:{
        type:String,
        required:false
    }
})

const sparepart = mongoose.model('sparepart',sparepartSchema)
module.exports = sparepart