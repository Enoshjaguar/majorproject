const mongoose = require('mongoose')

const newUserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    mobile:{type:Number,required:true},
    password:{type:String,required:true}
})

const User= mongoose.model('user',newUserSchema)
module.exports = User