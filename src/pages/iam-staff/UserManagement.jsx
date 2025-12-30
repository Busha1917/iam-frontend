import React, { useState } from 'react';
import RequireAuthorization from '../../auth/RequireAuthorization';
import { ACTIONS } from '../../authorization/actions';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, username: 'jdoe', name: 'John Doe', role: 'IAM_STAFF', status: 'Active' },
    { id: 2, username: 'jsmith', name: 'Jane Smith', role: 'SYSTEM_OWNER', status: 'Active' },
    { id: 3, username: 'bwayne', name: 'Bruce Wayne', role: 'TRADER_EU', status: 'Disabled' },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u));
  };

  const changeRole = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    alert(`Role updated for user.`);
  };

  return (
    <div>
      <h2>User Lifecycle Management</h2>
      <p>Onboard/Offboard users and assign pre-defined roles. <strong>Cannot modify roles.</strong></p>

      {/* MOCK USER LIST */}
      <div style={{ marginTop: '2rem' }}>
        {users.map(user => (
          <div key={user.id} style={{ 
            border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: user.status === 'Disabled' ? '#f9f9f9' : 'white',
            opacity: user.status === 'Disabled' ? 0.7 : 1
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <strong>{user.name}</strong> 
                <span style={{ color: '#666', fontSize: '0.9rem' }}>({user.username})</span>
                {user.status === 'Disabled' && <span style={{ background: '#dc3545', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px' }}>DISABLED</span>}
              </div>
              
              <div style={{ marginTop: '5px' }}>
                <label style={{ fontSize: '0.8rem', marginRight: '5px' }}>Assigned Role:</label>
                <select 
                  value={user.role} 
                  onChange={(e) => changeRole(user.id, e.target.value)}
                  disabled={user.status === 'Disabled'}
                  style={{ padding: '4px' }}
                >
                  <option>IAM_STAFF</option>
                  <option>SYSTEM_OWNER</option>
                  <option>TRADER_EU</option>
                  <option>TELLER_L1</option>
                </select>
              </div>
            </div>
            
            {/* SENSITIVE ACTION: Protected by Scope */}
            <RequireAuthorization 
              action={ACTIONS.DISABLE_USER}
              fallback={<button disabled style={{ opacity: 0.5 }}>Disable (Unauthorized)</button>}
            >
              <button 
                onClick={() => toggleStatus(user.id)}
                style={{ 
                  background: user.status === 'Active' ? '#dc3545' : '#28a745', 
                  color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' 
                }}
              >
                {user.status === 'Active' ? 'Disable User' : 'Enable User'}
              </button>
            </RequireAuthorization>
          </div>
        ))}
      </div>
    </div>
  );
}