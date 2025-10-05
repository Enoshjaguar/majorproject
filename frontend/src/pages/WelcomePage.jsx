import React from 'react'
import { useLocation } from 'react-router-dom'
const WelcomePage = () => {
 const location = useLocation()
 const user = location.state?.user
 console.log('Location state:', location.state); 
console.log('User:', user); 

return (
  <div>
    <h1>Welcome to the Welcome Page</h1>
    {user ? (
      <div>
        <p>Mobile number: {user.mobile}</p>
        <p>num : {user.mobile}</p>
      </div>
    ) : (
      <p>No user data available</p>
    )}
  </div>
);
}

export default WelcomePage