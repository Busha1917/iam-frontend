import React, { createContext, useContext, useState, useEffect } from 'react';
import { AUTHORIZATION_POLICY } from '../authorization/policies';

// Security Core: The single source of truth for Identity
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would validate the session with the backend here
    // to prevent "local storage spoofing".
    const storedUser = localStorage.getItem('iam_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Session integrity check failed");
        localStorage.removeItem('iam_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // In production, userData comes from a validated JWT payload
    setUser(userData);
    localStorage.setItem('iam_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iam_user');
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