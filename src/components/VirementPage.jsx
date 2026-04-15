import React from 'react';
import { ArrowLeft, Users, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from './BottomNavigation';
import AjouterBeneficiaire from './AjouterBeneficiaire';
import emailjs from '@emailjs/browser';

// ── Palette Banque Générale du Canada ──────────────────────────────
const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';
const BGC_GOLD = '#C9A84C';

// ── Config EmailJS ─────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_zlw3u1o';
const EMAILJS_TEMPLATE_ID = 'template_b0bnvef';
const EMAILJS_PUBLIC_KEY  = '97pwynnX_1TDC0o0O';

/**
 * Envoie une notification email au bénéficiaire.
 */
export async function sendVirementNotification({ beneficiaireEmail, beneficiaireNom, montant, currency, expediteurNom }) {
  const templateParams = {
    to_email:      beneficiaireEmail,
    to_name:       beneficiaireNom,
    from_name:     expediteurNom,
    montant:       new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(montant),
    currency,
    date_virement: new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
  };

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY,
  );
}

export default function VirementPage() {
  const navigate = useNavigate();
  const { user }  = useAuth();

  const mainAccount = user?.accounts?.find(a => a.type === 'LIQUIDITE') || user?.accounts?.[0];
  const solde       = mainAccount
    ? new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(mainAccount.balance)
    : '0,00';
  const currency = mainAccount?.currency || '$';

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: 'Arial, sans-serif', paddingBottom: 96 }}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <div style={{
        background: '#fff',
        borderBottom: `3px solid ${BGC_RED}`,
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: 8, borderRadius: '50%', border: 'none',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ArrowLeft size={20} color={BGC_DARK} />
          </button>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, background: BGC_RED, borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 900, letterSpacing: -1 }}>RBC</span>
              </div>
              <h1 style={{ fontSize: 16, fontWeight: 700, color: BGC_DARK, margin: 0 }}>Virement</h1>
            </div>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>
              Solde :{' '}
              <span style={{ fontWeight: 700, color: BGC_RED }}>
                {solde} {currency}
              </span>
            </p>
          </div>
        </div>

        {/* Onglet unique Bénéficiaires */}
        <div style={{ display: 'flex', borderTop: '1px solid #F0F0F0' }}>
          <button
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 4, padding: '10px 0', fontSize: 11, fontWeight: 600,
              border: 'none', background: 'transparent',
              cursor: user?.isBlocked ? 'not-allowed' : 'pointer',
              color: user?.isBlocked ? '#D1D5DB' : BGC_RED,
              position: 'relative',
            }}
          >
            <Users size={16} />
            Bénéficiaires
            {!user?.isBlocked && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 3, background: BGC_RED, borderRadius: '3px 3px 0 0',
              }} />
            )}
          </button>
        </div>
      </div>

      {/* ── Compte bloqué ──────────────────────────────────────── */}
      {user?.isBlocked ? (
        <div style={{
          padding: '40px 16px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center', gap: 20,
        }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%', background: BGC_RED,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(204,0,0,0.3)',
          }}>
            <Lock size={48} color="#fff" />
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: BGC_DARK, marginBottom: 8 }}>
              Virements indisponibles
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 280 }}>
              Votre compte est actuellement bloqué. Les virements sont suspendus jusqu'au déblocage de votre compte.
            </p>
          </div>

          {user?.blockReason && (
            <div style={{
              background: '#FFF8E1', border: '1px solid #F9C825',
              borderRadius: 16, padding: 16, width: '100%', maxWidth: 320,
            }}>
              <p style={{ fontSize: 11, color: '#B45309', fontWeight: 600, marginBottom: 4 }}>Motif du blocage</p>
              <p style={{ fontSize: 14, color: '#78350F' }}>{user.blockReason}</p>
            </div>
          )}

          {user?.unlockFee > 0 && (
            <div style={{
              background: BGC_DARK, borderRadius: 16, padding: 20,
              width: '100%', maxWidth: 320, color: '#fff',
              border: `2px solid ${BGC_GOLD}`,
            }}>
              <p style={{ fontSize: 11, opacity: 0.6, marginBottom: 4 }}>Frais de déblocage</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: BGC_GOLD }}>
                {user.unlockFee.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} $
              </p>
            </div>
          )}

          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '12px 32px', borderRadius: 100, border: 'none',
              background: BGC_RED, color: '#fff', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(204,0,0,0.3)',
            }}
          >
            Retour au tableau de bord
          </button>
        </div>
      ) : (
        <div style={{ padding: '20px 16px' }}>
          <AjouterBeneficiaire
            onVirementSuccess={sendVirementNotification}
            currency={currency}
            expediteurNom={user?.name || 'Client BGC'}
          />
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}