import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../App.css'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
import { API_PATH } from '../data/Apipath'

const Homepage = () => {
  const [user,setUser] = useState('')



const getuserdata = async()=>{
  const token = localStorage.getItem('token')
  if(!token){
    console.log("no token")
    return
    
   
  }
    const decoded = jwtDecode(token)
    const id = decoded.userId
    const response = await axios.get(`${API_PATH}/user/getuserbyid/${id}`)
    const user = response.data.user
 
  setUser(user)
  

}

useEffect(()=>{
  getuserdata()
},[])

 
  return (
    <div>
      <Navbar/>
     
      <div className="homepage">
        
      {
        user?(
          <h1>{user.username}</h1>
        ):(
          <h1>Welcome</h1>
        )
      }
     
        <h1 className='titlecard'>24/7 Car and Bike <br /> Mechanic Repair <br />Services</h1>
        <img src="images/homepageimg.png" alt="no img found" />
        <button className='bookbtn'>Book Service</button>
      </div>
      <div className="homepagematter">
        <h2>What do we do?</h2>
        <p>Experience convenience with our bike and car minor repair service! Our skilled technicians arrive equipped with the <br /> necessary tools and expertise to swiftly address minor issues with your vehicle on the spot, ensuring your vehicle stays in <br /> optimal condition for your journey ahead.</p>
      </div>

      <div className="stepsmaindiv">
        <div className="stepssinglediv">
        <img src="images/img1.png" alt="image loading failed" />
        <p>Diagnose the vehicle throughly <br /> to narrow down the problem</p>
        </div>
        <div className="stepssinglediv">
        <img src="images/img2.png" alt="image loading failed" />
        <p>Fix the problem with right <br /> solution for spot mobilisation</p>
        </div>
        <div className="stepssinglediv">
        <img src="images/img3.png" alt="image loading failed" />
        <p>Recheck the vehicle for any <br /> other warning & issues</p>
        </div>
        <div className="stepssinglediv">
        <img src="images/img4.png" alt="image loading failed" />
        <p>Provide maintenance tips & <br /> recommendations</p>
        </div>
        <div className="stepssinglediv">
        <img src="images/img5.png" alt="image loading failed" />
        <p>We accept payment through <br /> online, payTM, UPI etc</p>
        </div>
      </div>
      <h1 className='whyus'>Why Choose Us?</h1>
      <div className="topservices">
        
        <div className="topservicessingle">
          <h3>Fast Rescue</h3>
          <img src="images/gif1.gif" alt="no image found" />
        </div>
        <div className="topservicessingle">
          <h3>Multi Locations</h3>
          <img src="images/gif2.gif" alt="no image found" />
        </div>
        <div className="topservicessingle">
          <h3>Team Force</h3>
          <img src="images/gif3.gif" alt="no image found" />
        </div>
        <div className="topservicessingle">
          <h3>Master Mechs</h3>
          <img src="images/gif4.gif" alt="no image found" />
        </div>
      </div>

      
       
    </div>
  )
}

export default Homepage