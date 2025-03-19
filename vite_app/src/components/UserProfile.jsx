import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './user-profile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('rewards');
  const location = useLocation();
  
  useEffect(() => {
    // Parse the URL query params to set the active tab
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    // Fetch user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    
    if (storedUserData) {
      // Add sample data for demo purposes if missing
      const enhancedUserData = {
        ...storedUserData,
        joinDate: storedUserData.joinDate || "April 15, 2023",
        points: storedUserData.points || 2450,
        level: storedUserData.level || 3,
        tier: storedUserData.tier || "Gold",
        badges: storedUserData.badges || ["Early Adopter", "Contest Champion", "5-Day Streak"],
        streakDays: storedUserData.streakDays || 5,
        contestsJoined: storedUserData.contestsJoined || 15,
        contestsWon: storedUserData.contestsWon || 3,
        upcomingContests: storedUserData.upcomingContests || [
          { id: 1, name: "Summer Design Challenge", date: "Jun 25, 2023", entryFee: 50 },
          { id: 2, name: "Minimalist Art Contest", date: "Jul 10, 2023", entryFee: 75 }
        ],
        recentActivities: storedUserData.recentActivities || [
          { id: 1, type: "contest_joined", name: "Spring Tattoo Design", date: "May 12, 2023", points: "+100" },
          { id: 2, type: "daily_login", name: "Daily Login Bonus", date: "May 11, 2023", points: "+25" },
          { id: 3, type: "contest_won", name: "Abstract Art Challenge", date: "May 5, 2023", points: "+500" },
          { id: 4, type: "daily_login", name: "Daily Login Bonus", date: "May 4, 2023", points: "+20" }
        ],
        // Loyalty program data
        loyaltyHistory: storedUserData.loyaltyHistory || [
          { id: 1, type: "tattoo_session", name: "Full Sleeve Session", date: "May 15, 2023", points: "+100" },
          { id: 2, type: "referral", name: "Referred Sarah Smith", date: "May 10, 2023", points: "+200" },
          { id: 3, type: "review", name: "Left 5-star Review", date: "May 5, 2023", points: "+50" },
          { id: 4, type: "social_follow", name: "Followed on Instagram", date: "Apr 28, 2023", points: "+25" }
        ],
        availableRewards: storedUserData.availableRewards || [
          { id: 1, name: "10% Off Next Tattoo", points: 500, status: "available", description: "Receive 10% off your next tattoo session" },
          { id: 2, name: "Free Aftercare Kit", points: 1000, status: "redeemed", redeemedDate: "Apr 20, 2023", description: "Premium aftercare products to keep your tattoo looking fresh" },
          { id: 3, name: "Small Free Tattoo", points: 2000, status: "available", description: "Get a small tattoo (2x2 inch max) for free" },
          { id: 4, name: "VIP Event Access", points: 1500, status: "available", description: "Exclusive access to our next tattoo artist showcase" }
        ],
        pastAppointments: storedUserData.pastAppointments || [
          { id: 1, date: "Apr 15, 2023", artist: "Eric Dsuza", design: "Dragon Sleeve", duration: "4 hours" },
          { id: 2, date: "Feb 22, 2023", artist: "Parth Savani", design: "Geometric Back Piece", duration: "3 hours" }
        ]
      };
      setUserData(enhancedUserData);
      setLoading(false);
    } else {
      // Redirect to login if no user data is found
      window.location.href = '/login';
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without page reload
    const url = new URL(window.location);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
  };

  const redeemReward = (rewardId) => {
    if (userData) {
      const updatedRewards = userData.availableRewards.map(reward => {
        if (reward.id === rewardId && reward.status === 'available') {
          // Only redeem if user has enough points
          if (userData.points >= reward.points) {
            const currentDate = new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
            
            // Update user points
            const updatedPoints = userData.points - reward.points;
            
            // Create a record in loyalty history
            const newHistoryItem = {
              id: Date.now(),
              type: "reward_redemption",
              name: `Redeemed: ${reward.name}`,
              date: currentDate,
              points: `-${reward.points}`
            };
            
            // Update user data with new points and history
            const updatedUserData = {
              ...userData,
              points: updatedPoints,
              loyaltyHistory: [newHistoryItem, ...userData.loyaltyHistory]
            };
            
            // Save updated user data to localStorage
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            setUserData(updatedUserData);
            
            return {
              ...reward,
              status: 'redeemed',
              redeemedDate: currentDate
            };
          }
        }
        return reward;
      });
      
      const updatedUserData = {
        ...userData,
        availableRewards: updatedRewards
      };
      
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
    }
  };

  const getTierProgress = (points) => {
    if (points >= 5000) return 100;
    if (points >= 2500) return ((points - 2500) / 2500) * 100;
    if (points >= 1000) return ((points - 1000) / 1500) * 100;
    return (points / 1000) * 100;
  };

  const getNextTier = (points) => {
    if (points >= 5000) return { name: "Platinum", points: "Max Tier" };
    if (points >= 2500) return { name: "Platinum", points: 5000, needed: 5000 - points };
    if (points >= 1000) return { name: "Gold", points: 2500, needed: 2500 - points };
    return { name: "Silver", points: 1000, needed: 1000 - points };
  };

  const getLoyaltyIcon = (type) => {
    switch (type) {
      case 'tattoo_session': return '🎨';
      case 'referral': return '👥';
      case 'review': return '⭐';
      case 'social_follow': return '📱';
      case 'reward_redemption': return '🎁';
      case 'signup': return '✨';
      default: return '🎯';
    }
  };

  if (loading) {
    return <div className="loading-container">Loading user profile...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-sidebar">
        <div className="user-info">
          <div className="user-avatar">
            {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2>{userData?.name || "User"}</h2>
          <p className="user-email">{userData?.email || ""}</p>
          <p className="joined-date">Member since: {userData.joinDate}</p>
          
          <div className="points-display">
            <h3>{userData.points} Points</h3>
            <div className="level-badge">{userData.tier} Tier</div>
          </div>
          
          <div className="progress-container">
            <div className="progress-label">
              <span>{userData.tier}</span>
              <span>{getNextTier(userData.points).name}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${getTierProgress(userData.points)}%` }}></div>
            </div>
            {userData.points < 5000 && (
              <p className="progress-text">{getNextTier(userData.points).needed} more points to reach {getNextTier(userData.points).name}</p>
            )}
            {userData.points >= 5000 && (
              <p className="progress-text">Maximum tier achieved!</p>
            )}
          </div>
        </div>
        
        <div className="sidebar-nav">
          <button 
            className={activeTab === 'loyalty' ? 'active' : ''} 
            onClick={() => handleTabChange('loyalty')}
          >
            Loyalty Program
          </button>
          <button 
            className={activeTab === 'rewards' ? 'active' : ''} 
            onClick={() => handleTabChange('rewards')}
          >
            Rewards & Points
          </button>
          <button 
            className={activeTab === 'activities' ? 'active' : ''} 
            onClick={() => handleTabChange('activities')}
          >
            Activities
          </button>
          <button 
            className={activeTab === 'contests' ? 'active' : ''} 
            onClick={() => handleTabChange('contests')}
          >
            Contests
          </button>
          <button 
            className={activeTab === 'appointments' ? 'active' : ''} 
            onClick={() => handleTabChange('appointments')}
          >
            My Appointments
          </button>
        </div>
        
        <Link to="/settings" className="settings-button">
          Account Settings
        </Link>
      </div>
      
      <div className="profile-content">
        {activeTab === 'loyalty' && (
          <div className="loyalty-content">
            <h2>Tattoo Loyalty Program</h2>
            
            <div className="loyalty-overview">
              <div className="loyalty-card">
                <div className="card-header">
                  <h3>Your Digital Loyalty Card</h3>
                  <span className="card-number">#{userData.id || '12345678'}</span>
                </div>
                <div className="card-body">
                  <div className="member-info">
                    <p className="member-name">{userData.name}</p>
                    <p className="member-since">Member since: {userData.joinDate}</p>
                  </div>
                  <div className="tier-info">
                    <div className="tier-badge-large">{userData.tier}</div>
                    <div className="points-info">
                      <h4>{userData.points} Points</h4>
                      {userData.points < 5000 && (
                        <p>{getNextTier(userData.points).needed} to {getNextTier(userData.points).name}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="loyalty-tiers">
              <h3>VIP Tiers & Benefits</h3>
              <div className="tiers-grid">
                <div className={`tier-card ${userData.points >= 1000 ? 'achieved' : ''}`}>
                  <div className="tier-header silver">
                    <h4>Silver Tier</h4>
                    <p>1,000 Points</p>
                  </div>
                  <div className="tier-benefits">
                    <ul>
                      <li>5% off all tattoo sessions</li>
                      <li>Early notification of new designs</li>
                      <li>Free touch-up within 30 days</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`tier-card ${userData.points >= 2500 ? 'achieved' : ''}`}>
                  <div className="tier-header gold">
                    <h4>Gold Tier</h4>
                    <p>2,500 Points</p>
                  </div>
                  <div className="tier-benefits">
                    <ul>
                      <li>10% off all tattoo sessions</li>
                      <li>Priority booking</li>
                      <li>Free aftercare products</li>
                      <li>Complimentary design consultation</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`tier-card ${userData.points >= 5000 ? 'achieved' : ''}`}>
                  <div className="tier-header platinum">
                    <h4>Platinum Tier</h4>
                    <p>5,000 Points</p>
                  </div>
                  <div className="tier-benefits">
                    <ul>
                      <li>15% off all tattoo sessions</li>
                      <li>VIP private sessions</li>
                      <li>Free merchandise</li>
                      <li>Exclusive event invitations</li>
                      <li>First access to visiting artists</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="earning-points">
              <h3>How to Earn Points</h3>
              <div className="earning-methods">
                <div className="earning-method">
                  <div className="earning-icon">🎨</div>
                  <div className="earning-details">
                    <h4>Book a Tattoo Session</h4>
                    <p>Earn 100 points for each tattoo session you book</p>
                  </div>
                </div>
                
                <div className="earning-method">
                  <div className="earning-icon">👥</div>
                  <div className="earning-details">
                    <h4>Refer a Friend</h4>
                    <p>Earn 200 points when your referred friend gets their first tattoo</p>
                  </div>
                </div>
                
                <div className="earning-method">
                  <div className="earning-icon">⭐</div>
                  <div className="earning-details">
                    <h4>Leave a Review</h4>
                    <p>Earn 50 points for leaving a review of your tattoo experience</p>
                  </div>
                </div>
                
                <div className="earning-method">
                  <div className="earning-icon">📱</div>
                  <div className="earning-details">
                    <h4>Follow on Social Media</h4>
                    <p>Earn 25 points for following our social media accounts</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="recent-points">
              <h3>Recent Points Activity</h3>
              <div className="points-history">
                {userData.loyaltyHistory.map(activity => (
                  <div className="history-item" key={activity.id}>
                    <div className="history-icon">
                      {getLoyaltyIcon(activity.type)}
                    </div>
                    <div className="history-details">
                      <h4>{activity.name}</h4>
                      <p className="history-date">{activity.date}</p>
                    </div>
                    <div className={`history-points ${activity.points.startsWith('+') ? 'positive' : 'negative'}`}>
                      {activity.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'rewards' && (
          <div className="rewards-content">
            <h2>Rewards & Points</h2>
            
            <div className="available-rewards">
              <h3>Available Rewards</h3>
              <div className="rewards-grid">
                {userData.availableRewards.map(reward => (
                  <div className={`reward-item ${reward.status}`} key={reward.id}>
                    <div className="reward-header">
                      <h4>{reward.name}</h4>
                      <div className="reward-points">{reward.points} points</div>
                    </div>
                    <p className="reward-description">{reward.description}</p>
                    {reward.status === 'available' && userData.points >= reward.points ? (
                      <button 
                        className="redeem-button" 
                        onClick={() => redeemReward(reward.id)}
                      >
                        Redeem Reward
                      </button>
                    ) : reward.status === 'available' ? (
                      <div className="points-needed">
                        <p>Need {reward.points - userData.points} more points</p>
                        <div className="mini-progress">
                          <div 
                            className="mini-progress-fill" 
                            style={{ width: `${Math.min(100, (userData.points / reward.points) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="redeemed-status">
                        <p>Redeemed on {reward.redeemedDate}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="badges-section">
              <h3>Your Badges</h3>
              <div className="badges-container">
                {userData.badges.map((badge, index) => (
                  <div className="badge-item" key={index}>
                    <div className="badge-icon">🏆</div>
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="streak-section">
              <h3>Current Streak: {userData.streakDays} days</h3>
              <div className="streak-calendar">
                {[...Array(7)].map((_, i) => (
                  <div 
                    className={`streak-day ${i < userData.streakDays ? 'active' : ''}`} 
                    key={i}
                  >
                    {i < userData.streakDays ? '✓' : ''}
                  </div>
                ))}
              </div>
              <p>Continue your streak to earn bonus points!</p>
            </div>
            
            <div className="rewards-info">
              <h3>Rewards Information</h3>
              <div className="rewards-grid">
                <div className="reward-card">
                  <div className="reward-icon">✓</div>
                  <div className="reward-details">
                    <h4>Daily Check-in Bonus</h4>
                    <p>Earn coins for logging in daily, with increasing rewards for streaks.</p>
                    <ul className="rewards-scale">
                      <li>Day 1: +10 points</li>
                      <li>Day 3: +20 points</li>
                      <li>Day 5: +30 points</li>
                      <li>Day 7: +50 points</li>
                    </ul>
                  </div>
                </div>
                <div className="reward-card">
                  <div className="reward-icon">🏆</div>
                  <div className="reward-details">
                    <h4>Contest Streak Rewards</h4>
                    <p>Participating in 5 consecutive contests unlocks bonus coins.</p>
                    <ul className="rewards-scale">
                      <li>3 Contests: +100 points</li>
                      <li>5 Contests: +200 points</li>
                      <li>10 Contests: +500 points</li>
                    </ul>
                  </div>
                </div>
                <div className="reward-card">
                  <div className="reward-icon">🔥</div>
                  <div className="reward-details">
                    <h4>Winning Streak Bonus</h4>
                    <p>Extra rewards for multiple consecutive wins!</p>
                    <ul className="rewards-scale">
                      <li>First Win: +300 points</li>
                      <li>Second Consecutive Win: +400 points</li>
                      <li>Third+ Consecutive Win: +500 points</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'activities' && (
          <div className="activities-content">
            <h2>Recent Activities</h2>
            <div className="activity-list">
              {userData.recentActivities.map(activity => (
                <div className="activity-item" key={activity.id}>
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'contest_joined' ? '🎨' : 
                     activity.type === 'contest_won' ? '🏆' : '✓'}
                  </div>
                  <div className="activity-details">
                    <h4>{activity.name}</h4>
                    <p className="activity-date">{activity.date}</p>
                  </div>
                  <div className="activity-points">
                    {activity.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'contests' && (
          <div className="contests-content">
            <h2>Contests</h2>
            
            <div className="contests-summary">
              <div className="contest-stat">
                <h3>{userData.contestsJoined}</h3>
                <p>Contests Joined</p>
              </div>
              <div className="contest-stat">
                <h3>{userData.contestsWon}</h3>
                <p>Contests Won</p>
              </div>
              <div className="contest-stat">
                <h3>{Math.round((userData.contestsWon / userData.contestsJoined) * 100)}%</h3>
                <p>Win Rate</p>
              </div>
            </div>
            
            <div className="upcoming-contests">
              <h3>Upcoming Contests</h3>
              <div className="contest-list">
                {userData.upcomingContests.map(contest => (
                  <div className="contest-item" key={contest.id}>
                    <div className="contest-details">
                      <h4>{contest.name}</h4>
                      <p>Date: {contest.date}</p>
                      <p>Entry Fee: {contest.entryFee} points</p>
                    </div>
                    <button 
                      className="join-contest-btn" 
                      onClick={() => {
                        alert('Contest entry functionality will be available soon!');
                      }}
                    >
                      Join Contest
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'appointments' && (
          <div className="appointments-content">
            <h2>My Tattoo Appointments</h2>
            
            <div className="appointments-list">
              <h3>Past Appointments</h3>
              {userData.pastAppointments.map(appointment => (
                <div className="appointment-item" key={appointment.id}>
                  <div className="appointment-date">
                    <h4>{appointment.date}</h4>
                  </div>
                  <div className="appointment-details">
                    <p><strong>Artist:</strong> {appointment.artist}</p>
                    <p><strong>Design:</strong> {appointment.design}</p>
                    <p><strong>Duration:</strong> {appointment.duration}</p>
                  </div>
                  <div className="appointment-actions">
                    <button 
                      className="small-button" 
                      onClick={() => alert('Appointment details will be available soon!')}
                    >
                      View Details
                    </button>
                    <button 
                      className="small-button"
                      onClick={() => alert('Booking functionality will be available soon!')}
                    >
                      Book Follow-up
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="book-appointment">
              <h3>Book a New Appointment</h3>
              <p>Ready for your next tattoo? Book an appointment with one of our talented artists.</p>
              <button 
                className="primary-button"
                onClick={() => alert('Appointment scheduling will be available soon!')}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile; 