import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_PATH } from '../data/Apipath'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

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
                    <Link to={`/singlesparepart/${sparepart._id}`}>
                    <button className='buy-btn'>Buy</button>
                    </Link>
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