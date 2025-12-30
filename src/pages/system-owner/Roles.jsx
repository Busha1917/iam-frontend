import React, { useState } from 'react';
import RequireAuthorization from '../../auth/RequireAuthorization';
import { ACTIONS } from '../../authorization/actions';

export default function Roles() {
  // Mock Data State
  const [roles, setRoles] = useState([
    { name: 'SYSTEM_OWNER', description: 'Manages IAM Structure', scopes: ['iam:all'] },
    { name: 'IAM_STAFF', description: 'Audit & Support', scopes: ['iam:read'] },
    { name: 'TRADER_EU', description: 'European Desk Trader', scopes: ['trade:execute', 'account:read'] }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '', scopes: [] });

  const availableScopes = ['account:read', 'account:write', 'trade:execute', 'payments:approve'];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newRole.name) return;
    // In a real app, this would be an API call
    setRoles([...roles, newRole]);
    setNewRole({ name: '', description: '', scopes: [] });
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
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" placeholder="Role Name (e.g. TRADER)" value={newRole.name} onChange={e => setNewRole({...newRole, name: e.target.value})} style={{ padding: '8px', flex: 1 }} 
                />
                <input 
                  type="text" placeholder="Description" value={newRole.description} onChange={e => setNewRole({...newRole, description: e.target.value})} style={{ padding: '8px', flex: 2 }} 
                />
              </div>
              <div style={{ background: 'white', padding: '10px', border: '1px solid #ddd' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', fontWeight: 'bold' }}>Assign Scopes:</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {availableScopes.map(scope => (
                    <label key={scope} style={{ fontSize: '0.9rem' }}>
                      <input type="checkbox" onChange={(e) => {
                        if(e.target.checked) setNewRole({...newRole, scopes: [...newRole.scopes, scope]});
                        else setNewRole({...newRole, scopes: newRole.scopes.filter(s => s !== scope)});
                      }} /> {scope}
                    </label>
                  ))}
                </div>
              </div>
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
            <th>Assigned Scopes</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, idx) => (
            <tr key={idx}>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>{role.name}</strong></td>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{role.description}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                {role.scopes.map(s => <span key={s} style={{ background: '#eee', padding: '2px 5px', borderRadius: '3px', marginRight: '5px', fontSize: '0.8rem' }}>{s}</span>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}