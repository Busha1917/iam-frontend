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

    // MOCK AUTHENTICATION LOGIC
    // In production, this calls api.post('/auth/login', { username, password })
    let mockUser = null;

    switch (username.toLowerCase()) {
      case 'owner':
        mockUser = {
          username: 'System Owner',
          role: 'SYSTEM_OWNER',
          scopes: ['iam:structure:write', 'iam:roles:write']
        };
        break;
      case 'staff':
        mockUser = {
          username: 'IAM Staff',
          role: 'IAM_STAFF',
          scopes: ['iam:read']
        };
        break;
      case 'admin':
        mockUser = {
          username: 'System Admin',
          role: 'SYSTEM_ADMIN',
          scopes: ['users:write', 'users:read']
        };
        break;
      default:
        alert('Invalid user. Use "owner", "staff", or "admin".');
        return;
    }

    login(mockUser);
    
    // Redirect based on role if going to root, otherwise go to attempted page
    if (from === '/') {
      if (mockUser.role === 'SYSTEM_OWNER') navigate('/system-owner/units');
      else if (mockUser.role === 'IAM_STAFF') navigate('/iam-staff/search');
      else if (mockUser.role === 'SYSTEM_ADMIN') navigate('/system-admin/users');
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