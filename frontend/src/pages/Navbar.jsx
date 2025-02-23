import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const handlenavigation = (path)=>{
    navigate(path)

  }
  const handlelogout = ()=>{
    const isconfirmed = confirm("are you ok to log out")
    if(!isconfirmed){
      return
    }
    localStorage.removeItem('token')
    alert("user logged out")
    navigate('/')
    window.location.reload()
   
  }
  const token = localStorage.getItem('token')
  return (
    <div className='navbar'>
        <img src="images/rrlogogreen.webp" alt="" />
        <div className="nav-section">
            
        <ul>
         
            <li onClick={()=>handlenavigation('/')}>Home</li>
            {
              token?(<>
                <li onClick={()=>handlenavigation('/services')}>Services</li>
                <li onClick={()=>handlenavigation('/bookings')}>MyBookings</li>
                <li onClick={()=>handlenavigation('/allspareparts')}>Spare Parts</li>
                <li onClick={()=>handlenavigation('/chat')}>Chat</li>
                <li onClick={()=>handlelogout()}>LogOut</li>
              
                </>
              ):(
                <>
                <li>About us</li>
                <li onClick={()=>handlenavigation('/login')}>Login</li>
                <li onClick={()=>handlenavigation('/signup')}>SignUp</li>
                </>
              )
            }
            
           
        </ul>

        </div>
        
    </div>
  )
}

export default Navbar