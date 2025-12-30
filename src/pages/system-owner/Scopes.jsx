import React, { useState } from 'react';

export default function Scopes() {
  const [scopes, setScopes] = useState([
    { id: 1, code: 'account:read', app: 'Core Banking', desc: 'View customer account details' },
    { id: 2, code: 'account:write', app: 'Core Banking', desc: 'Modify customer account details' },
    { id: 3, code: 'trade:execute', app: 'Trading Platform', desc: 'Execute market orders' },
  ]);

  const [form, setForm] = useState({ code: '', app: 'Core Banking', desc: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.code) return;
    setScopes([...scopes, { id: Date.now(), ...form }]);
    setForm({ code: '', app: 'Core Banking', desc: '' });
  };

  return (
    <div>
      <h2>Scopes & Permissions</h2>
      <p>Define granular technical permissions (e.g., <code>account:read</code>, <code>payment:initiate</code>).</p>

      <div style={{ background: '#e9ecef', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ fontSize: '0.8rem' }}>Permission Code</label>
            <input type="text" value={form.code} onChange={e => setForm({...form, code: e.target.value})} placeholder="e.g. payments:approve" style={{ width: '100%', padding: '8px' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem' }}>Application</label>
            <select value={form.app} onChange={e => setForm({...form, app: e.target.value})} style={{ width: '100%', padding: '8px' }}>
              <option>Core Banking</option>
              <option>Trading Platform</option>
              <option>HR Portal</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem' }}>Description</label>
            <input type="text" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="What does this allow?" style={{ width: '100%', padding: '8px' }} />
          </div>
          <button type="submit" style={{ background: '#004085', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Create Scope</button>
        </form>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px' }}>Scope Code</th>
            <th style={{ padding: '10px' }}>Application</th>
            <th style={{ padding: '10px' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {scopes.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontFamily: 'monospace', color: '#d63384' }}>{s.code}</td>
              <td style={{ padding: '10px' }}>{s.app}</td>
              <td style={{ padding: '10px', color: '#666' }}>{s.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}