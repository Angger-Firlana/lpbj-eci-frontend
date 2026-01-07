import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AtasanSidebar from '../components/AtasanSidebar/AtasanSidebar';
import Header from '../components/Header/Header';
import styles from './AtasanLayout.module.css';

export default function AtasanLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/atasan/dashboard');
  };

  return (
    <div className={styles.page}>
      <AtasanSidebar onLogout={handleLogout} inboxCount={1} />
      <div className={styles.main}>
        <Header
          profileName="Fieco Alvanu Jansen"
          profileRole="Administrator"
          onProfileClick={handleProfileClick}
        />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
