// src/PackageList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://travel-backend-10.onrender.com/api/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <h1>Available Travel Packages</h1>
      {packages.map((pkg) => (
        <div key={pkg._id}>
          <h2>{pkg.title}</h2>
          <p>{pkg.description}</p>
          <p>Price: ${pkg.price}</p>
          <Link
            to={`/book/${pkg._id}`}
            state={{ packageDetails: pkg }}
          >
            <button>Book Now</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PackageList;
