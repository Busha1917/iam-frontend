export const INITIAL_SCOPES = [
  // IAM Governance
  { id: 's1', code: 'iam:structure:write', app: 'IAM', desc: 'Manage Org Units & Titles' },
  { id: 's2', code: 'iam:roles:write', app: 'IAM', desc: 'Create & Edit Roles' },
  { id: 's3', code: 'iam:read', app: 'IAM', desc: 'Read-only IAM access' },
  // User Admin
  { id: 's4', code: 'users:write', app: 'IAM', desc: 'Manage Users' },
  { id: 's5', code: 'users:read', app: 'IAM', desc: 'View Users' },
  // Business Scopes
  { id: 's6', code: 'account:read', app: 'Core Banking', desc: 'View Accounts' },
  { id: 's7', code: 'trade:execute', app: 'Trading Platform', desc: 'Execute Trades' },
];