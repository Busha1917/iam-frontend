# Bank-Grade IAM Frontend Prototype

A production-grade Identity and Access Management (IAM) frontend implementation using **React + Vite**. This project demonstrates strict **Role-Based Access Control (RBAC)**, **Policy-Based Access Control (PBAC)**, and **Separation of Duties** suitable for financial institutions.

## 🚀 Features

*   **Strict RBAC & PBAC**: Authorization driven by Roles (e.g., `SYSTEM_OWNER`) and Scopes (e.g., `iam:roles:write`).
*   **Separation of Duties**: Distinct personas with non-overlapping responsibilities.
*   **Secure Routing**: Route guards (`RequireRole`) prevent unauthorized URL access.
*   **Component-Level Security**: UI elements (`RequireAuthorization`) are conditionally rendered based on policy.
*   **Centralized Policy Engine**: All authorization logic is decoupled from UI components.
*   **Audit-Ready Architecture**: Clear separation of Authentication, Authorization, and Presentation layers.

## 🛠️ Tech Stack

*   **Frontend**: React 18, Vite
*   **Routing**: React Router DOM v6
*   **State Management**: React Context API
*   **HTTP Client**: Axios (Mocked)
*   **Styling**: Inline Styles (Prototype)

##  Prerequisites

*   **Node.js** (v16+): [Download here](https://nodejs.org/)
*   **Terminal**: PowerShell, Command Prompt, or VS Code Terminal.

## 📦 Libraries Used

The project relies on these key packages (installed automatically via `npm install`):

*   **`react`** & **`react-dom`**: The UI framework.
*   **`react-router-dom`**: Manages navigation and protects routes (e.g., redirecting unauthenticated users).
*   **`axios`**: Simulates API calls to a backend.
*   **`prop-types`**: Ensures components receive correct data types.
*   **`vite`**: Fast development server and build tool.

## � IAM Personas

### 1. System Owner
*   **Responsibility**: IAM Governance & Structure.
*   **Capabilities**: Manage Org Units, Job Titles, Applications, Scopes, and Roles.
*   **Restrictions**: Cannot manage users.

### 2. IAM Staff
*   **Responsibility**: Audit & Support.
*   **Capabilities**: Read-only access to search roles and view permissions.
*   **Restrictions**: Read-only access. Cannot modify data.

### 3. System Administrator
*   **Responsibility**: User Lifecycle.
*   **Capabilities**: Onboard/Offboard users, Assign roles.
*   **Restrictions**: Cannot define roles or scopes.

## 📂 Project Structure

```
src/
├── auth/               # Security Core (Context, Guards, Login)
├── authorization/      # Policy Definitions (Actions, Policies)
├── layout/             # Secure Dashboard Layout
├── pages/              # Functional Pages (Segregated by Persona)
│   ├── system-owner/
│   ├── iam-staff/
│   └── system-admin/
└── services/           # API Integration
```

## 🚦 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Login Credentials (Mocked)**

    | Persona | Username | Password | Access |
    | :--- | :--- | :--- | :--- |
    | **System Owner** | `owner` | (any) | Governance Modules |
    | **IAM Staff** | `staff` | (any) | Role Search (Read-only) |
    | **System Admin** | `admin` | (any) | User Management |

## 🔒 Security Architecture

*   **Authentication**: Mocked login flow setting User + Role + Scopes in `AuthContext`.
*   **Authorization**:
    *   **Route Level**: `RequireRole` wrapper checks high-level role access.
    *   **Action Level**: `RequireAuthorization` wrapper checks specific business policies (e.g., `can(ACTIONS.CREATE_ROLE)`).
    *   **Policy Engine**: `src/authorization/policies.js` maps Business Actions to Technical Scopes.