import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomePage.css";

function HomePage() {
  const { user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return "/login";
    return user.role === "admin" ? "/admin" : "/dashboard";
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to Real Estate Platform</h1>
        <p>Find your dream property today!</p>
        {user ? (
          <Link to={getDashboardLink()} className="cta-button">
            Go to Dashboard
          </Link>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="cta-button">
              Login
            </Link>
            <Link to="/signup" className="cta-button">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
