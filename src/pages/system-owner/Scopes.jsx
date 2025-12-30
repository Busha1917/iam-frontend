import React, { useState } from 'react';
import { useIAM } from '../../context/IAMContext';

export default function Scopes() {
  const { scopes, addScope, apps } = useIAM();

  const [form, setForm] = useState({ code: '', app: 'Core Banking', desc: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.code) return;
    addScope(form);
    setForm({ code: '', app: 'Core Banking', desc: '' });
  };

  return (
    <div>
      <h2>Scopes & Permissions</h2>
      <p>Define granular technical permissions (e.g., <code>account:read</code>, <code>payment:initiate</code>).</p>

      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '5px', display: 'block' }}>Permission Code</label>
            <input type="text" value={form.code} onChange={e => setForm({...form, code: e.target.value})} placeholder="e.g. payments:approve" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '5px', display: 'block' }}>Application</label>
            <select value={form.app} onChange={e => setForm({...form, app: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
              {apps.map(a => (
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '5px', display: 'block' }}>Description</label>
            <input type="text" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="What does this allow?" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <button type="submit" style={{ background: '#0056b3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', height: '40px' }}>Create Scope</button>
        </form>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
          <tr style={{ textAlign: 'left' }}>
            <th style={{ padding: '12px', color: '#495057' }}>Scope Code</th>
            <th style={{ padding: '12px', color: '#495057' }}>Application</th>
            <th style={{ padding: '12px', color: '#495057' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {scopes.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px', fontFamily: 'monospace', color: '#d63384', background: '#fff0f6', borderRadius: '4px' }}>{s.code}</td>
              <td style={{ padding: '12px' }}>{s.app}</td>
              <td style={{ padding: '12px', color: '#666' }}>{s.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}