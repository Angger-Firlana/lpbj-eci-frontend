import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './HistoryQuotationDetail.module.css';

interface ItemData {
  no: number;
  namaBarang: string;
  spesifikasi: string;
  qty: number;
  article: string;
  store: string;
  gl: string;
  costCenter: string;
  order: string;
  gambar: string;
}

const HistoryQuotationDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const quotationData = {
    noQuotation: '10010101023123',
    top: 'NET 13',
    deliveryTeam: '-',
    franco: 'Jakarta',
    pkpNonPkp: 'PKP',
    contactPerson: 'Anggerrahhh - 08123456789',
    note: 'Ada beberapa yang rusak',
  };

  const items: ItemData[] = [];

  const handleBack = () => {
    navigate('/atasan/history?tab=quotation');
  };

  const handleDownloadPDF = () => {
    console.log('Download PDF');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.headerTabs}>
          <span className={styles.headerTabActive}>LPBJ/no lpbj nya</span>
          <span className={styles.headerTab}>Quotation</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.75 0C2.02065 0 1.32118 0.289731 0.805456 0.805456C0.289731 1.32118 0 2.02065 0 2.75V16.75C0 17.4793 0.289731 18.1788 0.805456 18.6945C1.32118 19.2103 2.02065 19.5 2.75 19.5H12.75C13.4793 19.5 14.1788 19.2103 14.6945 18.6945C15.2103 18.1788 15.5 17.4793 15.5 16.75V5.718C15.5 5.337 15.376 4.967 15.146 4.663L12.148 0.695C11.9849 0.479116 11.7739 0.303999 11.5317 0.183408C11.2895 0.0628167 11.0226 3.64936e-05 10.752 0H2.75Z" fill="black"/>
              </svg>
              <h2 className={styles.cardTitle}>Informasi Quotation</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>No Quotation</span>
                  <span className={styles.infoValue}>{quotationData.noQuotation}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>TOP</span>
                  <span className={styles.infoValue}>{quotationData.top}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Delivery Team</span>
                  <span className={styles.infoValue}>{quotationData.deliveryTeam}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Franco</span>
                  <span className={styles.infoValue}>{quotationData.franco}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>PKP/ NON PKP</span>
                  <span className={styles.infoValue}>{quotationData.pkpNonPkp}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Contact Person</span>
                  <span className={styles.infoValue}>{quotationData.contactPerson}</span>
                </div>
                <div className={styles.infoItemFull}>
                  <span className={styles.infoLabel}>Note</span>
                  <span className={styles.infoValue}>{quotationData.note}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.75 0C2.02065 0 1.32118 0.289731 0.805456 0.805456C0.289731 1.32118 0 2.02065 0 2.75V16.75C0 17.4793 0.289731 18.1788 0.805456 18.6945C1.32118 19.2103 2.02065 19.5 2.75 19.5H12.75C13.4793 19.5 14.1788 19.2103 14.6945 18.6945C15.2103 18.1788 15.5 17.4793 15.5 16.75V5.718C15.5 5.337 15.376 4.967 15.146 4.663L12.148 0.695C11.9849 0.479116 11.7739 0.303999 11.5317 0.183408C11.2895 0.0628167 11.0226 3.64936e-05 10.752 0H2.75Z" fill="black"/>
              </svg>
              <h2 className={styles.cardTitle}>Daftar Item</h2>
            </div>
            <div className={styles.cardContent}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Spesifikasi</th>
                    <th>Qty</th>
                    <th>Article</th>
                    <th>Store</th>
                    <th>G/L</th>
                    <th>Cost Center</th>
                    <th>Order</th>
                    <th>Gambar</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={10} className={styles.emptyRow}>
                        Tidak ada item
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item.no}>
                        <td>{item.no}</td>
                        <td>{item.namaBarang}</td>
                        <td>{item.spesifikasi}</td>
                        <td>{item.qty}</td>
                        <td>{item.article}</td>
                        <td>{item.store}</td>
                        <td>{item.gl}</td>
                        <td>{item.costCenter}</td>
                        <td>{item.order}</td>
                        <td>{item.gambar}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Subtotal</span>
                  <span className={styles.totalValue}>-</span>
                </div>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>PPN (10%)</span>
                  <span className={styles.totalValue}>-</span>
                </div>
                <div className={styles.totalRowGrand}>
                  <span className={styles.totalLabel}>Grand Total</span>
                  <span className={styles.totalValue}>-</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.statusCard}>
            <h3 className={styles.statusTitle}>Status</h3>
            <div className={styles.statusIcon}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="36" stroke="#22C55E" strokeWidth="4"/>
                <path d="M24 40L36 52L56 28" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className={styles.statusText}>LPBJ anda telah disetujui</p>
          </div>

          <button className={styles.downloadButton} onClick={handleDownloadPDF}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 13L10 3M10 13L6 9M10 13L14 9M3 17H17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryQuotationDetail;
