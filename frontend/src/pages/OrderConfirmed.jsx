import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react"; 


const OrderConfirmed = () => {
  return (
    <div className="order-confirmed-container">
      <div className="order-confirmed-box">
        <CheckCircle className="order-icon" size={80} />
        <h1 className="order-title">Order Confirmed!</h1>
        <p className="order-message">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p className="order-details">
          You will receive an email confirmation shortly with the order details.
        </p>
        <Link to='/allspareparts'>
        <button className="back-home-btn">Back</button>
        </Link>
      
      </div>
    </div>
  );
};

export default OrderConfirmed;
