import type { FC } from 'react';
import { useState, useEffect } from 'react';
import styles from './History.module.css';

type LpbjStatus = 'final' | 'proses';

export interface HistoryItem {
  id: string;
  code: string;
  title: string;
  status: LpbjStatus;
  date: string;
}

const History: FC = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    // For now, using mock data
    const mockItems: HistoryItem[] = [
      {
        id: '1',
        code: 'LPBJ-001',
        title: 'Pengadaan Komputer Kantor',
        status: 'final',
        date: '2026-01-05'
      },
      {
        id: '2',
        code: 'LPBJ-002',
        title: 'Pengadaan Furniture Ruang Meeting',
        status: 'proses',
        date: '2026-01-06'
      },
      {
        id: '3',
        code: 'LPBJ-003',
        title: 'Pengadaan Printer dan Scanner',
        status: 'final',
        date: '2026-01-04'
      }
    ];
    setItems(mockItems);
  }, []);

  return (
    <section className={styles.card}>
      <div className={styles.tabHeader}>
        <div className={styles.tabLabel}>LPBJ Saya</div>
      </div>
      <div className={styles.body}>
        {items.length === 0 ? (
          <div className={styles.emptyState}>Tidak ada riwayat LPBJ</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <span className={styles.itemMeta}>{item.code}</span>
                <span className={styles.itemTitle}>{item.title}</span>
              </div>
              <div className={styles.itemRight}>
                <span
                  className={`${styles.statusBadge} ${
                    item.status === 'final'
                      ? styles.statusFinal
                      : styles.statusProcess
                  }`}
                >
                  {item.status === 'final' ? 'Final' : 'Proses'}
                </span>
                <span className={styles.itemDate}>{item.date}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default History;
