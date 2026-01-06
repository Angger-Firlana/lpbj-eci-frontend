import type { FC } from 'react';
import { useState } from 'react';
import AdminLpbj from '../AdminLpbj/AdminLpbj';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import StatCard from '../StatCard/StatCard';
import styles from './Dashboard.module.css';

type AdminSection =
  | 'dashboard'
  | 'lpbj'
  | 'quotation'
  | 'purchase'
  | 'history'
  | 'user'
  | 'atasan';

const Dashboard: FC = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const stats = [
    { label: 'LPBJ', value: 0, color: '#FF5555' },
    { label: 'LPBJ Siap Di Proses', value: 0, color: '#55FF55' },
    { label: 'Quotation', value: 0, color: '#55DAFF' },
    { label: 'Purchese Order', value: 0, color: '#FFF955' },
  ];

  const content =
    activeSection === 'lpbj' ? <AdminLpbj /> : <AdminHome stats={stats} />;

  return (
    <div className={styles.page}>
      <Sidebar activeItem={activeSection} onNavigate={setActiveSection} />
      <div className={styles.main}>
        <Header profileName="Fieco Alvanu Jansen" profileRole="Administrator" />
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

const AdminHome: FC<{ stats: { label: string; value: number; color: string }[] }> = ({
  stats,
}) => (
  <div className={styles.dashboardContent}>
    <div className={styles.welcome}>
      <h1 className={styles.welcomeTitle}>Selamat Datang, Habibi</h1>
      <p className={styles.welcomeSubtitle}>Administrator</p>
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
        <h2 className={styles.sectionTitle}>LPBJ di proses</h2>
        <div className={styles.sectionContent}>{/* Content will be added here */}</div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>LPBJ siap di proses</h2>
          <button className={styles.viewAllButton}>Lihat Semua</button>
        </div>
        <div className={styles.sectionContent}>{/* Content will be added here */}</div>
      </div>
    </div>
  </div>
);

export default Dashboard;
