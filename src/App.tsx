import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import PemohonLayout from './layouts/PemohonLayout';
import AtasanLayout from './layouts/AtasanLayout';

import LoginPage from './pages/LoginPage/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import AdminLpbj from './pages/admin/AdminLpbj/AdminLpbj';
import EditLpbj from './pages/admin/EditLpbj/EditLpbj';
import QuotationPage from './pages/admin/placeholders/QuotationPage';
import QuotationDetail from './pages/admin/QuotationDetail/QuotationDetail';
import CreateQuotation from './pages/admin/CreateQuotation/CreateQuotation';
import CreatePO from './pages/admin/CreatePO/CreatePO';
import AdminPurchaseOrder from './pages/admin/AdminPurchaseOrder/AdminPurchaseOrder';
import AdminHistory from './pages/admin/AdminHistory/AdminHistory';
import UserManagement from './pages/admin/UserManagement/UserManagement';
import AtasanManagement from './pages/admin/AtasanManagement/AtasanManagement';
import AdminAccountSetting from './pages/admin/AdminAccountSetting/AdminAccountSetting';

import PemohonDashboard from './pages/pemohon/PemohonDashboard/PemohonDashboard';
import PemohonLpbj from './pages/pemohon/PemohonLpbj/PemohonLpbj';
import History from './pages/pemohon/History/History';
import AccountSetting from './pages/pemohon/AccountSetting/AccountSetting';

import AtasanDashboard from './pages/atasan/AtasanDashboard/AtasanDashboard';
import AtasanInbox from './pages/atasan/AtasanInbox/AtasanInbox';
import AtasanLpbjDetail from './pages/atasan/LpbjDetail/LpbjDetail';
import AtasanQuotationDetail from './pages/atasan/QuotationDetail/QuotationDetail';
import AtasanHistory from './pages/atasan/AtasanHistory/AtasanHistory';
import HistoryLpbjDetail from './pages/atasan/HistoryLpbjDetail/HistoryLpbjDetail';
import HistoryQuotationDetail from './pages/atasan/HistoryQuotationDetail/HistoryQuotationDetail';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="lpbj" element={<AdminLpbj />} />
            <Route path="lpbj/edit/:id" element={<EditLpbj />} />
            <Route path="quotation" element={<QuotationPage />} />
            <Route path="quotation/view/:id" element={<QuotationDetail />} />
            <Route path="quotation/create" element={<CreateQuotation />} />
            <Route path="quotation/edit/:id" element={<CreateQuotation />} />
            <Route path="quotation/create-po/:id" element={<CreatePO />} />
            <Route path="purchase" element={<AdminPurchaseOrder />} />
            <Route path="history" element={<AdminHistory />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="atasan" element={<AtasanManagement />} />
            <Route path="account" element={<AdminAccountSetting />} />
          </Route>

          <Route
            path="/pemohon"
            element={
              <ProtectedRoute requiredRole="pemohon">
                <PemohonLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/pemohon/dashboard" replace />} />
            <Route path="dashboard" element={<PemohonDashboard />} />
            <Route path="lpbj" element={<PemohonLpbj />} />
            <Route path="history" element={<History />} />
            <Route path="account" element={<AccountSetting />} />
          </Route>

          <Route
            path="/atasan"
            element={
              <ProtectedRoute requiredRole="atasan">
                <AtasanLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/atasan/dashboard" replace />} />
            <Route path="dashboard" element={<AtasanDashboard />} />
            <Route path="inbox" element={<AtasanInbox />} />
            <Route path="inbox/lpbj/:id" element={<AtasanLpbjDetail />} />
            <Route path="inbox/quotation/:id" element={<AtasanQuotationDetail />} />
            <Route path="history" element={<AtasanHistory />} />
            <Route path="history/lpbj/:id" element={<HistoryLpbjDetail />} />
            <Route path="history/quotation/:id" element={<HistoryQuotationDetail />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
