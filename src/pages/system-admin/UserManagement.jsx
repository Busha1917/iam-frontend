import React from 'react';
import RequireAuthorization from '../../auth/RequireAuthorization';
import { ACTIONS } from '../../authorization/actions';

export default function UserManagement() {
  return (
    <div>
      <h2>User Lifecycle Management</h2>
      <p>Onboard/Offboard users and assign pre-defined roles. <strong>Cannot modify roles.</strong></p>

      {/* MOCK USER LIST */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>John Doe</strong> (jdoe) <br/>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>Role: IAM_STAFF</span>
          </div>
          
          {/* SENSITIVE ACTION: Protected by Scope */}
          <RequireAuthorization 
            action={ACTIONS.DISABLE_USER}
            fallback={<button disabled style={{ opacity: 0.5 }}>Disable (Unauthorized)</button>}
          >
            <button style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
              Disable User
            </button>
          </RequireAuthorization>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>Jane Smith</strong> (jsmith) <br/>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>Role: SYSTEM_OWNER</span>
          </div>
           {/* Note: In a real app, we would also prevent admins from disabling owners via backend logic */}
           <RequireAuthorization action={ACTIONS.DISABLE_USER}>
            <button style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Disable User</button>
           </RequireAuthorization>
        </div>
      </div>
    </div>
  );
}