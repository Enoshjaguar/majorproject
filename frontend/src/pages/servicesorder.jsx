import React from "react";
import { Link } from "react-router-dom";


const OrderConfirmed = () => {
  return (
    <div className="order-confirmed-container">
      <div className="order-confirmed-box">
        <h1 className="order-title">Order Confirmed!</h1>
        <p className="order-message">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p className="order-details">
          You will receive an confirmation message shortly with the order details.
        </p>
        <Link to='/allspareparts'>
        <Link to='/allservices'></Link>
        <button className="back-home-btn">Back</button>
        </Link>
      
      </div>
    </div>
  );
};

export default OrderConfirmed;