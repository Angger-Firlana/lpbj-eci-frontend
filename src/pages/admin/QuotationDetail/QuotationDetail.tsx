import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './QuotationDetail.module.css';

type Approver = {
  id: string;
  name: string;
  role: string;
};

type QuotationItem = {
  id: string;
  no: string;
  name: string;
  spec: string;
  qty: string;
  article: string;
  store: string;
  gl: string;
  costCenter: string;
  order: string;
  image?: string;
};

type Column = {
  label: string;
  width: string;
};

const itemColumns: Column[] = [
  { label: 'No', width: '50px' },
  { label: 'Nama Barang', width: '1.4fr' },
  { label: 'Spesifikasi', width: '1.2fr' },
  { label: 'Qty', width: '0.6fr' },
  { label: 'Article', width: '0.8fr' },
  { label: 'Store', width: '0.8fr' },
  { label: 'G/L', width: '0.7fr' },
  { label: 'Cost Center', width: '1fr' },
  { label: 'Order', width: '0.8fr' },
  { label: 'Gambar', width: '0.9fr' },
];

const mockApprovers: Approver[] = [
  { id: 'apr-1', name: 'Pak Rahman', role: 'Atasan IT Dev' },
  { id: 'apr-2', name: 'Pak David', role: 'Atasan IT' },
];

const mockItems: QuotationItem[] = [
  {
    id: 'item-1',
    no: '1',
    name: 'Laptop Lenovo V14',
    spec: 'Intel Core i5, 8GB RAM, 256GB SSD',
    qty: '10',
    article: 'LPT-001',
    store: 'HO',
    gl: '8000',
    costCenter: 'IT-001',
    order: 'PO-001',
  },
];

const QuotationDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [approvers, setApprovers] = useState<Approver[]>(mockApprovers);
  const [isApproverModalOpen, setIsApproverModalOpen] = useState(false);

  // Mock: Check if quotation is approved based on ID
  // In real app, this would come from API
  const [isApproved] = useState(() => id === 'approved');

  const handleBack = () => {
    navigate('/admin/quotation');
  };

  const handleBuatPO = () => {
    navigate(`/admin/quotation/create-po/${id}`);
  };

  const handleRemoveApprover = (id: string) => {
    setApprovers((prev) => prev.filter((a) => a.id !== id));
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
          <div className={styles.tabList}>
            <button type="button" className={`${styles.tabButton} ${styles.activeTab}`}>
              LPBJ/2024/001
            </button>
          </div>
        </div>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleBuatPO}
        >
          <CartIcon className={styles.primaryIcon} />
          Buat PO
        </button>
      </div>

      {/* Main Content Grid */}
      <div className={styles.detailGrid}>
        {/* Left Side - Main Content */}
        <div className={styles.detailMain}>
          {/* Informasi Quotation Card */}
          <InfoCard title="Informasi Quotation">
            <div className={styles.infoGrid}>
              <InfoBlock label="No Quotation" value="10010101023123" />
              <InfoBlock label="TOP" value="NET 30" />
              <InfoBlock label="Delivery Team" value="-" />
              <InfoBlock label="Franco" value="Jakarta" />
              <InfoBlock label="Location" value="Jakarta" />
              <InfoBlock label="PKP/ NON PKP" value="PKP" />
              <InfoBlock label="Contact Person" value="Anggerrahhh - 08123456789" />
              <InfoBlock label="Note" value="Ada beberapa yang rusak" wide />
            </div>
          </InfoCard>

          {/* Daftar Item Section */}
          <ItemTable items={mockItems} columns={itemColumns} />
        </div>

        {/* Right Side - Approver Panel or Status Panel */}
        {isApproved ? (
          <aside className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Status Approveal</h3>
            </div>
            <div className={styles.statusList}>
              <div className={`${styles.statusItem} ${styles.statusApproved}`}>
                <div>
                  <div className={styles.approverName}>Pak Rahman</div>
                  <div className={styles.approverRole}>Atasan IT Dev</div>
                </div>
                <CheckCircleIcon className={styles.statusIcon} />
              </div>
              <div className={`${styles.statusItem} ${styles.statusApproved}`}>
                <div>
                  <div className={styles.approverName}>Pak David</div>
                  <div className={styles.approverRole}>Atasan IT</div>
                </div>
                <CheckCircleIcon className={styles.statusIcon} />
              </div>
            </div>
          </aside>
        ) : (
          <aside className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Tambah Approver</h3>
              {approvers.length > 0 ? (
                <button
                  type="button"
                  className={styles.panelAction}
                  onClick={() => setIsApproverModalOpen(true)}
                  aria-label="Atur approver"
                >
                  <UserAddIcon />
                </button>
              ) : null}
            </div>
            <div className={styles.panelList}>
              {approvers.length === 0 ? (
                <div className={styles.panelEmpty}>
                  <span>Belum ada approver,</span>
                  <button
                    type="button"
                    className={styles.panelEmptyAction}
                    onClick={() => setIsApproverModalOpen(true)}
                    aria-label="Pilih approver"
                  >
                    <UserAddIcon />
                  </button>
                </div>
              ) : (
                approvers.map((approver) => (
                  <div key={approver.id} className={styles.panelItem}>
                    <div>
                      <div className={styles.approverName}>{approver.name}</div>
                      <div className={styles.approverRole}>{approver.role}</div>
                    </div>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveApprover(approver.id)}
                      aria-label={`Remove ${approver.name}`}
                    >
                      <TrashIcon className={styles.removeIcon} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Atur Approver Modal */}
      {isApproverModalOpen ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Atur Approver</h3>
                <span className={styles.modalSubtitle}>Ref: LPBJ/2024/001</span>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsApproverModalOpen(false)}
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>
            </div>
            <div className={styles.modalSearch}>
              <SearchIcon className={styles.modalSearchIcon} />
              <input
                type="text"
                placeholder="Search"
                className={styles.modalInput}
              />
              <FilterIcon className={styles.modalFilterIcon} />
            </div>
            <div className={styles.modalList}>
              {mockApprovers.map((approver) => {
                const isSelected = approvers.some((a) => a.id === approver.id);
                return (
                  <button
                    key={approver.id}
                    type="button"
                    className={`${styles.modalItem} ${
                      isSelected ? styles.modalItemSelected : ''
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        handleRemoveApprover(approver.id);
                      } else {
                        setApprovers((prev) => [...prev, approver]);
                      }
                    }}
                  >
                    <div>
                      <div className={styles.approverName}>{approver.name}</div>
                      <div className={styles.approverRole}>{approver.role}</div>
                    </div>
                    {isSelected ? (
                      <span className={styles.approverIndicator}>
                        <CheckMiniIcon />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const InfoCard: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <section className={styles.card}>
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <FileIcon className={styles.cardIcon} />
        <h2 className={styles.cardTitle}>{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const InfoBlock: FC<{ label: string; value: string; wide?: boolean }> = ({
  label,
  value,
  wide = false,
}) => (
  <div className={`${styles.infoBlock} ${wide ? styles.infoBlockWide : ''}`}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
);

const ItemTable: FC<{ items: QuotationItem[]; columns: Column[] }> = ({
  items,
  columns,
}) => (
  <section className={styles.card}>
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <BoxIcon className={styles.cardIcon} />
        <h2 className={styles.cardTitle}>Daftar Item</h2>
      </div>
      <div className={styles.tableScroll}>
        <div
          className={styles.tableHeader}
          style={{ gridTemplateColumns: columns.map((col) => col.width).join(' ') }}
        >
          {columns.map((col) => (
            <span key={col.label}>{col.label}</span>
          ))}
        </div>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.tableRow} ${
              index % 2 === 1 ? styles.tableRowAlt : ''
            }`}
            style={{
              gridTemplateColumns: columns.map((col) => col.width).join(' '),
            }}
          >
            <span>{item.no}</span>
            <span>{item.name}</span>
            <span>{item.spec}</span>
            <span>{item.qty}</span>
            <span>{item.article}</span>
            <span>{item.store}</span>
            <span>{item.gl}</span>
            <span>{item.costCenter}</span>
            <span>{item.order}</span>
            <span>{item.image ? '📎' : '-'}</span>
          </div>
        ))}
        <div className={styles.summarySection}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Subtotal</span>
            <span className={styles.summaryValue}>Rp 15.000.000</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>PPN (10%)</span>
            <span className={styles.summaryValue}>Rp 1.500.000</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabelTotal}>Grand Total</span>
            <span className={styles.summaryValueTotal}>Rp 16.500.000</span>
          </div>
        </div>
      </div>
    </div>
  </section>
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

const CartIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 10C9.30625 10 8.75 10.5562 8.75 11.25C8.75 11.5815 8.8817 11.8995 9.11612 12.1339C9.35054 12.3683 9.66848 12.5 10 12.5C10.3315 12.5 10.6495 12.3683 10.8839 12.1339C11.1183 11.8995 11.25 11.5815 11.25 11.25C11.25 10.9185 11.1183 10.6005 10.8839 10.3661C10.6495 10.1317 10.3315 10 10 10Z"
      fill="#F4F4F4"
    />
    <path
      d="M3.75 10C3.05625 10 2.5 10.5562 2.5 11.25C2.5 11.5815 2.6317 11.8995 2.86612 12.1339C3.10054 12.3683 3.41848 12.5 3.75 12.5C4.08152 12.5 4.39946 12.3683 4.63388 12.1339C4.8683 11.8995 5 11.5815 5 11.25C5 10.9185 4.8683 10.6005 4.63388 10.3661C4.39946 10.1317 4.08152 10 3.75 10Z"
      fill="#F4F4F4"
    />
    <path
      d="M0 0.484291C0 0.907181 0.342819 1.25 0.765709 1.25C1.06147 1.25 1.33079 1.42034 1.45754 1.68757L2.74946 4.41137C3.22053 5.40453 3.18349 6.56394 2.65 7.525C2.55625 7.7 2.5 7.90625 2.5 8.125C2.5 8.45652 2.6317 8.77446 2.86612 9.00888C3.10054 9.2433 3.41848 9.375 3.75 9.375H10.625C10.9702 9.375 11.25 9.09518 11.25 8.75C11.25 8.40482 10.9702 8.125 10.625 8.125H4.0125C3.97106 8.125 3.93132 8.10854 3.90201 8.07924C3.87271 8.04993 3.85625 8.01019 3.85625 7.96875C3.85625 7.9375 3.8625 7.9125 3.875 7.89375C4.22204 7.26523 4.88326 6.875 5.60123 6.875H9.09375C9.5625 6.875 9.975 6.6125 10.1875 6.23125L12.425 2.1875C12.4687 2.0875 12.5 1.98125 12.5 1.875C12.5 1.70924 12.4342 1.55027 12.3169 1.43306C12.1997 1.31585 12.0408 1.25 11.875 1.25H4.01243C3.16943 1.25 2.40233 0.762934 2.04375 0H0.765709C0.342819 0 0 0.342819 0 0.765709V0.484291Z"
      fill="#F4F4F4"
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
      d="M25 8.0643C24.992 8.02582 24.992 7.98615 25 7.94766C24.9939 7.91391 24.9939 7.87936 25 7.84561V7.7144L24.9112 7.49572C24.8747 7.43629 24.8299 7.38229 24.7779 7.33535L24.6447 7.21872H24.5707L18.7379 3.58856L13.2307 0.23541C13.1023 0.137349 12.9568 0.0632347 12.8014 0.0167262H12.683C12.5507 -0.00557542 12.4155 -0.00557542 12.2833 0.0167262H12.1352C11.963 0.053461 11.798 0.117468 11.6467 0.206253L0.58799 6.98546L0.454753 7.08751L0.321516 7.20414L0.173475 7.30619L0.09945539 7.39367L0.0106289 7.61235V7.83103C-0.00354296 7.92773 -0.00354296 8.02592 0.0106289 8.12261V20.85C0.0101254 21.0978 0.073748 21.3416 0.19549 21.5584C0.317232 21.7752 0.493076 21.9579 0.706423 22.0892L11.8095 28.8539L12.0316 28.9413H12.155C12.4005 29.0196 12.6694 29.0196 12.9198 28.9413H13.0383L13.2603 28.8539L24.2746 22.1913C24.4879 22.06 24.6638 21.8773 24.7855 21.6605C24.9073 21.4436 24.9709 21.1998 24.9704 20.9521V8.22466C24.9704 8.22466 25 8.12261 25 8.0643ZM12.4313 3.18035L15.0664 4.78404L6.79092 9.82835L4.14098 8.22466L12.4313 3.18035ZM10.9509 25.0488L2.80861 20.1502V10.8343L10.9509 15.7911V25.0488ZM12.4313 13.2252L9.60371 11.5487L17.8792 6.48977L20.7216 8.22466L12.4313 13.2252ZM22.054 20.1065L13.9117 25.0925V15.7911L22.054 10.8343V20.1065Z"
      fill="currentColor"
    />
  </svg>
);

const UserAddIcon: FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M13 12C14.3261 12 15.5979 12.5268 16.5355 13.4645C17.4732 14.4021 18 15.6739 18 17V18C18 18.5304 17.7893 19.0391 17.4142 19.4142C17.0391 19.7893 16.5304 20 16 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V17C0 15.6739 0.526784 14.4021 1.46447 13.4645C2.40215 12.5268 3.67392 12 5 12H13ZM17 6C17.2652 6 17.5196 6.10536 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7V8H19C19.2652 8 19.5196 8.10536 19.7071 8.29289C19.8946 8.48043 20 8.73478 20 9C20 9.26522 19.8946 9.51957 19.7071 9.70711C19.5196 9.89464 19.2652 10 19 10H18V11C18 11.2652 17.8946 11.5196 17.7071 11.7071C17.5196 11.8946 17.2652 12 17 12C16.7348 12 16.4804 11.8946 16.2929 11.7071C16.1054 11.5196 16 11.2652 16 11V10H15C14.7348 10 14.4804 9.89464 14.2929 9.70711C14.1054 9.51957 14 9.26522 14 9C14 8.73478 14.1054 8.48043 14.2929 8.29289C14.4804 8.10536 14.7348 8 15 8H16V7C16 6.73478 16.1054 6.48043 16.2929 6.29289C16.4804 6.10536 16.7348 6 17 6ZM9 0C10.3261 0 11.5979 0.526784 12.5355 1.46447C13.4732 2.40215 14 3.67392 14 5C14 6.32608 13.4732 7.59785 12.5355 8.53553C11.5979 9.47322 10.3261 10 9 10C7.67392 10 6.40215 9.47322 5.46447 8.53553C4.52678 7.59785 4 6.32608 4 5C4 3.67392 4.52678 2.40215 5.46447 1.46447C6.40215 0.526784 7.67392 0 9 0Z"
      fill="currentColor"
    />
  </svg>
);

const TrashIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="16" viewBox="0 0 13 15" fill="none">
    <path
      d="M2.4375 15C1.99063 15 1.60821 14.8369 1.29025 14.5108C0.972292 14.1847 0.813042 13.7922 0.8125 13.3333V2.5H0V0.833333H4.0625V0H8.9375V0.833333H13V2.5H12.1875V13.3333C12.1875 13.7917 12.0285 14.1842 11.7106 14.5108C11.3926 14.8375 11.0099 15.0006 10.5625 15H2.4375ZM4.0625 11.6667H5.6875V4.16667H4.0625V11.6667ZM7.3125 11.6667H8.9375V4.16667H7.3125V11.6667Z"
      fill="currentColor"
    />
  </svg>
);

const SearchIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M16.3536 16L11.5622 11.5622C11.0502 11.984 10.4614 12.3064 9.79572 12.5294C9.13 12.7523 8.43256 12.8686 7.70341 12.8686C5.83584 12.8686 4.26984 12.232 3.00541 10.9589C1.741 9.68584 1.10879 8.15385 1.10879 6.36293C1.10879 4.57202 1.741 3.04003 3.00541 1.76693C4.26984 0.493821 5.83584 -0.142647 7.70341 -0.142647C9.57099 -0.142647 11.1369 0.493821 12.4014 1.76693C13.6658 3.04003 14.298 4.57202 14.298 6.36293C14.298 7.13279 14.1668 7.87273 13.9045 8.58277C13.6423 9.29282 13.2562 9.91076 12.7462 10.4366L17.7373 15.0348L16.3536 16ZM7.70341 11.3629C9.11768 11.3629 10.3116 10.8802 11.2852 9.9147C12.2588 8.94919 12.7456 7.74393 12.7456 6.2989C12.7456 4.85386 12.2588 3.64861 11.2852 2.6831C10.3116 1.71759 9.11768 1.23493 7.70341 1.23493C6.28914 1.23493 5.09517 1.71759 4.12158 2.6831C3.14799 3.64861 2.6612 4.85386 2.6612 6.2989C2.6612 7.74393 3.14799 8.94919 4.12158 9.9147C5.09517 10.8802 6.28914 11.3629 7.70341 11.3629Z"
      fill="#9C9C9C"
    />
  </svg>
);

const FilterIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="18" viewBox="0 0 20 22" fill="none">
    <path
      d="M12.4903 22C12.267 21.9999 12.0479 21.9382 11.8569 21.8216L7.77997 19.3606C7.32126 19.0822 6.94156 18.6896 6.67747 18.2206C6.41338 17.7516 6.27381 17.2221 6.27222 16.683V11.1151C6.273 10.7221 6.15157 10.3387 5.92493 10.0187L0.232639 1.9688C0.0997211 1.78297 0.0204035 1.56379 0.00343826 1.33547C-0.013527 1.10714 0.0325198 0.878541 0.136498 0.674883C0.240476 0.471225 0.398343 0.30043 0.592681 0.181341C0.787018 0.0622532 1.01027 -0.000498316 1.23781 1.07824e-05H18.761C18.9887 -0.000944043 19.2123 0.0615337 19.4069 0.180527C19.6015 0.29952 19.7596 0.470386 19.8636 0.674207C19.9677 0.878028 20.0137 1.10685 19.9965 1.33534C19.9793 1.56383 19.8996 1.78308 19.7662 1.9688L14.0739 10.0187C13.8468 10.3386 13.725 10.7219 13.7254 11.1151V20.7547C13.7251 21.0845 13.5949 21.4007 13.3634 21.634C13.132 21.8674 12.818 21.999 12.4903 22ZM1.23781 1.23666L6.92032 9.305C7.29692 9.8322 7.4981 10.4658 7.49505 11.1151V16.6818C7.4955 17.0084 7.57984 17.3294 7.73989 17.6135C7.89994 17.8977 8.13026 18.1354 8.40851 18.3036L12.4854 20.7646L12.5026 11.1138C12.4999 10.4644 12.7015 9.83082 13.0785 9.30377L18.7696 1.25388L1.23781 1.23666Z"
      fill="#9C9C9C"
    />
  </svg>
);

const CloseIcon: FC = () => (
  <svg width="14" height="14" viewBox="0 0 15 14" fill="none">
    <path
      d="M1.5 14L0 12.6L6 7L0 1.4L1.5 0L7.5 5.6L13.5 0L15 1.4L9 7L15 12.6L13.5 14L7.5 8.4L1.5 14Z"
      fill="currentColor"
    />
  </svg>
);

const CheckMiniIcon: FC = () => (
  <svg width="12" height="9" viewBox="0 0 11 8" fill="none">
    <path
      d="M1 4L4 7L10 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckCircleIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#2af31f" />
    <path
      d="M7 12L10 15L17 8"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default QuotationDetail;
