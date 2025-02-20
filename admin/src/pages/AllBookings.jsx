import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_PATH } from "../data/apipath";
import Navbar from "./Navbar";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings
  const getAllBookings = async () => {
    try {
      const response = await axios.get(`${API_PATH}/book/allbookings`);
      if (response.status === 200) {
        setBookings(response.data.allbookings);
      }
    } catch (error) {
      console.log("Error fetching bookings", error);
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${API_PATH}/book/updatestatus/${id}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id ? { ...booking, bookingStatus: newStatus } : booking
          )
        );
        alert(`Booking ${newStatus}!`);
      } else {
        alert(`Failed to ${newStatus.toLowerCase()} the booking`);
      }
    } catch (error) {
      console.log(`Error ${newStatus.toLowerCase()}ing the booking`, error);
      alert(`Error ${newStatus.toLowerCase()}ing the booking`);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bookings-container">
        <h1 className="heading">All Bookings</h1>
        {bookings.length > 0 ? (
          <div className="bookings-grid">
            {bookings.map((booking, index) => (
              <div className="booking-card" key={booking._id}>
                <div className="booking-info">
                  <h2 className="user-name">{booking.userName}</h2>
                  <p className="service-name">{booking.serviceName}</p>
                  <p className="user-mobile">📞 {booking.userMobile}</p>
                  <p className="price">💲 {booking.price}</p>
                  <p className="date">📅 {booking.createdAt.split("T")[0]}</p>
                  <p className="status">Status: {booking.bookingStatus}</p>
                </div>
                <div className="buttons">
                  <button
                    onClick={() => updateBookingStatus(booking._id, "Confirmed")}
                    className="confirm-btn"
                    disabled={booking.bookingStatus === "Confirmed"}
                  >
                    {booking.bookingStatus === "Confirmed" ? "Confirmed" : "Confirm"}
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking._id, "Cancelled")}
                    className="cancel-btn"
                    disabled={booking.bookingStatus === "Cancelled"}
                  >
                    {booking.bookingStatus === "Cancelled" ? "Cancelled" : "Cancel"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-bookings">No bookings available</p>
        )}
      </div>
    </>
  );
};

export default AllBookings;
