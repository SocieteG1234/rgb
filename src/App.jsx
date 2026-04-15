import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import HomePage            from './components/HomePage';
import LoginPage           from './components/LoginPage';
import InscriptionPage     from './components/InscriptionPage';
import DashboardPage       from './components/DashboardPage';
import HistoriquePage      from './components/HistoriquePage';
import VirementPage        from './components/VirementPage';
import AjouterBeneficiaire from './components/AjouterBeneficiaire';
import CartePage           from './components/CartePage';
import RIBPage             from './components/RIBPage';
import RecuPage            from './components/RecuPage';
import ConseillerPage      from './components/ConseillerPage';
import ActusPage           from './components/ActusPage';
import GestionDocuments    from './components/GestionDocuments';

const RBC_BLUE = '#003168';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return user ? children : <Navigate to="/login" replace />;
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: RBC_BLUE }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 44, height: 44, border: '4px solid rgba(255,255,255,0.3)',
          borderTopColor: '#fff', borderRadius: '50%',
          animation: 'spin 1s linear infinite', margin: '0 auto 16px',
        }} />
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Chargement...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function HomePageWrapper() {
  const navigate = useNavigate();
  return (
    <HomePage
      onNavigateToLogin={() => navigate('/login')}
      onNavigateToInscription={() => navigate('/inscription')}
    />
  );
}

function LoginPageWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) return <Navigate to="/dashboard" replace />;
  return <LoginPage navigate={navigate} />;
}

function InscriptionPageWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) return <Navigate to="/dashboard" replace />;
  return <InscriptionPage navigate={navigate} />;
}

function VirementPageWrapper({ setVirementData }) {
  const navigate = useNavigate();
  const handleSuccess = (data) => { setVirementData(data); navigate('/recu'); };
  return <VirementPage navigate={navigate} onVirementSuccess={handleSuccess} />;
}

function RecuPageWrapper({ virementData }) {
  const navigate = useNavigate();
  return <RecuPage navigate={navigate} virementData={virementData} />;
}

function AppRoutes() {
  const { loading }                     = useAuth();
  const [virementData, setVirementData] = useState(null);

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      {/* Public */}
      <Route path="/"           element={<HomePageWrapper />} />
      <Route path="/login"      element={<LoginPageWrapper />} />
      <Route path="/inscription" element={<InscriptionPageWrapper />} />

      {/* Protégées */}
      <Route path="/dashboard"            element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/historique"           element={<PrivateRoute><HistoriquePage /></PrivateRoute>} />
      <Route path="/virement"             element={<PrivateRoute><VirementPageWrapper setVirementData={setVirementData} /></PrivateRoute>} />
      <Route path="/ajouter-beneficiaire" element={<PrivateRoute><AjouterBeneficiaire /></PrivateRoute>} />
      <Route path="/cartes"               element={<PrivateRoute><CartePage /></PrivateRoute>} />
      <Route path="/rib"                  element={<PrivateRoute><RIBPage /></PrivateRoute>} />
      <Route path="/recu"                 element={<PrivateRoute><RecuPageWrapper virementData={virementData} /></PrivateRoute>} />
      <Route path="/conseiller"           element={<PrivateRoute><ConseillerPage /></PrivateRoute>} />
      <Route path="/actus"                element={<PrivateRoute><ActusPage /></PrivateRoute>} />
      <Route path="/documents"            element={<PrivateRoute><GestionDocuments /></PrivateRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; }
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        `}</style>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}