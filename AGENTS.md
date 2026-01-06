# AGENTS.md

Project context and current implementation status for the LPBJ / IPBJ frontend.

## Project summary
- Frontend: React + TypeScript + Vite with CSS modules.
- UI focuses on LPBJ/IPBJ submission flow and approvals.
- LPBJ/IPBJ naming is used interchangeably; database uses `lpbj`.
- Final flow and ERD are documented in `FLOW.md`.

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
- Role selection is front-end only via `src/App.tsx`.
- Login form submit defaults to Pemohon role.
- Data on dashboards and forms is mock.
- Approval statuses are hardcoded in the UI.
- Admin LPBJ approver selection is local UI state only.

## Files to know
- `FLOW.md`: Final locked flow, roles, and ERD summary.
- `src/App.tsx`: Role routing and temporary login.
- `src/components/AdminLpbj/AdminLpbj.tsx`: Admin LPBJ list/detail UI.
- `src/components/PemohonLpbj/PemohonLpbj.tsx`: LPBJ form + edit modal.
- `src/components/PemohonDashboard/PemohonDashboard.tsx`: Pemohon screens.
- `src/components/Sidebar/Sidebar.tsx`: Admin sidebar navigation.

## Constraints (from final flow)
- Admin can view all, create IPBJ/Quotation/PO, but never approve.
- Atasan can approve IPBJ/Quotation only and cannot create/edit.
- Approvals require 4 unique approvers + token.
- Flow stages cannot be skipped.
