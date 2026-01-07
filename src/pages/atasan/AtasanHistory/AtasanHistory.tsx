import { useState, type FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AtasanHistory.module.css';

interface HistoryItem {
  id: string;
  noLpbj: string;
  tema: string;
  status: string;
  tanggal: string;
}

interface QuotationHistoryItem {
  id: string;
  noQuotation: string;
  tema: string;
  status: string;
  tanggal: string;
}

const AtasanHistory: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'quotation' ? 'quotation' : 'lpbj';
  const [activeTab, setActiveTab] = useState<'lpbj' | 'quotation'>(initialTab);

  const lpbjHistory: HistoryItem[] = [
    {
      id: '1',
      noLpbj: 'LPBJ/no lpbj',
      tema: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
      status: 'Final',
      tanggal: '01/01/2026',
    },
    {
      id: '2',
      noLpbj: 'LPBJ/no lpbj',
      tema: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
      status: 'Final',
      tanggal: '01/01/2026',
    },
    {
      id: '3',
      noLpbj: 'LPBJ/no lpbj',
      tema: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
      status: 'Final',
      tanggal: '01/01/2026',
    },
    {
      id: '4',
      noLpbj: 'LPBJ/no lpbj',
      tema: 'LPBJ - Peminjaman Laptop Lenovo V14 100 biji',
      status: 'Final',
      tanggal: '01/01/2026',
    },
  ];

  const quotationHistory: QuotationHistoryItem[] = [
    {
      id: '1',
      noQuotation: 'QUO/ no quonya',
      tema: 'QUO - Peminjaman Laptop Lenovo V14 100 biji',
      status: 'Final',
      tanggal: '01/01/2026',
    },
  ];

  const handleViewLpbj = (id: string) => {
    navigate(`/atasan/history/lpbj/${id}`);
  };

  const handleViewQuotation = (id: string) => {
    navigate(`/atasan/history/quotation/${id}`);
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
      </div>

      <div className={styles.content}>
        {activeTab === 'lpbj' && (
          <div className={styles.historyList}>
            {lpbjHistory.map((item) => (
              <div
                key={item.id}
                className={styles.historyCard}
                onClick={() => handleViewLpbj(item.id)}
              >
                <div className={styles.cardInfo}>
                  <span className={styles.cardSubtitle}>{item.noLpbj}</span>
                  <span className={styles.cardTitle}>{item.tema}</span>
                </div>
                <div className={styles.cardRight}>
                  <span className={styles.statusBadge}>{item.status}</span>
                  <span className={styles.cardDate}>{item.tanggal}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quotation' && (
          <div className={styles.historyList}>
            {quotationHistory.map((item) => (
              <div
                key={item.id}
                className={styles.historyCard}
                onClick={() => handleViewQuotation(item.id)}
              >
                <div className={styles.cardInfo}>
                  <span className={styles.cardSubtitle}>{item.noQuotation}</span>
                  <span className={styles.cardTitle}>{item.tema}</span>
                </div>
                <div className={styles.cardRight}>
                  <span className={styles.statusBadge}>{item.status}</span>
                  <span className={styles.cardDate}>{item.tanggal}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AtasanHistory;
