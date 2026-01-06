import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuotationPage.module.css';

type QuotationStatus = 'draft' | 'submitted' | 'approved';

type QuotationRow = {
  id: string;
  number: string;
  lpbjNumber: string;
  pkpStatus: string;
  top: string;
  qty: string;
  grandTotal: string;
  status: QuotationStatus;
};

type Column = {
  label: string;
  width: string;
};

const columns: Column[] = [
  { label: 'No. Quotation', width: '1.3fr' },
  { label: 'No.LPBJ', width: '1.2fr' },
  { label: 'PKP/ NON PKP', width: '1fr' },
  { label: 'TOP', width: '0.8fr' },
  { label: 'Qty', width: '0.6fr' },
  { label: 'Grand Total', width: '1fr' },
  { label: 'Status', width: '1fr' },
  { label: 'Aksi', width: '1.2fr' },
];

const quotationRows: QuotationRow[] = [
  {
    id: 'quo-1',
    number: '10010101023123',
    lpbjNumber: 'LPBJ/2024/001',
    pkpStatus: 'PKP',
    top: 'NET 30',
    qty: '10',
    grandTotal: 'Rp 15.000.000',
    status: 'draft',
  },
  {
    id: 'quo-2',
    number: '10010101023124',
    lpbjNumber: 'LPBJ/2024/002',
    pkpStatus: 'NON PKP',
    top: 'NET 14',
    qty: '25',
    grandTotal: 'Rp 45.000.000',
    status: 'approved',
  },
  {
    id: 'quo-3',
    number: '10010101023125',
    lpbjNumber: 'LPBJ/2024/003',
    pkpStatus: 'PKP',
    top: 'NET 30',
    qty: '5',
    grandTotal: 'Rp 8.500.000',
    status: 'submitted',
  },
  {
    id: 'quo-4',
    number: '10010101023126',
    lpbjNumber: 'LPBJ/2024/004',
    pkpStatus: 'PKP',
    top: 'NET 30',
    qty: '100',
    grandTotal: 'Rp 150.000.000',
    status: 'draft',
  },
];

const QuotationPage: FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<QuotationRow[]>(quotationRows);

  const handleEdit = (id: string) => {
    navigate(`/admin/quotation/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleView = (id: string) => {
    // Use 'approved' as special ID to show approved status
    const viewId = id === 'quo-2' ? 'approved' : id;
    navigate(`/admin/quotation/view/${viewId}`);
  };

  const handleBuatPO = (id: string) => {
    navigate(`/admin/quotation/create-po/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.listHeader}>
        <div>
          <h1 className={styles.listTitle}>Quotation</h1>
        </div>
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
            <span>{row.number}</span>
            <span>{row.lpbjNumber}</span>
            <span>{row.pkpStatus}</span>
            <span>{row.top}</span>
            <span>{row.qty}</span>
            <span>{row.grandTotal}</span>
            <span>
              <StatusBadge status={row.status} />
            </span>
            <span className={styles.rowActions}>
              {row.status === 'draft' && (
                <>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => handleEdit(row.id)}
                    title="Edit"
                  >
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => handleDelete(row.id)}
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </>
              )}
              {row.status === 'approved' && (
                <>
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
                </>
              )}
              {row.status === 'submitted' && (
                <>
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
                </>
              )}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};

const StatusBadge: FC<{ status: QuotationStatus }> = ({ status }) => {
  const config = {
    draft: { text: 'Buat Quo', className: styles.statusDraft },
    approved: { text: 'Disetujui', className: styles.statusApproved },
    submitted: { text: 'Diajukan', className: styles.statusSubmitted },
  }[status];

  return (
    <span className={`${styles.statusBadge} ${config.className}`}>
      {config.text}
    </span>
  );
};

const EditIcon: FC = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M0 15V11.4583L11 0.479167C11.1667 0.326389 11.3508 0.208333 11.5525 0.125C11.7542 0.0416667 11.9658 0 12.1875 0C12.4092 0 12.6244 0.0416667 12.8333 0.125C13.0422 0.208333 13.2228 0.333333 13.375 0.5L14.5208 1.66667C14.6875 1.81944 14.8092 2 14.8858 2.20833C14.9625 2.41667 15.0005 2.625 15 2.83333C15 3.05556 14.9619 3.2675 14.8858 3.46917C14.8097 3.67083 14.688 3.85472 14.5208 4.02083L3.54167 15H0ZM12.1667 4L13.3333 2.83333L12.1667 1.66667L11 2.83333L12.1667 4Z"
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

const EyeIcon: FC = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <path
      d="M9 0C13.1333 0 16.6917 2.59167 18 6C16.6917 9.40833 13.1333 12 9 12C4.86667 12 1.30833 9.40833 0 6C1.30833 2.59167 4.86667 0 9 0ZM9 10.3333C10.5913 10.3333 12.1174 9.71667 13.241 8.625C14.3646 7.53333 15.0455 6.05719 15.1667 4.5C14.3646 3.40833 12.8385 2.79167 11.2471 2.79167C9.6557 2.79167 8.12955 3.40833 7.00598 4.5C5.88241 5.59167 5.2015 7.06781 5.0803 8.625C5.88241 9.71667 7.40856 10.3333 9 10.3333ZM9 8.75C7.75736 8.75 6.75 7.74264 6.75 6.5C6.75 5.25736 7.75736 4.25 9 4.25C10.2426 4.25 11.25 5.25736 11.25 6.5C11.25 7.74264 10.2426 8.75 9 8.75Z"
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

export default QuotationPage;
