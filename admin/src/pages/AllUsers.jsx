import axios from 'axios'
import React from 'react'
import { API_PATH } from '../data/apipath'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import { Link, useParams } from 'react-router-dom'

const AllUsers = () => {
    const [users,setUsers] = useState([])
    const getallusers = async()=>{
        try {
            const response = await axios.get(`${API_PATH}/user//allusers`)
            console.log("this is response",response.data)
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }
   
    useEffect(()=>{
        getallusers()
      
    },[])
  return (
    <>
    <Navbar/>
    
    
    <div className="users-container">
    <h1 className='allusersheading'>All Users</h1>
    <p>Total users :{users.length}</p>
    {users.length > 0 ? (
      <div className="users-grid">
        {users.map((user, index) => (
          <div className="user-card" key={index}>
            <h1 className="user-name">{user.username}</h1>
            <h2 className="user-mobile">{user.mobile}</h2>
            <Link to={`/userbookings/${user._id}`}>
            <button className='confirm-btn'>Look</button>
            </Link>
            
          </div>
        ))}
      </div>
    ) : (
      <p className="no-users">No Users</p>
    )}
  </div>
  </>

  )
}

export default AllUsers