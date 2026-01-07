import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AdminPurchaseOrder.module.css';

type POStatus = 'approved';

type PORow = {
  id: string;
  noPO: string;
  noQuotation: string;
  noLPBJ: string;
  vendor: string;
  tanggal: string;
  deliveryDate: string;
  grandTotal: string;
  status: POStatus;
};

type Column = {
  label: string;
};

const columns: Column[] = [
  { label: 'No. PO' },
  { label: 'No. Quotation' },
  { label: 'No.LPBJ' },
  { label: 'Vendor' },
  { label: 'Tanggal' },
  { label: 'Delivery Date' },
  { label: 'Grand Total' },
  { label: 'Status' },
  { label: 'Aksi' },
];

const poRows: PORow[] = [
  {
    id: 'po-1',
    noPO: 'PO/2024/001',
    noQuotation: 'QUO/2024/001',
    noLPBJ: 'LPBJ/2024/001',
    vendor: 'PT Supplier A',
    tanggal: '01/01/2026',
    deliveryDate: '10/01/2026',
    grandTotal: 'Rp 15.000.000',
    status: 'approved',
  },
  {
    id: 'po-2',
    noPO: 'PO/2024/002',
    noQuotation: 'QUO/2024/002',
    noLPBJ: 'LPBJ/2024/002',
    vendor: 'PT Supplier B',
    tanggal: '02/01/2026',
    deliveryDate: '12/01/2026',
    grandTotal: 'Rp 45.000.000',
    status: 'approved',
  },
];

const poDetailData = {
  noPO: '10010101023123',
  tanggal: '10010101023123',
  deliveryTo: 'Tono',
  vendor: '01/01/2026',
  expired: 'Habibi Cholis',
  deliveryDate: '10/01/2026',
  poType: '01/01/2026',
  approvedBy: ['Pak David', 'Pak James'],
  note: 'asd',
  lpbj: 'no lpbj',
  quotation: 'no quo',
};

const AdminPurchaseOrder: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewId = searchParams.get('view');
  const createMode = searchParams.get('create') === 'true';
  const [rows, setRows] = useState<PORow[]>(poRows);

  const handleView = (id: string) => {
    navigate(`/admin/purchase?view=${id}`);
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleBuatPO = (id: string) => {
    navigate(`/admin/purchase?create=true&from=${id}`);
  };

  const handleBack = () => {
    navigate('/admin/purchase');
  };

  if (createMode) {
    return <CreatePOForm onBack={handleBack} />;
  }

  if (viewId) {
    return <PODetailView poId={viewId} onBack={handleBack} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <FileIcon className={styles.pageIcon} />
        <h1 className={styles.pageTitle}>Purchese Order</h1>
      </div>

      <section className={styles.card}>
        <div className={styles.tableHeader}>
          {columns.map((column) => (
            <span key={column.label}>{column.label}</span>
          ))}
        </div>
        {rows.map((row, index) => (
          <div
            key={row.id}
            className={`${styles.tableRow} ${
              index % 2 === 1 ? styles.tableRowAlt : ''
            }`}
          >
            <span>{row.noPO}</span>
            <span>{row.noQuotation}</span>
            <span>{row.noLPBJ}</span>
            <span>{row.vendor}</span>
            <span>{row.tanggal}</span>
            <span>{row.deliveryDate}</span>
            <span>{row.grandTotal}</span>
            <span>
              <StatusBadge status={row.status} />
            </span>
            <span className={styles.rowActions}>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => handleView(row.id)}
                title="View"
              >
                <EyeIcon />
              </button>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => handleDelete(row.id)}
                title="Delete"
              >
                <TrashIcon />
              </button>
              <button
                type="button"
                className={styles.buatPoButton}
                onClick={() => handleBuatPO(row.id)}
              >
                <CartIcon className={styles.buatPoIcon} />
                Buat PO
              </button>
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};

const StatusBadge: FC<{ status: POStatus }> = ({ status: _status }) => (
  <span className={`${styles.statusBadge} ${styles.statusApproved}`}>
    Disetujui
  </span>
);

const PODetailView: FC<{ poId: string; onBack: () => void }> = ({
  poId: _poId,
  onBack,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.detailHeader}>
        <div className={styles.detailLeft}>
          <button
            type="button"
            className={styles.backButton}
            onClick={onBack}
            aria-label="Back to list"
          >
            <ArrowLeftIcon />
          </button>
          <span className={styles.poNumber}>PO/982134912</span>
        </div>
        <button type="button" className={styles.downloadButton}>
          <DownloadIcon className={styles.downloadIcon} />
          Download PDF
        </button>
      </div>

      <InfoCard title="Informasi Purchase Order">
        <div className={styles.infoGrid}>
          <InfoBlock label="No. PO" value={poDetailData.noPO} />
          <InfoBlock label="Tanggal" value={poDetailData.tanggal} />
          <InfoBlock label="Delivery To" value={poDetailData.deliveryTo} />
          <InfoBlock label="Vendor" value={poDetailData.vendor} />
          <InfoBlock label="Expired" value={poDetailData.expired} />
          <InfoBlock label="Delivery Date" value={poDetailData.deliveryDate} />
          <InfoBlock label="PO Type" value={poDetailData.poType} />
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Approved By</span>
            <ul className={styles.approverList}>
              {poDetailData.approvedBy.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.infoBlock} ${styles.infoBlockWide}`}>
            <span className={styles.infoLabel}>Note</span>
            <span className={styles.infoValue}>{poDetailData.note}</span>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Refrensi">
        <div className={styles.referenceGrid}>
          <InfoBlock label="LPBJ" value={poDetailData.lpbj} />
          <InfoBlock label="Quotation" value={poDetailData.quotation} />
        </div>
      </InfoCard>

      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <FileIcon className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Daftar Item</h2>
          </div>
          <div className={styles.tableScroll}>
            <div className={styles.itemTableHeader}>
              <span>No</span>
              <span>Nama Barang</span>
              <span>Spesifikasi</span>
              <span>Qty</span>
              <span>Unit Price</span>
              <span>Discount</span>
              <span>Amount</span>
            </div>
            <div className={styles.itemTableRow}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={styles.summarySection}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span className={styles.summaryValue}></span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>PPN (10%)</span>
              <span className={styles.summaryValue}></span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Cost</span>
              <span className={styles.summaryValue}></span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>PPMB</span>
              <span className={styles.summaryValue}></span>
            </div>
            <div className={styles.summaryRowTotal}>
              <span className={styles.summaryLabelTotal}>Grand Total</span>
              <span className={styles.summaryValueTotal}></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CreatePOForm: FC<{ onBack: () => void }> = ({ onBack }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/admin/purchase');
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <FileIcon className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Informasi PO</h2>
          </div>

          <div className={styles.formGrid}>
            <Field label="No. PO">
              <input className={styles.input} placeholder="" />
            </Field>
            <Field label="PO Type">
              <input className={styles.input} placeholder="" />
            </Field>
            <Field label="Vendor">
              <input className={styles.input} placeholder="" />
            </Field>
            <Field label="Expired Day">
              <input className={styles.input} placeholder="" />
            </Field>
            <Field label="Delivery Day">
              <div className={styles.inputWithIcon}>
                <input className={styles.input} placeholder="" style={{ width: '100%', paddingRight: '32px' }} />
                <CalendarIcon className={styles.inputIcon} />
              </div>
            </Field>
            <Field label="Delivery To">
              <input className={styles.input} placeholder="" />
            </Field>
            <Field label="Note" full>
              <textarea className={styles.textarea} placeholder="" rows={3} />
            </Field>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardBody}>
          <h2 className={styles.detailItemTitle}>Detail Item</h2>

          <div className={styles.itemCard}>
            <h3 className={styles.itemTitle}>Item 1</h3>
            <div className={styles.itemGrid}>
              <Field label="Article">
                <input className={styles.input} placeholder="" />
              </Field>
              <Field label="Description">
                <input className={styles.input} placeholder="" />
              </Field>
              <Field label="Qty">
                <input className={styles.input} placeholder="" />
              </Field>
              <Field label="Discount">
                <input className={styles.input} placeholder="" />
              </Field>
              <Field label="Amount">
                <input className={styles.input} placeholder="" />
              </Field>
            </div>
          </div>

          <div className={styles.summarySection} style={{ background: 'transparent', padding: '0' }}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span className={styles.summaryValue}></span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>PPN (10%)</span>
              <span className={styles.summaryValue}></span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Cost</span>
              <span className={styles.summaryValue}></span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>PPMB</span>
              <span className={styles.summaryValue}></span>
            </div>
            <div className={styles.summaryRowTotal}>
              <span className={styles.summaryLabelTotal}>Grand Total</span>
              <span className={styles.summaryValueTotal}></span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.actionBar}>
        <button type="button" className={styles.cancelButton} onClick={onBack}>
          Batal
        </button>
        <button type="button" className={styles.submitButton} onClick={handleSubmit}>
          Buat PO
        </button>
      </div>
    </div>
  );
};

const Field: FC<{ label: string; full?: boolean; children: ReactNode }> = ({
  label,
  full = false,
  children,
}) => (
  <div className={`${styles.formField} ${full ? styles.formFieldFull : ''}`}>
    <span className={styles.formLabel}>{label}</span>
    {children}
  </div>
);

const InfoCard: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <section className={styles.card}>
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <FileIcon className={styles.cardIcon} />
        <h2 className={styles.cardTitle}>{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const InfoBlock: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className={styles.infoBlock}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
);

const ArrowLeftIcon: FC = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <path
      d="M0.292893 6.65617C-0.0976314 7.0467 -0.0976315 7.67986 0.292892 8.07039L6.65685 14.4343C7.04738 14.8249 7.68054 14.8249 8.07107 14.4343C8.46159 14.0438 8.46159 13.4107 8.07107 13.0201L2.41421 7.36328L8.07107 1.70643C8.46159 1.3159 8.46159 0.682741 8.07107 0.292216C7.68054 -0.098309 7.04738 -0.0983091 6.65685 0.292216L0.292893 6.65617Z"
      fill="currentColor"
    />
    <path d="M20 7.36328H1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const FileIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="24" viewBox="0 0 20 24" fill="none">
    <path
      d="M5 1H12L18 7V22C18 22.5523 17.5523 23 17 23H5C4.44772 23 4 22.5523 4 22V2C4 1.44772 4.44772 1 5 1Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M12 1V7H18" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7 11H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const EyeIcon: FC = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <path
      d="M9 0C13.1333 0 16.6917 2.59167 18 6C16.6917 9.40833 13.1333 12 9 12C4.86667 12 1.30833 9.40833 0 6C1.30833 2.59167 4.86667 0 9 0ZM9 10.3333C10.5913 10.3333 12.1174 9.71667 13.241 8.625C14.3646 7.53333 15.0455 6.05719 15.1667 4.5C14.3646 3.40833 12.8385 2.79167 11.2471 2.79167C9.6557 2.79167 8.12955 3.40833 7.00598 4.5C5.88241 5.59167 5.2015 7.06781 5.0803 8.625C5.88241 9.71667 7.40856 10.3333 9 10.3333ZM9 8.75C7.75736 8.75 6.75 7.74264 6.75 6.5C6.75 5.25736 7.75736 4.25 9 4.25C10.2426 4.25 11.25 5.25736 11.25 6.5C11.25 7.74264 10.2426 8.75 9 8.75Z"
      fill="currentColor"
    />
  </svg>
);

const TrashIcon: FC = () => (
  <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
    <path
      d="M2.4375 15C1.99063 15 1.60821 14.8369 1.29025 14.5108C0.972292 14.1847 0.813042 13.7922 0.8125 13.3333V2.5H0V0.833333H4.0625V0H8.9375V0.833333H13V2.5H12.1875V13.3333C12.1875 13.7917 12.0285 14.1842 11.7106 14.5108C11.3926 14.8375 11.0099 15.0006 10.5625 15H2.4375ZM4.0625 11.6667H5.6875V4.16667H4.0625V11.6667ZM7.3125 11.6667H8.9375V4.16667H7.3125V11.6667Z"
      fill="currentColor"
    />
  </svg>
);

const CartIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
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
);

const DownloadIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z"
      fill="currentColor"
    />
  </svg>
);

const CalendarIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="15" height="13" viewBox="0 0 15 13" fill="none">
    <path
      d="M0.75 5.75H14.25C14.34 5.75 14.4103 5.75043 14.4707 5.75195C14.4796 5.75218 14.4881 5.75265 14.4961 5.75293C14.4964 5.76113 14.4978 5.77009 14.498 5.7793C14.4996 5.83964 14.5 5.90999 14.5 6V9.75C14.5 10.4714 14.4986 10.9618 14.4492 11.3291C14.4018 11.6819 14.3185 11.8456 14.207 11.957C14.0956 12.0685 13.9319 12.1518 13.5791 12.1992C13.2118 12.2486 12.7214 12.25 12 12.25H3C2.27865 12.25 1.78818 12.2486 1.4209 12.1992C1.06809 12.1518 0.904407 12.0685 0.792969 11.957C0.68153 11.8456 0.598244 11.6819 0.550781 11.3291C0.50138 10.9618 0.5 10.4714 0.5 9.75V6C0.5 5.91003 0.500433 5.83967 0.501953 5.7793C0.502188 5.76999 0.502637 5.76122 0.50293 5.75293C0.511125 5.75264 0.520102 5.75218 0.529297 5.75195C0.589638 5.75044 0.65999 5.75 0.75 5.75ZM3 0.5H12C12.7214 0.5 13.2118 0.50138 13.5791 0.550781C13.9319 0.598244 14.0956 0.68153 14.207 0.792969C14.3185 0.904407 14.4018 1.06809 14.4492 1.4209C14.4986 1.78818 14.5 2.27865 14.5 3C14.5 3.09001 14.4996 3.16036 14.498 3.2207C14.4978 3.22955 14.4964 3.23818 14.4961 3.24609C14.4881 3.24637 14.4797 3.24782 14.4707 3.24805C14.4103 3.24957 14.34 3.25 14.25 3.25H0.75C0.65999 3.25 0.589638 3.24956 0.529297 3.24805C0.52009 3.24782 0.511135 3.24638 0.50293 3.24609C0.502651 3.23809 0.502178 3.22965 0.501953 3.2207C0.500433 3.16033 0.5 3.08997 0.5 3C0.5 2.27865 0.50138 1.78818 0.550781 1.4209C0.598244 1.06809 0.68153 0.904407 0.792969 0.792969C0.904407 0.68153 1.06809 0.598244 1.4209 0.550781C1.78818 0.50138 2.27865 0.5 3 0.5Z"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);

export default AdminPurchaseOrder;
