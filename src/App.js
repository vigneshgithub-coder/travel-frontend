import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPackage from './Addpackage';
import './app.css';
import BookingForm from './BookingForm';
import PackageList from './PackageList';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  const [packages, setPackages] = useState([]);
  // const api = axios.create({
  //   baseURL: 'https://travel-backend-8.onrender.com/api', // Make sure this URL is correct
  // });
  

  // Fetch data from backend
  useEffect(() => {
    axios
      .get('https://travel-backend-8.onrender.com/')
      .then((response) => setPackages(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <div className="app-container">
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
                      
                      <img src={pkg.image} alt={pkg.name} className="package-image" /> {/* Displaying image */}
                      <p>{pkg.description}</p>
                      <p>Price: Rs{pkg.price}</p> {/* Displaying price */}
                      <Link
                        to={`/book/${pkg._id}`}
                        state={{ packageDetails: pkg }} // Pass package data via state
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
          <Route
            path="/book/:id"
            element={<BookingForm />}
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>
                <AddPackage />
              </div>
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
    </Router>
  );
};

export default App;
