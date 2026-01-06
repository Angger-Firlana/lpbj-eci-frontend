import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import styles from './PemohonLpbj.module.css';

type Column = {
  key: string;
  label: string;
  width: string;
};

type ListRow = {
  id: string;
  no?: string;
  name?: string;
  spec?: string;
  qty?: string;
  article?: string;
  store?: string;
  gl?: string;
  costCenter?: string;
  order?: string;
  showActions?: boolean;
};

const listColumns: Column[] = [
  { key: 'no', label: 'No', width: '40px' },
  { key: 'name', label: 'Nama Barang', width: '1.3fr' },
  { key: 'spec', label: 'Spesifikasi', width: '1.3fr' },
  { key: 'qty', label: 'Qty', width: '0.6fr' },
  { key: 'article', label: 'Article', width: '0.8fr' },
  { key: 'store', label: 'Store', width: '0.7fr' },
  { key: 'gl', label: 'G/L', width: '0.7fr' },
  { key: 'costCenter', label: 'Cost Center', width: '1fr' },
  { key: 'order', label: 'Order', width: '0.7fr' },
  { key: 'aksi', label: 'Aksi', width: '0.6fr' },
];

const listRows: ListRow[] = [
  {
    id: 'row-1',
    no: '1',
    name: 'Lenovo v14',
    spec: 'Invidia 123123',
    qty: '1',
    article: '',
    store: 'HO',
    gl: '',
    costCenter: '',
    order: '',
    showActions: true,
  },
  { id: 'row-2' },
  { id: 'row-3' },
];

type ItemFormValues = {
  description: string;
  spec: string;
  qty: string;
  article: string;
  store: string;
  gl: string;
  costCenter: string;
  order: string;
};

const defaultFormValues: ItemFormValues = {
  description: 'Laptop Lenovo V14',
  spec: 'Laptop Lenovo V14',
  qty: '',
  article: '',
  store: '',
  gl: '',
  costCenter: '',
  order: '',
};

const mapRowToFormValues = (row: ListRow | null): ItemFormValues => ({
  description: row?.name ?? '',
  spec: row?.spec ?? '',
  qty: row?.qty ?? '',
  article: row?.article ?? '',
  store: row?.store ?? '',
  gl: row?.gl ?? '',
  costCenter: row?.costCenter ?? '',
  order: row?.order ?? '',
});

const PemohonLpbj: FC = () => {
  const [editingRow, setEditingRow] = useState<ListRow | null>(null);
  const editValues = mapRowToFormValues(editingRow);

  return (
    <div className={styles.wrapper}>
      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <BoxIcon className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Informasi LPBJ</h2>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <Field label="No. LPBJ">
              <input
                className={`${styles.input} ${styles.inputMutedText}`}
                defaultValue="10010101023123"
              />
            </Field>
            <Field label="Departemen">
              <input
                className={`${styles.input} ${styles.inputMutedText}`}
                defaultValue="Direct Sales"
              />
            </Field>
            <Field label="Tanggal">
              <div className={styles.inputWithIcon}>
                <input className={styles.input} defaultValue="dd/mm/yyyy" />
                <CalendarIcon className={styles.calendarIcon} />
              </div>
            </Field>
            <Field label="Tema" full>
              <div className={styles.inputDisplay}>
                <span className={styles.inputMuted}>LPBJ -</span>
                <span className={styles.inputStrong}>Laptop Lenovo V14</span>
              </div>
            </Field>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <BoxIcon className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Tambah Item</h2>
            </div>
            <button type="button" className={styles.addButton}>
              Tambah Item
              <PlusIcon className={styles.addIcon} />
            </button>
          </div>

          <ItemFormFields values={defaultFormValues} />
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <BoxIcon className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>List Item</h2>
            </div>
          </div>
          <div className={styles.tableWrap}>
            <div
              className={styles.tableHeader}
              style={{
                gridTemplateColumns: listColumns
                  .map((column) => column.width)
                  .join(' '),
              }}
            >
              {listColumns.map((column) => (
                <span key={column.key}>{column.label}</span>
              ))}
            </div>
            {listRows.map((row, index) => (
              <div
                key={row.id}
                className={`${styles.tableRow} ${
                  index % 2 === 1 ? styles.tableRowAlt : ''
                }`}
                style={{
                  gridTemplateColumns: listColumns
                    .map((column) => column.width)
                    .join(' '),
                }}
              >
                <span>{row.no ?? ''}</span>
                <span>{row.name ?? ''}</span>
                <span>{row.spec ?? ''}</span>
                <span>{row.qty ?? ''}</span>
                <span>{row.article ?? ''}</span>
                <span>{row.store ?? ''}</span>
                <span>{row.gl ?? ''}</span>
                <span>{row.costCenter ?? ''}</span>
                <span>{row.order ?? ''}</span>
                <span>
                  {row.showActions ? (
                    <span className={styles.actionGroup}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() => setEditingRow(row)}
                      >
                        <EditIcon />
                      </button>
                      <button type="button" className={styles.actionButton}>
                        <TrashIcon />
                      </button>
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {editingRow ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div className={styles.cardTitleGroup}>
                <BoxIcon className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Edit Item</h2>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setEditingRow(null)}
              >
                Tutup
              </button>
            </div>
            <ItemFormFields values={editValues} />
            <div className={styles.modalActions}>
              <button type="button" className={styles.primaryButton}>
                Simpan
              </button>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => setEditingRow(null)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      ) : null}
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

const ItemFormFields: FC<{ values: ItemFormValues }> = ({ values }) => (
  <div className={styles.formGrid}>
    <Field label="Deskripsi">
      <input className={styles.input} defaultValue={values.description} />
    </Field>
    <Field label="Spesifikasi">
      <textarea
        className={`${styles.textarea} ${styles.textareaTall}`}
        defaultValue={values.spec}
      />
    </Field>

    <div className={styles.formRow}>
      <Field label="Qty">
        <input
          className={`${styles.input} ${styles.inputOutline}`}
          defaultValue={values.qty}
        />
      </Field>
      <Field label="Article">
        <input
          className={`${styles.input} ${styles.inputOutline}`}
          defaultValue={values.article}
        />
      </Field>
      <Field label="Store">
        <input
          className={`${styles.input} ${styles.inputOutline}`}
          defaultValue={values.store}
        />
      </Field>
    </div>

    <div className={styles.formRow}>
      <Field label="G/L">
        <input
          className={`${styles.input} ${styles.inputOutline}`}
          defaultValue={values.gl}
        />
      </Field>
      <Field label="Cost Center">
        <input
          className={`${styles.input} ${styles.inputOutline}`}
          defaultValue={values.costCenter}
        />
      </Field>
      <Field label="Order">
        <input
          className={`${styles.input} ${styles.inputOutline}`}
          defaultValue={values.order}
        />
      </Field>
    </div>

    <div className={styles.formRow}>
      <Field label="Unit">
        <input
          className={`${styles.input} ${styles.inputOutline}`}
          defaultValue="pcs"
        />
      </Field>
      <Field label="Unit Price (Rp)">
        <input
          className={`${styles.input} ${styles.inputOutline}`}
          defaultValue="10000000"
        />
      </Field>
      <Field label="PPN (%)">
        <input
          className={`${styles.input} ${styles.inputOutline}`}
          defaultValue="11"
        />
      </Field>
    </div>

    <Field label="Remarks">
      <textarea
        className={`${styles.textarea} ${styles.textareaTall}`}
        defaultValue=""
        rows={2}
      />
    </Field>

    <Field label="Gambar Item">
      <div className={styles.uploadBox}>
        <UploadIcon className={styles.uploadIcon} />
        <span>Upload Gambar Item (Opsional)</span>
      </div>
    </Field>

    {/* Summary Section */}
    <div style={{
      borderTop: '1px solid #d9d9d9',
      paddingTop: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '14px', color: '#9c9c9c' }}>Subtotal</span>
        <span style={{ fontSize: '14px', color: '#1a1a1a' }}>Rp 10.000.000</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '14px', color: '#9c9c9c' }}>PPN (11%)</span>
        <span style={{ fontSize: '14px', color: '#1a1a1a' }}>Rp 1.100.000</span>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #e0e0e0',
        paddingTop: '8px',
        marginTop: '4px',
      }}>
        <span style={{ fontSize: '16px', fontWeight: 500, color: '#1a1a1a' }}>Grand Total</span>
        <span style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>Rp 11.100.000</span>
      </div>
    </div>
  </div>
);

const BoxIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="25" height="29" viewBox="0 0 25 29" fill="none">
    <path
      d="M25 8.0643C24.992 8.02582 24.992 7.98615 25 7.94766C24.9939 7.91391 24.9939 7.87936 25 7.84561V7.7144L24.9112 7.49572C24.8747 7.43629 24.8299 7.38229 24.7779 7.33535L24.6447 7.21872H24.5707L18.7379 3.58856L13.2307 0.23541C13.1023 0.137349 12.9568 0.0632347 12.8014 0.0167262H12.683C12.5507 -0.00557542 12.4155 -0.00557542 12.2833 0.0167262H12.1352C11.963 0.053461 11.798 0.117468 11.6467 0.206253L0.58799 6.98546L0.454753 7.08751L0.321516 7.20414L0.173475 7.30619L0.0994539 7.39367L0.0106289 7.61235V7.83103C-0.00354296 7.92773 -0.00354296 8.02592 0.0106289 8.12261V20.85C0.0101254 21.0978 0.073748 21.3416 0.19549 21.5584C0.317232 21.7752 0.493076 21.9579 0.706423 22.0892L11.8095 28.8539L12.0316 28.9413H12.15C12.4005 29.0196 12.6694 29.0196 12.9198 28.9413H13.0383L13.2603 28.8539L24.2746 22.1913C24.4879 22.06 24.6638 21.8773 24.7855 21.6605C24.9073 21.4436 24.9709 21.1998 24.9704 20.9521V8.22466C24.9704 8.22466 25 8.12261 25 8.0643ZM12.4313 3.18035L15.0664 4.78404L6.79092 9.82835L4.14098 8.22466L12.4313 3.18035ZM10.9509 25.0488L2.80861 20.1502V10.8343L10.9509 15.7911V25.0488ZM12.4313 13.2252L9.60371 11.5487L17.8792 6.48977L20.7216 8.22466L12.4313 13.2252ZM22.054 20.1065L13.9117 25.0925V15.7911L22.054 10.8343V20.1065Z"
      fill="currentColor"
    />
  </svg>
);

const UploadIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path
      d="M10.9375 18.75V6.01562L6.875 10.0781L4.6875 7.8125L12.5 0L20.3125 7.8125L18.125 10.0781L14.0625 6.01562V18.75H10.9375ZM3.125 25C2.26562 25 1.53021 24.6943 0.91875 24.0828C0.307291 23.4714 0.00104167 22.7354 0 21.875V17.1875H3.125V21.875H21.875V17.1875H25V21.875C25 22.7344 24.6943 23.4703 24.0828 24.0828C23.4714 24.6953 22.7354 25.001 21.875 25H3.125Z"
      fill="currentColor"
    />
  </svg>
);

const CalendarIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="15" height="13" viewBox="0 0 15 13" fill="none">
    <path
      d="M0.75 5.75H14.25C14.34 5.75 14.4103 5.75043 14.4707 5.75195C14.4796 5.75218 14.4881 5.75265 14.4961 5.75293C14.4964 5.76113 14.4978 5.77009 14.498 5.7793C14.4996 5.83964 14.5 5.90999 14.5 6V9.75C14.5 10.4714 14.4986 10.9618 14.4492 11.3291C14.4018 11.6819 14.3185 11.8456 14.207 11.957C14.0956 12.0685 13.9319 12.1518 13.5791 12.1992C13.2118 12.2486 12.7214 12.25 12 12.25H3C2.27865 12.25 1.78818 12.2486 1.4209 12.1992C1.06809 12.1518 0.904407 12.0685 0.792969 11.957C0.68153 11.8456 0.598244 11.6819 0.550781 11.3291C0.50138 10.9618 0.5 10.4714 0.5 9.75V6C0.5 5.91003 0.500433 5.83967 0.501953 5.7793C0.502188 5.76999 0.502637 5.76122 0.50293 5.75293C0.511125 5.75264 0.520102 5.75218 0.529297 5.75195C0.589638 5.75044 0.65999 5.75 0.75 5.75ZM3 0.5H12C12.7214 0.5 13.2118 0.50138 13.5791 0.550781C13.9319 0.598244 14.0956 0.68153 14.207 0.792969C14.3185 0.904407 14.4018 1.06809 14.4492 1.4209C14.4986 1.78818 14.5 2.27865 14.5 3C14.5 3.09001 14.4996 3.16036 14.498 3.2207C14.4978 3.22955 14.4964 3.23818 14.4961 3.24609C14.4881 3.24637 14.4797 3.24782 14.4707 3.24805C14.4103 3.24957 14.34 3.25 14.25 3.25H0.75C0.65999 3.25 0.589638 3.24956 0.529297 3.24805C0.52009 3.24782 0.511135 3.24638 0.50293 3.24609C0.502651 3.23809 0.502178 3.22965 0.501953 3.2207C0.500433 3.16033 0.5 3.08997 0.5 3C0.5 2.27865 0.50138 1.78818 0.550781 1.4209C0.598244 1.06809 0.68153 0.904407 0.792969 0.792969C0.904407 0.68153 1.06809 0.598244 1.4209 0.550781C1.78818 0.50138 2.27865 0.5 3 0.5Z"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);

const PlusIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path d="M3.42857 4.57143H0V3.42857H3.42857V0H4.57143V3.42857H8V4.57143H4.57143V8H3.42857V4.57143Z" fill="currentColor" />
  </svg>
);

const EditIcon: FC = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M0 15V11.4583L11 0.479167C11.1667 0.326389 11.3508 0.208333 11.5525 0.125C11.7542 0.0416667 11.9658 0 12.1875 0C12.4092 0 12.6244 0.0416667 12.8333 0.125C13.0422 0.208333 13.2228 0.333333 13.375 0.5L14.5208 1.66667C14.6875 1.81944 14.8092 2 14.8858 2.20833C14.9625 2.41667 15.0005 2.625 15 2.83333C15 3.05556 14.9619 3.2675 14.8858 3.46917C14.8097 3.67083 14.688 3.85472 14.5208 4.02083L3.54167 15H0ZM12.1667 4L13.3333 2.83333L12.1667 1.66667L11 2.83333L12.1667 4Z"
      fill="currentColor"
    />
  </svg>
);

const TrashIcon: FC = () => (
  <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
    <path
      d="M2.4375 15C1.99063 15 1.60821 14.8369 1.29025 14.5108C0.972292 14.1847 0.813042 13.7922 0.8125 13.3333V2.5H0V0.833333H4.0625V0H8.9375V0.833333H13V2.5H12.1875V13.3333C12.1875 13.7917 12.0285 14.1842 11.7106 14.5108C11.3926 14.8375 11.0099 15.0006 10.5625 15H2.4375ZM4.0625 11.6667H5.6875V4.16667H4.0625V11.6667ZM7.3125 11.6667H8.9375V4.16667H7.3125V11.6667Z"
      fill="currentColor"
    />
  </svg>
);

export default PemohonLpbj;
