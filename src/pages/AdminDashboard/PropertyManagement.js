import React, { useState, useEffect } from "react";
import {
  fetchProperties,
  adminAddProperty,
  adminUpdateProperty,
  adminDeleteProperty,
} from "../../services/api";
import PropertyForm from "./PropertyForm";
import DeleteConfirmation from "../../components/common/DeleteConfirmation";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import "./PropertyManagement.css";

function PropertyManagement() {
  // State Management
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    status: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProperties(filters);
      setProperties(response.data);
    } catch (error) {
      setError(error.message || "Error loading properties");
    } finally {
      setLoading(false);
    }
  };

  // // Get unique property types for filter dropdown
  const propertyTypes = [...new Set(properties.map((p) => p.type))];

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      status: "",
      minPrice: "",
      maxPrice: "",
      propertyType: "",
    });
  };

  // CRUD Operations
  const handleAddProperty = async (propertyData) => {
    try {
      setLoading(true);
      await adminAddProperty(propertyData);
      await loadProperties();
      setShowAddForm(false);
    } catch (error) {
      setError(error.message || "Error adding property");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProperty = async (propertyData) => {
    try {
      setLoading(true);
      await adminUpdateProperty(propertyData.id, propertyData);
      await loadProperties();
      setEditingProperty(null);
    } catch (error) {
      setError(error.message || "Error updating property");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      setLoading(true);
      await adminDeleteProperty(id);
      await loadProperties();
      setShowDeleteConfirm(false);
      setPropertyToDelete(null);
    } catch (error) {
      setError(error.message || "Error deleting property");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  // Filter Properties
  // const filteredProperties = properties.filter((property) => {
  //   const nameMatch = property.name
  //     .toLowerCase()
  //     .includes(filters.search.toLowerCase());

  //   const locationMatch =
  //     !filters.location ||
  //     property.location.toLowerCase().includes(filters.location.toLowerCase());

  //   const statusMatch = !filters.status || property.status === filters.status;

  //   const typeMatch =
  //     !filters.propertyType || property.type === filters.propertyType;

  //   const minPriceMatch =
  //     !filters.minPrice || property.price >= Number(filters.minPrice);

  //   const maxPriceMatch =
  //     !filters.maxPrice || property.price <= Number(filters.maxPrice);

  //   return (
  //     nameMatch &&
  //     locationMatch &&
  //     statusMatch &&
  //     typeMatch &&
  //     minPriceMatch &&
  //     maxPriceMatch
  //   );
  // });

  return (
    <div className="property-management">
      {/* Header Section */}
      <div className="management-header">
        <h2>Property Management</h2>
        <button
          className="add-property-btn"
          onClick={() => setShowAddForm(true)}
        >
          Add New Property
        </button>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-item">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name"
              className="filter-input"
            />
          </div>
          <div className="filter-item">
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Filter by location"
              className="filter-input"
            />
          </div>
          <div className="filter-item">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
          <div className="filter-item">
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min Price"
              className="filter-input"
            />
          </div>
          <div className="filter-item">
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="filter-input"
            />
          </div>
        </div>
        <div className="filter-actions">
          <button onClick={clearFilters} className="clear-filters">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Properties Table */}
      <div className="properties-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.id}</td>
                <td>
                  <img
                    src={property.image_url}
                    alt={property.title}
                    className="property-thumbnail"
                  />
                </td>
                <td>{property.title}</td>
                <td>{`${property.city}, ${property.state}`}</td>
                <td>{property.property_type}</td>
                <td>${property.price.toLocaleString()}</td>
                <td>
                  <span
                    className={`status-badge ${property.status.toLowerCase()}`}
                  >
                    {property.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => setEditingProperty(property)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setPropertyToDelete(property);
                        setShowDeleteConfirm(true);
                      }}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {(showAddForm || editingProperty) && (
        <PropertyForm
          property={editingProperty}
          onSubmit={editingProperty ? handleEditProperty : handleAddProperty}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProperty(null);
          }}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          item={propertyToDelete}
          onConfirm={() => handleDeleteProperty(propertyToDelete.id)}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setPropertyToDelete(null);
          }}
        />
      )}
    </div>
  );
}

export default PropertyManagement;
