import React, { useState } from 'react';
import RequireAuthorization from '../../auth/RequireAuthorization';
import { ACTIONS } from '../../authorization/actions';

export default function Roles() {
  // Mock Data State
  const [roles, setRoles] = useState([
    { name: 'SYSTEM_OWNER', description: 'Manages IAM Structure' },
    { name: 'IAM_STAFF', description: 'Audit & Support' }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newRole.name) return;
    // In a real app, this would be an API call
    setRoles([...roles, newRole]);
    setNewRole({ name: '', description: '' });
    setIsCreating(false);
  };

  return (
    <div>
      <h2>Role Definitions</h2>
      <p>Bundle Scopes into Business Roles. <strong>Strictly no user assignment here.</strong></p>

      {/* ACTION BAR: Protected by Policy */}
      <div style={{ margin: '1rem 0', padding: '1rem', background: '#f9f9f9', border: '1px solid #eee' }}>
        
        <RequireAuthorization 
          action={ACTIONS.CREATE_ROLE}
          fallback={<span style={{ color: '#999', fontSize: '0.9rem' }}>🔒 You do not have permission to create roles.</span>}
        >
          {!isCreating ? (
            <button onClick={() => setIsCreating(true)} style={{ background: '#004085', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
              + Create New Role
            </button>
          ) : (
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input 
                type="text" placeholder="Role Name (e.g. TRADER)" value={newRole.name} onChange={e => setNewRole({...newRole, name: e.target.value})} style={{ padding: '5px' }} 
              />
              <input 
                type="text" placeholder="Description" value={newRole.description} onChange={e => setNewRole({...newRole, description: e.target.value})} style={{ padding: '5px', width: '300px' }} 
              />
              <button type="submit" style={{ background: '#28a745', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>Save</button>
              <button type="button" onClick={() => setIsCreating(false)} style={{ background: '#6c757d', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </form>
          )}
        </RequireAuthorization>

      </div>

      {/* MOCK DATA GRID */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th>Role Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, idx) => (
            <tr key={idx}>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{role.name}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{role.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}