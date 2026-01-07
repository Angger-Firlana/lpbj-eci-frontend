import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../components/StatCard/StatCard';
import styles from './AtasanDashboard.module.css';

const AtasanDashboard: FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'LPBJ Menunggu', value: 0, color: '#FF5555' },
    { label: 'Quotation Menunggu', value: 0, color: '#55FF55' },
  ];

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>Selamat Datang, Alva</h1>
        <p className={styles.welcomeSubtitle}>Atasan</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      <div className={styles.sectionsGrid}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>LPBJ Menunggu</h2>
            <button
              className={styles.viewAllButton}
              onClick={() => navigate('/atasan/inbox')}
            >
              Lihat Semua
            </button>
          </div>
          <div className={styles.sectionContent}>
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
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quotation Menunggu</h2>
            <button
              className={styles.viewAllButton}
              onClick={() => navigate('/atasan/inbox?tab=quotation')}
            >
              Lihat Semua
            </button>
          </div>
          <div className={styles.sectionContent}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtasanDashboard;
