import React, { useState, useEffect } from 'react';
import OrderConfirmed from './OrderConfirmed';

const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showOrderConfirmed, setShowOrderConfirmed] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
  };

  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        setShowOrderConfirmed(true);
      }, 2000);


      return () => clearTimeout(timer);
    }
  }, [paymentSuccess]);

  if (showOrderConfirmed) {
    return <OrderConfirmed />;
  }

  return (
    <div className="payment-container">
      {!paymentSuccess ? (
        <form onSubmit={handlePayment} className="payment-form">
          <h2 className="payment-heading">Payment Details</h2>

          <input
            type="text"
            placeholder="Cardholder Name"
            required
            className="payment-input"
          />
          <input
            type="text"
            placeholder="Card Number"
            required
            className="payment-input"
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            required
            className="payment-input"
          />
          <input
            type="password"
            placeholder="CVV"
            required
            className="payment-input"
          />

          <button type="submit" className="payment-button">
            Submit Payment
          </button>
        </form>
      ) : (
        <div className="payment-success">
          <h2>Payment Successful!</h2>
          <p>Thank you for your payment.</p>
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;