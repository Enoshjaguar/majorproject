const bcrypt = require('bcrypt')
const User = require('../models/userRegistermodel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()
const secretkey = process.env.SECRET_KEY
const addnewUser = async(req,res)=>{
    const {username,mobile,password} = req.body
    try {
        const user = await User.findOne({mobile})
        if(user){
            console.log("user already exists")
            return res.status(404).json({message:"user already exists"})
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const newUser = new User({username,mobile,password:hashedpassword})
        await newUser.save()
        console.log('user registered successfully')
        return res.status(200).json({message:"user registered successfully"})
    } catch (error) {
        console.log('user registration failed')
        return res.status(500).json({message:"user registration failed"})
        
    }
}


const userLogin = async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const user = await User.findOne({ mobile });
    
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Incorrect mobile or password");
      return res.status(404).json({ message: "Incorrect password or mobile number" });
    }

   
    const token = jwt.sign({ userId: user._id }, secretkey, { expiresIn: '10s' });

    console.log("User login successful with the mobile", mobile, token);

    return res.status(200).json({
      message: "User login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      token,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getallusers = async(req,res)=>{
    const allusers = await User.find()
    console.log(allusers)
    res.json(allusers)
}
const getuserbyid = async(req,res)=>{
  const {id} = req.params 
  try {
    const user = await User.findById(id)
    if(!user){
      console.log("user not found")
      return res.status(500).json({message:"user not found"})
    }
    console.log("user found",user)
    return res.status(200).json({message:"user found",user})
  } catch (error) {
    console.error("error finding user", error)
    return res.status(500).json({message:"user not found"})
    
  }
}

module.exports = {addnewUser,userLogin,getallusers,getuserbyid}