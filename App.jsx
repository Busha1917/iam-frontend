import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import RequireRole from './auth/RequireRole';
import Login from './auth/Login';
import DashboardLayout from './layout/DashboardLayout';

// Pages
import Units from './pages/system-owner/Units';
import JobTitles from './pages/system-owner/JobTitles';
import Applications from './pages/system-owner/Applications';
import Scopes from './pages/system-owner/Scopes';
import Roles from './pages/system-owner/Roles';
import RoleSearch from './pages/iam-staff/RoleSearch';
import UserManagement from './pages/system-admin/UserManagement';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<DashboardLayout />}>
          
          {/* SYSTEM OWNER ROUTES */}
          <Route element={<RequireRole allowedRoles={['SYSTEM_OWNER']} />}>
            <Route path="/system-owner/units" element={<Units />} />
            <Route path="/system-owner/job-titles" element={<JobTitles />} />
            <Route path="/system-owner/applications" element={<Applications />} />
            <Route path="/system-owner/scopes" element={<Scopes />} />
            <Route path="/system-owner/roles" element={<Roles />} />
          </Route>

          {/* IAM STAFF ROUTES */}
          <Route element={<RequireRole allowedRoles={['IAM_STAFF']} />}>
            <Route path="/iam-staff/search" element={<RoleSearch />} />
          </Route>

          {/* SYSTEM ADMIN ROUTES */}
          <Route element={<RequireRole allowedRoles={['SYSTEM_ADMIN']} />}>
            <Route path="/system-admin/users" element={<UserManagement />} />
          </Route>

        </Route>

        {/* Catch all - Redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;