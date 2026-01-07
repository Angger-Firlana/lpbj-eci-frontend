import { useState, type FC, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AdminHistory.module.css';

type TabType = 'lpbj' | 'quotation' | 'po';
type DetailTab = 'lpbj' | 'quotation' | 'po';

interface HistoryItem {
  id: string;
  noDoc: string;
  tema: string;
  status: string;
  tanggal: string;
}

const AdminHistory: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewType = searchParams.get('type') as TabType | null;
  const viewId = searchParams.get('id');

  const initialTab = (searchParams.get('tab') as TabType) || 'lpbj';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const lpbjHistory: HistoryItem[] = [
    { id: '1', noDoc: 'LPBJ/no lpbj', tema: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji', status: 'Final', tanggal: '01/01/2026' },
    { id: '2', noDoc: 'LPBJ/no lpbj', tema: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji', status: 'Final', tanggal: '01/01/2026' },
    { id: '3', noDoc: 'LPBJ/no lpbj', tema: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji', status: 'Final', tanggal: '01/01/2026' },
    { id: '4', noDoc: 'LPBJ/no lpbj', tema: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji', status: 'Final', tanggal: '01/01/2026' },
  ];

  const quotationHistory: HistoryItem[] = [
    { id: '1', noDoc: 'QUO/ no quonya', tema: 'QUO - Peminjaman Laptop Lenovo V14 100 biji', status: 'Final', tanggal: '01/01/2026' },
  ];

  const poHistory: HistoryItem[] = [
    { id: '1', noDoc: 'PO/ no po nya', tema: 'PO - Peminjaman Laptop Lenovo V14 100 biji', status: 'Final', tanggal: '01/01/2026' },
  ];

  const handleView = (type: TabType, id: string) => {
    navigate(`/admin/history?type=${type}&id=${id}`);
  };

  const handleBack = () => {
    navigate('/admin/history');
  };

  if (viewType && viewId) {
    return (
      <HistoryDetailView
        type={viewType}
        id={viewId}
        onBack={handleBack}
      />
    );
  }

  const getHistoryData = () => {
    switch (activeTab) {
      case 'lpbj':
        return lpbjHistory;
      case 'quotation':
        return quotationHistory;
      case 'po':
        return poHistory;
      default:
        return [];
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'lpbj' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('lpbj')}
        >
          LPBJ
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'quotation' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('quotation')}
        >
          Quotation
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'po' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('po')}
        >
          PO
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.historyList}>
          {getHistoryData().map((item) => (
            <div
              key={item.id}
              className={styles.historyCard}
              onClick={() => handleView(activeTab, item.id)}
            >
              <div className={styles.cardInfo}>
                <span className={styles.cardSubtitle}>{item.noDoc}</span>
                <span className={styles.cardTitle}>{item.tema}</span>
              </div>
              <div className={styles.cardRight}>
                <span className={styles.statusBadge}>{item.status}</span>
                <span className={styles.cardDate}>{item.tanggal}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HistoryDetailViewProps {
  type: TabType;
  id: string;
  onBack: () => void;
}

const HistoryDetailView: FC<HistoryDetailViewProps> = ({ type, id: _id, onBack }) => {
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>(type);

  const lpbjData = {
    noLPBJ: '10010101023123',
    departemen: '10010101023123',
    pemohon: 'Habibi Cholis',
    terakhirDiUpdate: '10/01/2026',
    tanggal: '01/01/2026',
    keterangan: 'Laptop saya ilang satu biar gak ilang lagi jadi minta 100',
  };

  const quotationData = {
    noQuotation: '10010101023123',
    top: 'NET 13',
    deliveryTeam: '-',
    franco: 'Jakarta',
    pkpNonPkp: 'PKP',
    contactPerson: 'Anggerrahhh - 08123456789',
    note: 'Ada beberapa yang rusak',
  };

  const poData = {
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

  return (
    <div className={styles.detailContainer}>
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
          <div className={styles.detailTabs}>
            <button
              className={`${styles.detailTab} ${activeDetailTab === 'lpbj' ? styles.detailTabActive : ''}`}
              onClick={() => setActiveDetailTab('lpbj')}
            >
              LPBJ/no lpbj nya
            </button>
            <button
              className={`${styles.detailTab} ${activeDetailTab === 'quotation' ? styles.detailTabActive : ''}`}
              onClick={() => setActiveDetailTab('quotation')}
            >
              Quotation
            </button>
            <button
              className={`${styles.detailTab} ${activeDetailTab === 'po' ? styles.detailTabActive : ''}`}
              onClick={() => setActiveDetailTab('po')}
            >
              PO
            </button>
          </div>
        </div>
        <button type="button" className={styles.downloadButton}>
          <DownloadIcon className={styles.downloadIcon} />
          Download PDF
        </button>
      </div>

      {activeDetailTab === 'lpbj' && (
        <div className={styles.detailContent}>
          <div className={styles.detailMain}>
            <InfoCard title="Informasi LPBJ">
              <div className={styles.infoGrid}>
                <InfoBlock label="No LPBJ" value={lpbjData.noLPBJ} />
                <InfoBlock label="Departemen" value={lpbjData.departemen} />
                <InfoBlock label="Pemohon" value={lpbjData.pemohon} />
                <InfoBlock label="Terakhir Di Update" value={lpbjData.terakhirDiUpdate} />
                <InfoBlock label="Tanggal" value={lpbjData.tanggal} />
                <InfoBlock label="Keterangan" value={lpbjData.keterangan} wide />
              </div>
            </InfoCard>

            <section className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <FileIcon className={styles.cardIcon} />
                  <h2 className={styles.cardTitle}>Daftar Item</h2>
                </div>
                <div className={styles.tableScroll}>
                  <div className={styles.tableHeader}>
                    <span>No</span>
                    <span>Nama Barang</span>
                    <span>Spesifikasi</span>
                    <span>Qty</span>
                    <span>Article</span>
                    <span>Store</span>
                    <span>G/L</span>
                    <span>Cost Center</span>
                    <span>Order</span>
                    <span>Gambar</span>
                  </div>
                  <div className={styles.tablePlaceholder}></div>
                </div>
              </div>
            </section>
          </div>

          <aside className={styles.statusPanel}>
            <h3 className={styles.statusTitle}>Status</h3>
            <CheckCircleIcon className={styles.statusIcon} />
            <span className={styles.statusText}>LPBJ anda telah disetujui</span>
            <button type="button" className={styles.downloadButton}>
              <DownloadIcon className={styles.downloadIcon} />
              Download PDF
            </button>
          </aside>
        </div>
      )}

      {activeDetailTab === 'quotation' && (
        <div className={styles.detailContent}>
          <div className={styles.detailMain}>
            <InfoCard title="Informasi Quotation">
              <div className={styles.quotationInfoGrid}>
                <InfoBlock label="No Quotation" value={quotationData.noQuotation} />
                <InfoBlock label="TOP" value={quotationData.top} />
                <InfoBlock label="Delivery Team" value={quotationData.deliveryTeam} />
                <InfoBlock label="Franco" value={quotationData.franco} />
                <InfoBlock label="PKP/ NON PKP" value={quotationData.pkpNonPkp} />
                <InfoBlock label="Contact Person" value={quotationData.contactPerson} />
                <InfoBlock label="Note" value={quotationData.note} wide />
              </div>
            </InfoCard>

            <section className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <FileIcon className={styles.cardIcon} />
                  <h2 className={styles.cardTitle}>Daftar Item</h2>
                </div>
                <div className={styles.tableScroll}>
                  <div className={styles.tableHeader}>
                    <span>No</span>
                    <span>Nama Barang</span>
                    <span>Spesifikasi</span>
                    <span>Qty</span>
                    <span>Article</span>
                    <span>Store</span>
                    <span>G/L</span>
                    <span>Cost Center</span>
                    <span>Order</span>
                    <span>Gambar</span>
                  </div>
                  <div className={styles.tablePlaceholder}></div>
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
                  <div className={styles.summaryRowTotal}>
                    <span className={styles.summaryLabelTotal}>Grand Total</span>
                    <span className={styles.summaryValueTotal}></span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className={styles.statusPanel}>
            <h3 className={styles.statusTitle}>Status</h3>
            <CheckCircleIcon className={styles.statusIcon} />
            <span className={styles.statusText}>LPBJ anda telah disetujui</span>
            <button type="button" className={styles.downloadButton}>
              <DownloadIcon className={styles.downloadIcon} />
              Download PDF
            </button>
          </aside>
        </div>
      )}

      {activeDetailTab === 'po' && (
        <div className={styles.detailContainer}>
          <InfoCard title="Informasi Purchase Order">
            <div className={styles.poInfoGrid}>
              <InfoBlock label="No. PO" value={poData.noPO} />
              <InfoBlock label="Tanggal" value={poData.tanggal} />
              <InfoBlock label="Delivery To" value={poData.deliveryTo} />
              <InfoBlock label="Vendor" value={poData.vendor} />
              <InfoBlock label="Expired" value={poData.expired} />
              <InfoBlock label="Delivery Date" value={poData.deliveryDate} />
              <InfoBlock label="PO Type" value={poData.poType} />
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Approved By</span>
                <ul className={styles.approverList}>
                  {poData.approvedBy.map((name, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.infoBlock} ${styles.infoBlockWide}`}>
                <span className={styles.infoLabel}>Note</span>
                <span className={styles.infoValue}>{poData.note}</span>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Refrensi">
            <div className={styles.referenceGrid}>
              <InfoBlock label="LPBJ" value={poData.lpbj} />
              <InfoBlock label="Quotation" value={poData.quotation} />
            </div>
          </InfoCard>

          <section className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.cardHeader}>
                <FileIcon className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Daftar Item</h2>
              </div>
              <div className={styles.tableScroll}>
                <div className={styles.poTableHeader}>
                  <span>No</span>
                  <span>Nama Barang</span>
                  <span>Spesifikasi</span>
                  <span>Qty</span>
                  <span>Unit Price</span>
                  <span>Discount</span>
                  <span>Amount</span>
                </div>
                <div className={styles.tablePlaceholder}></div>
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
      )}
    </div>
  );
};

const InfoCard: FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
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

const InfoBlock: FC<{ label: string; value: string; wide?: boolean }> = ({ label, value, wide = false }) => (
  <div className={`${styles.infoBlock} ${wide ? styles.infoBlockWide : ''}`}>
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

const DownloadIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z"
      fill="currentColor"
    />
  </svg>
);

const CheckCircleIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="36" stroke="#22C55E" strokeWidth="4" />
    <path
      d="M25 40L35 50L55 30"
      stroke="#22C55E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AdminHistory;
