import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_PATH } from '../data/apipath'
import { useParams } from 'react-router-dom'

const AllUserBookings = () => {
    const {id} = useParams()
    const [user,setUser] = useState('')
    const [bookings,setBookings] = useState([])
    const getalluserbookings = async()=>{
        
        try {
            const response = await axios.get(`${API_PATH}/book/getbookingsbyuser/${id}`)
            console.log("this is repsonse",response.data.userbookings)
            setBookings(response.data.userbookings)
        } catch (error) {
            console.log("error fetching bookings",error)
        }
    }
    const getuserdetails = async()=>{
        
        try {
          const response = await axios.get(`${API_PATH}/user//getuserbyid/${id}`)
        
          setUser(response.data.user)
        } catch (error) {
          console.log(error)
          
        }
      }
    useEffect(()=>{
        getuserdetails()
        getalluserbookings()
    },[])
  return (
    <>{
        user?(
            <div className="item">
                 <h1 className='uname'>{user.username}</h1>
                 <h4 className='umob'>{user.mobile}</h4>
            </div>
           
        ):(
            <p>No user</p>
        )
    }
<div className="bookings-container">
  {bookings.length > 0 ? (
    <div className="bookings-grid">
      {bookings.map((booking, index) => (
        <div className="booking-card" key={index}>
          <div className="booking-info">
            <h2 className="service-name">{booking.serviceName}</h2>
            <span className={`status ${booking.bookingStatus.toLowerCase()}`}>
              {booking.bookingStatus}
            </span>
          </div>

          <div className="booking-details">
            <p className="price">💲 {booking.price}</p>
            <p className="date">📅 {booking.createdAt.split("T")[0]}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-bookings">No bookings for this user</p>
  )}
</div>
</>


  )
}

export default AllUserBookings