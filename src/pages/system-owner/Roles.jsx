import React, { useState } from 'react';
import RequireAuthorization from '../../auth/RequireAuthorization';
import { ACTIONS } from '../../authorization/actions';
import { useIAM } from '../../context/IAMContext';

export default function Roles() {
  const { roles, scopes, addRole } = useIAM();
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '', scopes: [] });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newRole.name) return;
    addRole(newRole);
    setNewRole({ name: '', description: '', scopes: [] });
    setIsCreating(false);
  };

  return (
    <div>
      <h2>Role Definitions</h2>
      <p>Bundle Scopes into Business Roles. <strong>Strictly no user assignment here.</strong></p>

      {/* ACTION BAR: Protected by Policy */}
      <div style={{ margin: '1.5rem 0', padding: '1.5rem', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        
        <RequireAuthorization 
          action={ACTIONS.CREATE_ROLE}
          fallback={<span style={{ color: '#999', fontSize: '0.9rem' }}>🔒 You do not have permission to create roles.</span>}
        >
          {!isCreating ? (
            <button onClick={() => setIsCreating(true)} style={{ background: '#0056b3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
              + Create New Role
            </button>
          ) : (
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" placeholder="Role Name (e.g. TRADER)" value={newRole.name} onChange={e => setNewRole({...newRole, name: e.target.value})} style={{ padding: '10px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }} 
                />
                <input 
                  type="text" placeholder="Description" value={newRole.description} onChange={e => setNewRole({...newRole, description: e.target.value})} style={{ padding: '10px', flex: 2, border: '1px solid #ccc', borderRadius: '4px' }} 
                />
              </div>
              <div style={{ background: '#f8f9fa', padding: '15px', border: '1px solid #e9ecef', borderRadius: '4px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', fontWeight: 'bold' }}>Assign Scopes:</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {scopes.map(scope => (
                    <label key={scope.id} style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input type="checkbox" onChange={(e) => {
                        if(e.target.checked) setNewRole({...newRole, scopes: [...newRole.scopes, scope.code]});
                        else setNewRole({...newRole, scopes: newRole.scopes.filter(s => s !== scope.code)});
                      }} /> {scope.code}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ background: '#28a745', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save Role</button>
                <button type="button" onClick={() => setIsCreating(false)} style={{ background: '#6c757d', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          )}
        </RequireAuthorization>

      </div>

      {/* MOCK DATA GRID */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ textAlign: 'left', background: '#f1f3f5', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px' }}>Role Name</th>
            <th style={{ padding: '12px' }}>Description</th>
            <th style={{ padding: '12px' }}>Assigned Scopes</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}><strong>{role.name}</strong></td>
              <td style={{ padding: '12px', color: '#555' }}>{role.description}</td>
              <td style={{ padding: '12px' }}>
                {role.scopes.map(s => <span key={s} style={{ background: '#eee', padding: '2px 5px', borderRadius: '3px', marginRight: '5px', fontSize: '0.8rem' }}>{s}</span>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}