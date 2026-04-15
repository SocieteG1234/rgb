import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const RBC_BLUE = '#003168';
const RBC_GOLD = '#FEDF00';

const formatCAD = (amount) =>
  new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(amount);

export default function BlockedAccountModal({ user, onClose, onUnlock }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUnlock = async () => {
    setIsProcessing(true);
    try { await onUnlock(); onClose(); }
    catch (error) { console.error(error); }
    finally { setIsProcessing(false); }
  };

  if (!user || !user.isBlocked) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16, zIndex: 50,
    }}>
      <div style={{ background: '#fff', borderRadius: 8, maxWidth: 400, width: '100%', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>

        {/* Header */}
        <div style={{ background: RBC_BLUE, padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} color="#fff" />
              </div>
              <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Compte suspendu</h2>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div style={{ padding: '20px' }}>
          <p style={{ color: '#333', marginBottom: 12, fontSize: 14 }}>
            Bonjour <strong>{user.name}</strong>,
          </p>
          <p style={{ color: '#555', marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}>
            Votre compte RBC Banque Royale est temporairement suspendu.
            Des frais de déblocage sont applicables pour rétablir l'accès.
          </p>

          {user.blockReason && (
            <div style={{ background: '#fff8e1', border: '1px solid #f5c518', borderRadius: 6, padding: 12, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#5d4037' }}>
                <strong>Motif :</strong> {user.blockReason}
              </p>
            </div>
          )}

          <div style={{
            background: '#f5f5f5', borderRadius: 6, padding: '14px 16px',
            marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ color: '#333', fontWeight: 600, fontSize: 14 }}>Frais de déblocage :</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: RBC_BLUE }}>
              {formatCAD(user.unlockFee || 0)}
            </span>
          </div>

          <button onClick={handleUnlock} disabled={isProcessing} style={{
            width: '100%', padding: '14px', background: isProcessing ? '#90a4c8' : RBC_BLUE,
            color: '#fff', border: 'none', borderRadius: 4,
            fontSize: 15, fontWeight: 700, cursor: isProcessing ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {isProcessing
              ? <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> Traitement...</>
              : 'Compris'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 11, color: '#aaa', marginTop: 12 }}>
            Contactez le 1 800 769-2511 pour toute assistance.
          </p>
        </div>
      </div>
    </div>
  );
}