import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const messageTimeoutRef = useRef(null);
  
  // Form state for profile settings
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  // Form state for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    contestResults: true,
    contestReminders: true,
    lowBalanceWarnings: true,
    dailyLoginReminder: true,
    marketingEmails: false
  });
  
  // Form state for appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: false,
    compactView: false,
    fontSize: 'medium'
  });
  
  // Form state for security settings
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  useEffect(() => {
    // Fetch user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    
    if (storedUserData) {
      setUserData(storedUserData);
      setName(storedUserData.name || '');
      setEmail(storedUserData.email || '');
      
      // Load saved settings if they exist
      const savedNotifications = JSON.parse(localStorage.getItem('notificationSettings'));
      if (savedNotifications) {
        setNotificationSettings(savedNotifications);
      }
      
      const savedAppearance = JSON.parse(localStorage.getItem('appearanceSettings'));
      if (savedAppearance) {
        setAppearanceSettings(savedAppearance);
        applyAppearanceSettings(savedAppearance);
      }
      
      // Add mock data for demo
      setPhone(storedUserData.phone || '(555) 123-4567');
      setBio(storedUserData.bio || 'Tattoo enthusiast and design lover. Looking for unique designs for my next piece.');
      setLoading(false);
    } else {
      // Redirect to login if no user data is found
      navigate('/login');
    }
    
    // Get the section from URL hash if it exists
    const hash = window.location.hash.substring(1);
    if (hash && ['profile', 'notifications', 'appearance', 'security'].includes(hash)) {
      setActiveSection(hash);
    }
    
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [navigate]);
  
  const showMessage = (message, isError = false) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    if (isError) {
      setErrorMessage(message);
      setSuccessMessage('');
    } else {
      setSuccessMessage(message);
      setErrorMessage('');
    }
    
    messageTimeoutRef.current = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };
  
  const handleNotificationChange = (setting) => {
    const updatedSettings = {
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    };
    
    setNotificationSettings(updatedSettings);
    
    // Save to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(updatedSettings));
    
    showMessage('Notification preference updated');
  };
  
  const applyAppearanceSettings = (settings) => {
    const root = document.documentElement;
    
    // Apply dark mode
    if (settings.darkMode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
    
    // Apply compact view
    if (settings.compactView) {
      root.classList.add('compact-view');
    } else {
      root.classList.remove('compact-view');
    }
    
    // Apply font size
    root.style.setProperty('--base-font-size', {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'x-large': '20px'
    }[settings.fontSize] || '16px');
  };
  
  const handleAppearanceChange = (setting, value) => {
    const updatedSettings = {
      ...appearanceSettings,
      [setting]: value
    };
    
    setAppearanceSettings(updatedSettings);
    
    // Apply settings to the UI
    applyAppearanceSettings(updatedSettings);
    
    // Save to localStorage
    localStorage.setItem('appearanceSettings', JSON.stringify(updatedSettings));
    
    showMessage('Appearance setting updated');
  };
  
  const validateProfileForm = () => {
    const errors = {};
    
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(phone)) {
      errors.phone = 'Phone should be in format (XXX) XXX-XXXX';
    }
    
    if (bio && bio.length > 500) {
      errors.bio = 'Bio should be less than 500 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      showMessage('Please correct the errors in the form', true);
      return;
    }
    
    // Update localStorage with new user data
    const updatedUserData = {
      ...userData,
      name,
      email,
      phone,
      bio
    };
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    
    showMessage('Profile updated successfully!');
  };
  
  const validatePasswordForm = () => {
    const errors = {};
    const { currentPassword, newPassword, confirmPassword } = securityForm;
    
    if (!currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSecurityFormChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm({
      ...securityForm,
      [name]: value
    });
  };
  
  const handleResetPassword = (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      showMessage('Please correct the errors in the form', true);
      return;
    }
    
    // Mock password update (in a real app, this would call an API)
    setTimeout(() => {
      // Clear form
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      showMessage('Password updated successfully!');
    }, 500);
  };
  
  const handleSignOutAllDevices = () => {
    // Mock sign out of all devices
    showMessage('Signed out from all other devices');
  };
  
  const handleDeleteAccount = () => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmed) {
      // Mock account deletion
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('notificationSettings');
      localStorage.removeItem('appearanceSettings');
      
      showMessage('Account deleted successfully');
      
      // Redirect to home after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };
  
  const handleSaveNotifications = () => {
    // Already saving on each toggle, but this provides additional confirmation
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    showMessage('Notification preferences saved');
  };
  
  const handleSaveAppearance = () => {
    // Already saving on each change, but this provides additional confirmation
    localStorage.setItem('appearanceSettings', JSON.stringify(appearanceSettings));
    showMessage('Appearance settings saved');
  };
  
  const handleTabChange = (section) => {
    setActiveSection(section);
    window.location.hash = section;
  };
  
  if (loading) {
    return <div className="settings-loading">Loading settings...</div>;
  }
  
  return (
    <div className="settings-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <div className="settings-nav">
          <button 
            className={activeSection === 'profile' ? 'active' : ''} 
            onClick={() => handleTabChange('profile')}
          >
            Profile Information
          </button>
          <button 
            className={activeSection === 'notifications' ? 'active' : ''} 
            onClick={() => handleTabChange('notifications')}
          >
            Notification Preferences
          </button>
          <button 
            className={activeSection === 'appearance' ? 'active' : ''} 
            onClick={() => handleTabChange('appearance')}
          >
            Appearance
          </button>
          <button 
            className={activeSection === 'security' ? 'active' : ''} 
            onClick={() => handleTabChange('security')}
          >
            Security
          </button>
        </div>
        
        <Link to="/profile" className="back-to-profile">
          Back to Profile
        </Link>
      </div>
      
      <div className="settings-content">
        {activeSection === 'profile' && (
          <div className="profile-settings">
            <h2>Profile Information</h2>
            <p className="settings-description">
              Update your personal information. This information will be displayed on your profile.
            </p>
            
            <form onSubmit={handleSubmitProfile}>
              <div className="form-group">
                <label htmlFor="name">Full Name<span className="required">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your full name"
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && <div className="form-error">{formErrors.name}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address<span className="required">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Your email address"
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <div className="form-error">{formErrors.email}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="(XXX) XXX-XXXX"
                  className={formErrors.phone ? 'error' : ''}
                />
                {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea 
                  id="bio" 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  rows="4"
                  className={formErrors.bio ? 'error' : ''}
                ></textarea>
                {formErrors.bio && <div className="form-error">{formErrors.bio}</div>}
                <div className="char-count">{bio.length}/500 characters</div>
              </div>
              
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          </div>
        )}
        
        {activeSection === 'notifications' && (
          <div className="notification-settings">
            <h2>Notification Preferences</h2>
            <p className="settings-description">
              Control which notifications you receive from us.
            </p>
            
            <div className="notification-options">
              <div className="notification-option">
                <label className="toggle-label">
                  <span className="notification-title">Contest Result Alerts</span>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.contestResults} 
                      onChange={() => handleNotificationChange('contestResults')} 
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <p className="notification-description">
                  Receive notifications when contest results are published.
                </p>
              </div>
              
              <div className="notification-option">
                <label className="toggle-label">
                  <span className="notification-title">Contest Reminders</span>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.contestReminders} 
                      onChange={() => handleNotificationChange('contestReminders')} 
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <p className="notification-description">
                  Get reminded about upcoming contests you might be interested in.
                </p>
              </div>
              
              <div className="notification-option">
                <label className="toggle-label">
                  <span className="notification-title">Low Balance Warnings</span>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.lowBalanceWarnings} 
                      onChange={() => handleNotificationChange('lowBalanceWarnings')} 
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <p className="notification-description">
                  Receive alerts when your wallet balance is too low to join a contest.
                </p>
              </div>
              
              <div className="notification-option">
                <label className="toggle-label">
                  <span className="notification-title">Daily Login Reminder</span>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.dailyLoginReminder} 
                      onChange={() => handleNotificationChange('dailyLoginReminder')} 
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <p className="notification-description">
                  Get reminded to log in daily to maintain your streak and earn bonuses.
                </p>
              </div>
              
              <div className="notification-option">
                <label className="toggle-label">
                  <span className="notification-title">Marketing Emails</span>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.marketingEmails} 
                      onChange={() => handleNotificationChange('marketingEmails')} 
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <p className="notification-description">
                  Receive promotional emails about special offers and new features.
                </p>
              </div>
            </div>
            
            <button className="save-button" onClick={handleSaveNotifications}>Save Preferences</button>
          </div>
        )}
        
        {activeSection === 'appearance' && (
          <div className="appearance-settings">
            <h2>Appearance</h2>
            <p className="settings-description">
              Customize how the application looks for you.
            </p>
            
            <div className="appearance-options">
              <div className="appearance-option">
                <label className="toggle-label">
                  <span className="appearance-title">Dark Mode</span>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={appearanceSettings.darkMode} 
                      onChange={() => handleAppearanceChange('darkMode', !appearanceSettings.darkMode)} 
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <p className="appearance-description">
                  Enable dark mode for a more comfortable viewing experience in low light.
                </p>
              </div>
              
              <div className="appearance-option">
                <label className="toggle-label">
                  <span className="appearance-title">Compact View</span>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={appearanceSettings.compactView} 
                      onChange={() => handleAppearanceChange('compactView', !appearanceSettings.compactView)} 
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <p className="appearance-description">
                  Show more content on screen with a compact layout.
                </p>
              </div>
              
              <div className="appearance-option">
                <div className="appearance-select-group">
                  <span className="appearance-title">Font Size</span>
                  <select 
                    value={appearanceSettings.fontSize} 
                    onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium (Default)</option>
                    <option value="large">Large</option>
                    <option value="x-large">Extra Large</option>
                  </select>
                </div>
                <p className="appearance-description">
                  Adjust the font size for better readability.
                </p>
              </div>
              
              <div className="appearance-preview">
                <h3>Preview</h3>
                <div className={`preview-box ${appearanceSettings.darkMode ? 'dark' : 'light'}`}>
                  <p style={{ fontSize: appearanceSettings.fontSize === 'small' ? '0.9rem' : 
                              appearanceSettings.fontSize === 'large' ? '1.1rem' : 
                              appearanceSettings.fontSize === 'x-large' ? '1.2rem' : '1rem' }}>
                    This is how text will appear with your selected settings.
                  </p>
                </div>
              </div>
            </div>
            
            <button className="save-button" onClick={handleSaveAppearance}>Save Preferences</button>
          </div>
        )}
        
        {activeSection === 'security' && (
          <div className="security-settings">
            <h2>Security Settings</h2>
            <p className="settings-description">
              Manage your account security settings.
            </p>
            
            <div className="password-section">
              <h3>Change Password</h3>
              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password<span className="required">*</span></label>
                  <input 
                    type="password" 
                    id="currentPassword"
                    name="currentPassword" 
                    value={securityForm.currentPassword}
                    onChange={handleSecurityFormChange}
                    placeholder="Enter your current password" 
                    className={formErrors.currentPassword ? 'error' : ''}
                  />
                  {formErrors.currentPassword && <div className="form-error">{formErrors.currentPassword}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password<span className="required">*</span></label>
                  <input 
                    type="password" 
                    id="newPassword"
                    name="newPassword"
                    value={securityForm.newPassword}
                    onChange={handleSecurityFormChange} 
                    placeholder="Enter your new password" 
                    className={formErrors.newPassword ? 'error' : ''}
                  />
                  {formErrors.newPassword && <div className="form-error">{formErrors.newPassword}</div>}
                  <div className="password-requirements">
                    Password must be at least 8 characters long
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password<span className="required">*</span></label>
                  <input 
                    type="password" 
                    id="confirmPassword"
                    name="confirmPassword"
                    value={securityForm.confirmPassword}
                    onChange={handleSecurityFormChange} 
                    placeholder="Confirm your new password" 
                    className={formErrors.confirmPassword ? 'error' : ''}
                  />
                  {formErrors.confirmPassword && <div className="form-error">{formErrors.confirmPassword}</div>}
                </div>
                
                <button type="submit" className="save-button">Update Password</button>
              </form>
            </div>
            
            <div className="sessions-section">
              <h3>Active Sessions</h3>
              <div className="session-item">
                <div className="session-info">
                  <div>
                    <strong>Current Session</strong>
                    <p>Your current browser • {new Date().toLocaleString()}</p>
                  </div>
                  <span className="session-badge current">Current</span>
                </div>
              </div>
              
              <div className="session-item">
                <div className="session-info">
                  <div>
                    <strong>Recent Login</strong>
                    <p>Mobile App • {new Date(Date.now() - 86400000).toLocaleString()}</p>
                  </div>
                  <button className="small-button" onClick={() => showMessage('Session terminated')}>Terminate</button>
                </div>
              </div>
              
              <button className="danger-button" onClick={handleSignOutAllDevices}>Sign Out of All Other Devices</button>
            </div>
            
            <div className="danger-zone">
              <h3>Danger Zone</h3>
              <p className="settings-description">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="danger-button" onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 