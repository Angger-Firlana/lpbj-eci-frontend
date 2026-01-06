import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreateQuotation.module.css';

type Approver = {
  id: string;
  name: string;
  role: string;
};

type QuotationItem = {
  id: string;
  description: string;
  spec: string;
  qty: string;
  article: string;
  store: string;
  gl: string;
  costCenter: string;
  order: string;
  unit: string;
  unitPrice: string;
  ppn: string;
  remarks: string;
};

const approverOptions: Approver[] = [
  { id: 'apr-1', name: 'Pak Rahman', role: 'Atasan IT Dev' },
  { id: 'apr-2', name: 'Pak Rahman', role: 'Atasan IT Dev' },
  { id: 'apr-3', name: 'Pak David', role: 'Atasan IT' },
  { id: 'apr-4', name: 'Pak Budi', role: 'Atasan Finance' },
  { id: 'apr-5', name: 'Pak Andi', role: 'Atasan Operations' },
  { id: 'apr-6', name: 'Pak Candra', role: 'Atasan HR' },
];

const itemColumns = [
  { label: 'No', width: '50px' },
  { label: 'Nama Barang', width: '1.4fr' },
  { label: 'Spesifikasi', width: '1.2fr' },
  { label: 'Qty', width: '0.6fr' },
  { label: 'Unit', width: '0.8fr' },
  { label: 'Unit Price (Rp)', width: '1fr' },
  { label: 'Total', width: '1fr' },
  { label: 'Aksi', width: '0.8fr' },
];

const CreateQuotation: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Check if we're in edit mode
  const isEditMode = !!id;

  const [selectedApprovers, setSelectedApprovers] = useState<string[]>([]);

  // Mock data for edit mode - in real app, fetch from API
  const mockEditData = {
    selectedApprovers: ['apr-1', 'apr-3'],
    formData: {
      noQuotation: '10010101023123',
      pkpStatus: 'PKP',
      franco: 'Jakarta',
      deliveryTerm: '7 hari',
      top: 'NET 30',
      contactPerson: 'Anggerrahhh - 08123456789',
      note: 'Ada beberapa yang rusak',
    },
    items: [
      {
        id: 'item-existing-1',
        description: 'Laptop Lenovo V14',
        spec: 'Intel Core i5, 8GB RAM, 256GB SSD',
        qty: '10',
        article: 'LPT-001',
        store: 'HO',
        gl: '8000',
        costCenter: 'IT-001',
        order: 'PO-001',
        unit: 'pcs',
        unitPrice: '10000000',
        ppn: '11',
        remarks: 'Urgent',
      },
    ] as QuotationItem[],
  };

  const [items, setItems] = useState<QuotationItem[]>(isEditMode ? mockEditData.items : []);
  const [formData, setFormData] = useState(
    isEditMode ? mockEditData.formData : {
      noQuotation: '10010101023123',
      pkpStatus: 'PKP',
      franco: '',
      deliveryTerm: '',
      top: '',
      contactPerson: '',
      note: '',
    }
  );
  const [newItem, setNewItem] = useState<QuotationItem>({
    id: '',
    description: '',
    spec: '',
    qty: '',
    article: '',
    store: '',
    gl: '',
    costCenter: '',
    order: '',
    unit: '',
    unitPrice: '',
    ppn: '',
    remarks: '',
  });

  // Initialize approvers for edit mode
  useEffect(() => {
    if (isEditMode) {
      setSelectedApprovers(mockEditData.selectedApprovers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate('/admin/quotation');
  };

  const handleToggleApprover = (approverId: string) => {
    setSelectedApprovers((prev) =>
      prev.includes(approverId) ? prev.filter((value) => value !== approverId) : [...prev, approverId]
    );
  };

  const handleAddItem = () => {
    if (newItem.description) {
      setItems((prev) => [...prev, { ...newItem, id: `item-${Date.now()}` }]);
      setNewItem({
        id: '',
        description: '',
        spec: '',
        qty: '',
        article: '',
        store: '',
        gl: '',
        costCenter: '',
        order: '',
        unit: '',
        unitPrice: '',
        ppn: '',
        remarks: '',
      });
    }
  };

  const handleDeleteItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleSubmit = () => {
    console.log('Submit quotation:', { formData, selectedApprovers, items });
    navigate('/admin/quotation');
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return total + qty * price;
    }, 0);
  };

  const calculatePPN = () => {
    return calculateSubtotal() * 0.11;
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculatePPN();
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.detailHeader}>
        <div className={styles.detailLeft}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
            aria-label="Back to list"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className={styles.listTitle}>{isEditMode ? 'Edit Quotation' : 'Buat Quotation Baru'}</h1>
        </div>
      </div>

      {/* Pilih Approve Section */}
      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <UserIcon className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Pilih Approve</h2>
            </div>
          </div>
          <div className={styles.approverGrid}>
            {approverOptions.map((approver) => {
              const isSelected = selectedApprovers.includes(approver.id);
              return (
                <button
                  key={approver.id}
                  type="button"
                  className={`${styles.approverCard} ${
                    isSelected ? styles.approverCardSelected : ''
                  }`}
                  onClick={() => handleToggleApprover(approver.id)}
                >
                  <div className={styles.approverCardInfo}>
                    <div className={styles.approverName}>{approver.name}</div>
                    <div className={styles.approverRole}>{approver.role}</div>
                  </div>
                  {isSelected ? (
                    <div className={styles.approverRadioSelected}>●</div>
                  ) : (
                    <div className={styles.approverRadio}>○</div>
                  )}
                </button>
              );
            })}
          </div>
          <div className={styles.approverCount}>
            {selectedApprovers.length} approver terpilih
          </div>
        </div>
      </section>

      {/* Informasi Quotation Form */}
      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <FileIcon className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Informasi Quotation</h2>
          </div>
          <div className={styles.infoGrid}>
            <InfoBlock label="No. Quotation" input>
              <input
                className={styles.input}
                value={formData.noQuotation}
                readOnly
              />
            </InfoBlock>
            <InfoBlock label="PKP/ NON PKP" input>
              <select
                className={styles.input}
                value={formData.pkpStatus}
                onChange={(e) => setFormData({ ...formData, pkpStatus: e.target.value })}
              >
                <option value="PKP">PKP</option>
                <option value="NON PKP">NON PKP</option>
              </select>
            </InfoBlock>
            <InfoBlock label="Franco" input>
              <input
                className={styles.input}
                value={formData.franco}
                onChange={(e) => setFormData({ ...formData, franco: e.target.value })}
                placeholder="Masukkan franco"
              />
            </InfoBlock>
            <InfoBlock label="Delivery Term" input>
              <input
                className={styles.input}
                value={formData.deliveryTerm}
                onChange={(e) => setFormData({ ...formData, deliveryTerm: e.target.value })}
                placeholder="Masukkan delivery term"
              />
            </InfoBlock>
            <InfoBlock label="TOP" input>
              <input
                className={styles.input}
                value={formData.top}
                onChange={(e) => setFormData({ ...formData, top: e.target.value })}
                placeholder="Masukkan TOP"
              />
            </InfoBlock>
            <InfoBlock label="Contact Person" input>
              <input
                className={styles.input}
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Nama - No. Telepon"
              />
            </InfoBlock>
            <InfoBlock label="Note" input full>
              <textarea
                className={styles.textarea}
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Masukkan catatan"
                rows={3}
              />
            </InfoBlock>
          </div>
        </div>
      </section>

      {/* Daftar Item Form */}
      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <BoxIcon className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Daftar Item</h2>
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddItem}
            >
              Tambah Item +
            </button>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormInput
                label="Deskripsi"
                value={newItem.description}
                onChange={(v) => setNewItem({ ...newItem, description: v })}
                placeholder="Masukkan deskripsi"
              />
              <FormInput
                label="Spesifikasi"
                value={newItem.spec}
                onChange={(v) => setNewItem({ ...newItem, spec: v })}
                placeholder="Masukkan spesifikasi"
                textarea
              />
            </div>
            <div className={styles.formRow}>
              <FormInput
                label="Qty"
                value={newItem.qty}
                onChange={(v) => setNewItem({ ...newItem, qty: v })}
                placeholder="0"
              />
              <FormInput
                label="Article"
                value={newItem.article}
                onChange={(v) => setNewItem({ ...newItem, article: v })}
                placeholder="Masukkan article"
              />
              <FormInput
                label="Store"
                value={newItem.store}
                onChange={(v) => setNewItem({ ...newItem, store: v })}
                placeholder="Masukkan store"
              />
            </div>
            <div className={styles.formRow}>
              <FormInput
                label="G/L"
                value={newItem.gl}
                onChange={(v) => setNewItem({ ...newItem, gl: v })}
                placeholder="Masukkan G/L"
              />
              <FormInput
                label="Cost Center"
                value={newItem.costCenter}
                onChange={(v) => setNewItem({ ...newItem, costCenter: v })}
                placeholder="Masukkan cost center"
              />
              <FormInput
                label="Order"
                value={newItem.order}
                onChange={(v) => setNewItem({ ...newItem, order: v })}
                placeholder="Masukkan order"
              />
            </div>
            <div className={styles.formRow}>
              <FormInput
                label="Unit"
                value={newItem.unit}
                onChange={(v) => setNewItem({ ...newItem, unit: v })}
                placeholder="Masukkan unit"
              />
              <FormInput
                label="Unit Price (Rp)"
                value={newItem.unitPrice}
                onChange={(v) => setNewItem({ ...newItem, unitPrice: v })}
                placeholder="0"
              />
              <FormInput
                label="PPN"
                value={newItem.ppn}
                onChange={(v) => setNewItem({ ...newItem, ppn: v })}
                placeholder="11"
              />
            </div>
            <FormInput
              label="Remarks"
              value={newItem.remarks}
              onChange={(v) => setNewItem({ ...newItem, remarks: v })}
              placeholder="Masukkan remarks"
              textarea
              full
            />
          </div>
        </div>
      </section>

      {/* List Item Table */}
      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <BoxIcon className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>List Item</h2>
          </div>
          <div className={styles.tableScroll}>
            <div
              className={styles.tableHeader}
              style={{
                gridTemplateColumns: itemColumns.map((col) => col.width).join(' '),
              }}
            >
              {itemColumns.map((col) => (
                <span key={col.label}>{col.label}</span>
              ))}
            </div>
            {items.length === 0 ? (
              <div className={styles.tablePlaceholder}>Belum ada item ditambahkan</div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.tableRow} ${
                    index % 2 === 1 ? styles.tableRowAlt : ''
                  }`}
                  style={{
                    gridTemplateColumns: itemColumns.map((col) => col.width).join(' '),
                  }}
                >
                  <span>{index + 1}</span>
                  <span>{item.description}</span>
                  <span>{item.spec}</span>
                  <span>{item.qty}</span>
                  <span>{item.unit}</span>
                  <span>{item.unitPrice}</span>
                  <span>
                    {parseFloat(item.qty) * parseFloat(item.unitPrice || '0')}
                  </span>
                  <span className={styles.rowActions}>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <TrashIcon />
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>
          {/* Summary */}
          {items.length > 0 && (
            <div className={styles.summarySection}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Subtotal</span>
                <span className={styles.summaryValue}>Rp {calculateSubtotal().toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>PPN (11%)</span>
                <span className={styles.summaryValue}>Rp {calculatePPN().toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabelTotal}>Grand Total</span>
                <span className={styles.summaryValueTotal}>Rp {calculateGrandTotal().toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Action Buttons */}
      <div className={styles.actionBar}>
        <button
          type="button"
          className={styles.ghostButton}
          onClick={handleBack}
        >
          Batal
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleSubmit}
        >
          Submit Quotation
        </button>
      </div>
    </div>
  );
};

const InfoBlock: FC<{
  label: string;
  children: ReactNode;
  input?: boolean;
  full?: boolean;
}> = ({ label, children, input = false, full = false }) => (
  <div className={`${styles.infoBlock} ${full ? styles.infoBlockFull : ''}`}>
    <span className={styles.infoLabel}>{label}</span>
    {children}
  </div>
);

const FormInput: FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
  full?: boolean;
}> = ({ label, value, onChange, placeholder, textarea = false, full = false }) => (
  <div className={`${styles.formField} ${full ? styles.formFieldFull : ''}`}>
    <label className={styles.formLabel}>{label}</label>
    {textarea ? (
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
      />
    ) : (
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

// Icons
const ArrowLeftIcon: FC = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <path
      d="M0.292893 6.65617C-0.0976314 7.0467 -0.0976315 7.67986 0.292892 8.07039L6.65685 14.4343C7.04738 14.8249 7.68054 14.8249 8.07107 14.4343C8.46159 14.0438 8.46159 13.4107 8.07107 13.0201L2.41421 7.36328L8.07107 1.70643C8.46159 1.3159 8.46159 0.682741 8.07107 0.292216C7.68054 -0.098309 7.04738 -0.0983091 6.65685 0.292216L0.292893 6.65617Z"
      fill="currentColor"
    />
    <path d="M20 7.36328H1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const UserIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 0C12.2623 0 14.2312 1.54857 15.034 3.55362C15.3826 3.36673 15.7824 3.26086 16.2045 3.26086C17.7464 3.26086 19 4.51444 19 6.05634C19 7.59824 17.7464 8.85182 16.2045 8.85182C16.1369 8.85182 16.0708 8.84907 16.0062 8.84382C15.5763 11.0877 13.5087 12.7391 11.0638 12.7391H8.93623C6.49129 12.7391 4.4237 11.0877 3.99384 8.84382C3.92922 8.84907 3.86312 8.85182 3.79545 8.85182C2.25355 8.85182 1 7.59824 1 6.05634C1 4.51444 2.25355 3.26086 3.79545 3.26086C4.21755 3.26086 4.61742 3.36673 4.96596 3.55362C5.76883 1.54857 7.73774 0 10 0ZM10 2.39394C8.68757 2.39394 7.49242 2.94256 6.63636 3.80837C6.4269 4.02058 6.26342 4.27469 6.15439 4.55386C5.62168 4.27493 5.01786 4.11569 4.37727 4.11569C3.65866 4.11569 3.07576 4.69859 3.07576 5.4172C3.07576 6.1358 3.65866 6.7187 4.37727 6.7187C4.84684 6.7187 5.25982 6.48061 5.5 6.11228C5.72332 8.53953 7.8188 10.3452 10.3472 10.3452H12.1818C14.7102 10.3452 16.8057 8.53953 17.029 6.11228C17.2692 6.48061 17.6822 6.7187 18.1517 6.7187C18.8703 6.7187 19.4532 6.1358 19.4532 5.4172C19.4532 4.69859 18.8703 4.11569 18.1517 4.11569C17.5111 4.11569 16.9073 4.27493 16.3746 4.55386C16.2656 4.27469 16.1021 4.02058 15.8926 3.80837C15.0366 2.94256 13.8414 2.39394 12.529 2.39394H10ZM2.5 17.5V19.5H17.5V17.5H2.5Z"
      fill="currentColor"
    />
  </svg>
);

const FileIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="24" viewBox="0 0 20 24" fill="none">
    <path
      d="M5 1H12L18 7V22C18 22.5523 17.5523 23 17 23H5C4.44772 23 4 22.5523 4 22V2C4 1.44772 4.44772 1 5 1Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M12 1V7H18" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7 11H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const BoxIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="24" height="28" viewBox="0 0 25 29" fill="none">
    <path
      d="M25 8.0643C24.992 8.02582 24.992 7.98615 25 7.94766C24.9939 7.91391 24.9939 7.87936 25 7.84561V7.7144L24.9112 7.49572C24.8747 7.43629 24.8299 7.38229 24.7779 7.33535L24.6447 7.21872H24.5707L18.7379 3.58856L13.2307 0.23541C13.1023 0.137349 12.9568 0.0632347 12.8014 0.0167262H12.683C12.5507 -0.00557542 12.4155 -0.00557542 12.2833 0.0167262H12.1352C11.963 0.053461 11.798 0.117468 11.6467 0.220625L0.58799 6.98546L0.454753 7.08751L0.321516 7.20414L0.173475 7.30619L0.09945539 7.39367L0.0106289 7.61235V7.83103C-0.00354296 7.92773 -0.00354296 8.02592 0.0106289 8.12261V20.85C0.0101254 21.0978 0.073748 21.3416 0.19549 21.5584C0.317232 21.7752 0.493076 21.9579 0.706423 22.0892L11.8095 28.8539L12.0316 28.9413H12.155C12.4005 29.0196 12.6694 29.0196 12.9198 28.9413H13.0383L13.2603 28.8539L24.2746 22.1913C24.4879 22.06 24.6638 21.8773 24.7855 21.6605C24.9073 21.4436 24.9709 21.1998 24.9704 20.9521V8.22466C24.9704 8.22466 25 8.12261 25 8.0643ZM12.4313 3.18035L15.0664 4.78404L6.79092 9.82835L4.14098 8.22466L12.4313 3.18035ZM10.9509 25.0488L2.80861 20.1502V10.8343L10.9509 15.7911V25.0488ZM12.4313 13.2252L9.60371 11.5487L17.8792 6.48977L20.7216 8.22466L12.4313 13.2252ZM22.054 20.1065L13.9117 25.0925V15.7911L22.054 10.8343V20.1065Z"
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

export default CreateQuotation;
