import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { API_PATH } from '../data/apipath'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
const AllServices = () => {
    const [services,setServices] = useState([])
    const [searchTerm,setSearchTerm] = useState('')

    const filteredservices = services.filter((service)=>{
       return service.servicename.toLowerCase().includes(searchTerm.toLowerCase())
    })
    const getallservices = async()=>{
        try {
            const response = await axios.get(`${API_PATH}/services/allservices`)
            const allservices = response.data
            console.log("these are services",allservices)
            setServices(allservices)
        } catch (error) {
            
            console.error(error)
        }
    }
    useEffect(()=>{
        getallservices()
    },[])
  return (
    <>
    <Navbar/>
    
    <div className="services-container">
    <h1 className="title">Our Services</h1>
    <input type="text" placeholder='search for a service'
    className='search-bar'
    value={searchTerm}
    onChange={(e)=>setSearchTerm(e.target.value)}
    />
    {
        filteredservices.length > 0 ? (
            <div className="services-grid">
                {filteredservices.map((service, index) => (
                    <div className="service-card" key={index}>

                       <img className="service-image" src={`${API_PATH}/uploads/${service.image}`} alt="Service" />


                        <div className="service-info">
                            <h2 className="service-name">{service.servicename}</h2>
                            <h3 className="service-price">${service.price}</h3>
                            
                            
                            <h3>{service.category}</h3>
                            <Link to={`/service/${service._id}`}>
                            <button className="book-button">Verify</button>
                            </Link>
                            
                           
                        </div>
                        
                    </div>
                ))}
            </div>
        ) : (
            <p className="no-services">No services available</p>
        )
    }
</div>
</>
  )
}

export default AllServices