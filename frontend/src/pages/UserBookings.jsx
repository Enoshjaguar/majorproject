import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { API_PATH } from '../data/Apipath'
import Navbar from './Navbar'

const UserBookings = () => {
    const [user,setUser] = useState('')
    const [bookings,setBookings] = useState([])
    const getuserdata = async()=>{
        const token = localStorage.getItem('token')
        if(!token){
          console.log("no token")
          return
          
         
        }
          const decoded = jwtDecode(token)
          const userid = decoded.userId
          const response = await axios.get(`${API_PATH}/user/getuserbyid/${userid}`)
          const user = response.data.user
       
        setUser(user)

        try {
            const bookingsresponse = await axios.get(`${API_PATH}/book/getbookingsbyuser/${userid}`)
            if(bookingsresponse.status===200){
                console.log("this is response",bookingsresponse.data.userbookings)
                  
                    setBookings(bookingsresponse.data.userbookings)
    
            }
            
        } catch (error) {
            console.error("error getting user bookings")
            alert("bookings fetching failed")
            
        }
       
        
      
      }

     
      useEffect(()=>{
        getuserdata()
     
      },[])
  return (
    <>
    <Navbar/>
    <div className="bookings-container">
    <h1 className="title">📅 My Bookings</h1>
    {
        bookings.length > 0 ? (
            <div className="bookings-grid">
                {bookings.map((booking, index) => (
                    <div className="booking-card" key={index}>
                        <h2 className="service-name">{booking.serviceName}</h2>
                        <p className="price">💰 Price: ₹{booking.price}</p>
                        <p className="location">📍 Location: {booking.userLocation}</p>
                        <p className="date">📅 Date: {booking.createdAt.split('T')[0]}</p>
                    </div>
                ))}
            </div>
        ) : (
            <p className="no-bookings">No bookings found</p>
        )
    }
</div>
</>

  )
}

export default UserBookings