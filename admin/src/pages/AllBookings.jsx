import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_PATH } from '../data/apipath'
import Navbar from './Navbar'

const AllBookings = () => {
    const [bookings,setBookings] = useState([])
    const getallbookings = async()=>{
        try {
            const response = await axios.get(`${API_PATH}/book/allbookings`)
            if(response.status===200){
                setBookings(response.data.allbookings)
                console.log(response.data.allbookings)
                
                
            }
        } catch (error) {
            console.log("error fetching bookings",error)
           
            
        }
    }
    useEffect(()=>{
        getallbookings()
    },[])
  return (
    <>
    <Navbar/>
    <div className="bookings-container">
      <h1 className="heading">All Bookings</h1>
      {bookings.length > 0 ? (
        <div className="bookings-grid">
          {bookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <div className="booking-info">
                <h2 className="user-name">{booking.userName}</h2>
                <p className="service-name">{booking.serviceName}</p>
                <p className="user-mobile">📞 {booking.userMobile}</p>
                <p className="price">💲 {booking.price}</p>
                <p className="date">📅 {booking.createdAt.split("T")[0]}</p>
              </div>
              <div className="buttons">
                <button className="confirm-btn">Confirm</button>
                <button className="cancel-btn">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-bookings">No bookings available</p>
      )}
    </div>
    </>
  )
}

export default AllBookings