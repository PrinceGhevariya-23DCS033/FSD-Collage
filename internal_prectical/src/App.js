import React, { useState, useEffect } from 'react';
import './Auth.css';

// Simple API service
const API_BASE = 'http://localhost:5000/api';

const api = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },
  
  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },
  
  getProfile: async (token) => {
    const response = await fetch(`${API_BASE}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};

// Login Component
function LoginForm({ onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await api.login(formData);
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        onLogin(result.user);
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>🔐 Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username or Email"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account? 
          <button className="link-button" onClick={onSwitchToRegister}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

// Register Component
function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', fullName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await api.register(formData);
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        onRegister(result.user);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>📝 Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account? 
          <button className="link-button" onClick={onSwitchToLogin}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const result = await api.getProfile(token);
          if (result.user) {
            setProfile(result.user);
          }
        } catch (err) {
          console.error('Error loading profile:', err);
        }
      }
    };
    loadProfile();
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="user-info">
            <h2>👤 User Profile</h2>
            <div className="profile-card">
              <p><strong>Name:</strong> {user.fullName}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member Since:</strong> {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Loading...'}</p>
              {user.lastLogin && (
                <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
              )}
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="analytics-section">
            <h2>📊 Analytics Dashboard</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>👥 Total Users</h3>
                <p className="stat-number">1,234</p>
                <span className="stat-change">+12% this month</span>
              </div>
              <div className="stat-card">
                <h3>🔐 Logins Today</h3>
                <p className="stat-number">89</p>
                <span className="stat-change">+5% from yesterday</span>
              </div>
              <div className="stat-card">
                <h3>📈 Activity Rate</h3>
                <p className="stat-number">78%</p>
                <span className="stat-change">+3% this week</span>
              </div>
              <div className="stat-card">
                <h3>🛡️ Security Score</h3>
                <p className="stat-number">95%</p>
                <span className="stat-change">Excellent</span>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="settings-section">
            <h2>⚙️ Account Settings</h2>
            <div className="settings-grid">
              <div className="setting-item">
                <h4>🔔 Notifications</h4>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
                <p>Receive email notifications for account activity</p>
              </div>
              <div className="setting-item">
                <h4>🔒 Two-Factor Authentication</h4>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
                <p>Add an extra layer of security to your account</p>
              </div>
              <div className="setting-item">
                <h4>🌙 Dark Mode</h4>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
                <p>Switch to dark theme for better viewing</p>
              </div>
              <div className="setting-item">
                <h4>📧 Change Email</h4>
                <button className="action-btn">Update Email</button>
                <p>Change your email address</p>
              </div>
              <div className="setting-item">
                <h4>🔑 Change Password</h4>
                <button className="action-btn">Update Password</button>
                <p>Update your account password</p>
              </div>
            </div>
          </div>
        );
      
      case 'help':
        return (
          <div className="help-section">
            <h2>❓ Help & Support</h2>
            <div className="help-content">
              <div className="faq-section">
                <h3>📋 Frequently Asked Questions</h3>
                <div className="faq-item">
                  <h4>How do I reset my password?</h4>
                  <p>Click on "Forgot Password" on the login page and follow the instructions sent to your email.</p>
                </div>
                <div className="faq-item">
                  <h4>Is my data secure?</h4>
                  <p>Yes, we use industry-standard encryption and security measures to protect your information.</p>
                </div>
                <div className="faq-item">
                  <h4>How do I update my profile?</h4>
                  <p>Go to the Profile tab and click on the edit button to update your information.</p>
                </div>
              </div>
              <div className="contact-section">
                <h3>📞 Contact Support</h3>
                <p>Email: support@authportal.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Hours: Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="dashboard-content">
            <h3>🚀 Portal Features</h3>
            <div className="features">
              <div className="feature-card">
                <h4>✅ Secure Authentication</h4>
                <p>Your account is protected with encrypted passwords and JWT tokens.</p>
              </div>
              <div className="feature-card">
                <h4>📊 User Management</h4>
                <p>Complete user registration and login system with MongoDB storage.</p>
              </div>
              <div className="feature-card">
                <h4>🎨 Modern Interface</h4>
                <p>Clean, responsive design built with React.js for the best user experience.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🏢 Welcome to Most Secure Platform of Prince</h1>
        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
      
      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button 
          className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
        <button 
          className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
        <button 
          className={`nav-btn ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => setActiveTab('help')}
        >
          ❓ Help
        </button>
      </nav>

      <div className="dashboard-main">
        {renderContent()}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('login');
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {currentView === 'login' ? (
        <LoginForm 
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentView('register')}
        />
      ) : (
        <RegisterForm 
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}
    </div>
  );
}

export default App;
