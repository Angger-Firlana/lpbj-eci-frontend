import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.page}>
      <Sidebar onLogout={handleLogout} />
      <div className={styles.main}>
        <Header profileName="Fieco Alvanu Jansen" profileRole="Administrator" />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
