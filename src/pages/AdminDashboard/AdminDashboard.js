import React, { useState } from "react";
import PropertyManagement from "./PropertyManagement";
import BookingManagement from "./BookingManagement";
import UserManagement from "./UserManagement";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("properties");

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <nav className="admin-nav">
          <button
            className={activeTab === "properties" ? "active" : ""}
            onClick={() => setActiveTab("properties")}
          >
            Properties
          </button>
          <button
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {activeTab === "properties" && <PropertyManagement />}
        {activeTab === "bookings" && <BookingManagement />}
        {activeTab === "users" && <UserManagement />}
      </div>
    </div>
  );
}

export default AdminDashboard;
