import { useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import PemohonDashboard from './components/PemohonDashboard/PemohonDashboard';
import './App.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return isSignedIn ? (
    <PemohonDashboard onLogout={() => setIsSignedIn(false)} />
  ) : (
    <LoginPage onSignIn={() => setIsSignedIn(true)} />
  );
}

export default App;
