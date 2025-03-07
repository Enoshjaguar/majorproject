import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_PATH } from '../data/Apipath';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const SparePartBookingForm = () => {
  const navigate = useNavigate()
  const [sparepart, setSparePart] = useState(null);
  const [productname, setProductName] = useState('');
  const [userName, setUserName] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [address, setAddress] = useState('');
  const { id } = useParams();

  // Fetch spare part by ID
  const getSparePartById = async () => {
    try {
      const response = await axios.get(`${API_PATH}/spareparts/getsparepartbyid/${id}`);
      if (response.status === 200) {
        console.log(response.data.sparepart);
        setSparePart(response.data.sparepart);
      } else {
        alert("Spare part fetching failed");
      }
    } catch (error) {
      console.error("Error fetching spare part", error);
    }
  };

  useEffect(() => {
    getSparePartById();
  }, [id]);

  // Update product name and price when sparepart state changes
  useEffect(() => {
    if (sparepart) {
      setProductName(sparepart.sparepartname);
      setProductPrice(sparepart.sparepartprice);
    }
  }, [sparepart]);

  // Book spare part function
  const bookSparePart = async (e) => {
    e.preventDefault();

    const formData = {
      ProductName: productname,
      UserName: userName,
      userMobile: userMobile,
      ProductPrice: productPrice,
      Address: address
    };

    try {
      const response = await axios.post(`${API_PATH}/spareparts/booksparepart`, formData);
      if (response.status === 200) {
  
      setTimeout(()=>{
        navigate('/bookingconfirmed')
      },2000)
        
        
        
      } else {
        console.log("Spare part booking failed");
        alert("Spare part booking failed");
      }
    } catch (err) {
      console.error("Error booking spare part", err);
    }
  };

  return (
    <>
     

      <div className="sparepart-container">
        <div className="sparepart-form-box">
          <h1 className="sparepart-title">{productname}</h1>
          <form className="sparepart-form" onSubmit={bookSparePart}>
            <div className="sparepart-input-group">
              <label>Name</label>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" />
            </div>

            <div className="sparepart-input-group">
              <label>Mobile</label>
              <input type="text" value={userMobile} onChange={(e) => setUserMobile(e.target.value)} placeholder="Enter your mobile" />
            </div>

            <div className="sparepart-input-group">
              <label>Delivery Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" />
            </div>

            <button type="submit" className="sparepart-book-btn">Book Now</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SparePartBookingForm;
