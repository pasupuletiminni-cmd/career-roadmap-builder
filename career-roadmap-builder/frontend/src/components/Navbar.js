import React from 'react';

function Navbar({ view, setView, setIsLogin, setPendingTab, setActiveTab }) {
  const handleFeatureClick = (tabName) => {
    setPendingTab(tabName);
    setIsLogin(false);
    setView('auth');
  };

  return (
    <nav className="navbar-light">
      <div className="brand-container" onClick={() => setView('landing')}>
        <div className="logo-icon">R</div>
        <div className="logo-text">Roadmap AI</div>
      </div>
      
      <div className="nav-links-light">
        <span className={view === 'landing' ? 'active' : ''} onClick={() => setView('landing')}>Home</span>
        <span className={view === 'dashboard' ? 'active' : ''} onClick={() => { setView('dashboard'); setActiveTab('home'); }}>Platform</span>
        <span onClick={() => handleFeatureClick('skills')}>Features</span>
        <span>Pricing</span>
      </div>
      
      <div className="auth-buttons">
        <button className="login-btn-light" onClick={() => { setView('auth'); setIsLogin(true); }}>Log In</button>
        <button className="signup-btn-light" onClick={() => { setView('auth'); setIsLogin(false); setPendingTab('home'); }}>Start Free Trial</button>
      </div>
    </nav>
  );
}

export default Navbar;