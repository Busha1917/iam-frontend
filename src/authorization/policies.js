import { ACTIONS } from './actions';

// Technical Scopes
const SCOPES = {
  IAM_STRUCTURE_WRITE: 'iam:structure:write',
  IAM_ROLES_WRITE:     'iam:roles:write',
  IAM_READ:            'iam:read',
  USERS_WRITE:         'users:write',
  USERS_READ:          'users:read',
};

/**
 * AUTHORIZATION POLICY DEFINITION
 */
export const AUTHORIZATION_POLICY = {
  [ACTIONS.MANAGE_IAM_STRUCTURE]: {
    scopes: [SCOPES.IAM_STRUCTURE_WRITE],
    operator: 'AND',
  },
  [ACTIONS.VIEW_ROLES]: {
    scopes: [SCOPES.IAM_ROLES_WRITE, SCOPES.IAM_READ],
    operator: 'OR',
  },
  [ACTIONS.CREATE_ROLE]: {
    scopes: [SCOPES.IAM_ROLES_WRITE],
    operator: 'AND',
  },
  [ACTIONS.SEARCH_ROLES]: {
    scopes: [SCOPES.IAM_READ],
    operator: 'AND',
  },
  [ACTIONS.VIEW_USERS]: {
    scopes: [SCOPES.USERS_READ, SCOPES.USERS_WRITE],
    operator: 'OR',
  },
  [ACTIONS.MANAGE_USERS]: {
    scopes: [SCOPES.USERS_WRITE],
    operator: 'AND',
  },
  [ACTIONS.DISABLE_USER]: {
    scopes: [SCOPES.USERS_WRITE],
    operator: 'AND',
  },
};