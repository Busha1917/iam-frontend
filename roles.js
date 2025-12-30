export const INITIAL_ROLES = [
  { name: 'SYSTEM_OWNER', description: 'Manages IAM Structure', scopes: ['iam:structure:write', 'iam:roles:write', 'iam:read', 'users:read'] },
  { name: 'IAM_STAFF', description: 'Audit & Support', scopes: ['iam:read'] },
  { name: 'SYSTEM_ADMIN', description: 'User Lifecycle Manager', scopes: ['users:write', 'users:read', 'iam:read'] },
  { name: 'TRADER_EU', description: 'European Desk Trader', scopes: ['trade:execute', 'account:read'] },
];