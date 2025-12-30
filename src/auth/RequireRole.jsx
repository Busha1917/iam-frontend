import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireRole = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // 1. Authentication Check
  if (!isAuthenticated) {
    // Redirect to login, saving the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Authorization Check (RBAC)
  // We check if the user's role is in the list of allowed roles for this route.
  if (!allowedRoles.includes(user.role)) {
    return (
      <div style={{ padding: '2rem', color: 'red', border: '1px solid red' }}>
        <h1>403 - Forbidden</h1>
        <p>Security Alert: Access to this resource is denied for your role: <strong>{user.role}</strong>.</p>
        <p>This event has been logged.</p>
      </div>
    );
  }

  return <Outlet />;
};

export default RequireRole;