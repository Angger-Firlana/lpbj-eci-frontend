import { useState, type FC } from 'react';
import styles from './TokenModal.module.css';

interface TokenModalProps {
  lpbjNo: string;
  tema: string;
  action: 'approve' | 'reject';
  onClose: () => void;
  onConfirm: (token: string) => void;
}

const TokenModal: FC<TokenModalProps> = ({ lpbjNo, tema, action, onClose, onConfirm }) => {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);

  const handleSubmit = () => {
    if (token.trim()) {
      onConfirm(token);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.keyIcon}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M50 30C50 24.4772 45.5228 20 40 20C34.4772 20 30 24.4772 30 30C30 35.5228 34.4772 40 40 40C45.5228 40 50 35.5228 50 30Z" stroke="#F59E0B" strokeWidth="4"/>
            <path d="M40 40V60M40 60H52M40 60H28" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className={styles.title}>{lpbjNo}</h2>
        <p className={styles.subtitle}>{tema}</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Token</label>
          <div className={styles.inputWrapper}>
            <input
              type={showToken ? 'text' : 'password'}
              className={styles.input}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Masukkan token"
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowToken(!showToken)}
            >
              {showToken ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4C5.45455 4 1.57273 6.79333 0 11C1.57273 15.2067 5.45455 18 10 18C14.5455 18 18.4273 15.2067 20 11C18.4273 6.79333 14.5455 4 10 4ZM10 15.6667C7.42727 15.6667 5.33333 13.5733 5.33333 11C5.33333 8.42667 7.42727 6.33333 10 6.33333C12.5727 6.33333 14.6667 8.42667 14.6667 11C14.6667 13.5733 12.5727 15.6667 10 15.6667ZM10 8.2C8.46 8.2 7.2 9.46 7.2 11C7.2 12.54 8.46 13.8 10 13.8C11.54 13.8 12.8 12.54 12.8 11C12.8 9.46 11.54 8.2 10 8.2Z" fill="#9C9C9C"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4C5.45455 4 1.57273 6.79333 0 11C1.57273 15.2067 5.45455 18 10 18C14.5455 18 18.4273 15.2067 20 11C18.4273 6.79333 14.5455 4 10 4ZM10 15.6667C7.42727 15.6667 5.33333 13.5733 5.33333 11C5.33333 8.42667 7.42727 6.33333 10 6.33333C12.5727 6.33333 14.6667 8.42667 14.6667 11C14.6667 13.5733 12.5727 15.6667 10 15.6667ZM10 8.2C8.46 8.2 7.2 9.46 7.2 11C7.2 12.54 8.46 13.8 10 13.8C11.54 13.8 12.8 12.54 12.8 11C12.8 9.46 11.54 8.2 10 8.2Z" fill="#9C9C9C"/>
                  <line x1="2" y1="2" x2="18" y2="18" stroke="#9C9C9C" strokeWidth="2"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={styles.warning}>
          <span className={styles.warningTitle}>Peringatan</span>
          <p className={styles.warningText}>
            Setelah anda approve/ reject, tindakan tidak dapat di batalkan
          </p>
        </div>

        <button
          className={action === 'approve' ? styles.approveButton : styles.rejectButton}
          onClick={handleSubmit}
          disabled={!token.trim()}
        >
          {action === 'approve' ? 'Approve' : 'Reject'}
        </button>
      </div>
    </div>
  );
};

export default TokenModal;
