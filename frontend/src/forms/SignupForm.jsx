import React, { useState } from 'react'
import '../App.css'
import { API_PATH } from '../data/Apipath'
import {useNavigate} from 'react-router-dom'
import Navbar from '../pages/Navbar'
import axios from 'axios'
const SignupForm = () => {
  const navigate = useNavigate()
   const navigation = (path)=>{
    navigate(path)
   }

   const [username,setUserName] = useState('')
   const [mobile,setMobile] = useState('')
   const [password,setPassword] = useState('')

   const handlesubmit = async(e)=>{
    e.preventDefault()
    try{
      const formData = new FormData()
      formData.append('username',username)
      formData.append('mobile',mobile)
      formData.append('password',password)

      const response = await axios.post(`${API_PATH}/user/adduser`,formData,{
        headers:{
          'Content-Type':'application/json'
        }
      })

      if(response.status===200){
        console.log("user registered successfully")
        alert("user registered successfully")
        navigate('/login')
      }
    }
    catch(err){
      console.log("error registering",err)
    }




   }

  return (
    <>
    <Navbar/>
   <div className="signup-container" >
    <div className="formsection" onSubmit={handlesubmit}>
      <form action="" >
        <h1>Sign Up</h1>
        <label htmlFor="">Username : </label>
        <input type="text" placeholder='username' onChange={(e)=>setUserName(e.target.value)}/><br /><br />
        <label htmlFor="">Mobile : </label>
        <input type="text" placeholder='mobile' id='emailinput' onChange={(e)=>setMobile(e.target.value)}/><br /><br />
        <label htmlFor="">Password : </label>
        <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/><br /><br />
        <button className='signupbtn' type='submit'>SignUp</button>
        <p>have an account <span onClick={()=>{
          navigation('/login')
        }}>Login</span></p>
      </form>
    </div>
   </div>
   </>
  )
}

export default SignupForm