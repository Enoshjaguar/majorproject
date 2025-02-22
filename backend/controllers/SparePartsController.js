const SparePart = require('../models/SpareParts')

const addsparepart = async(req,res)=>{
    const {sparepartname,sparepartprice,sparepartcategory,sparepartdescription} = req.body
    const filepath = req.file?req.file.filename:undefined
    try {
        const sparepart = new SparePart({
            sparepartname,
            sparepartprice,
            sparepartcategory,
            sparepartdescription,
            sparepartimage:filepath
        })
        const savedsparepart = await sparepart.save()
        if(!savedsparepart){
            console.log("failed to save the sparepart")
            return res.status(500).json({message:"failed to save the sparepart"})
        }
        console.log("spare part saved successfuly",sparepart)
        return res.status(200).json({message:"spare part added successfully",sparepart})
    } catch (error) {
        console.error("error saving spare part",error)
        
    }
}
const getallspareparts = async(req,res)=>{
    try{
        const spareparts = await SparePart.find()
        if(!spareparts.length>0){
            console.log("no spare parts available")
            return res.status(500).json({message:"no spare parts available"})
        }
        console.log("all spareparts fetched")
        return res.status(200).json({message:'all spare parts fetched',spareparts})
    }
    catch (error) {
        console.error("error fetching spare parts",error)
        
    }
    
}

const deletesparepart = async(req,res)=>{
    const {id} = req.params
    try {
        const deletedsparepart = await SparePart.findByIdAndDelete(id)
        if(!deletedsparepart){
            console.log("faile to delete")
            return res.status(500).json({message:"spare part deleting failed"})
        }
        console.log("spare part deleted successfully")
        return res.status(200).json({message:"spare part deleted successfullly"})
    } catch (error) {
        console.error("error deleting the spare part",error)
        
    }
}

module.exports = {addsparepart,getallspareparts,deletesparepart}