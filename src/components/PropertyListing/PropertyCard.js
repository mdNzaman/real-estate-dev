import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img
        src={property.image}
        alt={property.name}
        className="property-image"
      />
      <div className="property-content">
        <h3 className="property-title">{property.name}</h3>
        <div
          className={`property-status status-${property.status.toLowerCase()}`}
        >
          {property.status}
        </div>
        <div className="property-price">${property.price.toLocaleString()}</div>
        <p>{property.location}</p>
        <div className="property-details">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.sqft} sqft</span>
        </div>
        <Link to={`/property/${property.id}`}>
          <button className="view-details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
