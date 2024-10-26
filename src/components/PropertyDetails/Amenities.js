import React from "react";

function Amenities({ amenities }) {
  return (
    <div className="amenities">
      <h3>Amenities</h3>
      <ul>
        {amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
  );
}

export default Amenities;
