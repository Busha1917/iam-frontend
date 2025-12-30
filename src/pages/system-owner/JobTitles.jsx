import React, { useState } from 'react';
import { useIAM } from '../../context/IAMContext';

export default function JobTitles() {
  const { jobTitles, addJobTitle, units } = useIAM();

  const [form, setForm] = useState({ title: '', unit: 'Retail Banking', code: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.code) return;
    addJobTitle(form);
    setForm({ title: '', unit: 'Retail Banking', code: '' });
  };

  return (
    <div>
      <h2>Job Titles</h2>
      <p>Define standard job titles for HR alignment.</p>

      {/* CREATE FORM */}
      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h4 style={{ marginTop: 0, color: '#333' }}>Define New Job Title</h4>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '5px' }}>Job Title</label>
            <input 
              type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="e.g. Teller"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '5px' }}>Job Code</label>
            <input 
              type="text" value={form.code} onChange={e => setForm({...form, code: e.target.value})}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="e.g. RB-TL"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '5px' }}>Department</label>
            <select 
              value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              {units.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" style={{ background: '#0056b3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', height: '40px' }}>
            Save
          </button>
        </form>
      </div>

      {/* LIST */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
          <tr style={{ textAlign: 'left' }}>
            <th style={{ padding: '12px', color: '#495057' }}>Code</th>
            <th style={{ padding: '12px', color: '#495057' }}>Title</th>
            <th style={{ padding: '12px', color: '#495057' }}>Department</th>
          </tr>
        </thead>
        <tbody>
          {jobTitles.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}><code style={{ background: '#f1f3f5', padding: '2px 4px', borderRadius: '3px' }}>{t.code}</code></td>
              <td style={{ padding: '12px' }}>{t.title}</td>
              <td style={{ padding: '12px' }}>{t.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}