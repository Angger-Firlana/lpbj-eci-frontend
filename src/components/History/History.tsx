import type { FC } from 'react';
import styles from './History.module.css';

type LpbjStatus = 'final' | 'proses';

export interface HistoryItem {
  id: string;
  code: string;
  title: string;
  status: LpbjStatus;
  date: string;
}

interface HistoryProps {
  items: HistoryItem[];
}

const History: FC<HistoryProps> = ({ items }) => (
  <section className={styles.card}>
    <div className={styles.tabHeader}>
      <div className={styles.tabLabel}>LPBJ Saya</div>
    </div>
    <div className={styles.body}>
      {items.map((item) => (
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
      ))}
    </div>
  </section>
);

export default History;
