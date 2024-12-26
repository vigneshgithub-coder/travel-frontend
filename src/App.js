import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPackage from './Addpackage';
import './app.css';
import BookingForm from './components/BookingForm.js';
import PackageList from './PackageList';
import AdminLogin from './components/adminlogin.js';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const App = () => {
  const [packages, setPackages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const navigate = useNavigate(); 

  // Admin credentials (hardcoded)
  const ADMIN_USERNAME = 'admin';  // Change as needed
  const ADMIN_PASSWORD = 'password123';  // Change as needed

  // Fetch data from backend
  useEffect(() => {
    axios
      .get('https://travel-backend-10.onrender.com/api/packages')
      .then((response) => setPackages(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const handleAdminLogin = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true); // Set as authenticated
      navigate('/Addpackage'); // Navigate to admin dashboard
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="app-container">
      {/* Admin Button - Visible only if not authenticated */}
      {!isAuthenticated && (
        <div className="admin-btn-container">
          <button
            onClick={() => navigate('/admin-login')} // Navigate to admin login page
            className="admin-login-btn"
          >
            Admin Login
          </button>
        </div>
      )}

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="home-page">
              <h1>Travel Packages</h1>
              <ul className="package-list">
                {packages.map((pkg) => (
                  <li key={pkg._id} className="package-item">
                    <h2>{pkg.title}</h2>
                    <img src={pkg.image} alt={pkg.name} className="package-image" />
                    <p>{pkg.description}</p>
                    <p>Price: {pkg.price}</p>
                    <Link
                      to={`/book/${pkg._id}`}
                      state={{ packageDetails: pkg }}
                    >
                      <button className="book-now-btn">Book Now</button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          }
        />

        {/* Booking Page */}
        <Route path="/book/:id" element={<BookingForm />} />

        {/* Admin Login Page */}
        <Route
          path="/admin-login"
          element={
            <AdminLogin onLogin={handleAdminLogin} />
          }
        />

        {/* Admin Dashboard - Only accessible if authenticated */}
        <Route
          path="/Addpackage"
          element={
            isAuthenticated ? (
              <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>
                <AddPackage />
              </div>
            ) : (
              <div>
               
              </div>
            )
          }
        />

        {/* Package List */}
        <Route
          path="/packages"
          element={
            <div className="package-list-container">
              <h1>All Packages</h1>
              <PackageList />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
