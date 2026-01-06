import type { FC, ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreatePO.module.css';

type FieldProps = {
  label: string;
  full?: boolean;
  children: ReactNode;
};

const Field: FC<FieldProps> = ({ label, full = false, children }) => (
  <div className={`${styles.formField} ${full ? styles.formFieldFull : ''}`}>
    <span className={styles.formLabel}>{label}</span>
    {children}
  </div>
);

type POItem = {
  id: string;
  no: string;
  name: string;
  spec: string;
  qty: string;
  unit: string;
  unitPrice: string;
  ppn: string;
  remarks: string;
};

const poItems: POItem[] = [
  {
    id: 'item-1',
    no: '1',
    name: 'Laptop Lenovo V14',
    spec: 'Intel Core i5-1135G7, 8GB RAM, 512GB SSD',
    qty: '1',
    unit: 'pcs',
    unitPrice: '10000000',
    ppn: '11',
    remarks: '',
  },
];

const CreatePO: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleSubmit = () => {
    navigate('/admin/quotation');
  };

  const handleCancel = () => {
    navigate('/admin/quotation');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.detailHeader}>
        <div className={styles.detailLeft}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate('/admin/quotation')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className={styles.listTitle}>Buat Purchase Order</h1>
        </div>
      </div>

      {/* Informasi PO Section */}
      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <svg
                className={styles.cardIcon}
                width="25"
                height="29"
                viewBox="0 0 25 29"
                fill="none"
              >
                <path
                  d="M25 8.0643C24.992 8.02582 24.992 7.98615 25 7.94766C24.9939 7.91391 24.9939 7.87936 25 7.84561V7.7144L24.9112 7.49572C24.8747 7.43629 24.8299 7.38229 24.7779 7.33535L24.6447 7.21872H24.5707L18.7379 3.58856L13.2307 0.23541C13.1023 0.137349 12.9568 0.0632347 12.8014 0.0167262H12.683C12.5507 -0.00557542 12.4155 -0.00557542 12.2833 0.0167262H12.1352C11.963 0.053461 11.798 0.117468 11.6467 0.206253L0.58799 6.98546L0.454753 7.08751L0.321516 7.20414L0.173475 7.30619L0.0994539 7.39367L0.0106289 7.61235V7.83103C-0.00354296 7.92773 -0.00354296 8.02592 0.0106289 8.12261V20.85C0.0101254 21.0978 0.073748 21.3416 0.19549 21.5584C0.317232 21.7752 0.493076 21.9579 0.706423 22.0892L11.8095 28.8539L12.0316 28.9413H12.15C12.4005 29.0196 12.6694 29.0196 12.9198 28.9413H13.0383L13.2603 28.8539L24.2746 22.1913C24.4879 22.06 24.6638 21.8773 24.7855 21.6605C24.9073 21.4436 24.9709 21.1998 24.9704 20.9521V8.22466C24.9704 8.22466 25 8.12261 25 8.0643ZM12.4313 3.18035L15.0664 4.78404L6.79092 9.82835L4.14098 8.22466L12.4313 3.18035ZM10.9509 25.0488L2.80861 20.1502V10.8343L10.9509 15.7911V25.0488ZM12.4313 13.2252L9.60371 11.5487L17.8792 6.48977L20.7216 8.22466L12.4313 13.2252ZM22.054 20.1065L13.9117 25.0925V15.7911L22.054 10.8343V20.1065Z"
                  fill="currentColor"
                />
              </svg>
              <h2 className={styles.cardTitle}>Informasi PO</h2>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <Field label="No. PO">
              <input
                className={`${styles.input} ${styles.inputMuted}`}
                defaultValue="PO-2024-001"
              />
            </Field>
            <Field label="TOP">
              <input className={styles.input} placeholder="Masukkan TOP" />
            </Field>
            <Field label="Delivery">
              <input className={styles.input} placeholder="Masukkan Delivery" />
            </Field>
            <Field label="Supplier">
              <input className={styles.input} placeholder="Masukkan Supplier" />
            </Field>
            <Field label="Alamat Supplier" full>
              <textarea
                className={styles.textarea}
                placeholder="Masukkan Alamat Supplier"
                rows={2}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* Item List Section */}
      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <svg
                className={styles.cardIcon}
                width="25"
                height="29"
                viewBox="0 0 25 29"
                fill="none"
              >
                <path
                  d="M25 8.0643C24.992 8.02582 24.992 7.98615 25 7.94766C24.9939 7.91391 24.9939 7.87936 25 7.84561V7.7144L24.9112 7.49572C24.8747 7.43629 24.8299 7.38229 24.7779 7.33535L24.6447 7.21872H24.5707L18.7379 3.58856L13.2307 0.23541C13.1023 0.137349 12.9568 0.0632347 12.8014 0.0167262H12.683C12.5507 -0.00557542 12.4155 -0.00557542 12.2833 0.0167262H12.1352C11.963 0.053461 11.798 0.117468 11.6467 0.206253L0.58799 6.98546L0.454753 7.08751L0.321516 7.20414L0.173475 7.30619L0.0994539 7.39367L0.0106289 7.61235V7.83103C-0.00354296 7.92773 -0.00354296 8.02592 0.0106289 8.12261V20.85C0.0101254 21.0978 0.073748 21.3416 0.19549 21.5584C0.317232 21.7752 0.493076 21.9579 0.706423 22.0892L11.8095 28.8539L12.0316 28.9413H12.15C12.4005 29.0196 12.6694 29.0196 12.9198 28.9413H13.0383L13.2603 28.8539L24.2746 22.1913C24.4879 22.06 24.6638 21.8773 24.7855 21.6605C24.9073 21.4436 24.9709 21.1998 24.9704 20.9521V8.22466C24.9704 8.22466 25 8.12261 25 8.0643ZM12.4313 3.18035L15.0664 4.78404L6.79092 9.82835L4.14098 8.22466L12.4313 3.18035ZM10.9509 25.0488L2.80861 20.1502V10.8343L10.9509 15.7911V25.0488ZM12.4313 13.2252L9.60371 11.5487L17.8792 6.48977L20.7216 8.22466L12.4313 13.2252ZM22.054 20.1065L13.9117 25.0925V15.7911L22.054 10.8343V20.1065Z"
                  fill="currentColor"
                />
              </svg>
              <h2 className={styles.cardTitle}>Daftar Item</h2>
            </div>
          </div>

          <div className={styles.tableScroll}>
            <div
              className={styles.tableHeader}
              style={{
                gridTemplateColumns: '40px 1.5fr 1.5fr 0.6fr 0.6fr 1fr 0.6fr 1fr',
              }}
            >
              <span>No</span>
              <span>Nama Barang</span>
              <span>Spesifikasi</span>
              <span>Qty</span>
              <span>Unit</span>
              <span>Unit Price (Rp)</span>
              <span>PPN (%)</span>
              <span>Remarks</span>
            </div>
            {poItems.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.tableRow} ${
                  index % 2 === 1 ? styles.tableRowAlt : ''
                }`}
                style={{
                  gridTemplateColumns: '40px 1.5fr 1.5fr 0.6fr 0.6fr 1fr 0.6fr 1fr',
                }}
              >
                <span>{item.no}</span>
                <span>{item.name}</span>
                <span>{item.spec}</span>
                <span>{item.qty}</span>
                <span>{item.unit}</span>
                <span>{item.unitPrice}</span>
                <span>{item.ppn}</span>
                <span>{item.remarks || '-'}</span>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className={styles.summarySection}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span className={styles.summaryValue}>Rp 10.000.000</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>PPN (11%)</span>
              <span className={styles.summaryValue}>Rp 1.100.000</span>
            </div>
            <div className={styles.summaryRowTotal}>
              <span className={styles.summaryLabelTotal}>Grand Total</span>
              <span className={styles.summaryValueTotal}>Rp 11.100.000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className={styles.actionBar}>
        <button type="button" className={styles.ghostButton} onClick={handleCancel}>
          Batal
        </button>
        <button type="button" className={styles.primaryButton} onClick={handleSubmit}>
          Submit PO
        </button>
      </div>
    </div>
  );
};

export default CreatePO;
