import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileDropdown from "./components/ProfileDropdown";
import UserProfile from "./components/UserProfile";
import Settings from "./components/Settings";

import Home from "./components/Home";
import About from "./components/About";
import OurArtist from "./components/OurArtist";
import Eric from "./components/Ourartist/Eric";
import Parth from "./components/Ourartist/Parth";
import Poufa from "./components/Ourartist/Poufa";
import SmallCategory from "./components/Ourcategories/SmallCategory";
import StipplingCategory from "./components/Ourcategories/StipplingCategory";
import LoveCategory from "./components/Ourcategories/LoveCategory";
import CoverCategory from "./components/Ourcategories/CoverCategory";
import NatureCategory from "./components/Ourcategories/NatureCategory";
import ReligiousCategory from "./components/Ourcategories/ReligiousCategory";
import Contact from "./components/Contact";
import Blog from "./components/Blog";

import "./App.css"; // Import CSS

function App() {
  const [dropdown, setDropdown] = useState(false);
  const [artistdropdown, setArtistDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notification, setNotification] = useState(null);

  // Function to check for daily login
  const checkDailyLogin = () => {
    if (!localStorage.getItem('token') || !userData) return;
    
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    if (lastLoginDate !== today) {
      // It's a new day login, award points
      const updatedUserData = { ...userData };
      
      // Add points based on streak
      let pointsToAdd = 10; // Base points
      if (updatedUserData.streakDays === 2) pointsToAdd = 15;
      else if (updatedUserData.streakDays === 4) pointsToAdd = 20;
      else if (updatedUserData.streakDays >= 6) pointsToAdd = 30;
      
      // Generate a unique ID for the activity
      const newActivityId = Date.now();
      
      // Create a date string for the activity
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      // Create new activity entry
      const newActivity = {
        id: newActivityId,
        type: "daily_login",
        name: "Daily Login Bonus",
        date: currentDate,
        points: `+${pointsToAdd}`
      };
      
      // Update points and streak
      const oldPoints = updatedUserData.points || 0;
      const newPoints = oldPoints + pointsToAdd;
      updatedUserData.points = newPoints;
      updatedUserData.streakDays = (updatedUserData.streakDays || 0) + 1;
      
      // Add to loyalty history if it exists
      if (updatedUserData.loyaltyHistory) {
        updatedUserData.loyaltyHistory = [
          newActivity,
          ...updatedUserData.loyaltyHistory
        ];
      } else {
        updatedUserData.loyaltyHistory = [newActivity];
      }
      
      // Add to recent activities if it exists
      if (updatedUserData.recentActivities) {
        updatedUserData.recentActivities = [
          newActivity,
          ...updatedUserData.recentActivities
        ];
      }
      
      // Check for tier changes
      let tierChanged = false;
      let newTier = '';
      const oldTier = updatedUserData.tier;
      
      if (oldPoints < 5000 && newPoints >= 5000 && oldTier !== "Platinum") {
        updatedUserData.tier = "Platinum";
        tierChanged = true;
        newTier = "Platinum";
      } else if (oldPoints < 2500 && newPoints >= 2500 && oldTier !== "Gold" && oldTier !== "Platinum") {
        updatedUserData.tier = "Gold";
        tierChanged = true;
        newTier = "Gold";
      } else if (oldPoints < 1000 && newPoints >= 1000 && oldTier !== "Silver" && oldTier !== "Gold" && oldTier !== "Platinum") {
        updatedUserData.tier = "Silver";
        tierChanged = true;
        newTier = "Silver";
      }
      
      // Show tier change notification if applicable
      if (tierChanged) {
        // Add a badge for the new tier
        const tierBadge = `${newTier} Tier Achieved`;
        if (!updatedUserData.badges.includes(tierBadge)) {
          updatedUserData.badges = [...updatedUserData.badges, tierBadge];
        }
        
        // Show notification
        setNotification({
          type: 'tier-upgrade',
          tier: newTier,
          message: `Congratulations! You've been upgraded to ${newTier} tier!`
        });
        
        // Clear notification after 5 seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
      
      // Save updated user data
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      localStorage.setItem('lastLoginDate', today);
      
      // Update state
      setUserData(updatedUserData);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    
    if (token && storedUserData) {
      // Add loyalty program data if not present
      if (!storedUserData.points) {
        const enhancedUserData = {
          ...storedUserData,
          points: 2450,
          tier: "Gold",
          joinDate: storedUserData.joinDate || new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          badges: ["Early Adopter", "Contest Champion", "5-Day Streak"],
          streakDays: 5,
          // Add additional required loyalty data
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
          ]
        };
        localStorage.setItem('userData', JSON.stringify(enhancedUserData));
        setUserData(enhancedUserData);
      } else {
        setUserData(storedUserData);
      }
      setIsLoggedIn(true);
      
      // Check for daily login after loading user data
      setTimeout(() => {
        checkDailyLogin();
      }, 1000);
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('lastLoginDate');
    setIsLoggedIn(false);
    setUserData(null);
    setShowProfileMenu(false);
  };

  const handleCloseProfileMenu = () => {
    setShowProfileMenu(false);
  };

  return (
    <Router>
      <div>
        {notification && (
          <div className={`app-notification ${notification.type}`}>
            <div className="notification-content">
              <div className="notification-icon">
                {notification.type === 'tier-upgrade' ? '🏆' : '✓'}
              </div>
              <div className="notification-message">
                {notification.message}
              </div>
              <button className="notification-close" onClick={() => setNotification(null)}>
                ×
              </button>
            </div>
          </div>
        )}
        
        <nav>
          <div className="logo-container">
            <img
              className="logo"
              src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738302308/logo_lgkl6k.png"
              alt="Logo"
            />
          </div>
          <div className="nav-links">
            <ul>
              <li className="home">
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
              <li
                className="categories-menu"
                onMouseEnter={() => setArtistDropdown(true)}
                onMouseLeave={() => setArtistDropdown(false)}
              >
                <Link to="/our-artist">OUR ARTIST</Link>
                {artistdropdown && (
                  <ul className="dropdown">
                    <li className="small">
                      <Link to="/ourartist/Eric">Eric Dsuza</Link>
                    </li>
                    <li>
                      <Link to="/ourartist/Parth">PARTH SAVANI</Link>
                    </li>
                    <li>
                      <Link to="/ourArtist/Poufa">POUFA</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li
                className="categories-menu"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <Link>OUR CATEGORIES</Link>
                {dropdown && (
                  <ul className="dropdown">
                    <li className="small">
                      <Link to="/our-categories/small">SMALL</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Stippling">STIPPLING</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Love">LOVE</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Religious">RELIGIOUS</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Cover">COVER</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Nature">NATURE</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
              <li>
                <Link to="/blog">AI TATTOO</Link>
              </li>
              <li className="profile-menu-container">
                <div 
                  className="profile-button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  {isLoggedIn ? (
                    <div className="profile-logo">
                      {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  ) : (
                    <span className="login-icon">👤</span>
                  )}
                </div>
                {showProfileMenu && (
                  <ProfileDropdown 
                    isLoggedIn={isLoggedIn} 
                    userData={userData} 
                    onClose={handleCloseProfileMenu}
                    onLogout={handleLogout}
                  />
                )}
              </li>
            </ul>
          </div>
          <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={isMenuOpen ? "open" : ""}></span>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-artist" element={<OurArtist />} />
          <Route path="/ourartist/Eric" element={<Eric />} />
          <Route path="/ourartist/Parth" element={<Parth />} />
          <Route path="/ourartist/Poufa" element={<Poufa />} />
          <Route path="/our-categories/small" element={<SmallCategory />} />
          <Route path="/our-categories/Stippling" element={<StipplingCategory />} />
          <Route path="/our-categories/Love" element={<LoveCategory />} />
          <Route path="/our-categories/Religious" element={<ReligiousCategory />} />
          <Route path="/our-categories/Cover" element={<CoverCategory />} />
          <Route path="/our-categories/Nature" element={<NatureCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;