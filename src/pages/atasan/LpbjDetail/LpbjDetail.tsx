import { useState, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TokenModal from '../../../components/TokenModal/TokenModal';
import styles from './LpbjDetail.module.css';

interface ItemData {
  no: number;
  namaBarang: string;
  spesifikasi: string;
  qty: number;
  article: string;
  store: string;
  gl: string;
  cosCenter: string;
}

const LpbjDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'reject'>('approve');

  const lpbjData = {
    noLpbj: '10010101023123',
    departemen: '10010101023123',
    tanggal: 'Habibi Cholis',
    tema: '10/01/2026',
  };

  const items: ItemData[] = [];

  const handleBack = () => {
    navigate('/atasan/inbox');
  };

  const handleApprove = () => {
    setModalAction('approve');
    setShowTokenModal(true);
  };

  const handleReject = () => {
    setModalAction('reject');
    setShowTokenModal(true);
  };

  const handleConfirmAction = (token: string) => {
    console.log(`${modalAction} with token:`, token);
    setShowTokenModal(false);
    navigate('/atasan/inbox');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className={styles.headerTitle}>LPBJ/0010101</span>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.75 0C2.02065 0 1.32118 0.289731 0.805456 0.805456C0.289731 1.32118 0 2.02065 0 2.75V16.75C0 17.4793 0.289731 18.1788 0.805456 18.6945C1.32118 19.2103 2.02065 19.5 2.75 19.5H12.75C13.4793 19.5 14.1788 19.2103 14.6945 18.6945C15.2103 18.1788 15.5 17.4793 15.5 16.75V5.718C15.5 5.337 15.376 4.967 15.146 4.663L12.148 0.695C11.9849 0.479116 11.7739 0.303999 11.5317 0.183408C11.2895 0.0628167 11.0226 3.64936e-05 10.752 0H2.75Z" fill="black"/>
          </svg>
          <h2 className={styles.cardTitle}>Informasi LPBJ</h2>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>No. LPBJ</span>
              <span className={styles.infoValue}>{lpbjData.noLpbj}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Departemen</span>
              <span className={styles.infoValue}>{lpbjData.departemen}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Tanggal</span>
              <span className={styles.infoValue}>{lpbjData.tanggal}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Tema</span>
              <span className={styles.infoValue}>{lpbjData.tema}</span>
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
                <th>Cos Center</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={8} className={styles.emptyRow}>
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
                    <td>{item.cosCenter}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.approveButton} onClick={handleApprove}>
          Approve
        </button>
        <button className={styles.rejectButton} onClick={handleReject}>
          Reject
        </button>
      </div>

      {showTokenModal && (
        <TokenModal
          lpbjNo="LPBJ/ 0001213131"
          tema="Peminjaman laptop lenovi"
          action={modalAction}
          onClose={() => setShowTokenModal(false)}
          onConfirm={handleConfirmAction}
        />
      )}
    </div>
  );
};

export default LpbjDetail;
