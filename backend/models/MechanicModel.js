const mongoose = require('mongoose')
const mechanicSchema = new mongoose.Schema({
    mechanicname:{type:String,required:true},
    mechanicmobile:{type:String,required:true},
    mechanicexpertise:{type:String,required:true},
    yearsofexp:{type:String,required:true}
})

const mechanic = mongoose.model('mechanic',mechanicSchema)
module.exports = mechanic