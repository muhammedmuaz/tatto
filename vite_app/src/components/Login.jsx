import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showProfileLogo, setShowProfileLogo] = useState(false);
  const [userInitial, setUserInitial] = useState('');
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
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Add loyalty program data to the user data
      const userData = data.user || {};
      const enhancedUserData = {
        ...userData,
        // Initialize loyalty program data if not existing
        points: userData.points || 2450,
        tier: userData.tier || "Gold",
        joinDate: userData.joinDate || new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        badges: userData.badges || ["Early Adopter", "Contest Champion", "5-Day Streak"],
        streakDays: userData.streakDays || 5,
        // Add additional loyalty data
        loyaltyHistory: userData.loyaltyHistory || [
          { id: 1, type: "tattoo_session", name: "Full Sleeve Session", date: "May 15, 2023", points: "+100" },
          { id: 2, type: "referral", name: "Referred Sarah Smith", date: "May 10, 2023", points: "+200" },
          { id: 3, type: "review", name: "Left 5-star Review", date: "May 5, 2023", points: "+50" },
          { id: 4, type: "social_follow", name: "Followed on Instagram", date: "Apr 28, 2023", points: "+25" }
        ],
        availableRewards: userData.availableRewards || [
          { id: 1, name: "10% Off Next Tattoo", points: 500, status: "available", description: "Receive 10% off your next tattoo session" },
          { id: 2, name: "Free Aftercare Kit", points: 1000, status: "redeemed", redeemedDate: "Apr 20, 2023", description: "Premium aftercare products to keep your tattoo looking fresh" },
          { id: 3, name: "Small Free Tattoo", points: 2000, status: "available", description: "Get a small tattoo (2x2 inch max) for free" },
          { id: 4, name: "VIP Event Access", points: 1500, status: "available", description: "Exclusive access to our next tattoo artist showcase" }
        ]
      };

      // Store token, enhanced user data, and login state
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(enhancedUserData));
      localStorage.setItem('isLoggedIn', 'true');

      // Show profile logo with user's first character
      if (enhancedUserData && enhancedUserData.name) {
        setUserInitial(enhancedUserData.name.charAt(0).toUpperCase());
        setShowProfileLogo(true);
      }

      // Delay navigation to show the profile logo
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      {showProfileLogo && (
        <div className="profile-logo">
          {userInitial}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;