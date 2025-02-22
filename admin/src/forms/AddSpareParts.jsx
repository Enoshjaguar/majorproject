import axios from "axios";
import React, { useState } from "react";
import { API_PATH } from "../data/apipath";
import Navbar from "../pages/Navbar";

const AddSpareParts = () => {
    const [sparepartname,setSparePartName] = useState('')
    const [sparepartprice,setSparePartPrice] = useState('')
    const [sparepartdescription,setSparePartDescription] = useState('')
    const [sparepartcategory,setSparePartCategory] = useState('')
    const [sparepartimage,setSparePartFile ] = useState(null)

    
const handleimagesubmit = (e)=>{setSparePartFile(e.target.files[0])}
const handlecategorysubmit = (e)=>setSparePartCategory(e.target.value)
    const handlesubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('sparepartname',sparepartname)
        formData.append("sparepartprice",sparepartprice)
        formData.append("sparepartdescription",sparepartdescription)
        formData.append("sparepartcategory",sparepartcategory)
        formData.append("sparepartimage",sparepartimage)

        try{
            const response = await axios.post(`${API_PATH}/spareparts/addsparepart`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })

            if(response.status===200){
                console.log("spare part added successfully")
                alert("spare part added successfully")
                window.location.reload()
            }
            else{
                alert("spare part adding failed")
            }
        }
        catch(err){
            console.error("error saving sparepart",err)
            alert("error saving sparepart")
        }
    }
  return (
    <>
    <Navbar/>
    <div className="sparepart-form-container">
    <div className="sparepart-form-card">
      <h2 className="sparepart-form-title">Add Spare Part</h2>
      
      <form onSubmit={handlesubmit} className="sparepart-form">
        {/* Name Input */}
        <div className="sparepart-form-group">
          <label className="sparepart-label">Name</label>
          <input
            type="text"
            className="sparepart-input"
            placeholder="Enter spare part name"
            onChange={(e) => setSparePartName(e.target.value)}
          />
        </div>
  
        {/* Price Input */}
        <div className="sparepart-form-group">
          <label className="sparepart-label">Price</label>
          <input
            type="text"
            className="sparepart-input"
            placeholder="Enter price"
            onChange={(e) => setSparePartPrice(e.target.value)}
          />
        </div>

        <div className="category-options">
                <label>
                    <input type="radio" name="category" checked={sparepartcategory==="bike"} value="bike" onChange={handlecategorysubmit} /> Bike
                </label>
                <label>
                    <input type="radio" name="category" checked={sparepartcategory==="car"} value="car" onChange={handlecategorysubmit} /> Car
                </label>
                <label>
                    <input type="radio" name="category" checked={sparepartcategory==="auto"} value="auto" onChange={handlecategorysubmit} /> Auto
                </label>
            </div>
  
        {/* Description Input */}
        <div className="sparepart-form-group">
          <label className="sparepart-label">Description</label>
          <input
            type="text"
            className="sparepart-input"
            placeholder="Enter description"
            onChange={(e) => setSparePartDescription(e.target.value)}
          />
        </div>
  
        {/* Image Input */}
        <div className="sparepart-form-group">
          <label className="sparepart-label">Image</label>
          <input
            type="file"
            className="sparepart-file-input"
            onChange={handleimagesubmit}
          />
        </div>
  
        {/* Submit Button */}
        <button type="submit" className="sparepart-submit-btn">Submit</button>
      </form>
    </div>
  </div>
  </>
  

  );
};

export default AddSpareParts;
