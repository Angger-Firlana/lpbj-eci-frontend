import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import styles from './PemohonDashboard.module.css';

type LpbjStatus = 'final' | 'proses';
type DetailTab = 'lpbj' | 'quotation' | 'po';
type PemohonSection = 'dashboard' | 'lpbj' | 'history' | 'account';

interface LpbjItem {
  id: string;
  code: string;
  title: string;
  status: LpbjStatus;
  date: string;
}

interface Column {
  label: string;
  width: string;
}

const lpbjItems: LpbjItem[] = [
  {
    id: 'LPBJ-001',
    code: 'LPBJ/no lpbj',
    title: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
    status: 'final',
    date: '01/01/2026',
  },
  {
    id: 'LPBJ-002',
    code: 'LPBJ/no lpbj',
    title: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
    status: 'proses',
    date: '01/01/2026',
  },
];

const historyItems: LpbjItem[] = [
  {
    id: 'HIST-001',
    code: 'LPBJ/no lpbj',
    title: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
    status: 'final',
    date: '01/01/2026',
  },
  {
    id: 'HIST-002',
    code: 'LPBJ/no lpbj',
    title: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
    status: 'final',
    date: '01/01/2026',
  },
  {
    id: 'HIST-003',
    code: 'LPBJ/no lpbj',
    title: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
    status: 'final',
    date: '01/01/2026',
  },
  {
    id: 'HIST-004',
    code: 'LPBJ/no lpbj',
    title: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
    status: 'final',
    date: '01/01/2026',
  },
];

const lpbjInfo = {
  number: '10010101023123',
  department: '10010101023123',
  requester: 'Habibi Cholis',
  updated: '10/01/2026',
  date: '01/01/2026',
  note: 'Laptop saya ilang satu biar gak ilang lagi jadi minta 100',
};

const quotationInfo = {
  number: '10010101023123',
  top: 'NET 13',
  deliveryTeam: '-',
  franco: 'Jakarta',
  pkp: 'PKP',
  contact: 'Anggerrahhh - 08123456789',
  note: 'Ada beberapa yang rusak',
};

const poInfo = {
  number: '10010101023123',
  tanggal: '01/01/2026',
  note: '01/01/2026',
  expired: 'Habibi Cholis',
  deliveryDate: '10/01/2026',
  poType: '01/01/2026',
  deliveryTo: 'Tono',
  vendor: '01/01/2026',
  approvedBy: ['Pak David', 'Pak James'],
  refLpbj: 'no lpbj',
  refQuotation: 'no quo',
};

const itemColumns: Column[] = [
  { label: 'No', width: '48px' },
  { label: 'Nama Barang', width: '1.6fr' },
  { label: 'Spesifikasi', width: '1.2fr' },
  { label: 'Qty', width: '0.6fr' },
  { label: 'Article', width: '0.8fr' },
  { label: 'Store', width: '0.8fr' },
  { label: 'G/L', width: '0.8fr' },
  { label: 'Cost Center', width: '1fr' },
  { label: 'Order', width: '0.8fr' },
  { label: 'Gambar', width: '0.9fr' },
];

const poColumns: Column[] = [
  { label: 'No', width: '48px' },
  { label: 'Nama Barang', width: '1.6fr' },
  { label: 'Spesifikasi', width: '1.2fr' },
  { label: 'Qty', width: '0.6fr' },
  { label: 'Unit Price', width: '0.9fr' },
  { label: 'Discount', width: '0.8fr' },
  { label: 'Ammount', width: '0.9fr' },
  { label: 'Gambar', width: '0.9fr' },
];

const PemohonDashboard: FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DetailTab>('lpbj');
  const selectedItem =
    lpbjItems.find((item) => item.id === selectedItemId) ?? null;

  const handleSelectItem = (itemId: string) => {
    setSelectedItemId(itemId);
    setActiveTab('lpbj');
  };

  return !selectedItem ? (
    <DashboardHome items={lpbjItems} onSelect={handleSelectItem} />
  ) : (
    <DetailView
      item={selectedItem}
      tab={activeTab}
      onBack={() => setSelectedItemId(null)}
      onTabChange={setActiveTab}
    />
  );
};

const DashboardHome: FC<{
  items: LpbjItem[];
  onSelect: (itemId: string) => void;
}> = ({ items, onSelect }) => (
  <>
    <div className={styles.intro}>
      <h1 className={styles.introTitle}>Selamat Datang, Habibi</h1>
      <p className={styles.introSubtitle}>Direct Sales</p>
    </div>

    <section className={styles.sectionCard}>
      <div className={styles.sectionTabs}>
        <button type="button" className={styles.sectionTab}>
          LPBJ Saya
        </button>
      </div>
      <div className={styles.sectionBody}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.lpbjItem}
            onClick={() => onSelect(item.id)}
          >
            <div className={styles.lpbjInfo}>
              <span className={styles.lpbjMeta}>{item.code}</span>
              <span className={styles.lpbjTitle}>{item.title}</span>
            </div>
            <div className={styles.lpbjRight}>
              <span
                className={`${styles.statusBadge} ${
                  item.status === 'final'
                    ? styles.statusFinal
                    : styles.statusProcess
                }`}
              >
                {item.status === 'final' ? 'Final' : 'Proses'}
              </span>
              <span className={styles.dateText}>{item.date}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  </>
);

const DetailView: FC<{
  item: LpbjItem;
  tab: DetailTab;
  onBack: () => void;
  onTabChange: (tab: DetailTab) => void;
}> = ({ item, tab, onBack, onTabChange }) => {
  const isApproved = item.status === 'final';
  const tabs: { id: DetailTab; label: string }[] = [
    { id: 'lpbj', label: `${item.code} nya` },
    { id: 'quotation', label: 'Quotation' },
    { id: 'po', label: 'PO' },
  ];

  return (
    <div className={styles.detailWrap}>
      <div className={styles.detailHeader}>
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label="Back to dashboard"
        >
          <ArrowLeftIcon className={styles.backIcon} />
        </button>
        <div className={styles.tabList}>
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              type="button"
              className={`${styles.tabButton} ${
                tab === tabItem.id ? styles.activeTab : ''
              }`}
              onClick={() => onTabChange(tabItem.id)}
            >
              {tabItem.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailMain}>
          {tab === 'lpbj' && (
            <>
              <InfoCard title="Informasi LPBJ">
                <div className={styles.infoGrid}>
                  <InfoBlock label="No LPBJ" value={lpbjInfo.number} />
                  <InfoBlock label="Departemen" value={lpbjInfo.department} />
                  <InfoBlock label="Pemohon" value={lpbjInfo.requester} />
                  <InfoBlock label="Terakhir Di Update" value={lpbjInfo.updated} />
                  <InfoBlock label="Tanggal" value={lpbjInfo.date} />
                  <InfoBlock label="Keterangan" value={lpbjInfo.note} wide />
                </div>
              </InfoCard>
              <ItemTable columns={itemColumns} />
            </>
          )}

          {tab === 'quotation' &&
            (isApproved ? (
              <>
                <InfoCard title="Informasi Quotation">
                  <div className={styles.infoGrid}>
                    <InfoBlock label="No Quotation" value={quotationInfo.number} />
                    <InfoBlock label="TOP" value={quotationInfo.top} />
                    <InfoBlock label="Delivery Team" value={quotationInfo.deliveryTeam} />
                    <InfoBlock label="Franco" value={quotationInfo.franco} />
                    <InfoBlock label="PKP/ NON PKP" value={quotationInfo.pkp} />
                    <InfoBlock label="Contact Person" value={quotationInfo.contact} />
                    <InfoBlock label="Note" value={quotationInfo.note} wide />
                  </div>
                </InfoCard>
                <ItemTable columns={itemColumns} showTotals />
              </>
            ) : (
              <EmptyState message="Menunggu Quotation Di Approve" />
            ))}

          {tab === 'po' &&
            (isApproved ? (
              <>
                <InfoCard title="Informasi Purchase Order">
                  <div className={styles.infoGrid}>
                    <InfoBlock label="No. PO" value={poInfo.number} />
                    <InfoBlock label="Tanggal" value={poInfo.tanggal} />
                    <InfoBlock label="Note" value={poInfo.note} />
                    <InfoBlock label="Expired" value={poInfo.expired} />
                    <InfoBlock label="Delivery Date" value={poInfo.deliveryDate} />
                    <InfoBlock label="PO Type" value={poInfo.poType} />
                    <InfoBlock label="Delivery To" value={poInfo.deliveryTo} />
                    <InfoBlock label="Vendor" value={poInfo.vendor} />
                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>Approved By</span>
                      <ul className={styles.infoValueList}>
                        {poInfo.approvedBy.map((name) => (
                          <li key={name}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.refSection}>
                    <div className={styles.refTitle}>Referensi</div>
                    <div className={styles.refGrid}>
                      <InfoBlock label="LPBJ" value={poInfo.refLpbj} />
                      <InfoBlock label="Quotation" value={poInfo.refQuotation} />
                    </div>
                  </div>
                </InfoCard>
                <ItemTable columns={poColumns} />
              </>
            ) : (
              <EmptyState message="Menunggu PO Di Approve" />
            ))}
        </div>

        <div className={styles.statusPanel}>
          <StatusCard status={item.status} />
          {tab === 'po' && isApproved ? (
            <button type="button" className={styles.downloadButton}>
              <DownloadIcon className={styles.downloadIcon} />
              Download PDF
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const InfoCard: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <section className={`${styles.card} ${styles.infoCard}`}>
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

const ItemTable: FC<{ columns: Column[]; showTotals?: boolean }> = ({
  columns,
  showTotals = false,
}) => (
  <section className={`${styles.card} ${styles.tableCard}`}>
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <FileIcon className={styles.cardIcon} />
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
      {showTotals ? (
        <div className={styles.tableTotals}>
          <span>Subtotal</span>
          <span>PPN (10%)</span>
          <strong>Grand Total</strong>
        </div>
      ) : null}
    </div>
  </section>
);

const StatusCard: FC<{ status: LpbjStatus }> = ({ status }) => (
  <aside className={`${styles.card} ${styles.statusCard}`}>
    <div className={styles.cardBody}>
      <div className={styles.statusHeading}>Status</div>
      <div className={styles.statusIcon}>
        {status === 'final' ? (
          <CheckIcon className={styles.statusSvg} />
        ) : (
          <ClockIcon className={styles.statusSvg} />
        )}
      </div>
      <p className={styles.statusText}>
        {status === 'final'
          ? 'LPBJ anda telah disetujui'
          : 'LPBJ anda sedang di proses'}
      </p>
    </div>
  </aside>
);

const EmptyState: FC<{ message: string }> = ({ message }) => (
  <section className={`${styles.card} ${styles.emptyState}`}>
    <div className={styles.cardBody}>
      <div className={styles.emptyIcon}>
        <EmptyStateIcon className={styles.emptySvg} />
      </div>
      <p className={styles.emptyText}>{message}</p>
    </div>
  </section>
);

const ArrowLeftIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
  >
    <path
      d="M8.5 15L1.5 8L8.5 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 8H18.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const FileIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="24"
    viewBox="0 0 20 24"
    fill="none"
  >
    <path
      d="M5 1H12L18 7V22C18 22.5523 17.5523 23 17 23H5C4.44772 23 4 22.5523 4 22V2C4 1.44772 4.44772 1 5 1Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M12 1V7H18" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M7 11H15"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const ClockIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="88"
    height="88"
    viewBox="0 0 88 88"
    fill="none"
  >
    <circle cx="44" cy="44" r="34" stroke="currentColor" strokeWidth="6" />
    <path
      d="M44 26V45L56 52"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="88"
    height="88"
    viewBox="0 0 88 88"
    fill="none"
  >
    <circle cx="44" cy="44" r="34" stroke="#2af31f" strokeWidth="6" />
    <path
      d="M30 45.5L40.5 56L60 34"
      stroke="#2af31f"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M9 2V11M9 11L5.5 7.5M9 11L12.5 7.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 14.5H15"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const EmptyStateIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
  >
    <rect
      x="18"
      y="8"
      width="28"
      height="40"
      rx="4"
      stroke="currentColor"
      strokeWidth="3"
    />
    <circle cx="32" cy="30" r="8" stroke="currentColor" strokeWidth="3" />
    <path
      d="M27 35L37 25"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default PemohonDashboard;
