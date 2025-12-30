import React, { useState } from 'react';

export default function Units() {
  // Mock Database
  const [units, setUnits] = useState([
    { id: 'ORG-001', name: 'Retail Banking', head: 'Sarah Connor', status: 'Active' },
    { id: 'ORG-002', name: 'Investment Banking', head: 'Gordon Gekko', status: 'Active' },
    { id: 'ORG-003', name: 'Risk Management', head: 'Sherlock Holmes', status: 'Active' },
  ]);

  const [form, setForm] = useState({ name: '', head: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const newUnit = {
      id: `ORG-00${units.length + 1}`,
      name: form.name,
      head: form.head || 'TBD',
      status: 'Active'
    };
    setUnits([...units, newUnit]);
    setForm({ name: '', head: '' });
    alert(`Unit "${newUnit.name}" created successfully.`);
  };

  const toggleStatus = (id) => {
    setUnits(units.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u));
  };

  return (
    <div>
      <h2>Organizational Units</h2>
      <p>Manage the bank's hierarchy (Departments, Branches, Cost Centers).</p>

      {/* CREATE FORM */}
      <div style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h4>Add New Unit</h4>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" placeholder="Unit Name (e.g. Compliance)" 
            value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            style={{ padding: '8px', flex: 1 }}
          />
          <input 
            type="text" placeholder="Head of Unit" 
            value={form.head} onChange={e => setForm({...form, head: e.target.value})}
            style={{ padding: '8px', flex: 1 }}
          />
          <button type="submit" style={{ background: '#004085', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>
            Add Unit
          </button>
        </form>
      </div>

      {/* DATA GRID */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Unit Name</th>
            <th style={{ padding: '10px' }}>Head</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map(unit => (
            <tr key={unit.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{unit.id}</td>
              <td style={{ padding: '10px' }}><strong>{unit.name}</strong></td>
              <td style={{ padding: '10px' }}>{unit.head}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ padding: '4px 8px', borderRadius: '4px', background: unit.status === 'Active' ? '#d4edda' : '#f8d7da', color: unit.status === 'Active' ? '#155724' : '#721c24', fontSize: '0.85rem' }}>
                  {unit.status}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => toggleStatus(unit.id)} style={{ cursor: 'pointer', fontSize: '0.85rem' }}>
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