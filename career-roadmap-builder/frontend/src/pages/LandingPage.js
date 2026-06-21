import React from 'react';

function LandingPage({ setView, setIsLogin, setPendingTab }) {
  const handleFeatureClick = (tabName) => {
    setPendingTab(tabName);
    setIsLogin(false);
    setView('auth');
  };

  return (
    <>
      <header className="hero-light">
        <div className="hero-text-content">
          <div className="hero-badge">NEW • AI-Powered Learning Paths</div>
          <h1>The smarter way to <span>learn and build.</span></h1>
          <p>Stop guessing what to study. Access custom learning roadmaps to master algorithms, build scalable projects, and land top-tier software roles.</p>
          
          <div className="hero-buttons">
            <button className="btn-start" onClick={() => handleFeatureClick('roadmap')}>
              Start Free Trial →
            </button>
            <button className="btn-demo">
              Watch Demo <span>▶</span>
            </button>
          </div>

          <div className="social-proof-row">
            <div className="avatars">
              <div className="avatar-circle"></div>
              <div className="avatar-circle"></div>
              <div className="avatar-circle"></div>
            </div>
            <span>Join <strong>15,000+</strong> learners worldwide</span>
          </div>
        </div>

        <div className="hero-visual-mockup">
          <div className="floating-pill">⭐ 4.9/5 User Rating</div>
          <div className="mockup-header">
            <div>
              <h3 style={{fontSize: '1.2rem', color: 'var(--text-main)'}}>Good morning, Minnie 👋</h3>
              <p style={{fontSize: '0.85rem', color: 'var(--text-light)'}}>Here is your progress today.</p>
            </div>
            <div className="logo-icon" style={{width: '30px', height: '30px', fontSize: '1rem'}}>R</div>
          </div>
          
          <div className="mockup-grid">
            <div className="mockup-card">
              <div className="mockup-label">Tasks Completed</div>
              <div className="mockup-number">128</div>
            </div>
            <div className="mockup-card">
              <div className="mockup-label">In Progress</div>
              <div className="mockup-number" style={{color: 'var(--primary)'}}>24</div>
            </div>
          </div>

          <div className="mockup-task-list">
            <div className="mockup-task">
              <div className="mock-circle done">✓</div>
              <div style={{flex: 1}}>
                <div style={{fontSize: '0.9rem', fontWeight: '600'}}>Array Manipulation</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-light)'}}>Data Structures</div>
              </div>
            </div>
            <div className="mockup-task">
              <div className="mock-circle" style={{background: 'var(--primary)'}}></div>
              <div style={{flex: 1}}>
                <div style={{fontSize: '0.9rem', fontWeight: '600'}}>Build REST API</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-light)'}}>Backend Project</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="stats-bar">
        <div className="stat-block">
          <h3>12K+</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-block">
          <h3>240K+</h3>
          <p>Tasks Completed</p>
        </div>
        <div className="stat-block">
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>
        <div className="stat-block">
          <h3>4.9/5</h3>
          <p>User Rating</p>
        </div>
      </div>

      <section className="bento-section">
        <div className="section-header">
          <span className="hero-badge" style={{background: 'transparent', border: 'none', padding: 0, marginBottom: '10px'}}>FEATURES</span>
          <h2>Everything you need to get work done</h2>
        </div>
        
        <div className="bento-grid">
          <div className="bento-card bento-span-2" onClick={() => handleFeatureClick('roadmap')}>
            <div className="bento-icon" style={{color: 'var(--primary)', background: 'rgba(79, 70, 229, 0.1)'}}>🗺️</div>
            <div>
              <h3>Custom Roadmaps</h3>
              <p>Generate a dynamic schedule balancing DSA, development, and system design based on your specific goals.</p>
            </div>
          </div>
          
          <div className="bento-card" onClick={() => handleFeatureClick('skills')}>
            <div className="bento-icon" style={{color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)'}}>🎯</div>
            <h3>Skill Assessment</h3>
            <p>We analyze your current coding abilities to find exact knowledge gaps.</p>
          </div>

          <div className="bento-card" onClick={() => handleFeatureClick('resources')}>
            <div className="bento-icon" style={{color: 'var(--accent)', background: 'rgba(59, 130, 246, 0.1)'}}>📚</div>
            <h3>Curated Resources</h3>
            <p>Get the best articles and practice problems for C++, Python, and more.</p>
          </div>

          <div className="bento-card bento-span-2" onClick={() => handleFeatureClick('progress')}>
            <div className="bento-icon" style={{color: 'var(--secondary)', background: 'rgba(124, 58, 237, 0.1)'}}>📈</div>
            <div>
              <h3>Progress Tracking</h3>
              <p>Visualize your growth with daily streaks, milestone achievements, and detailed analytics on your learning journey.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-cta">
        <div className="cta-left">
          <h2>Ready to boost your productivity?</h2>
          <p>Join thousands of learners already using Roadmap AI.</p>
        </div>
        <button className="btn-cta-white" onClick={() => handleFeatureClick('home')}>
          Start Free Trial →
        </button>
      </div>
    </>
  );
}

export default LandingPage;