import type { FC, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLpbj.module.css';

type LpbjStatus = 'draft' | 'approved';

type LpbjRow = {
  id: string;
  number: string;
  title: string;
  department: string;
  date: string;
  qty: string;
  status: LpbjStatus;
};

type Approver = {
  id: string;
  name: string;
  role: string;
};

type ApprovalStatus = Approver & {
  status: 'approved' | 'pending';
};

type Column = {
  label: string;
  width: string;
};

const lpbjRows: LpbjRow[] = [
  {
    id: 'LPBJ-1001',
    number: '10010101023123',
    title: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
    department: 'Direct Sales',
    date: '01/01/2026',
    qty: '100',
    status: 'draft',
  },
  {
    id: 'LPBJ-1002',
    number: '10010101023124',
    title: 'LPBJ - Laptop Lenovo ThinkPad E14 12 biji',
    department: 'IT Dev',
    date: '02/01/2026',
    qty: '12',
    status: 'approved',
  },
];

const approverOptions: Approver[] = [
  { id: 'apr-1', name: 'Pak Rahman', role: 'Atasan IT Dev' },
  { id: 'apr-2', name: 'Pak Rahman', role: 'Atasan IT Dev' },
  { id: 'apr-3', name: 'Pak Rahman', role: 'Atasan IT Dev' },
  { id: 'apr-4', name: 'Pak Rahman', role: 'Atasan IT Dev' },
  { id: 'apr-5', name: 'Pak Rahman', role: 'Atasan IT Dev' },
  { id: 'apr-6', name: 'Pak Rahman', role: 'Atasan IT Dev' },
];

const approvalStatuses: ApprovalStatus[] = [
  { id: 'apr-1', name: 'Pak Rahman', role: 'Atasan IT Dev', status: 'approved' },
  { id: 'apr-2', name: 'Pak David', role: 'Atasan IT', status: 'pending' },
];

const infoData = {
  number: '10010101023123',
  department: '10010101023123',
  requester: 'Habibi Cholis',
  updated: '10/01/2026',
  date: '01/01/2026',
  note: 'Laptop saya ilang satu biar gak ilang lagi jadi minta 100',
};

const listColumns: Column[] = [
  { label: 'No. LPBJ', width: '1.1fr' },
  { label: 'Tema', width: '1.8fr' },
  { label: 'Departemen', width: '1.1fr' },
  { label: 'Tanggal', width: '0.8fr' },
  { label: 'Qty', width: '0.5fr' },
  { label: 'Status', width: '0.8fr' },
  { label: 'Aksi', width: '0.5fr' },
];

const itemColumns: Column[] = [
  { label: 'No', width: '50px' },
  { label: 'Nama Barang', width: '1.4fr' },
  { label: 'Spesifikasi', width: '1.2fr' },
  { label: 'Qty', width: '0.6fr' },
  { label: 'Article', width: '0.8fr' },
  { label: 'Store', width: '0.8fr' },
  { label: 'G/L', width: '0.7fr' },
  { label: 'Cost Center', width: '1fr' },
  { label: 'Order', width: '0.8fr' },
  { label: 'Gambar', width: '0.9fr' },
];

const AdminLpbj: FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedApprovers, setSelectedApprovers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const selectedRow = useMemo(
    () => lpbjRows.find((row) => row.id === selectedId) ?? null,
    [selectedId]
  );

  const selectedApproverItems = approverOptions.filter((option) =>
    selectedApprovers.includes(option.id)
  );

  const handleToggleApprover = (id: string) => {
    setSelectedApprovers((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    );
  };

  const handleRemoveApprover = (id: string) => {
    setSelectedApprovers((prev) => prev.filter((value) => value !== id));
  };

  const handleBackToList = () => {
    setSelectedId(null);
    setIsModalOpen(false);
    setIsCreating(false);
  };

  const handleEditLpbj = (id: string) => {
    navigate(`/admin/lpbj/edit/${id}`);
  };

  if (isCreating) {
    return <CreateLpbjForm onBack={handleBackToList} />;
  }

  if (!selectedRow) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.listHeader}>
          <div>
            <h1 className={styles.listTitle}>Daftar LPBJ</h1>
            <p className={styles.listSubtitle}>Permintaan Barang/ Jasa yang masuk</p>
          </div>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => setIsCreating(true)}
          >
            <FilePlusIcon className={styles.primaryIcon} />
            Buat LPBJ
          </button>
        </div>

        <section className={styles.card}>
          <div className={styles.tableHeader}>
            {listColumns.map((column) => (
              <span key={column.label}>{column.label}</span>
            ))}
          </div>
          {lpbjRows.map((row, index) => (
            <div
              key={row.id}
              className={`${styles.tableRow} ${
                index % 2 === 1 ? styles.tableRowAlt : ''
              }`}
              onClick={() => setSelectedId(row.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setSelectedId(row.id);
                }
              }}
            >
              <span>{row.number}</span>
              <span>{row.title}</span>
              <span>{row.department}</span>
              <span>{row.date}</span>
              <span>{row.qty}</span>
              <span>
                <StatusBadge status={row.status} />
              </span>
              <span className={styles.rowActions}>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEditLpbj(row.id);
                  }}
                  title="Edit"
                >
                  <EditIcon />
                </button>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedId(row.id);
                  }}
                  title="View"
                >
                  <EyeIcon />
                </button>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    // Remove row without confirmation
                    console.log('Delete LPBJ:', row.id);
                  }}
                  title="Delete"
                >
                  <TrashIcon />
                </button>
              </span>
            </div>
          ))}
        </section>
      </div>
    );
  }

  const isApproved = selectedRow.status === 'approved';
  const hasApprovers = selectedApproverItems.length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.detailHeader}>
        <div className={styles.detailLeft}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBackToList}
            aria-label="Back to list"
          >
            <ArrowLeftIcon />
          </button>
          <div className={styles.tabList}>
            <button type="button" className={`${styles.tabButton} ${styles.activeTab}`}>
              LPBJ/no lpbj nya
            </button>
          </div>
        </div>
        {isApproved ? (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => alert('Fitur Buat Quotation akan segera hadir!')}
          >
            <CartIcon className={styles.primaryIcon} />
            Buat Quotation
          </button>
        ) : null}
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailMain}>
          <InfoCard title="Informasi LPBJ">
            <div className={styles.infoGrid}>
              <InfoBlock label="No LPBJ" value={infoData.number} />
              <InfoBlock label="Departemen" value={infoData.department} />
              <InfoBlock label="Pemohon" value={infoData.requester} />
              <InfoBlock label="Terakhir Di Update" value={infoData.updated} />
              <InfoBlock label="Tanggal" value={infoData.date} />
              <InfoBlock label="Keterangan" value={infoData.note} wide />
            </div>
          </InfoCard>

          <ItemTable columns={itemColumns} />
        </div>

        {isApproved ? (
          <aside className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Status Approveal</h3>
            </div>
            <div className={styles.statusList}>
              {approvalStatuses.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.statusItem} ${
                    item.status === 'approved'
                      ? styles.statusApproved
                      : styles.statusPending
                  }`}
                >
                  <div>
                    <div className={styles.approverName}>{item.name}</div>
                    <div className={styles.approverRole}>{item.role}</div>
                  </div>
                  <div className={styles.statusIcon}>
                    {item.status === 'approved' ? <CheckRingIcon /> : <ClockRingIcon />}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        ) : (
          <aside className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Tambah Approver</h3>
              {hasApprovers ? (
                <button
                  type="button"
                  className={styles.panelAction}
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Atur approver"
                >
                  <UserAddIcon />
                </button>
              ) : null}
            </div>
            <div className={styles.panelList}>
              {!hasApprovers ? (
                <div className={styles.panelEmpty}>
                  <span>Blom ada approver,</span>
                  <button
                    type="button"
                    className={styles.panelEmptyAction}
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Pilih approver"
                  >
                    <UserAddIcon />
                  </button>
                </div>
              ) : (
                selectedApproverItems.map((approver) => (
                  <div key={approver.id} className={styles.panelItem}>
                    <div>
                      <div className={styles.approverName}>{approver.name}</div>
                      <div className={styles.approverRole}>{approver.role}</div>
                    </div>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveApprover(approver.id)}
                      aria-label={`Remove ${approver.name}`}
                    >
                      <TrashIcon className={styles.removeIcon} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </aside>
        )}
      </div>

      {isModalOpen ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Atur Apporver</h3>
                <span className={styles.modalSubtitle}>Ref: LPBJ/ no lpbj nya</span>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>
            </div>
            <div className={styles.modalSearch}>
              <SearchIcon className={styles.modalSearchIcon} />
              <input
                type="text"
                placeholder="Search"
                className={styles.modalInput}
              />
              <FilterIcon className={styles.modalFilterIcon} />
            </div>
            <div className={styles.modalList}>
              {approverOptions.map((approver) => {
                const isSelected = selectedApprovers.includes(approver.id);
                return (
                  <button
                    key={approver.id}
                    type="button"
                    className={`${styles.modalItem} ${
                      isSelected ? styles.modalItemSelected : ''
                    }`}
                    onClick={() => handleToggleApprover(approver.id)}
                  >
                    <div>
                      <div className={styles.approverName}>{approver.name}</div>
                      <div className={styles.approverRole}>{approver.role}</div>
                    </div>
                    {isSelected ? (
                      <span className={styles.approverIndicator}>
                        <CheckMiniIcon />
                      </span>
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

const StatusBadge: FC<{ status: LpbjStatus }> = ({ status }) => (
  <span
    className={`${styles.statusBadge} ${
      status === 'approved' ? styles.statusApprovedBadge : styles.statusDraftBadge
    }`}
  >
    {status === 'approved' ? 'Approved' : 'Proses'}
  </span>
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

const InfoBlock: FC<{ label: string; value: string; wide?: boolean }> = ({
  label,
  value,
  wide = false,
}) => (
  <div className={`${styles.infoBlock} ${wide ? styles.infoBlockWide : ''}`}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
);

const ItemTable: FC<{ columns: Column[] }> = ({ columns }) => (
  <section className={styles.card}>
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <BoxIcon className={styles.cardIcon} />
        <h2 className={styles.cardTitle}>Daftar Item</h2>
      </div>
      <div className={styles.tableScroll}>
        <div
          className={styles.tableHeader}
          style={{ gridTemplateColumns: columns.map((col) => col.width).join(' ') }}
        >
          {columns.map((col) => (
            <span key={col.label}>{col.label}</span>
          ))}
        </div>
        <div className={styles.tablePlaceholder}></div>
      </div>
    </div>
  </section>
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

const FilePlusIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="20" viewBox="0 0 16 20" fill="none">
    <path
      d="M2.75 0C2.02065 0 1.32118 0.289731 0.805456 0.805456C0.289731 1.32118 0 2.02065 0 2.75V16.75C0 17.4793 0.289731 18.1788 0.805456 18.6945C1.32118 19.2103 2.02065 19.5 2.75 19.5H12.75C13.4793 19.5 14.1788 19.2103 14.6945 18.6945C15.2103 18.1788 15.5 17.4793 15.5 16.75V5.718C15.5 5.337 15.376 4.967 15.146 4.663L12.148 0.695C11.9849 0.479116 11.7739 0.303999 11.5317 0.183408C11.2895 0.0628167 11.0226 0 10.752 0H2.75Z"
      fill="currentColor"
    />
    <path
      d="M7.75 9.5V6.5H9.25V9.5H12.25V11H9.25V14H7.75V11H4.75V9.5H7.75Z"
      fill="#F4F4F4"
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

const BoxIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="24" height="28" viewBox="0 0 25 29" fill="none">
    <path
      d="M25 8.0643C24.992 8.02582 24.992 7.98615 25 7.94766C24.9939 7.91391 24.9939 7.87936 25 7.84561V7.7144L24.9112 7.49572C24.8747 7.43629 24.8299 7.38229 24.7779 7.33535L24.6447 7.21872H24.5707L18.7379 3.58856L13.2307 0.23541C13.1023 0.137349 12.9568 0.0632347 12.8014 0.0167262H12.683C12.5507 -0.00557542 12.4155 -0.00557542 12.2833 0.0167262H12.1352C11.963 0.053461 11.798 0.117468 11.6467 0.220625L0.58799 6.98546L0.454753 7.08751L0.321516 7.20414L0.173475 7.30619L0.09945539 7.39367L0.0106289 7.61235V7.83103C-0.00354296 7.92773 -0.00354296 8.02592 0.0106289 8.12261V20.85C0.0101254 21.0978 0.073748 21.3416 0.19549 21.5584C0.317232 21.7752 0.493076 21.9579 0.706423 22.0892L11.8095 28.8539L12.0316 28.9413H12.155C12.4005 29.0196 12.6694 29.0196 12.9198 28.9413H13.0383L13.2603 28.8539L24.2746 22.1913C24.4879 22.06 24.6638 21.8773 24.7855 21.6605C24.9073 21.4436 24.9709 21.1998 24.9704 20.9521V8.22466C24.9704 8.22466 25 8.12261 25 8.0643ZM12.4313 3.18035L15.0664 4.78404L6.79092 9.82835L4.14098 8.22466L12.4313 3.18035ZM10.9509 25.0488L2.80861 20.1502V10.8343L10.9509 15.7911V25.0488ZM12.4313 13.2252L9.60371 11.5487L17.8792 6.48977L20.7216 8.22466L12.4313 13.2252ZM22.054 20.1065L13.9117 25.0925V15.7911L22.054 10.8343V20.1065Z"
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

const TrashIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="16" viewBox="0 0 13 15" fill="none">
    <path
      d="M2.4375 15C1.99063 15 1.60821 14.8369 1.29025 14.5108C0.972292 14.1847 0.813042 13.7922 0.8125 13.3333V2.5H0V0.833333H4.0625V0H8.9375V0.833333H13V2.5H12.1875V13.3333C12.1875 13.7917 12.0285 14.1842 11.7106 14.5108C11.3926 14.8375 11.0099 15.0006 10.5625 15H2.4375ZM4.0625 11.6667H5.6875V4.16667H4.0625V11.6667ZM7.3125 11.6667H8.9375V4.16667H7.3125V11.6667Z"
      fill="currentColor"
    />
  </svg>
);

const CheckMiniIcon: FC = () => (
  <svg width="12" height="9" viewBox="0 0 11 8" fill="none">
    <path
      d="M1 4L4 7L10 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckRingIcon: FC = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="10" stroke="#2AF420" strokeWidth="2" />
    <path
      d="M6 11L9.5 14.5L16 8"
      stroke="#2AF420"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockRingIcon: FC = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="10" stroke="#F4CA20" strokeWidth="2" />
    <path
      d="M11 6V11L14 13"
      stroke="#F4CA20"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserAddIcon: FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M13 12C14.3261 12 15.5979 12.5268 16.5355 13.4645C17.4732 14.4021 18 15.6739 18 17V18C18 18.5304 17.7893 19.0391 17.4142 19.4142C17.0391 19.7893 16.5304 20 16 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V17C0 15.6739 0.526784 14.4021 1.46447 13.4645C2.40215 12.5268 3.67392 12 5 12H13ZM17 6C17.2652 6 17.5196 6.10536 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7V8H19C19.2652 8 19.5196 8.10536 19.7071 8.29289C19.8946 8.48043 20 8.73478 20 9C20 9.26522 19.8946 9.51957 19.7071 9.70711C19.5196 9.89464 19.2652 10 19 10H18V11C18 11.2652 17.8946 11.5196 17.7071 11.7071C17.5196 11.8946 17.2652 12 17 12C16.7348 12 16.4804 11.8946 16.2929 11.7071C16.1054 11.5196 16 11.2652 16 11V10H15C14.7348 10 14.4804 9.89464 14.2929 9.70711C14.1054 9.51957 14 9.26522 14 9C14 8.73478 14.1054 8.48043 14.2929 8.29289C14.4804 8.10536 14.7348 8 15 8H16V7C16 6.73478 16.1054 6.48043 16.2929 6.29289C16.4804 6.10536 16.7348 6 17 6ZM9 0C10.3261 0 11.5979 0.526784 12.5355 1.46447C13.4732 2.40215 14 3.67392 14 5C14 6.32608 13.4732 7.59785 12.5355 8.53553C11.5979 9.47322 10.3261 10 9 10C7.67392 10 6.40215 9.47322 5.46447 8.53553C4.52678 7.59785 4 6.32608 4 5C4 3.67392 4.52678 2.40215 5.46447 1.46447C6.40215 0.526784 7.67392 0 9 0Z"
      fill="currentColor"
    />
  </svg>
);

const SearchIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M16.3536 16L11.5622 11.5622C11.0502 11.984 10.4614 12.3064 9.79572 12.5294C9.13 12.7523 8.43256 12.8686 7.70341 12.8686C5.83584 12.8686 4.26984 12.232 3.00541 10.9589C1.741 9.68584 1.10879 8.15385 1.10879 6.36293C1.10879 4.57202 1.741 3.04003 3.00541 1.76693C4.26984 0.493821 5.83584 -0.142647 7.70341 -0.142647C9.57099 -0.142647 11.1369 0.493821 12.4014 1.76693C13.6658 3.04003 14.298 4.57202 14.298 6.36293C14.298 7.13279 14.1668 7.87273 13.9045 8.58277C13.6423 9.29282 13.2562 9.91076 12.7462 10.4366L17.7373 15.0348L16.3536 16ZM7.70341 11.3629C9.11768 11.3629 10.3116 10.8802 11.2852 9.9147C12.2588 8.94919 12.7456 7.74393 12.7456 6.2989C12.7456 4.85386 12.2588 3.64861 11.2852 2.6831C10.3116 1.71759 9.11768 1.23493 7.70341 1.23493C6.28914 1.23493 5.09517 1.71759 4.12158 2.6831C3.14799 3.64861 2.6612 4.85386 2.6612 6.2989C2.6612 7.74393 3.14799 8.94919 4.12158 9.9147C5.09517 10.8802 6.28914 11.3629 7.70341 11.3629Z"
      fill="#9C9C9C"
    />
  </svg>
);

const FilterIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="18" viewBox="0 0 20 22" fill="none">
    <path
      d="M12.4903 22C12.267 21.9999 12.0479 21.9382 11.8569 21.8216L7.77997 19.3606C7.32126 19.0822 6.94156 18.6896 6.67747 18.2206C6.41338 17.7516 6.27381 17.2221 6.27222 16.683V11.1151C6.273 10.7221 6.15157 10.3387 5.92493 10.0187L0.232639 1.9688C0.0997211 1.78297 0.0204035 1.56379 0.00343826 1.33547C-0.013527 1.10714 0.0325198 0.878541 0.136498 0.674883C0.240476 0.471225 0.398343 0.30043 0.592681 0.181341C0.787018 0.0622532 1.01027 -0.000498316 1.23781 1.07824e-05H18.761C18.9887 -0.000944043 19.2123 0.0615337 19.4069 0.180527C19.6015 0.29952 19.7596 0.470386 19.8636 0.674207C19.9677 0.878028 20.0137 1.10685 19.9965 1.33534C19.9793 1.56383 19.8996 1.78308 19.7662 1.9688L14.0739 10.0187C13.8468 10.3386 13.725 10.7219 13.7254 11.1151V20.7547C13.7251 21.0845 13.5949 21.4007 13.3634 21.634C13.132 21.8674 12.818 21.999 12.4903 22ZM1.23781 1.23666L6.92032 9.305C7.29692 9.8322 7.4981 10.4658 7.49505 11.1151V16.6818C7.4955 17.0084 7.57984 17.3294 7.73989 17.6135C7.89994 17.8977 8.13026 18.1354 8.40851 18.3036L12.4854 20.7646L12.5026 11.1138C12.4999 10.4644 12.7015 9.83082 13.0785 9.30377L18.7696 1.25388L1.23781 1.23666Z"
      fill="#9C9C9C"
    />
  </svg>
);

const CloseIcon: FC = () => (
  <svg width="14" height="14" viewBox="0 0 15 14" fill="none">
    <path
      d="M1.5 14L0 12.6L6 7L0 1.4L1.5 0L7.5 5.6L13.5 0L15 1.4L9 7L15 12.6L13.5 14L7.5 8.4L1.5 14Z"
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

const PlusIconSmall: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path
      d="M3.42857 4.57143H0V3.42857H3.42857V0H4.57143V3.42857H8V4.57143H4.57143V8H3.42857V4.57143Z"
      fill="currentColor"
    />
  </svg>
);

const UploadIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path
      d="M10.9375 18.75V6.01562L6.875 10.0781L4.6875 7.8125L12.5 0L20.3125 7.8125L18.125 10.0781L14.0625 6.01562V18.75H10.9375ZM3.125 25C2.26562 25 1.53021 24.6943 0.91875 24.0828C0.307291 23.4714 0.00104167 22.7354 0 21.875V17.1875H3.125V21.875H21.875V17.1875H25V21.875C25 22.7344 24.6943 23.4703 24.0828 24.0828C23.4714 24.6953 22.7354 25.001 21.875 25H3.125Z"
      fill="currentColor"
    />
  </svg>
);

const EditIcon: FC = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M0 15V11.4583L11 0.479167C11.1667 0.326389 11.3508 0.208333 11.5525 0.125C11.7542 0.0416667 11.9658 0 12.1875 0C12.4092 0 12.6244 0.0416667 12.8333 0.125C13.0422 0.208333 13.2228 0.333333 13.375 0.5L14.5208 1.66667C14.6875 1.81944 14.8092 2 14.8858 2.20833C14.9625 2.41667 15.0005 2.625 15 2.83333C15 3.05556 14.9619 3.2675 14.8858 3.46917C14.8097 3.67083 14.688 3.85472 14.5208 4.02083L3.54167 15H0ZM12.1667 4L13.3333 2.83333L12.1667 1.66667L11 2.83333L12.1667 4Z"
      fill="currentColor"
    />
  </svg>
);

const CreateLpbjForm: FC<{ onBack: () => void }> = ({ onBack }) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

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
          <h1 className={styles.listTitle}>Buat LPBJ Baru</h1>
        </div>
      </div>

      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <FileIcon className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Informasi LPBJ</h2>
          </div>

          <div className={styles.infoGrid}>
            <InfoBlock label="No. LPBJ" value="10010101023123" />
            <InfoBlock label="Departemen" value="Direct Sales" />
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Tanggal</span>
              <div style={{ position: 'relative' }}>
                <input
                  className={styles.infoValue}
                  defaultValue="dd/mm/yyyy"
                  style={{
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    padding: '4px 24px 4px 8px',
                    width: '100%',
                  }}
                />
                <CalendarIcon
                  className={styles.cardIcon}
                  style={{
                    position: 'absolute',
                    right: '4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '15px',
                    height: '15px',
                    color: '#9c9c9c',
                  }}
                />
              </div>
            </div>
            <div
              className={styles.infoBlock}
              style={{ gridColumn: '1 / -1' }}
            >
              <span className={styles.infoLabel}>Tema</span>
              <input
                className={styles.infoValue}
                defaultValue="LPBJ - Laptop Lenovo V14"
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  width: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <BoxIcon className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Tambah Item</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Deskripsi</span>
                <input
                  className={styles.infoValue}
                  defaultValue="Laptop Lenovo V14"
                  style={{
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                  }}
                />
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Spesifikasi</span>
                <textarea
                  className={styles.infoValue}
                  defaultValue="Laptop Lenovo V14"
                  rows={3}
                  style={{
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                    resize: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Qty</span>
                <input
                  className={styles.infoValue}
                  style={{
                    border: '1px solid #9c9c9c',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                  }}
                />
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Article</span>
                <input
                  className={styles.infoValue}
                  style={{
                    border: '1px solid #9c9c9c',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                  }}
                />
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Store</span>
                <input
                  className={styles.infoValue}
                  style={{
                    border: '1px solid #9c9c9c',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>G/L</span>
                <input
                  className={styles.infoValue}
                  style={{
                    border: '1px solid #9c9c9c',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                  }}
                />
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Cost Center</span>
                <input
                  className={styles.infoValue}
                  style={{
                    border: '1px solid #9c9c9c',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                  }}
                />
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Order</span>
                <input
                  className={styles.infoValue}
                  style={{
                    border: '1px solid #9c9c9c',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                  }}
                />
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Gambar Item</span>
              <div
                style={{
                  border: '1px dashed #9c9c9c',
                  borderRadius: '8px',
                  background: '#f4f4f4',
                  minHeight: '96px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                <UploadIcon style={{ width: '24px', height: '24px' }} />
                <span>Upload Gambar Item (Opsional)</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => alert('Item berhasil ditambahkan (dummy)')}
              >
                <PlusIconSmall className={styles.primaryIcon} />
                Tambah Item
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <BoxIcon className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>List Item</h2>
          </div>
          <div className={styles.tableScroll}>
            <div
              className={styles.tableHeader}
              style={{
                gridTemplateColumns: itemColumns.map((col) => col.width).join(' '),
              }}
            >
              {itemColumns.map((col) => (
                <span key={col.label}>{col.label}</span>
              ))}
              <span>Aksi</span>
            </div>
            <div
              className={styles.tableRow}
              style={{
                gridTemplateColumns: itemColumns.map((col) => col.width).join(' ') + ' 0.6fr',
              }}
            >
              <span>1</span>
              <span>Lenovo V14</span>
              <span>Laptop Lenovo V14</span>
              <span>1</span>
              <span></span>
              <span>HO</span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setEditingItemId('1')}
                >
                  <EditIcon />
                </button>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => {
                    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
                      alert('Item berhasil dihapus (dummy)');
                    }
                  }}
                >
                  <TrashIcon />
                </button>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => {
            alert('LPBJ berhasil disimpan sebagai draft (dummy)');
            onBack();
          }}
        >
          Simpan Draft
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          style={{ background: '#2af420' }}
          onClick={() => {
            alert('LPBJ berhasil disubmit (dummy)');
            onBack();
          }}
        >
          Submit LPBJ
        </button>
      </div>

      {editingItemId ? (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${styles.modalLarge}`}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Edit Item</h3>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setEditingItemId(null)}
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Deskripsi</span>
                  <input
                    className={styles.infoValue}
                    defaultValue="Laptop Lenovo V14"
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Spesifikasi</span>
                  <textarea
                    className={styles.infoValue}
                    defaultValue="Laptop Lenovo V14"
                    rows={2}
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                      resize: 'none',
                      minHeight: '50px',
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Qty</span>
                  <input
                    className={styles.infoValue}
                    defaultValue="1"
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Article</span>
                  <input
                    className={styles.infoValue}
                    defaultValue=""
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Store</span>
                  <input
                    className={styles.infoValue}
                    defaultValue="HO"
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>G/L</span>
                  <input
                    className={styles.infoValue}
                    defaultValue=""
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Cost Center</span>
                  <input
                    className={styles.infoValue}
                    defaultValue=""
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Order</span>
                  <input
                    className={styles.infoValue}
                    defaultValue=""
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
              </div>
              {/* New pricing fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Unit</span>
                  <input
                    className={styles.infoValue}
                    defaultValue="pcs"
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Unit Price (Rp)</span>
                  <input
                    className={styles.infoValue}
                    defaultValue="10000000"
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>PPN (%)</span>
                  <input
                    className={styles.infoValue}
                    defaultValue="11"
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      width: '100%',
                    }}
                  />
                </div>
              </div>
              <div className={styles.infoBlock} style={{ gridColumn: '1 / -1' }}>
                <span className={styles.infoLabel}>Remarks</span>
                <textarea
                  className={styles.infoValue}
                  defaultValue=""
                  rows={2}
                  style={{
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                    resize: 'none',
                    minHeight: '50px',
                  }}
                />
              </div>
              {/* Summary Section */}
              <div style={{
                borderTop: '1px solid #d9d9d9',
                paddingTop: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#9c9c9c' }}>Subtotal</span>
                  <span style={{ fontSize: '14px', color: '#1a1a1a' }}>Rp 10.000.000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#9c9c9c' }}>PPN (11%)</span>
                  <span style={{ fontSize: '14px', color: '#1a1a1a' }}>Rp 1.100.000</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #e0e0e0',
                  paddingTop: '8px',
                  marginTop: '4px',
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 500, color: '#1a1a1a' }}>Grand Total</span>
                  <span style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>Rp 11.100.000</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => setEditingItemId(null)}
              >
                Simpan
              </button>
              <button
                type="button"
                style={{
                  background: '#f4f4f4',
                  color: '#1a1a1a',
                  border: '1px solid #d9d9d9',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => setEditingItemId(null)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminLpbj;
