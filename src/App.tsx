import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/LoginPage/LoginPage';
import PemohonDashboard from './components/PemohonDashboard/PemohonDashboard';
import './App.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState<'pemohon' | 'admin'>('pemohon');

  const handleSignInRole = (nextRole: 'pemohon' | 'admin') => {
    setRole(nextRole);
    setIsSignedIn(true);
  };

  return isSignedIn ? (
    role === 'admin' ? (
      <Dashboard />
    ) : (
      <PemohonDashboard onLogout={() => setIsSignedIn(false)} />
    )
  ) : (
    <LoginPage
      onSignIn={() => handleSignInRole('pemohon')}
      onSignInRole={handleSignInRole}
    />
  );
}

export default App;
