const Mechanic = require('../models/MechanicModel')

const addmechanic = async (req, res) => {
    try {
      console.log("this is req",req.body); // Debugging line
  
      const { mechanicmobile, mechanicname, mechanicexpertise, yearsofexp } = req.body;
  
      if (!mechanicmobile || !mechanicname || !mechanicexpertise || !yearsofexp) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const newMechanic = new Mechanic({
        mechanicmobile,
        mechanicname,
        mechanicexpertise,
        yearsofexp
      });
  
      await newMechanic.save();
      res.status(200).json({ message: "Mechanic saved successfully!" });
  
    } catch (error) {
      console.error("Error saving mechanic:", error);
      res.status(500).json({ message: "Server error, unable to save mechanic." });
    }
  };
  

module.exports = {addmechanic}