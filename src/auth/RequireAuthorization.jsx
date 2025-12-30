import React from 'react';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

/**
 * RequireAuthorization Guard
 * 
 * A policy-driven guard that renders children only if the authenticated user
 * is authorized to perform the specified Business Action.
 */
const RequireAuthorization = ({ action, fallback = null, children }) => {
  const { can } = useAuth();

  if (!can(action)) {
    return fallback;
  }

  return <>{children}</>;
};

RequireAuthorization.propTypes = {
  action: PropTypes.string.isRequired,
  fallback: PropTypes.node,
  children: PropTypes.node,
};

export default RequireAuthorization;