import React, { useState } from "react";

function BookingForm({ property, onSubmit }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ propertyId: property.id, date, time });
    // Implement booking logic here
    // Check availability
    // Prevent double bookings
    // Integrate payment gateway (if implemented)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">Book Now</button>
    </form>
  );
}

export default BookingForm;
