// ── SoldePage.jsx ─────────────────────────────────────────────────
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';

export default function SoldePage({ navigate }) {
  const { user } = useAuth();

  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', background: BGC_DARK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, border: `4px solid rgba(255,255,255,0.2)`, borderTopColor: BGC_RED, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ background: BGC_RED, borderRadius: 4, padding: '3px 7px' }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 12, letterSpacing: 1 }}>BGC</span>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Chargement...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}