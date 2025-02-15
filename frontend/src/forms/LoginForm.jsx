import React, { useState } from 'react'
import Navbar from '../pages/Navbar' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_PATH } from '../data/Apipath'
const LoginForm = () => {
  const [mobile,setMobile] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
 const navigation = (path)=>{
  navigate(path)
 }

 const handlesubmit = async(e)=>{
  e.preventDefault()
  try {
    const formData = {
      mobile,password
    }

    const response = await axios.post(`${API_PATH}/user/userlogin`,formData,{
      headers:{
        'Content-Type':'application/json'
      }
    })

    if(response.status===200){
      
      alert("login successful")
      const token = response.data.token
      localStorage.setItem('token',token)
    
      navigate('/')
    }
    else{
      alert("login failed")
    }
   

  } catch (error) {
    console.error("failed to login",error)
    alert("login failed")
    
  }
 }

 
  return (
    <>
    <Navbar/>
    <div className="signup-container">
    <div className="formsection">
      <form action="" onSubmit={handlesubmit}>
        <h1>LogIn</h1>
        <label htmlFor="">Mobile : </label>
        <input type="text" placeholder='mobile' value={mobile} onChange={(e)=>setMobile(e.target.value)}/><br /><br />
        
        <label htmlFor="">Password : </label>
        <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br /><br />
        <button className='signupbtn' type='submit'>LogIn</button>
        <p>don't have an account <span onClick={()=>{
          navigation('/signup')
        }}>Signup</span></p>
      </form>
    </div>
   </div>
   </>
  )
}

export default LoginForm