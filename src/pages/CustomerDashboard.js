import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { mockProperties } from "../mockData";
import PropertyCard from "../components/PropertyListing/PropertyCard";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    status: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    setProperties(mockProperties);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      status: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const filteredProperties = properties.filter((property) => {
    const nameMatch = property.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const locationMatch =
      filters.location === "" ||
      property.location.toLowerCase().includes(filters.location.toLowerCase());

    const statusMatch =
      filters.status === "" || property.status === filters.status;

    const minPriceMatch =
      filters.minPrice === "" || property.price >= Number(filters.minPrice);

    const maxPriceMatch =
      filters.maxPrice === "" || property.price <= Number(filters.maxPrice);

    return (
      nameMatch &&
      locationMatch &&
      statusMatch &&
      minPriceMatch &&
      maxPriceMatch
    );
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
      </div>

      <div className="filters-section">
        <h2>Filters</h2>
        <div className="filters-grid">
          <div className="filter-item">
            <label>Search by Name</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search properties..."
            />
          </div>
          <div className="filter-item">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter location"
            />
          </div>
          <div className="filter-item">
            <label>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min price"
            />
          </div>
          <div className="filter-item">
            <label>Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max price"
            />
          </div>
        </div>
        <div className="filter-actions">
          <button onClick={clearFilters} className="clear-filters">
            Clear Filters
          </button>
        </div>
      </div>

      <div className="properties-grid">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
