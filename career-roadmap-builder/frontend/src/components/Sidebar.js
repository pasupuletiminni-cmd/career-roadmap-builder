import React from 'react';

function Sidebar({ activeTab, setActiveTab, setView }) {
  return (
    <aside className="sidebar">
      <div className="brand-container" style={{padding: '10px 10px 30px', cursor: 'pointer'}} onClick={() => setView('landing')}>
        <div className="logo-icon" style={{width: '30px', height: '30px', fontSize: '1rem'}}>R</div>
        <div className="logo-text" style={{fontSize: '1.2rem'}}>Roadmap AI</div>
      </div>
      <button className={`sidebar-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>Dashboard</button>
      <button className={`sidebar-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</button>
      <button className={`sidebar-btn ${activeTab === 'roadmap' ? 'active' : ''}`} onClick={() => setActiveTab('roadmap')}>Roadmap</button>
      <button className={`sidebar-btn ${activeTab === 'resources' ? 'active' : ''}`} onClick={() => setActiveTab('resources')}>Resources</button>
      <button className={`sidebar-btn ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>Progress</button>
    </aside>
  );
}

export default Sidebar;