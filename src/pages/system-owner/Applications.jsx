import React, { useState } from 'react';

export default function Applications() {
  const [apps, setApps] = useState([
    { id: 1, name: 'Core Banking System', type: 'Mainframe', owner: 'IT Ops' },
    { id: 2, name: 'Trading Platform', type: 'Web App', owner: 'Front Office' },
    { id: 3, name: 'HR Portal', type: 'SaaS', owner: 'HR Dept' },
  ]);

  const [newApp, setNewApp] = useState('');

  const addApp = () => {
    if(!newApp) return;
    setApps([...apps, { id: Date.now(), name: newApp, type: 'Web App', owner: 'TBD' }]);
    setNewApp('');
  };

  return (
    <div>
      <h2>Applications Registry</h2>
      <p>Onboard new software applications into the IAM ecosystem.</p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', marginTop: '1rem' }}>
        <input 
          type="text" placeholder="Application Name" 
          value={newApp} onChange={e => setNewApp(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
        <button onClick={addApp} style={{ background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>
          Onboard App
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {apps.map(app => (
          <div key={app.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{app.name}</h3>
              <span style={{ fontSize: '0.7rem', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>{app.type}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Owner: {app.owner}</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button style={{ flex: 1, fontSize: '0.8rem', cursor: 'pointer' }}>Configure</button>
              <button style={{ flex: 1, fontSize: '0.8rem', cursor: 'pointer', color: 'red' }}>Decommission</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}