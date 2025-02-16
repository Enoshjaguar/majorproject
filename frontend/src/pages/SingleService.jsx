import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_PATH } from '../data/Apipath'

const SingleService = () => {
    const [service,setService] = useState('')
    const {id} = useParams()
    const getservidebyid = async()=>{
        
        try {
            const response = await axios.get(`${API_PATH}/services/getservicebyid/${id}`)
            if(response.status===200){
                const service = response.data.service
                console.log("single service fetched",service)
                setService(service)
            }
        } catch (error) {
            console.error("cannot fetch")
            alert("cannot fetch")
            
        }
    }

    useEffect(()=>{
        getservidebyid()
    },[])

    const deleteservice = async(id)=>{
        
        try{

            const response = await axios.delete(`${API_PATH}/services/deleteservice/${id}`)
            if(response.status===200){
                console.log("service deleted successfully")
                alert("service deleted successfully")
                window.history.back()
            }
            else{
                alert("failed to delete")
            }
        }
        catch(err){
            console.error("cannot delete",err)
            alert("cannot delete")
        }
       
    }
   
  return (
    <div>
        {
            service?(
                
            
                        <div className="service-container">
                            <div className="service-card">
                                <div className="image-container">
                                    <img src={`${API_PATH}/uploads/${service.image}`} alt="Service" />
                                </div>
                                <div className="service-info">
                                    <h1 className="service-title">{service.serviceName}</h1>
                                    <h2 className="service-price">₹{service.price}</h2>
                                    <p className="service-description">{service.description}</p>
                                    <button className="book-now-btn">Book Now</button>
                                    <button onClick={()=>{
                                        deleteservice(service._id)
                                    }} className="delete-btn">Delete</button>
                                </div>
                            </div>
                        </div>
        
                

                
            ):(
                <p>No service available</p>
            )
        }
    </div>
  )
}

export default SingleService