import React, { useState } from 'react';

export default function JobTitles() {
  const [titles, setTitles] = useState([
    { id: 1, title: 'Senior Analyst', unit: 'Investment Banking', code: 'IB-AN-SR' },
    { id: 2, title: 'Branch Manager', unit: 'Retail Banking', code: 'RB-MGR' },
  ]);

  const [form, setForm] = useState({ title: '', unit: 'Retail Banking', code: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.code) return;
    setTitles([...titles, { id: Date.now(), ...form }]);
    setForm({ title: '', unit: 'Retail Banking', code: '' });
  };

  return (
    <div>
      <h2>Job Titles</h2>
      <p>Define standard job titles for HR alignment.</p>

      {/* CREATE FORM */}
      <div style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h4>Define New Job Title</h4>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Job Title</label>
            <input 
              type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              style={{ width: '100%', padding: '8px' }} placeholder="e.g. Teller"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Job Code</label>
            <input 
              type="text" value={form.code} onChange={e => setForm({...form, code: e.target.value})}
              style={{ width: '100%', padding: '8px' }} placeholder="e.g. RB-TL"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Department</label>
            <select 
              value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}
              style={{ width: '100%', padding: '8px' }}
            >
              <option>Retail Banking</option>
              <option>Investment Banking</option>
              <option>Risk Management</option>
              <option>IT Security</option>
            </select>
          </div>
          <button type="submit" style={{ background: '#004085', color: 'white', border: 'none', padding: '10px 16px', cursor: 'pointer' }}>
            Save
          </button>
        </form>
      </div>

      {/* LIST */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Code</th>
            <th style={{ padding: '10px' }}>Title</th>
            <th style={{ padding: '10px' }}>Department</th>
          </tr>
        </thead>
        <tbody>
          {titles.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}><code>{t.code}</code></td>
              <td style={{ padding: '10px' }}>{t.title}</td>
              <td style={{ padding: '10px' }}>{t.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}