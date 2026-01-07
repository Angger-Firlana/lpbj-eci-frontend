import { useState, type FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AtasanInbox.module.css';

interface LpbjItem {
  id: string;
  noLpbj: string;
  tema: string;
  departemen: string;
  item: string;
  tanggal: string;
}

interface QuotationItem {
  id: string;
  noQuotation: string;
  tema: string;
  pkpNonPkp: string;
  top: string;
  grandTotal: string;
}

const AtasanInbox: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'quotation' ? 'quotation' : 'lpbj';
  const [activeTab, setActiveTab] = useState<'lpbj' | 'quotation'>(initialTab);

  const lpbjData: LpbjItem[] = [
    {
      id: '1',
      noLpbj: '10001298',
      tema: 'Peminjaman Leptop Lenovo V14',
      departemen: 'IT OPERATION',
      item: '1 Item',
      tanggal: '01-01-2026',
    },
  ];

  const quotationData: QuotationItem[] = [];

  const handleViewLpbj = (id: string) => {
    navigate(`/atasan/inbox/lpbj/${id}`);
  };

  const handleApproveLpbj = (id: string) => {
    navigate(`/atasan/inbox/lpbj/${id}?action=approve`);
  };

  const handleViewQuotation = (id: string) => {
    navigate(`/atasan/inbox/quotation/${id}`);
  };

  const handleApproveQuotation = (id: string) => {
    navigate(`/atasan/inbox/quotation/${id}?action=approve`);
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
        <h2 className={styles.title}>LPBJ menunggu approval anda</h2>

        {activeTab === 'lpbj' && (
          <div className={styles.tableContainer}>
            {lpbjData.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>No. LPBJ</th>
                    <th>Tema</th>
                    <th>Departemen</th>
                    <th>Item</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {lpbjData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.noLpbj}</td>
                      <td>{item.tema}</td>
                      <td>{item.departemen}</td>
                      <td>{item.item}</td>
                      <td>{item.tanggal}</td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={styles.actionBtn}
                            onClick={() => handleViewLpbj(item.id)}
                            title="View"
                          >
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                              <path d="M10 0C5.45455 0 1.57273 2.79333 0 7C1.57273 11.2067 5.45455 14 10 14C14.5455 14 18.4273 11.2067 20 7C18.4273 2.79333 14.5455 0 10 0ZM10 11.6667C7.42727 11.6667 5.33333 9.57333 5.33333 7C5.33333 4.42667 7.42727 2.33333 10 2.33333C12.5727 2.33333 14.6667 4.42667 14.6667 7C14.6667 9.57333 12.5727 11.6667 10 11.6667ZM10 4.2C8.46 4.2 7.2 5.46 7.2 7C7.2 8.54 8.46 9.8 10 9.8C11.54 9.8 12.8 8.54 12.8 7C12.8 5.46 11.54 4.2 10 4.2Z" fill="#666666"/>
                            </svg>
                          </button>
                          <button
                            className={styles.actionBtnApprove}
                            onClick={() => handleApproveLpbj(item.id)}
                            title="Approve"
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9" stroke="#22C55E" strokeWidth="2"/>
                              <path d="M6 10L9 13L14 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="8" width="48" height="48" rx="4" stroke="black" strokeWidth="3"/>
                    <circle cx="32" cy="32" r="16" stroke="black" strokeWidth="3"/>
                    <line x1="20" y1="20" x2="44" y2="44" stroke="black" strokeWidth="3"/>
                  </svg>
                </div>
                <p className={styles.emptyText}>Tidak ada LPBJ yang bisa di approve</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quotation' && (
          <div className={styles.tableContainer}>
            {quotationData.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>No. Quotation</th>
                    <th>Tema</th>
                    <th>PKP/ NON PKP</th>
                    <th>TOP</th>
                    <th>Grand Total</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {quotationData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.noQuotation}</td>
                      <td>{item.tema}</td>
                      <td>{item.pkpNonPkp}</td>
                      <td>{item.top}</td>
                      <td>{item.grandTotal}</td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={styles.actionBtn}
                            onClick={() => handleViewQuotation(item.id)}
                            title="View"
                          >
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                              <path d="M10 0C5.45455 0 1.57273 2.79333 0 7C1.57273 11.2067 5.45455 14 10 14C14.5455 14 18.4273 11.2067 20 7C18.4273 2.79333 14.5455 0 10 0ZM10 11.6667C7.42727 11.6667 5.33333 9.57333 5.33333 7C5.33333 4.42667 7.42727 2.33333 10 2.33333C12.5727 2.33333 14.6667 4.42667 14.6667 7C14.6667 9.57333 12.5727 11.6667 10 11.6667ZM10 4.2C8.46 4.2 7.2 5.46 7.2 7C7.2 8.54 8.46 9.8 10 9.8C11.54 9.8 12.8 8.54 12.8 7C12.8 5.46 11.54 4.2 10 4.2Z" fill="#666666"/>
                            </svg>
                          </button>
                          <button
                            className={styles.actionBtnApprove}
                            onClick={() => handleApproveQuotation(item.id)}
                            title="Approve"
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9" stroke="#22C55E" strokeWidth="2"/>
                              <path d="M6 10L9 13L14 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="8" width="48" height="48" rx="4" stroke="black" strokeWidth="3"/>
                    <circle cx="32" cy="32" r="16" stroke="black" strokeWidth="3"/>
                    <line x1="20" y1="20" x2="44" y2="44" stroke="black" strokeWidth="3"/>
                  </svg>
                </div>
                <p className={styles.emptyText}>Tidak ada Quotation yang bisa di approve</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AtasanInbox;
