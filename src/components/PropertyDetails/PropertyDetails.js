import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProperties } from "../../mockData";
import "./PropertyDetails.css";

function PropertyDetails() {
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    const foundProperty = mockProperties.find((p) => p.id === parseInt(id));
    setProperty(foundProperty);
  }, [id]);

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-details-container">
      <div className="property-details-card">
        <div className="property-header">
          <img
            src={property.image}
            alt={property.name}
            className="property-main-image"
          />
        </div>

        <div className="property-info">
          <div className="property-title-section">
            <div>
              <h1>{property.name}</h1>
              <p>{property.location}</p>
              <div
                className={`property-status-badge status-${property.status.toLowerCase()}`}
              >
                {property.status}
              </div>
            </div>
            <div className="property-price">
              ${property.price.toLocaleString()}
            </div>
          </div>

          <div className="property-details-grid">
            <div className="detail-item">
              <h4>Bedrooms</h4>
              <p>{property.bedrooms}</p>
            </div>
            <div className="detail-item">
              <h4>Bathrooms</h4>
              <p>{property.bathrooms}</p>
            </div>
            <div className="detail-item">
              <h4>Square Feet</h4>
              <p>{property.sqft}</p>
            </div>
            <div className="detail-item">
              <h4>Property Type</h4>
              <p>{property.type}</p>
            </div>
          </div>

          <div className="description-section">
            <h2>Description</h2>
            <p>
              This beautiful {property.type.toLowerCase()} features modern
              amenities and stunning views. Located in the heart of{" "}
              {property.location}, this property offers the perfect blend of
              comfort and luxury.
            </p>
          </div>

          <div className="amenities-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="location-section">
            <h2>Location</h2>
            <p>{property.location}</p>
            {/* You can add a map component here */}
          </div>

          <div className="booking-section">
            {property.status === "Available" ? (
              <>
                <h2>Interested in this property?</h2>
                <p>Schedule a viewing or make a booking now!</p>
                <button onClick={handleBooking} className="book-now-button">
                  Book Now
                </button>
              </>
            ) : (
              <p className="pending-message">
                This property is currently under review with another client.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
