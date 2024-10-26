import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropertyDetails from "../components/PropertyDetails/PropertyDetails";
import { fetchPropertyById } from "../services/api";

function PropertyDetailsPage() {
  const [property, setProperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const data = await fetchPropertyById(id);
      setProperty(data);
    } catch (error) {
      console.error("Error loading property details:", error);
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div className="property-details-page">
      <PropertyDetails property={property} />
      <Link to={`/booking/${property.id}`} className="book-now-button">
        Book Now
      </Link>
    </div>
  );
}

export default PropertyDetailsPage;
