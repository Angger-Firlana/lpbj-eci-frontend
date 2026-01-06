import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import PemohonLayout from './layouts/PemohonLayout';

import LoginPage from './pages/LoginPage/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import AdminLpbj from './pages/admin/AdminLpbj/AdminLpbj';
import EditLpbj from './pages/admin/EditLpbj/EditLpbj';
import QuotationPage from './pages/admin/placeholders/QuotationPage';
import QuotationDetail from './pages/admin/QuotationDetail/QuotationDetail';
import CreateQuotation from './pages/admin/CreateQuotation/CreateQuotation';
import CreatePO from './pages/admin/CreatePO/CreatePO';
import PurchasePage from './pages/admin/placeholders/PurchasePage';
import AdminHistoryPage from './pages/admin/placeholders/AdminHistoryPage';
import UsersPage from './pages/admin/placeholders/UsersPage';
import AtasanPage from './pages/admin/placeholders/AtasanPage';

import PemohonDashboard from './pages/pemohon/PemohonDashboard/PemohonDashboard';
import PemohonLpbj from './pages/pemohon/PemohonLpbj/PemohonLpbj';
import History from './pages/pemohon/History/History';
import AccountSetting from './pages/pemohon/AccountSetting/AccountSetting';

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
            <Route path="purchase" element={<PurchasePage />} />
            <Route path="history" element={<AdminHistoryPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="atasan" element={<AtasanPage />} />
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

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
