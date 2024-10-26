import React, { useState, useEffect } from "react";
import "./PropertyForm.css";

function PropertyForm({ property, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    city: "",
    state: "",
    zip_code: "",
    property_type: "House",
    status: "Available",
    bedrooms: "2",
    bathrooms: "2",
    area: "2000",
    features: [],
    images: [],
    amenities: [],
  });

  useEffect(() => {
    if (property) {
      setFormData(property);
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    const amenitiesList = value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      amenities: amenitiesList,
    }));
  };

  const handleImagesChange = (e) => {
    const { value } = e.target;
    const imagesList = value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      images: imagesList,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="property-form-overlay">
      <div className="property-form-container">
        <h3>{property ? "Edit Property" : "Add New Property"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          <div className="form-group">
            <label>Property Type</label>
            <input
              type="text"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Square Feet</label>
              <input
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* <div className="form-group">
            <label>Image URL </label>
            <input
              type="url"
              name="images"
              value={formData.images}
              onChange={handleChange}
              required
            />
          </div> */}

          <div className="form-group">
            <label>Image URL (comma-seperated)</label>
            <textarea
              name="images"
              value={formData.images.join(", ")}
              onChange={handleImagesChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Amenities (comma-separated)</label>
            <textarea
              name="amenities"
              value={formData.amenities.join(", ")}
              onChange={handleAmenitiesChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {property ? "Update Property" : "Add Property"}
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyForm;
