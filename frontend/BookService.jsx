import axios from 'axios'
import React, { useState } from 'react'

const BookService = () => {
  const [latitude,setLatitude] = useState('')
  const [longitude,setLongitude] = useState('')
  
  const [data,setData] = useState('')
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
    const apiKey = "pk.a576b281e882f67e4fb6019414135a79";
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
  return (
    <div>
        
       <h1>{data}</h1>
        <button onClick={getlatlongs}>Click</button>
        
    </div>
  )
}

export default BookService