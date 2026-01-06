# AGENTS.md

Project context and current implementation status for the LPBJ / IPBJ frontend.

## Project summary
- Frontend: React + TypeScript + Vite with CSS modules + React Router v6.
- UI focuses on LPBJ/IPBJ submission flow and approvals.
- LPBJ/IPBJ naming is used interchangeably; database uses `lpbj`.
- Final flow and ERD are documented in `FLOW.md`.
- Uses React Router v6 for URL-based navigation with role-based protected routes.

## Implemented (UI)
- Login page with temporary role buttons (Pemohon, Admin).
- Pemohon dashboard: list, detail tabs (LPBJ / Quotation / PO), status panel.
- Pemohon LPBJ form: info section, add item form, list item table.
- LPBJ edit modal (dummy) reuses add item form layout.
- History page (dummy list).
- Account setting page (placeholder layout based on ERD images).
- Admin dashboard stub (stats and sections).
- Admin LPBJ screens: list view, detail view, approver selection, status panel.
- Admin approver modal (Atur Apporver) for selecting approvers (UI only).
- Header supports configurable profile name/role.
- Header and sidebars for Pemohon and Admin layouts (Admin sidebar supports active navigation).

## Not implemented / pending
- Backend integration (API, auth, persistence).
- Role-based auth enforcement on server side.
- Approval logic (4 approvers, token validation).
- Approver UI (Atasan) for approving IPBJ/Quotation.
- Real Quotation and PO create/edit flows (data entry, validation).
- PDF generation flow for PO.
- Real data for history and account settings.
- Admin LPBJ actions are mock (no create/delete persistence).

## Current behavior notes
- Authentication uses localStorage with React Router v6.
- Auth state persists across page reloads via localStorage (keys: `lpbj_auth_token`, `lpbj_user_role`).
- Protected routes auto-redirect to /login if not authenticated.
- Role-based routing enforces admin vs pemohon access.
- Login redirects to appropriate dashboard based on role.
- Login form submit defaults to Pemohon role.
- Data on dashboards and forms is mock.
- Approval statuses are hardcoded in the UI.
- Admin LPBJ approver selection is local UI state only.

## Routing architecture
- React Router v6 for URL-based navigation.
- Auth context (src/contexts/AuthContext.tsx) manages authentication state.
- Protected routes (src/components/ProtectedRoute.tsx) enforce auth requirements.
- Layouts (src/layouts/) wrap role-based pages with consistent UI.
- Pages organized by role: src/pages/admin/, src/pages/pemohon/.
- Components (src/components/) contain only reusable UI components.

## Routes
### Admin Routes (/admin/*)
- /admin/dashboard - Admin home with stats
- /admin/lpbj - LPBJ management (list, detail, create)
- /admin/quotation - Quotation management (placeholder)
- /admin/purchase - Purchase order management (placeholder)
- /admin/history - History view (placeholder)
- /admin/users - User management (placeholder)
- /admin/atasan - Atasan management (placeholder)

### Pemohon Routes (/pemohon/*)
- /pemohon/dashboard - Pemohon home with LPBJ list
- /pemohon/lpbj - Create LPBJ form
- /pemohon/history - History view
- /pemohon/account - Account settings

### Public Routes
- /login - Login page
- / - Redirects to /login

## Files to know
- `FLOW.md`: Final locked flow, roles, and ERD summary.
- `src/App.tsx`: React Router configuration with protected routes.
- `src/contexts/AuthContext.tsx`: Authentication state management with localStorage.
- `src/components/ProtectedRoute.tsx`: Route protection wrapper component.
- `src/layouts/AdminLayout.tsx`: Admin layout with sidebar and header.
- `src/layouts/PemohonLayout.tsx`: Pemohon layout with sidebar and header.
- `src/pages/admin/AdminDashboard/AdminDashboard.tsx`: Admin dashboard home.
- `src/pages/admin/AdminLpbj/AdminLpbj.tsx`: Admin LPBJ list/detail UI.
- `src/pages/pemohon/PemohonDashboard/PemohonDashboard.tsx`: Pemohon dashboard with LPBJ list.
- `src/pages/pemohon/PemohonLpbj/PemohonLpbj.tsx`: LPBJ form + edit modal.
- `src/pages/pemohon/AccountSetting/AccountSetting.tsx`: Account settings page.
- `src/components/Sidebar/Sidebar.tsx`: Admin sidebar navigation with React Router Links.
- `src/components/PemohonSidebar/PemohonSidebar.tsx`: Pemohon sidebar navigation with React Router Links.

## Constraints (from final flow)
- Admin can view all, create IPBJ/Quotation/PO, but never approve.
- Atasan can approve IPBJ/Quotation only and cannot create/edit.
- Approvals require 4 unique approvers + token.
- Flow stages cannot be skipped.
