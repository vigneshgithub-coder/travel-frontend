import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const location = useLocation();
  const packageDetails = location.state?.packageDetails;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!packageDetails) {
      alert('Package details are missing!');
      return;
    }
    try {
      console.log('Submitting form data:', formData); // Debugging
      const response = await axios.post('https://travel-backend-10.onrender.com/api/bookings', formData);
      console.log('Invoice generated successfully:', response.data);
      // Optionally, handle the response, like showing a success message or redirecting the user
      alert('Booking successful!');
      // window.location.reload();
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    }
    

    // After booking is successful, generate the invoice
    const invoiceResponse = await axios.post('https://travel-backend-10.onrender.com/api/generate-invoice', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      travelers: formData.travelers,
      packageName: packageDetails.name,
      price: packageDetails.price,
      bookingDate: new Date().toLocaleDateString(),
    }, {
      responseType: 'blob', // To handle file download
    });

    // Trigger the download of the generated invoice
    const blob = new Blob([invoiceResponse.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${formData.name}_invoices.pdf`;
    link.click();

  alert('Failed to submit booking. Please try again.');
  // }
//};
    
  };
  

  if (!packageDetails) {
    return <p>Package details not found.</p>;
  }

  return (
    <div>
      <h1>Booking Form for {packageDetails.title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone"
          required
        />
        <input
          type="number"
          name="travelers"
          value={formData.travelers}
          onChange={handleChange}
          placeholder="Number of Travelers"
          min="1"
          required
        />
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Special Requests"
        />
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
