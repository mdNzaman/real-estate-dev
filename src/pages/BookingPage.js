import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  mockProperties,
  mockBookings,
  mockBookingSlots,
  timeSlots,
} from "../mockData";
import "./BookingPage.css";

function BookingPage() {
  const [property, setProperty] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookingError, setBookingError] = useState("");
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user has already booked this property
  const checkExistingBooking = () => {
    const userBookings = mockBookings.filter(
      (booking) =>
        booking.clientId === user.id && booking.propertyId === parseInt(id),
    );
    return userBookings.length > 0;
  };

  // Get available time slots for selected date
  const getAvailableTimeSlots = (selectedDate) => {
    const propertyBookings = mockBookingSlots.find(
      (p) => p.propertyId === parseInt(id),
    );
    if (!propertyBookings) return timeSlots;

    const bookedSlotsForDate = propertyBookings.bookedSlots
      .filter((slot) => slot.date === selectedDate)
      .map((slot) => slot.time);

    return timeSlots.filter((time) => !bookedSlotsForDate.includes(time));
  };

  useEffect(() => {
    const foundProperty = mockProperties.find((p) => p.id === parseInt(id));
    setProperty(foundProperty);

    // Check if user has already booked this property
    if (checkExistingBooking()) {
      setBookingError("You have already booked this property.");
    }
  }, [id]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBookingData((prev) => ({ ...prev, date: selectedDate, time: "" }));
    setAvailableTimeSlots(getAvailableTimeSlots(selectedDate));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      handleDateChange(e);
    } else {
      setBookingData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if time slot is still available
    const currentAvailableSlots = getAvailableTimeSlots(bookingData.date);
    if (!currentAvailableSlots.includes(bookingData.time)) {
      setBookingError(
        "This time slot is no longer available. Please select another time.",
      );
      return;
    }

    // Simulate booking submission
    setTimeout(() => {
      setShowSuccess(true);
      // Add new booking to mockBookingSlots
      const propertyBookings = mockBookingSlots.find(
        (p) => p.propertyId === parseInt(id),
      );
      if (propertyBookings) {
        propertyBookings.bookedSlots.push({
          date: bookingData.date,
          time: bookingData.time,
        });
      }
    }, 1000);
  };

  const handleClose = () => {
    const dashboardPath = user?.role === "admin" ? "/admin" : "/dashboard";
    navigate(dashboardPath);
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Book a Viewing</h1>
          {bookingError && <div className="booking-error">{bookingError}</div>}
        </div>

        {/* Property Summary Section */}
        <div className="property-summary">
          <img src={property.image} alt={property.name} />
          <h2>{property.name}</h2>
          <p>{property.location}</p>
          <p className="property-price">${property.price.toLocaleString()}</p>
        </div>

        {!bookingError ? (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label>Preferred Date</label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleDateChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label>Available Time Slots</label>
              <select
                name="time"
                value={bookingData.time}
                onChange={handleInputChange}
                required
                disabled={!bookingData.date}
              >
                <option value="">Select a time</option>
                {availableTimeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {bookingData.date && availableTimeSlots.length === 0 && (
                <p className="no-slots-message">
                  No available time slots for this date. Please select another
                  date.
                </p>
              )}
            </div>

            {/* Rest of the form fields */}
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={bookingData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={bookingData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea
                name="message"
                value={bookingData.message}
                onChange={handleInputChange}
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="booking-button"
              disabled={!bookingData.date || !bookingData.time}
            >
              Confirm Booking
            </button>
          </form>
        ) : (
          <div className="booking-alternative">
            <p>
              Please check other available properties or try booking at a
              different time.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="back-to-properties"
            >
              View Other Properties
            </button>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <>
          <div className="overlay" />
          <div className="success-message">
            <div className="success-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <h2>Booking Successful!</h2>
            <p>
              Your booking request has been submitted successfully for:
              <br />
              Date: {bookingData.date}
              <br />
              Time: {bookingData.time}
            </p>
            <p>We will contact you shortly to confirm your viewing.</p>
            <button onClick={handleClose} className="back-to-dashboard">
              Back to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BookingPage;
