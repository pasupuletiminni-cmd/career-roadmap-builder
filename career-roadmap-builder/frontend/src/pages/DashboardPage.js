import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import RoadmapVisualizer from '../components/RoadmapVisualizer';

function DashboardPage({ activeTab, setActiveTab, setView, userEmail, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hi Minnie! 👋 I am your AI Career Coach. Do you need help deciding which algorithm to study next?' }
  ]);
  const messagesEndRef = useRef(null);

  const [stats, setStats] = useState({ streak: 0, tasks_completed: 0, hours_studied: 0 });

  const [skills, setSkills] = useState([
    { id: 1, name: 'C++', level: 85, color: '#4f46e5' },
    { id: 2, name: 'Python', level: 80, color: '#4f46e5' },
    { id: 3, name: 'Data Structures', level: 70, color: '#4f46e5' },
    { id: 4, name: 'Algorithms', level: 60, color: '#4f46e5' },
    { id: 5, name: 'React', level: 45, color: '#4f46e5' }
  ]);

  const resources = [
    { id: 1, title: 'NeetCode 150', category: 'Practice', url: 'https://neetcode.io', desc: 'The ultimate curated list of LeetCode problems.' },
    { id: 2, title: 'System Design Primer', category: 'Reading', url: 'https://github.com/donnemartin/system-design-primer', desc: 'Comprehensive guide to building scalable systems.' },
    { id: 3, title: 'React Official Docs', category: 'Documentation', url: 'https://react.dev', desc: 'Deep dive into hooks, state, and UI components.' },
    { id: 4, title: 'Grokking the Interview', category: 'Course', url: '#', desc: 'Pattern-based approach to solving algorithm questions.' }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2 }, { day: 'Tue', hours: 3 }, { day: 'Wed', hours: 1 },
    { day: 'Thu', hours: 4 }, { day: 'Fri', hours: 0 }, { day: 'Sat', hours: 5 }, { day: 'Sun', hours: 2 }
  ];

  useEffect(() => {
    fetch(`http://localhost:8000/progress/${userEmail}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    fetch(`http://localhost:8000/tasks/${userEmail}`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, [userEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      title: newTaskTitle,
      category: "Roadmap Goal",
      description: "Added from dashboard"
    };

    try {
      const response = await fetch(`http://localhost:8000/tasks/${userEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const savedTask = await response.json();
      
      setTasks([...tasks, savedTask]);
      setNewTaskTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed: !currentStatus })
      });
      
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
        
        setStats(prevStats => ({
          ...prevStats,
          tasks_completed: updatedTask.is_completed 
            ? prevStats.tasks_completed + 1 
            : prevStats.tasks_completed - 1
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePracticeSkill = (id) => {
    setSkills(skills.map(skill => {
      if (skill.id === id) {
        return { ...skill, level: Math.min(100, skill.level + 5) };
      }
      return skill;
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      setChatMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { sender: 'ai', text: "Oops! My backend is disconnected right now." }]);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setView={setView} onLogout={onLogout} />

      <main className="main-content">
        
        {activeTab === 'home' && (
          <div className="dashboard-content">
            <div className="dashboard-header-flex">
              <div>
                <h1>Welcome back 👋</h1>
                <p className="header-date">Your plan is on track.</p>
              </div>
              <button className="btn-cta-white" style={{background: 'var(--primary)', color: 'white', padding: '10px 20px', fontSize: '0.95rem', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
                + Generate Mock Interview
              </button>
            </div>

            <div className="dashboard-bento">
              <div className="glass-card col-3">
                <div className="stat-card-title">Current Streak</div>
                <div className="stat-card-value" style={{color: '#EF4444'}}>🔥 {stats.streak} <span style={{fontSize: '1rem', color: 'var(--text-light)', fontWeight: '500'}}>Days</span></div>
              </div>
              
              <div className="glass-card col-3">
                <div className="stat-card-title">Tasks Completed</div>
                <div className="stat-card-value">{stats.tasks_completed} <span className="stat-trend">↑ 12%</span></div>
              </div>
              
              <div className="glass-card col-3">
                <div className="stat-card-title">Hours Studied</div>
                <div className="stat-card-value">{stats.hours_studied} <span style={{fontSize: '1rem', color: 'var(--text-light)', fontWeight: '500'}}>hrs</span></div>
              </div>
              
              <div className="glass-card col-3">
                <div className="stat-card-title">Target Goal</div>
                <div className="goal-badge" style={{marginTop: '5px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block'}}>Google SWE</div>
              </div>
            </div>

            <div className="tasks-section" style={{ marginTop: '2rem' }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Your Roadmap Tasks</h2>
              
              <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  value={newTaskTitle} 
                  onChange={(e) => setNewTaskTitle(e.target.value)} 
                  placeholder="e.g., Master Sliding Window algorithm..."
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', flex: 1 }}
                />
                <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '0 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Add Task
                </button>
              </form>

              <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map(task => (
                  <li key={task.id} style={{ 
                    background: 'rgba(255,255,255,0.5)', 
                    padding: '15px', 
                    borderRadius: '12px', 
                    marginBottom: '10px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    opacity: task.is_completed ? 0.6 : 1
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input 
                        type="checkbox" 
                        checked={task.is_completed}
                        onChange={() => handleToggleComplete(task.id, task.is_completed)}
                        style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                      />
                      <span style={{ 
                        fontWeight: '500', 
                        textDecoration: task.is_completed ? 'line-through' : 'none',
                        color: task.is_completed ? 'var(--text-light)' : 'inherit'
                      }}>
                        {task.title}
                      </span>
                    </div>
                    <span style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      {task.category}
                    </span>
                  </li>
                ))}
                {tasks.length === 0 && <p style={{ color: 'var(--text-light)' }}>No tasks yet. Add your first goal above!</p>}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="dashboard-content">
            <h1 style={{ marginBottom: '10px' }}>Your DSA Roadmap</h1>
            <p className="header-date" style={{ marginBottom: '20px' }}>Master these concepts to crush your SWE interviews.</p>
            <RoadmapVisualizer />
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="dashboard-content">
            <h1 style={{ marginBottom: '10px' }}>Your Technical Skills</h1>
            <p className="header-date" style={{ marginBottom: '30px' }}>Track your proficiency and actively level up your foundation.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {skills.map(skill => (
                <div key={skill.id} style={{ background: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{skill.name}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{skill.level}%</span>
                  </div>
                  
                  <div style={{ width: '100%', background: '#e5e7eb', borderRadius: '10px', height: '12px', overflow: 'hidden', marginBottom: '20px' }}>
                    <div style={{ width: `${skill.level}%`, background: skill.color, height: '100%', borderRadius: '10px', transition: 'width 0.4s ease' }}></div>
                  </div>
                  
                  <button 
                    onClick={() => handlePracticeSkill(skill.id)} 
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid rgba(79, 70, 229, 0.2)', background: 'transparent', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }}
                    onMouseOver={(e) => { e.target.style.background = 'rgba(79, 70, 229, 0.1)'; }}
                    onMouseOut={(e) => { e.target.style.background = 'transparent'; }}
                  >
                    + Practice & Level Up
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="dashboard-content">
            <h1 style={{ marginBottom: '10px' }}>Study Resources</h1>
            <p className="header-date" style={{ marginBottom: '30px' }}>Your curated links for mastering algorithms and system design.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {resources.map(res => (
                <a key={res.id} href={res.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', background: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', display: 'block', transition: 'transform 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <span style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>{res.category}</span>
                  <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{res.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.5' }}>{res.desc}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="dashboard-content">
            <h1 style={{ marginBottom: '10px' }}>Progress Analytics</h1>
            <p className="header-date" style={{ marginBottom: '30px' }}>Visualize your journey to that software engineering role.</p>
            
            <div style={{ background: 'rgba(255,255,255,0.7)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '20px' }}>Study Hours (This Week)</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                {weeklyActivity.map((day, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '8px' }}>{day.hours}h</span>
                    <div style={{ width: '100%', height: `${day.hours * 30}px`, background: 'var(--primary)', borderRadius: '6px 6px 0 0', opacity: day.hours > 0 ? 1 : 0.2 }}></div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                {weeklyActivity.map((day, i) => (
                  <span key={i} style={{ width: '40px', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280', fontWeight: '500' }}>{day.day}</span>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.7)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)' }}>
              <h3 style={{ marginBottom: '20px' }}>Upcoming Milestones</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '15px 0', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                  <span style={{ fontWeight: '500', flex: 1 }}>Complete Arrays & Hashing</span>
                  <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold' }}>Done</span>
                </li>
                <li style={{ padding: '15px 0', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                  <span style={{ fontWeight: '500', flex: 1 }}>Master Two Pointers</span>
                  <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 'bold' }}>In Progress</span>
                </li>
                <li style={{ padding: '15px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <span style={{ fontWeight: '500', flex: 1, color: '#6b7280' }}>Mock Interview Practice</span>
                  <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 'bold' }}>Locked</span>
                </li>
              </ul>
            </div>
          </div>
        )}

      </main>

      <div className="ai-chat-widget">
        {isChatOpen ? (
          <div className="chat-window">
            <div className="chat-header">
              <h3>🤖 AI Career Coach</h3>
              <button className="close-chat" onClick={() => setIsChatOpen(false)}>✖</button>
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className="chat-input-area" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Ask for advice..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="send-btn" style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>↑</button>
            </form>
          </div>
        ) : (
          <button className="chat-toggle-btn" onClick={() => setIsChatOpen(true)}>
            💬
          </button>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;