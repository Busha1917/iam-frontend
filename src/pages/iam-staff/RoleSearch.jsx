import React, { useState } from 'react';

export default function RoleSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock Database (Read Only)
  const allRoles = [
    { name: 'SYSTEM_OWNER', description: 'Manages IAM Structure', scopes: ['iam:all'] },
    { name: 'IAM_STAFF', description: 'Audit & Support', scopes: ['iam:read'] },
    { name: 'TRADER_EU', description: 'European Desk Trader', scopes: ['trade:execute', 'account:read'] },
    { name: 'TELLER_L1', description: 'Front Desk Teller', scopes: ['account:read', 'cash:deposit'] },
  ];

  const filteredRoles = allRoles.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Role Search & Audit</h2>
      <p>Read-only view of the IAM structure for support and audit purposes.</p>

      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search roles by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '12px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredRoles.map((role, idx) => (
          <div key={idx} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#004085' }}>{role.name}</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#666' }}>{role.description}</p>
            <div>
              <strong style={{ fontSize: '0.9rem' }}>Scopes: </strong>
              {role.scopes.map(s => (
                <span key={s} style={{ display: 'inline-block', background: '#e2e3e5', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', margin: '0 4px 4px 0' }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
        {filteredRoles.length === 0 && <p style={{ color: '#999', textAlign: 'center' }}>No roles found.</p>}
      </div>
    </div>
  );
}