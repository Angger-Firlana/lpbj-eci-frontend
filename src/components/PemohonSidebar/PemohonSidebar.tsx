import type { FC } from 'react';
import styles from './PemohonSidebar.module.css';

interface PemohonSidebarProps {
  onLogout?: () => void;
}

const PemohonSidebar: FC<PemohonSidebarProps> = ({ onLogout }) => {
  const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', active: true },
    { label: 'LPBJ', icon: 'lpbj', active: false },
    { label: 'History', icon: 'history', active: false },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img
          src="/logo-removebg-preview.png"
          alt="Electronic City Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.divider} />

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`${styles.menuItem} ${item.active ? styles.active : ''}`}
          >
            <span className={styles.menuIcon}>{getIcon(item.icon)}</span>
            <span className={styles.menuLabel}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.bottomDivider} />

      <div className={styles.logoutContainer}>
        <button
          type="button"
          className={`${styles.menuItem} ${styles.logoutButton}`}
          onClick={onLogout}
        >
          <span className={styles.menuIcon}>{getIcon('logout')}</span>
          <span className={styles.menuLabel}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const getIcon = (type: string) => {
  switch (type) {
    case 'dashboard':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M9.5 5V0H16V5H9.5ZM0 8V0H6.5V8H0ZM9.5 16V8H16V16H9.5ZM0 16V11H6.5V16H0ZM1 7H5.5V1H1V7ZM10.5 15H15V9H10.5V15ZM10.5 4H15V1H10.5V4ZM1 15H5.5V12H1V15Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'lpbj':
      return (
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.75 0C2.02065 0 1.32118 0.289731 0.805456 0.805456C0.289731 1.32118 0 2.02065 0 2.75V16.75C0 17.4793 0.289731 18.1788 0.805456 18.6945C1.32118 19.2103 2.02065 19.5 2.75 19.5H12.75C13.4793 19.5 14.1788 19.2103 14.6945 18.6945C15.2103 18.1788 15.5 17.4793 15.5 16.75V5.718C15.5 5.337 15.376 4.967 15.146 4.663L12.148 0.695C11.9849 0.479116 11.7739 0.303999 11.5317 0.183408C11.2895 0.0628167 11.0226 3.64936e-05 10.752 0H2.75ZM1.5 2.75C1.5 2.06 2.06 1.5 2.75 1.5H10V5.897C10 6.311 10.336 6.647 10.75 6.647H14V16.75C14 17.44 13.44 18 12.75 18H2.75C2.06 18 1.5 17.44 1.5 16.75V2.75Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'history':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 18C6.7 18 4.696 17.2377 2.988 15.713C1.28 14.1883 0.300667 12.284 0.05 10H2.1C2.33333 11.7333 3.10433 13.1667 4.413 14.3C5.72167 15.4333 7.25067 16 9 16C10.95 16 12.6043 15.321 13.963 13.963C15.3217 12.605 16.0007 10.995 16 9C15.9993 7.04933 15.3203 5.39533 13.963 4.038C12.6057 2.68067 10.9513 2.00133 9 2C7.85 2 6.775 2.26667 5.775 2.8C4.775 3.33333 3.93333 4.06667 3.25 5H6V7H0V1H2V3.35C2.85 2.28333 3.88767 1.45833 5.113 0.875C6.33833 0.291667 7.634 0 9 0C10.25 0 11.421 0.237667 12.513 0.713C13.605 1.18833 14.555 1.82967 15.363 2.6637C16.171 3.44433 16.8127 4.39433 17.288 5.487C17.7633 6.57967 18.0007 7.75067 18 9C17.9993 10.2493 17.762 11.4203 17.288 12.513C16.814 13.6057 16.1723 14.5557 15.363 15.363C14.5537 16.1703 13.6037 16.812 12.513 17.288C11.4223 17.764 10.2513 18.0013 9 18ZM11.8 13.2L8 9.4V4H10V8.6L13.2 11.8L11.8 13.2Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'logout':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45007 0.000666667 2 0H9V2H2V16H9V18H2ZM13 14L11.625 12.55L14.175 10H6V8H14.175L11.625 5.45L13 4L18 9L13 14Z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default PemohonSidebar;
