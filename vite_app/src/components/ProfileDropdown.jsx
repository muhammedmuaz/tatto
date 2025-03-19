import React from 'react';
import { Link } from 'react-router-dom';
import './profile-dropdown.css';

const ProfileDropdown = ({ userData, isLoggedIn, onClose, onLogout }) => {
  // Function to get tier based on points
  const getUserTier = (points) => {
    if (!points) return { tier: 'Bronze', next: 'Silver', remaining: 1000, progress: 0 };
    
    if (points >= 5000) {
      return { tier: 'Platinum', next: null, remaining: 0, progress: 100 };
    }
    
    if (points >= 2500) {
      const remaining = 5000 - points;
      const progress = ((points - 2500) / 2500) * 100;
      return { tier: 'Gold', next: 'Platinum', remaining, progress };
    }
    
    if (points >= 1000) {
      const remaining = 2500 - points;
      const progress = ((points - 1000) / 1500) * 100;
      return { tier: 'Silver', next: 'Gold', remaining, progress };
    }
    
    const progress = (points / 1000) * 100;
    return { tier: 'Bronze', next: 'Silver', remaining: 1000 - points, progress };
  };

  // Calculate tier information if user is logged in
  const tierInfo = isLoggedIn && userData ? getUserTier(userData.points || 0) : null;

  // Function to format the number with commas for thousands
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Get the next scheduled appointment if any
  const getNextAppointment = () => {
    if (!userData || !userData.pastAppointments || userData.pastAppointments.length === 0) {
      return null;
    }
    
    // In a real app, you would filter for future appointments
    // For now, we'll just return a mock future appointment
    return {
      date: "Jun 30, 2023",
      artist: "Eric Dsuza",
      design: "Custom Dragon Extension"
    };
  };

  const nextAppointment = getNextAppointment();

  return (
    <div className="enhanced-profile-dropdown">
      {isLoggedIn ? (
        <>
          <div className="profile-header">
            <div className="profile-avatar">
              {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="profile-details">
              <h3>{userData?.name || "User"}</h3>
              <p>{userData?.email || ""}</p>
            </div>
          </div>
          
          {/* Loyalty Program Section */}
          <div className="loyalty-section">
            <div className="loyalty-header">
              <h4>Loyalty Program</h4>
              <span className={`tier-badge tier-${tierInfo.tier.toLowerCase()}`}>{tierInfo.tier}</span>
            </div>
            
            <div className="points-display">
              <span className="points-value">{formatNumber(userData?.points || 0)} Points</span>
              {tierInfo.next && (
                <span className="tier-progress">{formatNumber(tierInfo.remaining)} to {tierInfo.next}</span>
              )}
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(100, tierInfo.progress)}%` }}
              ></div>
            </div>
            
            <div className="loyalty-quick-links">
              <Link to="/profile?tab=rewards" onClick={onClose} className="rewards-link">
                <span className="rewards-icon">🎁</span>
                <span>Rewards</span>
              </Link>
              <Link to="/profile?tab=loyalty" onClick={onClose} className="rewards-link">
                <span className="rewards-icon">🏆</span>
                <span>Tiers</span>
              </Link>
            </div>
          </div>
          
          {nextAppointment && (
            <div className="next-appointment">
              <h4>Your Next Appointment</h4>
              <div className="appointment-brief">
                <div className="appointment-date">{nextAppointment.date}</div>
                <div className="appointment-info">
                  <p><strong>Artist:</strong> {nextAppointment.artist}</p>
                  <p><strong>Design:</strong> {nextAppointment.design}</p>
                </div>
                <Link to="/profile?tab=appointments" onClick={onClose} className="view-link">
                  View All
                </Link>
              </div>
            </div>
          )}
          
          <div className="profile-actions">
            <Link to="/profile" onClick={onClose} className="profile-link">View Profile</Link>
            <Link to="/settings" onClick={onClose} className="settings-link">Settings</Link>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </>
      ) : (
        <div className="login-signup-section">
          <h3>Welcome</h3>
          <p>Login or create an account to access all features</p>
          <div className="loyalty-teaser">
            <h4>Join our Loyalty Program</h4>
            <p>Earn points and get exclusive rewards</p>
            <ul className="loyalty-benefits">
              <li>📊 Track your tattoo journey</li>
              <li>🎁 Redeem points for discounts</li>
              <li>⭐ Get VIP access to events</li>
            </ul>
          </div>
          <div className="auth-buttons">
            <Link to="/login" onClick={onClose} className="login-button">Login</Link>
            <Link to="/signup" onClick={onClose} className="signup-button">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 