import React, { createContext, useContext, useState } from 'react';
import { INITIAL_UNITS } from '../mock/units';
import { INITIAL_JOB_TITLES } from '../mock/jobTitles';
import { INITIAL_APPS } from '../mock/applications';
import { INITIAL_SCOPES } from '../mock/scopes';
import { INITIAL_ROLES } from '../mock/roles';
import { INITIAL_USERS } from '../mock/users';

const IAMContext = createContext(null);

export const IAMProvider = ({ children }) => {
  const [units, setUnits] = useState(INITIAL_UNITS);
  const [jobTitles, setJobTitles] = useState(INITIAL_JOB_TITLES);
  const [apps, setApps] = useState(INITIAL_APPS);
  const [scopes, setScopes] = useState(INITIAL_SCOPES);
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [users, setUsers] = useState(INITIAL_USERS);

  const addUnit = (unit) => setUnits([...units, { ...unit, id: 'ORG-' + Date.now() }]);
  const toggleUnitStatus = (id) => setUnits(units.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u));
  const addJobTitle = (title) => setJobTitles([...jobTitles, { ...title, id: Date.now() }]);
  const addApp = (app) => setApps([...apps, { ...app, id: Date.now() }]);
  const addScope = (scope) => setScopes([...scopes, { ...scope, id: Date.now() }]);
  const addRole = (role) => setRoles([...roles, role]);
  const updateRoleScopes = (roleName, newScopes) => {
    setRoles(roles.map(r => r.name === roleName ? { ...r, scopes: newScopes } : r));
  };
  const addUser = (user) => setUsers([...users, { ...user, id: Date.now(), status: 'Active' }]);
  const updateUserRole = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };
  const toggleUserStatus = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u));
  };

  const getUserDetails = (username) => {
    const user = users.find(u => u.username === username);
    if (!user) return null;
    const role = roles.find(r => r.name === user.role);
    const effectiveScopes = role ? role.scopes : [];
    return { ...user, scopes: effectiveScopes };
  };

  return (
    <IAMContext.Provider value={{
      units, addUnit, toggleUnitStatus,
      jobTitles, addJobTitle,
      apps, addApp,
      scopes, addScope,
      roles, addRole, updateRoleScopes,
      users, addUser, updateUserRole, toggleUserStatus,
      getUserDetails
    }}>
      {children}
    </IAMContext.Provider>
  );
};

export const useIAM = () => {
  const context = useContext(IAMContext);
  if (!context) {
    throw new Error('useIAM must be used within an IAMProvider');
  }
  return context;
};
