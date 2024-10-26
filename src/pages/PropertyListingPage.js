import React, { useState, useEffect } from "react";
import PropertyList from "../components/PropertyListing/PropertyList";
import PropertyFilters from "../components/PropertyListing/PropertyFilters";
import { fetchProperties } from "../services/api";

function PropertyListingPage() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadProperties();
  }, [filters]);

  const loadProperties = async () => {
    try {
      const data = await fetchProperties(filters);
      setProperties(data);
    } catch (error) {
      console.error("Error loading properties:", error);
    }
  };

  return (
    <div className="property-listing-page">
      <h1>Available Properties</h1>
      <PropertyFilters setFilters={setFilters} />
      <PropertyList properties={properties} />
    </div>
  );
}

export default PropertyListingPage;
