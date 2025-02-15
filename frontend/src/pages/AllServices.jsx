import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_PATH } from '../data/Apipath'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const AllServices = () => {
    const [services,setServices] = useState([])
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
            {
                services && services.length > 0 ? (
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div className="service-card" key={index}>

                               <img className="service-image" src={`${API_PATH}/uploads/${service.image}`} alt="Service" />


                                <div className="service-info">
                                    <h2 className="service-name">{service.servicename}</h2>
                                    <h3 className="service-price">${service.price}</h3>
                                    <h4>{service.description}</h4>
                                    <h3>{service.category}</h3>
                                    
                                    <Link to={`/services/${service._id}`}>
                                    <button className="book-button">Book</button>
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
    );
}

export default AllServices