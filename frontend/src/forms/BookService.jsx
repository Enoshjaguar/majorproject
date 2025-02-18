import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_PATH } from '../data/Apipath'
import { jwtDecode } from 'jwt-decode'
const BookService = () => {

  const {id} = useParams()
  const [data,setData] = useState('')
  const [mobile,setMobile] = useState('')
  const [bookingstatus,setBookingstatus] = useState('')
  const [service,setService] = useState(null)
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
      console.log("this is user",user)
   
    setUser(user)
    
  
  }
  

const navigate = useNavigate()
  const getservidebyid = async()=>{
    console.log(id)
        
    try {
        const response = await axios.get(`${API_PATH}/services/getservicebyid/${id}`)
        if(response.status===200){
            const service = response.data.service
            console.log("single service fetched",service)
            setService(service)
        }
    } catch (error) {
        console.error("cannot fetch",error)
        alert("cannot fetch")
        
    }
}
  const getlatlongs = ()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success)
    }
    function success(data){
      const latitude = data.coords.latitude
      
      const longitude = data.coords.longitude
     
      console.log("this is coordiates",data.coords)
      console.log("this is latitute",data.coords.latitude)
      console.log("this is longitude",data.coords.longitude)
      
      getaddressfromloc(latitude,longitude) 
    }
  
  }
  const getaddressfromloc= async(latitude,longitude)=>{
    const apiKey = import.meta.env.VITE_LOCATION_IQ_KEY;
    console.log(apiKey)
    if (!latitude || !longitude) {
      console.error("Latitude and Longitude are required for API call.");
      return;
    }
    
    let url = `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
    const response = await axios.get(url)
    const data  = response.data
    console.log("this is the main data",data)
    
    setData(data.display_name)
    



  }

  const handlesubmit = async(e)=>{
    e.preventDefault()
    const formData = {
      serviceId:service._id,
      serviceName : service.servicename,
      price:service.price,
      userId:user._id,
      userName:user.username,
      userMobile:mobile,
      userLocation:data,
      bookingstatus:'pending'
    }
    try{
      const response = await axios.post(`${API_PATH}/book/newbooking`,formData)
      if(response.status===200)
{
  setBookingstatus("Booking successfull!")
  console.log(response.data)
  alert("booking successful")
  navigate('/services')
}    }
catch(error){
  setBookingstatus("Booking failed ")
  console.error("error submitting the booking",error)
}

  }

  useEffect(()=>{
    getservidebyid()
    getuserdata()
  },[id])
  
  return (
    <div className="booking-container">
      {
        service && (
          <h2>Booking for : {service.servicename}</h2>
        )
      }
      
      <form className="booking-form" onSubmit={handlesubmit}>
        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" placeholder="Enter your mobile number" onChange={(e)=>setMobile(e.target.value)}/>
        </div>
  
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter your address"
          />
        </div>
  
        <button type="submit" className="book-btn">
          Book
        </button>
      </form>
  
      <button onClick={getlatlongs} className="location-btn">
        Get Your Current Location
      </button>
    </div>
  );
  
}

export default BookService

