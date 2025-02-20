import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_PATH } from '../data/apipath'
import Navbar from './Navbar'
const AllMechs = () => {
    const [mechs,setMechs] = useState([])
    const getallmechs = async()=>{
        try {
            const response = await axios.get(`${API_PATH}/mech/allmechs`)
            if(response.status===200){
                console.log("mechanics fetched successfully!!!",response.data.mechanics)
                setMechs(response.data.mechanics)
            }
        } catch (error) {
            console.error(error)
            
        }
    }
    useEffect(()=>{
        getallmechs()
    },[])
  return (
    <>
    <Navbar/>
    <div className="mech-container">
    {mechs.length > 0 ? (
      mechs.map((mech, index) => (
        <div className="mech-card" key={index}>
          <h1 className="mech-name">🔧 {mech.mechanicname}</h1>
          <h2 className="mech-mobile">📞 {mech.mechanicmobile}</h2>
          <h3 className="mech-expertise">⚙️ {mech.mechanicexpertise.replace(/_/g, " ").split(" ") .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h3>
          <h4 className="mech-exp">⭐ {mech.yearsofexp} Years Experience</h4>
        </div>
      ))
    ) : (
      <p className="no-mechs">❌ No mechanics found</p>
    )}
  </div>
  </>
  
  
  
  )
}

export default AllMechs