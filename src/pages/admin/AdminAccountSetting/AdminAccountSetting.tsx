import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminAccountSetting.module.css';

const AdminAccountSetting: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate('/admin/dashboard')}
        aria-label="Kembali"
      >
        <ArrowLeftIcon className={styles.backIcon} />
      </button>

    <div className={styles.grid}>
      <section className={`${styles.card} ${styles.profileCard}`}>
        <div className={`${styles.cardTab} ${styles.tabRed}`}>Profil</div>
        <div className={styles.cardBody}>
          <div className={styles.avatar}>
            <img src="/profile-placeholder.jpg" alt="Profile" />
          </div>
          <div className={styles.profileName}>Fieco Alvanu Jansen</div>
          <div className={styles.profileRole}>Administrator</div>
          <button type="button" className={styles.secondaryButton}>
            Ubah Foto
          </button>
        </div>
      </section>

      <section className={`${styles.card} ${styles.mainCard}`}>
        <div className={`${styles.cardTab} ${styles.tabRed}`}>
          Account Setting
        </div>
        <div className={styles.cardBody}>
          <div className={styles.formGrid}>
            <Field label="Nama Lengkap">
              <input
                className={styles.input}
                defaultValue="Fieco Alvanu Jansen"
              />
            </Field>
            <Field label="Email">
              <input
                className={styles.input}
                defaultValue="fieco@example.com"
              />
            </Field>
            <Field label="No. HP">
              <input className={styles.input} defaultValue="08123456789" />
            </Field>
            <Field label="Departemen">
              <input className={styles.input} defaultValue="IT Admin" />
            </Field>
            <Field label="Alamat" full>
              <textarea
                className={styles.textarea}
                defaultValue="Jl. Jenderal Sudirman No. 12"
              />
            </Field>
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.primaryButton}>
              Simpan
            </button>
            <button type="button" className={styles.ghostButton} onClick={() => navigate('/admin/dashboard')}>
              Batal
            </button>
          </div>
        </div>
      </section>

      <div className={styles.sideColumn}>
        <section className={`${styles.card} ${styles.sideCard}`}>
          <div className={`${styles.cardTab} ${styles.tabGreen}`}>
            Status Akun
          </div>
          <div className={styles.cardBody}>
            <p className={styles.sideText}>Aktif</p>
            <p className={styles.sideHint}>Terakhir diperbarui 10/01/2026</p>
          </div>
        </section>

        <section className={`${styles.card} ${styles.sideCard}`}>
          <div className={`${styles.cardTab} ${styles.tabBlue}`}>
            Preferensi
          </div>
          <div className={styles.cardBody}>
            <label className={styles.checkboxRow}>
              <input type="checkbox" defaultChecked />
              Email notifikasi
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" />
              Pengingat approval
            </label>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
};

const Field: FC<{ label: string; full?: boolean; children: ReactNode }> = ({
  label,
  full = false,
  children,
}) => (
  <div className={`${styles.field} ${full ? styles.fieldFull : ''}`}>
    <span className={styles.label}>{label}</span>
    {children}
  </div>
);

const ArrowLeftIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
  >
    <path
      d="M8.5 15L1.5 8L8.5 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 8H18.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default AdminAccountSetting;
