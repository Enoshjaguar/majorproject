const Sparepart = require('../models/SparePartBooking')

const booksparepart = async(req,res)=>{
    const {ProductName, UserName,userMobile,ProductPrice,Address} = req.body
    try{
        const booknewsparepart = new Sparepart({
            ProductName,
            UserName,
            userMobile,
            ProductPrice,
            Address,
            
        })
        const newbooking = booknewsparepart.save()
        if(!newbooking){
            console.log("cannot book the spare part")
            return res.status(500).json({message:"cannot book the spare part"})
        }
        console.log("spare part booked successfully")
        return res.status(200).json({message:"spare part booked successfully!!!!"})
    }
    catch(error){
        console.log("error booking spare part",error)

    }
}

module.exports = {booksparepart}