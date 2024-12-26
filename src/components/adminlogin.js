import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {  // Receive onLogin as a prop from App.js
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Use the onLogin function passed as a prop to check credentials
    onLogin(username, password);  // Call onLogin from App.js
    
    // Optionally, you can show an error message here if needed
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
