import React, { useState } from 'react';

function AuthPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      try {
        const response = await fetch('http://localhost:8000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name: fullName, email: email, password: password })
        });
        
        if (response.ok) {
          alert("Account created successfully! Please log in.");
          setIsSignup(false);
          setPassword('');
        } else {
          alert("Signup failed. Email might already be in use.");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password })
        });

        if (response.ok) {
          const data = await response.json();
          onLogin(data.email); 
        } else {
          alert("Invalid email or password. Please try again.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }}>
        
        <h1 style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--primary)' }}>Mind Alchemy</h1>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#6b7280' }}>
          {isSignup ? "Start your software engineering journey." : "Welcome back. Let's get to work."}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {isSignup && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}
              required
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}
            required
          />
          <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            {isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#6b7280' }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span 
            onClick={() => setIsSignup(!isSignup)} 
            style={{ color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isSignup ? "Log In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;