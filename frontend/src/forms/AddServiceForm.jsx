import React, { useState } from 'react'
import { API_PATH } from '../data/Apipath'
import axios from 'axios'
import Navbar from '../pages/Navbar'

const AddServiceForm = () => {

  const [servicename,setServiceName] = useState('')
  const [description,setDescription] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('')
  const [image,setImage]  = useState(null)

  const handlecategorysubmit = (e) => {
    setCategory(e.target.value);  
  };
  const handleimagesubmit = (e)=>{
    setImage(e.target.files[0])
  }

const handlesubmit = async(e)=>{
  e.preventDefault()
  const formData = new FormData();
  formData.append('servicename',servicename)
  formData.append('description',description)
  formData.append('price',price)
  formData.append('category',category)
  formData.append('image',image)

  try {
    const response = await axios.post(`${API_PATH}/services/addnewservice`,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
     
    })
    if(response.status===200){
      console.log("product added successfully")
      alert("product added successfully")
    }
    alert("product adding failed")
  } catch (error) {
    console.log("product adding failed",error)
    alert("internal server error")
    
  }
}
  return (
    <>
    <Navbar/>
    
        <div className="addservice-container">
            <div className="addservice-form">
                <form onSubmit={handlesubmit}>
                    <h1>Add New Service</h1>

                    <label>Service Name:</label>
                    <input type="text" placeholder="Service name" onChange={(e) => setServiceName(e.target.value)} />

                    <label>Description:</label>
                    <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />

                    <label>Price:</label>
                    <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />

                    <label>Category:</label>
                    <div className="category-options">
                        <label>
                            <input type="radio" name="category" checked={category==="bike"} value="bike" onChange={handlecategorysubmit} /> Bike
                        </label>
                        <label>
                            <input type="radio" name="category" checked={category==="car"} value="car" onChange={handlecategorysubmit} /> Car
                        </label>
                        <label>
                            <input type="radio" name="category" checked={category==="auto"} value="auto" onChange={handlecategorysubmit} /> Auto
                        </label>
                    </div>

                    <label>Image:</label>
                    <input type="file" onChange={handleimagesubmit} />

                    <button type="submit">Add Service</button>
                </form>
            </div>
        </div>
 

   </>

  )
}

export default AddServiceForm