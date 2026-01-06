# LPBJ / IPBJ Flow and ERD (Final Locked)

This document captures the final locked business flow and ERD context for
implementation. It is based on the final role/flow definition and the ERD
images provided.

## Scope and rules (locked)
- Admin and Atasan can view IPBJ/LPBJ.
- Admin cannot approve.
- Atasan cannot create IPBJ / Quotation / PO.
- Flow and ERD stay the same; no new tables or processes.

## Terminology
- "IPBJ" and "LPBJ" are used interchangeably.
- The ERD uses `lpbj` table naming.

## Roles (final)
### Pemohon
Access:
- Create IPBJ.
- Edit IPBJ only while DRAFT.
- Submit IPBJ.
- View own IPBJ only.

Restrictions:
- No approve.
- No Quotation or PO creation.

### Admin
Access:
- View all IPBJ / Quotation / PO.
- Create IPBJ.
- Edit IPBJ only while DRAFT.
- Submit IPBJ.
- Create Quotation after IPBJ approved.
- Create PO after Quotation approved.

Hard restrictions:
- No approve (IPBJ / Quotation).
- No token.
- Cannot bypass approval or skip stages.

### Atasan (Approver)
Access:
- View IPBJ and Quotation.
- Approve IPBJ.
- Approve Quotation.

Restrictions:
- No create or edit.
- No Quotation or PO creation.

Approval requirements:
- Unique token per user.
- One user = one approval.

## Status and approval rules
- IPBJ: DRAFT -> WAITING_APPROVAL_IPBJ -> APPROVED.
- Quotation: DRAFT -> WAITING_APPROVAL_QUOTATION -> APPROVED.
- PO: FINAL.
- 4 unique approvals required for IPBJ and Quotation.
- Approvals < 4 keep status in WAITING.
- Duplicate approvals are rejected.
- Token is required for approvals; invalid token = fail.

## Global flow (final)
Pemohon/Admin
  -> Create IPBJ (DRAFT)
  -> Submit IPBJ
  -> WAITING_APPROVAL_IPBJ
  -> 4x approval (Atasan)
  -> IPBJ APPROVED
  -> Admin creates Quotation
  -> Submit Quotation
  -> WAITING_APPROVAL_QUOTATION
  -> 4x approval (Atasan)
  -> Quotation APPROVED
  -> Admin creates PO
  -> PO FINAL

## Role flow details
### Pemohon
Login
-> Create IPBJ (DRAFT)
-> Add items (lpbj_items, detail_items)
-> Submit IPBJ
-> WAITING_APPROVAL_IPBJ (read-only)

### Admin
IPBJ:
- Create / edit draft.
- Submit -> read-only.

Quotation:
- Requires IPBJ APPROVED.
- Create (DRAFT) -> submit -> WAITING_APPROVAL_QUOTATION.
- Read-only until approved.

PO:
- Requires Quotation APPROVED.
- Generate PO -> store in purchased_orders.
- Generate PDF.
- Status FINAL.

### Atasan
Login
-> Open IPBJ / Quotation
-> Approve
-> Input token
-> Validate token
-> Record approval in approvals

## Access matrix
Role | View IPBJ | Create IPBJ | Approve | Quotation | PO
Pemohon | own | yes | no | no | no
Admin | all | yes | no | yes | yes
Atasan | yes | no | yes | no | no

## ERD tables (from provided ERD images)
### Organization
- department: id (PK), name, code
- job: id (PK), department_id (FK), job_level_id (FK), name, head_count
- job_level: id (PK), name
- position: id (PK), user_id (FK), job_id (FK)

### User and roles
- users: id (PK), email, username, password, pin, profile_photo, role_id (FK),
  (field `Row` appears in ERD - confirm exact name)
- roles: id (PK), name

### Documents and approvals
- document_types: id (PK), name
- approvals: id (PK), document_type_id (FK), document_id (FK),
  approver_id (FK), status, approved_at

### IPBJ / LPBJ
- lpbj: id (PK), request_by (FK), department, request_date, store_id (FK)
- lpbj_items: id (PK), lpbj_id (FK), media, name, qty, article, store_id (FK),
  general_ledger, cost_center, order, information, item_photo, unit_id (FK)
- detail_items: id (PK), item_id (FK), detail

### Quotation
- quotation: id (PK), date, pr_no, description, lpbj_id (FK), franco, pkp
- quotation_details: UniqueID (PK), quotation_id (FK), item_id (FK),
  price_qty, remarks
- note_quotations: id (PK), quotation_id (FK), note

### Purchase Order
- purchased_orders: id (PK), quotation_id (FK), store_id (FK), number_po, term,
  type, cost, note, date, delivery_date, status, expired_date
- purchased_order_details: id (PK), purchased_order_id (FK),
  quotation_item_id (FK), discount (optional), amount

### Store and unit
- store: id (PK), store_code, name, address, phone, email, city, is_active
- unit: id (PK), name

## Relationship summary
- department 1..n job
- job_level 1..n job
- job 1..n position
- users 1..n position
- roles 1..n users
- lpbj.request_by -> users.id
- lpbj.store_id -> store.id
- lpbj_items.lpbj_id -> lpbj.id
- lpbj_items.store_id -> store.id
- lpbj_items.unit_id -> unit.id
- detail_items.item_id -> lpbj_items.id
- quotation.lpbj_id -> lpbj.id
- note_quotations.quotation_id -> quotation.id
- quotation_details.quotation_id -> quotation.id
- quotation_details.item_id -> lpbj_items.id
- purchased_orders.quotation_id -> quotation.id
- purchased_orders.store_id -> store.id
- purchased_order_details.purchased_order_id -> purchased_orders.id
- purchased_order_details.quotation_item_id -> quotation_details.UniqueID
- approvals.document_type_id -> document_types.id
- approvals.approver_id -> users.id
- approvals.document_id -> lpbj.id or quotation.id (by document_type)

## Implementation notes
- Admin never has approve actions.
- Atasan never has create/edit actions.
- Flow stages must not be skipped.
- If ERD is updated, update this file to match the latest image.

## Frontend UI notes
- Admin LPBJ screens include list view, detail view, approver selection panel, and approval status panel (UI only).
- Admin can open an "Atur Apporver" modal to pick approvers (mock data only).
