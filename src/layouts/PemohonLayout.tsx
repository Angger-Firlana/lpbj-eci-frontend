import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PemohonSidebar from '../components/PemohonSidebar/PemohonSidebar';
import Header from '../components/Header/Header';
import styles from './PemohonLayout.module.css';

export default function PemohonLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/pemohon/account');
  };

  return (
    <div className={styles.page}>
      <PemohonSidebar onLogout={handleLogout} />
      <div className={styles.main}>
        <Header
          profileName="Fieco Alvanu Jansen"
          profileRole="Pemohon"
          onProfileClick={handleProfileClick}
        />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
