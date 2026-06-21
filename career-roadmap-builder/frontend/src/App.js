import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [view, setView] = useState('landing');
  const [isLogin, setIsLogin] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [pendingTab, setPendingTab] = useState('home');
  
  // --- NEW: Track the logged-in user's email ---
  const [currentUser, setCurrentUser] = useState(null);

  // Function to run when login is successful
  const handleLoginSuccess = (email) => {
    setCurrentUser(email);
    setView('dashboard'); // Move them to the dashboard
    if (pendingTab) {
      setActiveTab(pendingTab);
    }
  };

  return (
    <div className="App">
      {/* Show Navbar on Landing and Auth pages */}
      {view !== 'dashboard' && (
        <Navbar 
          view={view}
          setView={setView} 
          setIsLogin={setIsLogin} 
          setPendingTab={setPendingTab}
          setActiveTab={setActiveTab}
        />
      )}

      {/* 1. Landing Page */}
      {view === 'landing' && (
        <LandingPage 
          setView={setView} 
          setIsLogin={setIsLogin} 
          setPendingTab={setPendingTab} 
        />
      )}

      {/* 2. Auth Page (Login/Signup) */}
      {view === 'auth' && (
        <AuthPage 
          onLogin={handleLoginSuccess}
        />
      )}

      {/* 3. Dashboard Page (Only accessible after login) */}
      {view === 'dashboard' && (
        <DashboardPage 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setView={setView}
          userEmail={currentUser} 
          onLogout={() => {
            setCurrentUser(null);
            setView('landing'); // Send them back to landing on logout
          }}
        />
      )}
    </div>
  );
}

export default App;