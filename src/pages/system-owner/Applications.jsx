import React, { useState } from 'react';
import { useIAM } from '../../context/IAMContext';

export default function Applications() {
  const { apps, addApp } = useIAM();

  const [newApp, setNewApp] = useState('');

  const handleAdd = () => {
    if(!newApp) return;
    addApp({ name: newApp, type: 'Web App', owner: 'TBD' });
    setNewApp('');
  };

  return (
    <div>
      <h2>Applications Registry</h2>
      <p>Onboard new software applications into the IAM ecosystem.</p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', marginTop: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <input 
          type="text" placeholder="Application Name" 
          value={newApp} onChange={e => setNewApp(e.target.value)}
          style={{ padding: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button onClick={handleAdd} style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
          Onboard App
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {apps.map(app => (
          <div key={app.id} style={{ border: '1px solid #e0e0e0', padding: '1.5rem', borderRadius: '8px', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#333' }}>{app.name}</h3>
              <span style={{ fontSize: '0.75rem', background: '#e9ecef', padding: '4px 8px', borderRadius: '12px', color: '#495057' }}>{app.type}</span>
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