import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_PATH } from '../data/Apipath'
import { Link, useParams } from 'react-router-dom'

const SingleSparePart = () => {
    const {id} = useParams()
    const [sparepart,setSparePart] =useState('')
    const getsparepartbyid = async()=>{
        try{
            const response = await axios.get(`${API_PATH}/spareparts/getsparepartbyid/${id}`)
            if(response.status===200){
                console.log(response.data.sparepart)
                setSparePart(response.data.sparepart)

            }
            else{
                alert("spare part fetching failed")
            }
        }
        catch(error){
            console.error("error fetching spare part",error)
        }
       
    }
    useEffect(()=>{
        getsparepartbyid()
    },[])
  return (
    <div className="sparepart-card">
    <div className="sparepart-image">
       
        <img src={`${API_PATH}/uploads/${sparepart.sparepartimage}`} alt="Spare Part" />
    </div>
    <div className="sparepart-details">
        <h2 className="sparepart-name">{sparepart.sparepartname}</h2>
        <p className="sparepart-category">{sparepart.sparepartcategory}</p>
        <p className="sparepart-description">{sparepart.sparepartdescription}</p>
        <div className="sparepart-footer">
            <span className="sparepart-price">${sparepart.sparepartprice}</span>
            <Link to={`/buysparepart/${sparepart._id}`}>
            <button className="buy-now">Buy Now</button>
            </Link>
            
        </div>
    </div>
</div>

  )
}

export default SingleSparePart