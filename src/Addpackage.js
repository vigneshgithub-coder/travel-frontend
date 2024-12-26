import React, { useState } from 'react';
import axios from 'axios';
//import { title } from 'process';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    availableDates: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Log the form data to the console
  console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/packages', {
        ...formData,
        availableDates: formData.availableDates.split(',') // Convert string to array
        
      });
      console.log('Package added successfully:', response.data);
      setFormData({ name: '', description: '', price: '', availableDates: '', image: '' }); // Reset form
      window.location.reload();
    } catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // No response received
      console.error('No response received from server');
    } else {
      // Error setting up the request
      console.error(`Request setup error: ${error.message}`);
    }
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="name" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Available Dates (comma-separated):</label>
        <input type="text" name="availableDates" value={formData.availableDates} onChange={handleChange} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" name="image" value={formData.image} onChange={handleChange} required />
      </div>
      <button type="submit">Add Package</button>
    </form>
  );
};

export default AddPackage;
