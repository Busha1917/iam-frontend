import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    // Authenticate against IAM Context
    login(username);
    
    // Redirect based on role if going to root, otherwise go to attempted page
    if (from === '/') {
      // We can't know the role immediately here because state update is async, 
      // but the AuthContext will handle the user object. 
      // For simplicity in this prototype, we just go to root and let the router redirect or dashboard handle it.
      // However, to be smoother:
      if (username === 'owner') navigate('/system-owner/units');
      else if (username === 'staff') navigate('/iam-staff/search');
      else if (username === 'admin') navigate('/system-admin/users');
      else navigate('/');
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '8px', width: '300px' }}>
        <h2>IAM Secure Login</h2>
        <p><strong>Personas:</strong> owner, staff, admin</p>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Username: </label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#004085', color: 'white', border: 'none' }}>
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;