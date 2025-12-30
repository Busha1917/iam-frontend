import React, { createContext, useContext, useState, useEffect } from 'react';
import { AUTHORIZATION_POLICY } from '../authorization/policies';
import { useIAM } from '../context/IAMContext';

// Security Core: The single source of truth for Identity
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { getUserDetails } = useIAM();
  const [currentUsername, setCurrentUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derived State: We re-calculate the user object whenever the username OR the underlying IAM data changes.
  const user = currentUsername ? getUserDetails(currentUsername) : null;

  useEffect(() => {
    const storedUsername = localStorage.getItem('iam_username');
    if (storedUsername) {
      setCurrentUsername(storedUsername);
    }
    setLoading(false);
  }, []);

  const login = (username) => {
    const userDetails = getUserDetails(username);
    if (!userDetails) {
      alert('User not found in IAM database');
      return;
    }
    if (userDetails.status === 'Disabled') {
      alert('Account is disabled. Contact System Administrator.');
      return;
    }
    setCurrentUsername(username);
    localStorage.setItem('iam_username', username);
  };

  const logout = () => {
    setCurrentUsername(null);
    localStorage.removeItem('iam_username');
    // Hard redirect to clear memory state completely
    window.location.href = '/login';
  };

  // RBAC Check: Does the user have the specific role?
  const hasRole = (requiredRole) => {
    if (!user || !user.role) return false;
    return user.role === requiredRole;
  };

  // ABAC/Scope Check: Does the user have the specific permission?
  const hasScope = (requiredScope) => {
    if (!user || !user.scopes) return false;
    return user.scopes.includes(requiredScope);
  };

  // POLICY ENFORCEMENT POINT (PEP)
  const can = (action) => {
    if (!user || !user.scopes) return false;

    const policy = AUTHORIZATION_POLICY[action];
    
    // Fail-safe: If policy is undefined, deny access
    if (!policy) {
      console.warn(`Security Warning: No policy defined for action "${action}". Access denied.`);
      return false;
    }

    const { scopes: requiredScopes, operator } = policy;

    if (operator === 'OR') {
      return requiredScopes.some(scope => user.scopes.includes(scope));
    } 
    
    if (operator === 'AND') {
      return requiredScopes.every(scope => user.scopes.includes(scope));
    }

    return false;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
    hasScope,
    can,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};