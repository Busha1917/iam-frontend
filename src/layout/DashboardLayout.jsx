import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ACTIONS } from '../authorization/actions';

const DashboardLayout = () => {
  const { user, logout, hasRole, can } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#f4f4f4', padding: '1rem', borderRight: '1px solid #ddd' }}>
        <h3>Bank IAM Portal</h3>
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Logged in as: <br/>
          <strong>{user?.username}</strong> <br/>
          <span style={{ fontSize: '0.8rem', background: '#ddd', padding: '2px 4px' }}>{user?.role}</span>
        </div>

        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            
            {/* SYSTEM OWNER MENU */}
            {hasRole('SYSTEM_OWNER') && (
              <>
                <li style={{ marginTop: '1rem', fontWeight: 'bold' }}>IAM Governance</li>
                {/* We check specific scopes for granular visibility */}
                {can(ACTIONS.MANAGE_IAM_STRUCTURE) && <li><Link to="/system-owner/units">Org Units</Link></li>}
                {can(ACTIONS.MANAGE_IAM_STRUCTURE) && <li><Link to="/system-owner/job-titles">Job Titles</Link></li>}
                {can(ACTIONS.MANAGE_IAM_STRUCTURE) && <li><Link to="/system-owner/applications">Applications</Link></li>}
                {can(ACTIONS.VIEW_ROLES) && <li><Link to="/system-owner/roles">Roles</Link></li>}
              </>
            )}

            {/* IAM STAFF MENU */}
            {hasRole('IAM_STAFF') && (
              <>
                <li style={{ marginTop: '1rem', fontWeight: 'bold' }}>IAM Support</li>
                {can(ACTIONS.SEARCH_ROLES) && <li><Link to="/iam-staff/search">Role Search</Link></li>}
              </>
            )}

            {/* SYSTEM ADMIN MENU */}
            {hasRole('SYSTEM_ADMIN') && (
              <>
                <li style={{ marginTop: '1rem', fontWeight: 'bold' }}>User Admin</li>
                {can(ACTIONS.VIEW_USERS) && <li><Link to="/system-admin/users">User Management</Link></li>}
              </>
            )}

          </ul>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button onClick={logout} style={{ width: '100%', padding: '8px', background: '#dc3545', color: 'white', border: 'none' }}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;