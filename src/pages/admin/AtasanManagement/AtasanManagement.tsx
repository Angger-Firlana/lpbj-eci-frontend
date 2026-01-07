import { useState, type FC } from 'react';
import styles from './AtasanManagement.module.css';

interface AtasanUser {
  id: string;
  nama: string;
  email: string;
  departemen: string;
  token: string;
  password?: string;
}

const AtasanManagement: FC = () => {
  const [selectedAtasan, setSelectedAtasan] = useState<AtasanUser | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const [atasanUsers, setAtasanUsers] = useState<AtasanUser[]>([
    { id: '1', nama: 'Pak David', email: 'David123@gmail.com', departemen: 'IT OPERATION', token: '123456', password: 'david123' },
    { id: '2', nama: 'Pak David', email: 'David123@gmail.com', departemen: 'IT OPERATION', token: '123456', password: 'david123' },
  ]);

  const handleSelectAtasan = (user: AtasanUser) => {
    setSelectedAtasan(user);
    setShowPassword(false);
    setShowToken(false);
  };

  const handleDeleteAtasan = () => {
    if (selectedAtasan) {
      setAtasanUsers((prev) => prev.filter((u) => u.id !== selectedAtasan.id));
      setSelectedAtasan(null);
    }
  };

  const handleSave = () => {
    alert('Data berhasil disimpan (dummy)');
  };

  const handleAddAtasan = () => {
    const newUser: AtasanUser = {
      id: `new-${Date.now()}`,
      nama: '',
      email: '',
      departemen: '',
      token: '',
      password: '',
    };
    setAtasanUsers((prev) => [...prev, newUser]);
    setSelectedAtasan(newUser);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Atasan Management</h1>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.headerRow}>
            <div className={styles.userCount}>
              <UsersIcon className={styles.userIcon} />
              {`${atasanUsers.length} Atasan`}
            </div>
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddAtasan}
            >
              Tambah Atasan
            </button>
          </div>

          <section className={styles.card}>
            <div className={`${styles.tableHeader} ${styles.tableHeaderAtasan}`}>
              <span>Nama</span>
              <span>Email</span>
              <span>Departemen</span>
              <span>Token</span>
              <span>Aksi</span>
            </div>
            {atasanUsers.map((user) => (
              <div
                key={user.id}
                className={`${styles.tableRow} ${styles.tableRowAtasan} ${
                  selectedAtasan?.id === user.id ? styles.tableRowSelected : ''
                }`}
                onClick={() => handleSelectAtasan(user)}
              >
                <span>{user.nama}</span>
                <span>{user.email}</span>
                <span>{user.departemen}</span>
                <span>{user.token}</span>
                <span>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAtasan(user);
                    }}
                    title="View"
                  >
                    <EyeIcon />
                  </button>
                </span>
              </div>
            ))}
          </section>
        </div>

        <aside className={styles.sidePanel}>
          {selectedAtasan ? (
            <>
              <div className={styles.avatarSection}>
                <div className={styles.avatarPlaceholder}>
                  <UserIcon />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nama</label>
                <input
                  type="text"
                  className={styles.input}
                  value={selectedAtasan.nama}
                  onChange={(e) =>
                    setSelectedAtasan({ ...selectedAtasan, nama: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input
                  type="email"
                  className={styles.input}
                  value={selectedAtasan.email}
                  onChange={(e) =>
                    setSelectedAtasan({ ...selectedAtasan, email: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Passowrd</label>
                <div className={styles.inputWithIcon}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={styles.input}
                    style={{ width: '100%', paddingRight: '36px' }}
                    value={selectedAtasan.password || ''}
                    onChange={(e) =>
                      setSelectedAtasan({ ...selectedAtasan, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className={styles.inputIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Departemen</label>
                <input
                  type="text"
                  className={styles.input}
                  value={selectedAtasan.departemen}
                  onChange={(e) =>
                    setSelectedAtasan({ ...selectedAtasan, departemen: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Token</label>
                <div className={styles.inputWithIcon}>
                  <input
                    type={showToken ? 'text' : 'password'}
                    className={styles.input}
                    style={{ width: '100%', paddingRight: '36px' }}
                    value={selectedAtasan.token}
                    onChange={(e) =>
                      setSelectedAtasan({ ...selectedAtasan, token: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className={styles.inputIcon}
                    onClick={() => setShowToken(!showToken)}
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <button type="button" className={styles.deleteButton} onClick={handleDeleteAtasan}>
                  Hapus
                </button>
                <button type="button" className={styles.saveButton} onClick={handleSave}>
                  Simpan
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyPanel}>
              <UserIcon />
              <p>Pilih user untuk melihat detail</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

const EyeIcon: FC = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <path
      d="M9 0C13.1333 0 16.6917 2.59167 18 6C16.6917 9.40833 13.1333 12 9 12C4.86667 12 1.30833 9.40833 0 6C1.30833 2.59167 4.86667 0 9 0ZM9 10.3333C10.5913 10.3333 12.1174 9.71667 13.241 8.625C14.3646 7.53333 15.0455 6.05719 15.1667 4.5C14.3646 3.40833 12.8385 2.79167 11.2471 2.79167C9.6557 2.79167 8.12955 3.40833 7.00598 4.5C5.88241 5.59167 5.2015 7.06781 5.0803 8.625C5.88241 9.71667 7.40856 10.3333 9 10.3333ZM9 8.75C7.75736 8.75 6.75 7.74264 6.75 6.5C6.75 5.25736 7.75736 4.25 9 4.25C10.2426 4.25 11.25 5.25736 11.25 6.5C11.25 7.74264 10.2426 8.75 9 8.75Z"
      fill="currentColor"
    />
  </svg>
);

const UsersIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="17" viewBox="0 0 20 17" fill="none">
    <path
      d="M14 17L13.7 15.5C13.5 15.4167 13.3127 15.3293 13.138 15.238C12.9633 15.1467 12.784 15.034 12.6 14.9L11.15 15.35L10.15 13.65L11.3 12.65C11.2667 12.4167 11.25 12.2 11.25 12C11.25 11.8 11.2667 11.5833 11.3 11.35L10.15 10.35L11.15 8.65L12.6 9.1C12.7833 8.96667 12.9627 8.85433 13.138 8.763C13.3133 8.67167 13.5007 8.584 13.7 8.5L14 7H16L16.3 8.5C16.5 8.58333 16.6877 8.675 16.863 8.775C17.0383 8.875 17.2173 9 17.4 9.15L18.85 8.65L19.85 10.4L18.7 11.4C18.7333 11.6 18.75 11.8083 18.75 12.025C18.75 12.2417 18.7333 12.45 18.7 12.65L19.85 13.65L18.85 15.35L17.4 14.9C17.2167 15.0333 17.0377 15.146 16.863 15.238C16.6883 15.33 16.5007 15.4173 16.3 15.5L16 17H14ZM0 16V13.2C0 12.65 0.141667 12.1333 0.425 11.65C0.708333 11.1667 1.1 10.8 1.6 10.55C2.45 10.1167 3.40833 9.75 4.475 9.45C5.54167 9.15 6.71667 9 8 9H8.35C8.45 9 8.55 9.01667 8.65 9.05C8.16667 10.25 7.96667 11.4417 8.05 12.625C8.13333 13.8083 8.53333 14.9333 9.25 16H0ZM15 14C15.55 14 16.021 13.8043 16.413 13.413C16.805 13.0217 17.0007 12.5507 17 12C16.9993 11.4493 16.8037 10.9787 16.413 10.588C16.0223 10.1973 15.5513 10.0013 15 10C14.4487 9.99867 13.978 10.1947 13.588 10.588C13.198 10.9813 13.002 11.452 13 12C12.998 12.548 13.194 13.019 13.588 13.413C13.982 13.807 14.4527 14.0027 15 14ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8Z"
      fill="currentColor"
    />
  </svg>
);

const UserIcon: FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill="currentColor"
    />
  </svg>
);

export default AtasanManagement;
