import React, { useState } from 'react';
import { useIAM } from '../../context/IAMContext';

export default function Units() {
  const { units, addUnit, toggleUnitStatus } = useIAM();

  const [form, setForm] = useState({ name: '', head: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name) return;
    addUnit({
      name: form.name,
      head: form.head || 'TBD',
      status: 'Active'
    });
    setForm({ name: '', head: '' });
  };

  return (
    <div>
      <h2>Organizational Units</h2>
      <p>Manage the bank's hierarchy (Departments, Branches, Cost Centers).</p>

      {/* CREATE FORM */}
      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h4 style={{ marginTop: 0, color: '#333' }}>Add New Unit</h4>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" placeholder="Unit Name (e.g. Compliance)" 
            value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            style={{ padding: '10px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input 
            type="text" placeholder="Head of Unit" 
            value={form.head} onChange={e => setForm({...form, head: e.target.value})}
            style={{ padding: '10px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button type="submit" style={{ background: '#0056b3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
            Add Unit
          </button>
        </form>
      </div>

      {/* DATA GRID */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
          <tr style={{ textAlign: 'left' }}>
            <th style={{ padding: '12px', color: '#495057' }}>ID</th>
            <th style={{ padding: '12px', color: '#495057' }}>Unit Name</th>
            <th style={{ padding: '12px', color: '#495057' }}>Head</th>
            <th style={{ padding: '12px', color: '#495057' }}>Status</th>
            <th style={{ padding: '12px', color: '#495057' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map(unit => (
            <tr key={unit.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px', color: '#666' }}>{unit.id}</td>
              <td style={{ padding: '12px' }}><strong>{unit.name}</strong></td>
              <td style={{ padding: '12px' }}>{unit.head}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ padding: '4px 8px', borderRadius: '4px', background: unit.status === 'Active' ? '#d4edda' : '#f8d7da', color: unit.status === 'Active' ? '#155724' : '#721c24', fontSize: '0.85rem' }}>
                  {unit.status}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <button onClick={() => toggleUnitStatus(unit.id)} style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#0056b3', background: 'none', border: 'none', textDecoration: 'underline' }}>
                  {unit.status === 'Active' ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}