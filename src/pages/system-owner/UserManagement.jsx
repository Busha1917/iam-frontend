import React, { useState } from 'react';
import RequireAuthorization from '../../auth/RequireAuthorization';
import { ACTIONS } from '../../authorization/actions';
import { useIAM } from '../../context/IAMContext';

export default function UserManagement() {
  const { users, roles, updateUserRole, toggleUserStatus } = useIAM();

  return (
    <div>
      <h2>User Lifecycle Management</h2>
      <p>Onboard/Offboard users and assign pre-defined roles. <strong>Cannot modify roles.</strong></p>

      {/* MOCK USER LIST */}
      <div style={{ marginTop: '2rem' }}>
        {users.map(user => (
          <div key={user.id} style={{ 
            border: '1px solid #e0e0e0', padding: '1.5rem', marginBottom: '1rem', borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: user.status === 'Disabled' ? '#f9f9f9' : 'white',
            opacity: user.status === 'Disabled' ? 0.7 : 1
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <strong style={{ fontSize: '1.1rem' }}>{user.name}</strong> 
                <span style={{ color: '#666', fontSize: '0.9rem' }}>({user.username})</span>
                {user.status === 'Disabled' && <span style={{ background: '#dc3545', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px' }}>DISABLED</span>}
              </div>
              
              <div style={{ marginTop: '5px' }}>
                <label style={{ fontSize: '0.85rem', marginRight: '8px', color: '#555' }}>Assigned Role:</label>
                <select 
                  value={user.role} 
                  onChange={(e) => updateUserRole(user.id, e.target.value)}
                  disabled={user.status === 'Disabled'}
                  style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  {roles.map(r => (
                    <option key={r.name} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* SENSITIVE ACTION: Protected by Scope */}
            <RequireAuthorization 
              action={ACTIONS.DISABLE_USER}
              fallback={<button disabled style={{ opacity: 0.5 }}>Disable (Unauthorized)</button>}
            >
              <button 
                onClick={() => toggleUserStatus(user.id)}
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