import React, { useState } from 'react';
import axios from 'axios';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    title: '',
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
    try {
      const response = await axios.post('https://travel-backend-10.onrender.com/api/packages', {
        ...formData,
        availableDates: formData.availableDates.split(',') // Convert string to array
      });
      console.log('Package added successfully:', response.data);
      setFormData({ title: '', description: '', price: '', availableDates: '', image: '' }); // Reset form
    } catch (error) {
      console.error('Error adding package:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
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
