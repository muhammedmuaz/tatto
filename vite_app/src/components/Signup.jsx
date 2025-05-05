import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4567/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Get current date for join date
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Initialize user with loyalty program data
      const userData = {
        name: formData.name,
        email: formData.email,
        // Loyalty program initialization
        points: 100, // Start with 100 points as welcome bonus
        tier: "Bronze", // Initial tier
        joinDate: currentDate,
        badges: ["New Member"], // Initial badge
        streakDays: 1,
        // Loyalty history - start with signup bonus
        loyaltyHistory: [
          { id: 1, type: "signup", name: "Signup Bonus", date: currentDate, points: "+100" }
        ],
        // Available rewards
        availableRewards: [
          { id: 1, name: "10% Off Next Tattoo", points: 500, status: "available", description: "Receive 10% off your next tattoo session" },
          { id: 2, name: "Free Aftercare Kit", points: 1000, status: "available", description: "Premium aftercare products to keep your tattoo looking fresh" },
          { id: 3, name: "Small Free Tattoo", points: 2000, status: "available", description: "Get a small tattoo (2x2 inch max) for free" },
          { id: 4, name: "VIP Event Access", points: 1500, status: "available", description: "Exclusive access to our next tattoo artist showcase" }
        ]
      };

      // Store token and user data with loyalty program
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');

      // Navigate to home page
      navigate('/');
      
      // Reload the page to update the profile logo
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Choose a strong password"
            required
          />
        </div>
        <div className="loyalty-signup-info">
          <h4>Join our Loyalty Program!</h4>
          <p>Create an account today and get 100 points as a welcome bonus.</p>
          <div className="loyalty-benefits-brief">
            <span>✓ Earn points with every tattoo</span>
            <span>✓ Redeem for discounts & rewards</span>
            <span>✓ Exclusive member benefits</span>
          </div>
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
