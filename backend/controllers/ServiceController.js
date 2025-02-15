const Service = require('../models/ServicesModel')

const addNewService = async(req,res)=>{
    const {servicename,description,price,category} = req.body
    const filepath = req.file?req.file.filename:undefined
   try{
    const service = await Service.findOne({servicename})
    if(service){
        console.log('service already available');
        
        return res.status(500).json({message:"service already available"})
    }
    const newservice = new Service({servicename,description,price,category,image:filepath})
    await newservice.save()
    console.log("service added succesfully");
    
    return res.status(200).json({message:"service added successfully"})

   }
  catch(err){
    console.log("error adding the service",err)
    return res.status(500).json({message:'internal server error vachinroy'})
  }
}

const deleteservice = async(req,res)=>
{
  const serviceid = req.params.id
  try {
    const deletedservice = await Service.findByIdAndDelete(serviceid)
    if (!deletedservice){
      console.log("cannot find service")
      return res.status(500).json({message:"service deleting failed..."})
    }
    console.log("service deleted successfullt")
    return res.status(200).json({message:"service deleted successfully"})
  } catch (error) {
    console.error("error deleting service")
    return res.status(500).json({message:"service deleting failed..."})

    
  }
 
}

const getservicebyid = async(req,res)=>{
  const id = req.params.id
  try {
    const service = await Service.findById(id)
    if(!service){
      console.log("no service available")
      return res.status(500).json({message:"no service available"})
    }
    console.log("single service fetched")
    return res.status(200).json({message:"service fetched by id",service})
  } catch (error) {
    console.error("error fetching service by id")
    return res.status(500).json({message:"service fetching failed"})
    
  }
}

const getallservices = async(req,res)=>{
  const allservices = await Service.find()
  console.log("all services fetched")
  return res.status(200).json(allservices)
}

module.exports = {addNewService,deleteservice,getallservices,getservicebyid}