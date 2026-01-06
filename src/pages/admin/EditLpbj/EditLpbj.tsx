import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditLpbj.module.css';

type Approver = {
  id: string;
  name: string;
  role: string;
  status: 'pending' | 'approved';
};

type ApproverOption = {
  id: string;
  name: string;
  role: string;
};

type LpbjItem = {
  id: string;
  no: string;
  name: string;
  spec: string;
  qty: string;
  unit: string;
  unitPrice: string;
  ppn: string;
  remarks: string;
};

const approverOptions: ApproverOption[] = [
  { id: 'apr-1', name: 'Pak Rahman', role: 'Atasan IT Dev' },
  { id: 'apr-2', name: 'Pak David', role: 'Atasan IT' },
  { id: 'apr-3', name: 'Pak Budi', role: 'Atasan Finance' },
  { id: 'apr-4', name: 'Pak Andi', role: 'Atasan Operations' },
];

const mockItems: LpbjItem[] = [
  {
    id: 'item-1',
    no: '1',
    name: 'Laptop Lenovo V14',
    spec: 'Intel Core i5, 8GB RAM, 256GB SSD',
    qty: '10',
    unit: 'pcs',
    unitPrice: '10000000',
    ppn: '11',
    remarks: 'Urgent',
  },
];

type FieldProps = {
  label: string;
  full?: boolean;
  children: ReactNode;
};

const Field: FC<FieldProps> = ({ label, full = false, children }) => (
  <div className={`${styles.formField} ${full ? styles.formFieldFull : ''}`}>
    <span className={styles.formLabel}>{label}</span>
    {children}
  </div>
);

const EditLpbj: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isApproverModalOpen, setIsApproverModalOpen] = useState(false);
  const [approvers, setApprovers] = useState<Approver[]>([
    { id: 'apr-1', name: 'Pak Rahman', role: 'Atasan IT Dev', status: 'approved' },
    { id: 'apr-2', name: 'Pak David', role: 'Atasan IT', status: 'pending' },
  ]);

  const [formData, setFormData] = useState({
    noLpbj: 'LPBJ/2024/001',
    departemen: 'Direct Sales',
    tanggal: '05/01/2026',
    tema: 'Laptop Lenovo V14',
  });

  const allApproved = approvers.length > 0 && approvers.every((a) => a.status === 'approved');

  const handleBack = () => {
    navigate('/admin/lpbj');
  };

  const handleBuatPO = () => {
    navigate(`/admin/quotation/create-po/${id}`);
  };

  const handleRemoveApprover = (approverId: string) => {
    setApprovers((prev) => prev.filter((a) => a.id !== approverId));
  };

  const handleToggleApprover = (option: ApproverOption) => {
    const exists = approvers.find((a) => a.id === option.id);
    if (exists) {
      setApprovers((prev) => prev.filter((a) => a.id !== option.id));
    } else {
      setApprovers((prev) => [...prev, { ...option, status: 'pending' }]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.detailHeader}>
        <div className={styles.detailLeft}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className={styles.listTitle}>Edit LPBJ</h1>
        </div>
        {allApproved ? (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleBuatPO}
          >
            <svg className={styles.primaryIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 10C9.30625 10 8.75 10.5562 8.75 11.25C8.75 11.5815 8.8817 11.8995 9.11612 12.1339C9.35054 12.3683 9.66848 12.5 10 12.5C10.3315 12.5 10.6495 12.3683 10.8839 12.1339C11.1183 11.8995 11.25 11.5815 11.25 11.25C11.25 10.9185 11.1183 10.6005 10.8839 10.3661C10.6495 10.1317 10.3315 10 10 10Z"
                fill="#F4F4F4"
              />
              <path
                d="M3.75 10C3.05625 10 2.5 10.5562 2.5 11.25C2.5 11.5815 2.6317 11.8995 2.86612 12.1339C3.10054 12.3683 3.41848 12.5 3.75 12.5C4.08152 12.5 4.39946 12.3683 4.63388 12.1339C4.8683 11.8995 5 11.5815 5 11.25C5 10.9185 4.8683 10.6005 4.63388 10.3661C4.39946 10.1317 4.08152 10 3.75 10Z"
                fill="#F4F4F4"
              />
              <path
                d="M0 0.484291C0 0.907181 0.342819 1.25 0.765709 1.25C1.06147 1.25 1.33079 1.42034 1.45754 1.68757L2.74946 4.41137C3.22053 5.40453 3.18349 6.56394 2.65 7.525C2.55625 7.7 2.5 7.90625 2.5 8.125C2.5 8.45652 2.6317 8.77446 2.86612 9.00888C3.10054 9.2433 3.41848 9.375 3.75 9.375H10.625C10.9702 9.375 11.25 9.09518 11.25 8.75C11.25 8.40482 10.9702 8.125 10.625 8.125H4.0125C3.97106 8.125 3.93132 8.10854 3.90201 8.07924C3.87271 8.04993 3.85625 8.01019 3.85625 7.96875C3.85625 7.9375 3.8625 7.9125 3.875 7.89375C4.22204 7.26523 4.88326 6.875 5.60123 6.875H9.09375C9.5625 6.875 9.975 6.6125 10.1875 6.23125L12.425 2.1875C12.4687 2.0875 12.5 1.98125 12.5 1.875C12.5 1.70924 12.4342 1.55027 12.3169 1.43306C12.1997 1.31585 12.0408 1.25 11.875 1.25H4.01243C3.16943 1.25 2.40233 0.762934 2.04375 0H0.765709C0.342819 0 0 0.342819 0 0.765709V0.484291Z"
                fill="#F4F4F4"
              />
            </svg>
            Buat PO
          </button>
        ) : (
          <button
            type="button"
            className={styles.ghostButton}
            onClick={handleBack}
          >
            Simpan
          </button>
        )}
      </div>

      <div className={styles.detailGrid}>
        {/* Left Side - Main Content */}
        <div className={styles.detailMain}>
          {/* Informasi LPBJ Card */}
          <section className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.cardHeader}>
                <svg className={styles.cardIcon} width="25" height="29" viewBox="0 0 25 29" fill="none">
                  <path
                    d="M25 8.0643C24.992 8.02582 24.992 7.98615 25 7.94766C24.9939 7.91391 24.9939 7.87936 25 7.84561V7.7144L24.9112 7.49572C24.8747 7.43629 24.8299 7.38229 24.7779 7.33535L24.6447 7.21872H24.5707L18.7379 3.58856L13.2307 0.23541C13.1023 0.137349 12.9568 0.0632347 12.8014 0.0167262H12.683C12.5507 -0.00557542 12.4155 -0.00557542 12.2833 0.0167262H12.1352C11.963 0.053461 11.798 0.117468 11.6467 0.206253L0.58799 6.98546L0.454753 7.08751L0.321516 7.20414L0.173475 7.30619L0.0994539 7.39367L0.0106289 7.61235V7.83103C-0.00354296 7.92773 -0.00354296 8.02592 0.0106289 8.12261V20.85C0.0101254 21.0978 0.073748 21.3416 0.19549 21.5584C0.317232 21.7752 0.493076 21.9579 0.706423 22.0892L11.8095 28.8539L12.0316 28.9413H12.15C12.4005 29.0196 12.6694 29.0196 12.9198 28.9413H13.0383L13.2603 28.8539L24.2746 22.1913C24.4879 22.06 24.6638 21.8773 24.7855 21.6605C24.9073 21.4436 24.9709 21.1998 24.9704 20.9521V8.22466C24.9704 8.22466 25 8.12261 25 8.0643ZM12.4313 3.18035L15.0664 4.78404L6.79092 9.82835L4.14098 8.22466L12.4313 3.18035ZM10.9509 25.0488L2.80861 20.1502V10.8343L10.9509 15.7911V25.0488ZM12.4313 13.2252L9.60371 11.5487L17.8792 6.48977L20.7216 8.22466L12.4313 13.2252ZM22.054 20.1065L13.9117 25.0925V15.7911L22.054 10.8343V20.1065Z"
                    fill="currentColor"
                  />
                </svg>
                <h2 className={styles.cardTitle}>Informasi LPBJ</h2>
              </div>
              <div className={styles.infoGrid}>
                <Field label="No. LPBJ">
                  <input
                    className={styles.input}
                    value={formData.noLpbj}
                    onChange={(e) => setFormData({ ...formData, noLpbj: e.target.value })}
                  />
                </Field>
                <Field label="Departemen">
                  <input
                    className={styles.input}
                    value={formData.departemen}
                    onChange={(e) => setFormData({ ...formData, departemen: e.target.value })}
                  />
                </Field>
                <Field label="Tanggal">
                  <input
                    className={styles.input}
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                  />
                </Field>
                <Field label="Tema" full>
                  <input
                    className={styles.input}
                    value={formData.tema}
                    onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Daftar Item Section */}
          <section className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.cardHeader}>
                <svg className={styles.cardIcon} width="25" height="29" viewBox="0 0 25 29" fill="none">
                  <path
                    d="M25 8.0643C24.992 8.02582 24.992 7.98615 25 7.94766C24.9939 7.91391 24.9939 7.87936 25 7.84561V7.7144L24.9112 7.49572C24.8747 7.43629 24.8299 7.38229 24.7779 7.33535L24.6447 7.21872H24.5707L18.7379 3.58856L13.2307 0.23541C13.1023 0.137349 12.9568 0.0632347 12.8014 0.0167262H12.683C12.5507 -0.00557542 12.4155 -0.00557542 12.2833 0.0167262H12.1352C11.963 0.053461 11.798 0.117468 11.6467 0.206253L0.58799 6.98546L0.454753 7.08751L0.321516 7.20414L0.173475 7.30619L0.0994539 7.39367L0.0106289 7.61235V7.83103C-0.00354296 7.92773 -0.00354296 8.02592 0.0106289 8.12261V20.85C0.0101254 21.0978 0.073748 21.3416 0.19549 21.5584C0.317232 21.7752 0.493076 21.9579 0.706423 22.0892L11.8095 28.8539L12.0316 28.9413H12.15C12.4005 29.0196 12.6694 29.0196 12.9198 28.9413H13.0383L13.2603 28.8539L24.2746 22.1913C24.4879 22.06 24.6638 21.8773 24.7855 21.6605C24.9073 21.4436 24.9709 21.1998 24.9704 20.9521V8.22466C24.9704 8.22466 25 8.12261 25 8.0643ZM12.4313 3.18035L15.0664 4.78404L6.79092 9.82835L4.14098 8.22466L12.4313 3.18035ZM10.9509 25.0488L2.80861 20.1502V10.8343L10.9509 15.7911V25.0488ZM12.4313 13.2252L9.60371 11.5487L17.8792 6.48977L20.7216 8.22466L12.4313 13.2252ZM22.054 20.1065L13.9117 25.0925V15.7911L22.054 10.8343V20.1065Z"
                    fill="currentColor"
                  />
                </svg>
                <h2 className={styles.cardTitle}>Daftar Item</h2>
              </div>
              <div className={styles.tableScroll}>
                <div
                  className={styles.tableHeader}
                  style={{ gridTemplateColumns: '40px 1.5fr 1.5fr 0.6fr 0.6fr 1fr 0.6fr 1fr' }}
                >
                  <span>No</span>
                  <span>Nama Barang</span>
                  <span>Spesifikasi</span>
                  <span>Qty</span>
                  <span>Unit</span>
                  <span>Unit Price (Rp)</span>
                  <span>PPN (%)</span>
                  <span>Remarks</span>
                </div>
                {mockItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${styles.tableRow} ${index % 2 === 1 ? styles.tableRowAlt : ''}`}
                    style={{ gridTemplateColumns: '40px 1.5fr 1.5fr 0.6fr 0.6fr 1fr 0.6fr 1fr' }}
                  >
                    <span>{item.no}</span>
                    <span>{item.name}</span>
                    <span>{item.spec}</span>
                    <span>{item.qty}</span>
                    <span>{item.unit}</span>
                    <span>{item.unitPrice}</span>
                    <span>{item.ppn}</span>
                    <span>{item.remarks || '-'}</span>
                  </div>
                ))}
              </div>
              <div className={styles.summarySection}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal</span>
                  <span className={styles.summaryValue}>Rp 10.000.000</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>PPN (11%)</span>
                  <span className={styles.summaryValue}>Rp 1.100.000</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabelTotal}>Grand Total</span>
                  <span className={styles.summaryValueTotal}>Rp 11.100.000</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Side - Approver Panel */}
        <aside className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Tambah Approver</h3>
            {approvers.length > 0 ? (
              <button
                type="button"
                className={styles.panelAction}
                onClick={() => setIsApproverModalOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M13 12C14.3261 12 15.5979 12.5268 16.5355 13.4645C17.4732 14.4021 18 15.6739 18 17V18C18 18.5304 17.7893 19.0391 17.4142 19.4142C17.0391 19.7893 16.5304 20 16 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V17C0 15.6739 0.526784 14.4021 1.46447 13.4645C2.40215 12.5268 3.67392 12 5 12H13ZM17 6C17.2652 6 17.5196 6.10536 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7V8H19C19.2652 8 19.5196 8.10536 19.7071 8.29289C19.8946 8.48043 20 8.73478 20 9C20 9.26522 19.8946 9.51957 19.7071 9.70711C19.5196 9.89464 19.2652 10 19 10H18V11C18 11.2652 17.8946 11.5196 17.7071 11.7071C17.5196 11.8946 17.2652 12 17 12C16.7348 12 16.4804 11.8946 16.2929 11.7071C16.1054 11.5196 16 11.2652 16 11V10H15C14.7348 10 14.4804 9.89464 14.2929 9.70711C14.1054 9.51957 14 9.26522 14 9C14 8.73478 14.1054 8.48043 14.2929 8.29289C14.4804 8.10536 14.7348 8 15 8H16V7C16 6.73478 16.1054 6.48043 16.2929 6.29289C16.4804 6.10536 16.7348 6 17 6ZM9 0C10.3261 0 11.5979 0.526784 12.5355 1.46447C13.4732 2.40215 14 3.67392 14 5C14 6.32608 13.4732 7.59785 12.5355 8.53553C11.5979 9.47322 10.3261 10 9 10C7.67392 10 6.40215 9.47322 5.46447 8.53553C4.52678 7.59785 4 6.32608 4 5C4 3.67392 4.52678 2.40215 5.46447 1.46447C6.40215 0.526784 7.67392 0 9 0Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            ) : null}
          </div>
          <div className={styles.panelList}>
            {approvers.length === 0 ? (
              <div className={styles.panelEmpty}>
                <span>Belum ada approver,</span>
                <button
                  type="button"
                  className={styles.panelEmptyAction}
                  onClick={() => setIsApproverModalOpen(true)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M13 12C14.3261 12 15.5979 12.5268 16.5355 13.4645C17.4732 14.4021 18 15.6739 18 17V18C18 18.5304 17.7893 19.0391 17.4142 19.4142C17.0391 19.7893 16.5304 20 16 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V17C0 15.6739 0.526784 14.4021 1.46447 13.4645C2.40215 12.5268 3.67392 12 5 12H13ZM17 6C17.2652 6 17.5196 6.10536 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7V8H19C19.2652 8 19.5196 8.10536 19.7071 8.29289C19.8946 8.48043 20 8.73478 20 9C20 9.26522 19.8946 9.51957 19.7071 9.70711C19.5196 9.89464 19.2652 10 19 10H18V11C18 11.2652 17.8946 11.5196 17.7071 11.7071C17.5196 11.8946 17.2652 12 17 12C16.7348 12 16.4804 11.8946 16.2929 11.7071C16.1054 11.5196 16 11.2652 16 11V10H15C14.7348 10 14.4804 9.89464 14.2929 9.70711C14.1054 9.51957 14 9.26522 14 9C14 8.73478 14.1054 8.48043 14.2929 8.29289C14.4804 8.10536 14.7348 8 15 8H16V7C16 6.73478 16.1054 6.48043 16.2929 6.29289C16.4804 6.10536 16.7348 6 17 6ZM9 0C10.3261 0 11.5979 0.526784 12.5355 1.46447C13.4732 2.40215 14 3.67392 14 5C14 6.32608 13.4732 7.59785 12.5355 8.53553C11.5979 9.47322 10.3261 10 9 10C7.67392 10 6.40215 9.47322 5.46447 8.53553C4.52678 7.59785 4 6.32608 4 5C4 3.67392 4.52678 2.40215 5.46447 1.46447C6.40215 0.526784 7.67392 0 9 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              approvers.map((approver) => (
                <div
                  key={approver.id}
                  className={`${styles.panelItem} ${
                    approver.status === 'approved' ? styles.panelItemApproved : ''
                  }`}
                >
                  <div>
                    <div className={styles.approverName}>{approver.name}</div>
                    <div className={styles.approverRole}>{approver.role}</div>
                  </div>
                  <div className={styles.approverActions}>
                    {approver.status === 'approved' ? (
                      <svg className={styles.approvedIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="10" fill="#2af31f" />
                        <path
                          d="M6 10L9 13L15 7"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg className={styles.pendingIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="10" fill="#f4ca20" />
                        <path
                          d="M10 5V10L13 13"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveApprover(approver.id)}
                    >
                      <svg className={styles.removeIcon} width="14" height="16" viewBox="0 0 13 15" fill="none">
                        <path
                          d="M2.4375 15C1.99063 15 1.60821 14.8369 1.29025 14.5108C0.972292 14.1847 0.813042 13.7922 0.8125 13.3333V2.5H0V0.833333H4.0625V0H8.9375V0.833333H13V2.5H12.1875V13.3333C12.1875 13.7917 12.0285 14.1842 11.7106 14.5108C11.3926 14.8375 11.0099 15.0006 10.5625 15H2.4375ZM4.0625 11.6667H5.6875V4.16667H4.0625V11.6667ZM7.3125 11.6667H8.9375V4.16667H7.3125V11.6667Z"
                          fill="#ff3b30"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.approverCount}>
            {approvers.filter((a) => a.status === 'approved').length} / {approvers.length} approved
          </div>
        </aside>
      </div>

      {/* Atur Approver Modal */}
      {isApproverModalOpen ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Atur Approver</h3>
                <span className={styles.modalSubtitle}>Ref: {formData.noLpbj}</span>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsApproverModalOpen(false)}
              >
                <svg width="14" height="14" viewBox="0 0 15 14" fill="none">
                  <path
                    d="M1.5 14L0 12.6L6 7L0 1.4L1.5 0L7.5 5.6L13.5 0L15 1.4L9 7L15 12.6L13.5 14L7.5 8.4L1.5 14Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className={styles.modalList}>
              {approverOptions.map((option) => {
                const isSelected = approvers.some((a) => a.id === option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.modalItem} ${
                      isSelected ? styles.modalItemSelected : ''
                    }`}
                    onClick={() => handleToggleApprover(option)}
                  >
                    <div>
                      <div className={styles.approverName}>{option.name}</div>
                      <div className={styles.approverRole}>{option.role}</div>
                    </div>
                    {isSelected ? (
                      <span className={styles.approverIndicator}>●</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditLpbj;
