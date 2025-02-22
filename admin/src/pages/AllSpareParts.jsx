import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { API_PATH } from '../data/apipath'
import axios from 'axios'
import Navbar from './Navbar'

const AllSpareParts = () => {
    const [spareparts,setSpareParts] = useState([])
    const getallspareparts = async()=>{
        try{
            const response = await axios.get(`${API_PATH}/spareparts/allspareparts`)
        if(response.status===200){
            console.log('spare parts fetched successfully',response.data)
           
            setSpareParts(response.data.spareparts)
        }
        else{
            console.log("spareparts fetching failed")
            alert("spareparts fetching failed")
        }
        }
        catch(error){
            console.error("error fetching spareparts",error)
            alert("error fetching spareparts")
        }
        
    }
    
    const deletesparepart = async(id)=>{
        
        try{
            const response = await axios.delete(`${API_PATH}/spareparts/deletesparepart/${id}`) 
            if(response.status===200){
                alert("spare part deleted successfully")
                window.location.reload()
            }
            else{
                alert("product deleting failed")
            }
            console.log("this is tyhe id to be deleted",id)
        }
        catch(error){
            console.log("error deleting spare part",error)
            alert("error delting spare part")
        }
}
    useEffect(()=>{
        getallspareparts()
    },[])
  return (
    <>
    <Navbar/>
    <div className="sparepart-list-container">
        {spareparts.length > 0 ? (
            <div className="sparepart-grid">
                {spareparts.map((sparepart) => (
                    <div className="sparepart-card" key={sparepart._id}>
                        <div className="sparepart-image-wrapper">
                            <img 
                                src={`${API_PATH}/uploads/${sparepart.sparepartimage}`} 
                                alt="Spare Part" 
                                className="sparepart-image"
                            />
                        </div>
                        <div className="sparepart-details">
                            <h1 className="sparepart-name">{sparepart.sparepartname}</h1>
                            <h2 className="sparepart-price">${sparepart.sparepartprice}</h2>
                            <p>{sparepart.sparepartcategory}</p>
                        </div>
                        
                        <button onClick={()=>{
                            deletesparepart(sparepart._id)
                        }} className='buy-btn'>Delete</button>
                    </div>
                    
                ))}
            </div>
        ) : (
            <p className="no-spareparts-message">No spare parts available</p>
        )}
    </div>
    </>
  )
}

export default AllSpareParts