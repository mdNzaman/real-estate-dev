import React, { useState, useEffect } from "react";
import {
  adminFetchBookings,
  adminUpdateBookingStatus,
} from "../../services/api";
import "./BookingManagement.css";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await adminFetchBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await adminUpdateBookingStatus(bookingId, newStatus);
      loadBookings(); // Reload bookings after status update
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="booking-management">
      <h2>Booking Management</h2>

      <div className="bookings-table">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Property</th>
              <th>Client Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.propertyName}</td>
                <td>{booking.clientName}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking.id, e.target.value)
                    }
                    className={`status-select ${booking.status.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => {
                      // Handle view details
                      console.log("View booking details:", booking);
                    }}
                    className="view-details-btn"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingManagement;
