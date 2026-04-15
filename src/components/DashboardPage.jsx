import React, { useState, useEffect } from 'react';
import { Bell, X, User, CreditCard, FileText, HelpCircle, LogOut, Download, Shield, ChevronRight, Eye, EyeOff, FolderOpen, TrendingUp, ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from './BottomNavigation';
import BlockedAccountModal from './BlockedAccountModal';

const RBC_BLUE  = '#003168';
const RBC_GOLD  = '#FEDF00';
const RBC_BLUE2 = '#1a6fc4';

// Formatage en dollars canadiens
const formatCAD = (amount) =>
  new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' })
    .format(amount)
    .replace(/\$/, '$ CA');

const DashboardPage = () => {
  const navigate                                = useNavigate();
  const { user, updateKey, logout }             = useAuth();
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [showBalance, setShowBalance]           = useState(true);
  const [showMenu, setShowMenu]                 = useState(false);

  useEffect(() => {
    if (user?.isBlocked) setShowBlockedModal(true);
  }, [user]);

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment fermer la session ?')) {
      logout(); navigate('/');
    }
  };

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: RBC_BLUE }}>
      <div style={{ width: 40, height: 40, border: '4px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  const balance  = user?.accounts?.[0]?.balance ?? 0;
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const recentTx = (user?.transactions || []).slice(0, 3);

  const quickActions = [
    { label: 'Historique',  icon: FileText,    page: '/historique' },
    { label: 'Virement',    icon: ArrowUpRight, page: '/virement'  },
    { label: 'Mes cartes',  icon: CreditCard,  page: '/cartes'     },
    { label: 'Documents',   icon: FolderOpen,  page: '/documents'  },
  ];

  const accountIcons  = [Wallet, TrendingUp, TrendingUp];
  const accountColors = [
    { bg: '#fff3cd', icon: '#856404' },
    { bg: '#e8f0fe', icon: RBC_BLUE  },
    { bg: '#e8f5e9', icon: '#2e7d32' },
  ];
  const accountLabels = ['Compte chèques', 'Compte épargne', 'REER'];

  return (
    <div key={updateKey} style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Arial, sans-serif' }}>

      {/* ══ ZONE BLEUE ══ */}
      <div style={{ background: RBC_BLUE, paddingBottom: 48, borderRadius: '0 0 20px 20px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
          {/* Logo RBC */}
          <img src="/images/L1.jpeg" alt="RBC" style={{ height: 36, width: 'auto', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
          <span style={{ display: 'none', color: RBC_GOLD, fontWeight: 900, fontSize: 20 }}>RBC</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate('/actus')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', position: 'relative', padding: 4 }}>
              <Bell size={24} />
              <span style={{
                position: 'absolute', top: -2, right: -2, width: 16, height: 16,
                background: '#ef4444', borderRadius: '50%', fontSize: 9, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
              }}>2</span>
            </button>
            <button onClick={() => setShowMenu(!showMenu)} style={{
              width: 36, height: 36, borderRadius: '50%', background: RBC_GOLD,
              border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 13, color: RBC_BLUE,
            }}>{initials}</button>
          </div>
        </div>

        {/* Bonjour + solde */}
        <div style={{ padding: '4px 16px 0' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Bonjour,</p>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>{user?.name}</p>
          <div style={{ marginTop: 16 }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 2 }}>Solde disponible</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
              <p style={{ color: '#fff', fontWeight: 900, fontSize: 34, lineHeight: 1 }}>
                {showBalance ? formatCAD(balance) : '•••••••'}
              </p>
              <button onClick={() => setShowBalance(!showBalance)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.7 }}>
                {showBalance ? <EyeOff size={20} color="#fff" /> : <Eye size={20} color="#fff" />}
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 6 }}>
              N° {user?.accounts?.[0]?.accountNumber || user?.accountNumber || '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px' }}>

        {/* Actions rapides — flottant */}
        <div style={{
          marginTop: -24, background: '#fff', borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '12px 8px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {quickActions.map(a => (
              <button key={a.label} onClick={() => navigate(a.page)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: '10px 4px', background: 'none', border: 'none', cursor: 'pointer',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${RBC_BLUE}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a.icon size={20} color={RBC_BLUE} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: RBC_BLUE, textAlign: 'center' }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mes comptes */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: RBC_BLUE, marginBottom: 10 }}>Mes comptes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {user?.accounts?.map((acc, i) => {
              const IconComp = accountIcons[i] || CreditCard;
              const colors   = accountColors[i] || accountColors[1];
              return (
                <div key={i} onClick={() => navigate('/historique')} style={{
                  background: '#fff', borderRadius: 12, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComp size={20} color={colors.icon} />
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{accountLabels[i] || `Compte ${i+1}`}</p>
                      <p style={{ fontSize: 11, color: '#888' }}>{acc.number || `N° ${acc.accountNumber || '—'}`}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: RBC_BLUE }}>
                      {showBalance ? formatCAD(acc.balance || 0) : '•••••'}
                    </p>
                    <ChevronRight size={16} color="#ccc" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dernières opérations */}
        <div style={{ marginTop: 20, marginBottom: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: RBC_BLUE }}>Dernières opérations</p>
            <button onClick={() => navigate('/historique')} style={{
              background: 'none', border: 'none', color: RBC_BLUE2,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>Tout voir →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentTx.length > 0 ? recentTx.map(tx => (
              <div key={tx.id} style={{
                background: '#fff', borderRadius: 12, padding: '12px 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: tx.isCredit ? '#e8f5e9' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {tx.isCredit ? <ArrowDownLeft size={16} color="#16a34a" /> : <ArrowUpRight size={16} color="#dc2626" />}
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>{tx.reference}</p>
                    <p style={{ fontSize: 11, color: '#888' }}>{tx.date}</p>
                  </div>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: tx.isCredit ? '#16a34a' : '#dc2626' }}>
                  {tx.isCredit ? '+' : '-'}{formatCAD(tx.amount)}
                </p>
              </div>
            )) : (
              <div style={{ background: '#fff', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#888' }}>Aucune transaction récente</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu latéral */}
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }} />
          <div style={{
            position: 'fixed', top: 0, right: 0, height: '100%', width: '80%', maxWidth: 300,
            background: '#fff', zIndex: 50, display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ background: RBC_BLUE, padding: '20px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Menu</h2>
                <button onClick={() => setShowMenu(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                  <X size={22} />
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: RBC_GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: RBC_BLUE }}>{initials}</div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{user?.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>N° {user?.accountNumber}</p>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
              {[
                { label: 'Mon profil',      icon: User,       page: '/compte'     },
                { label: 'Mes comptes',     icon: CreditCard, page: '/dashboard'  },
                { label: 'Historique',      icon: FileText,   page: '/historique' },
                { label: 'Mes cartes',      icon: CreditCard, page: '/cartes'     },
                { label: 'Mon RIB',         icon: Download,   page: '/rib'        },
                { label: 'Mes documents',   icon: FolderOpen, page: '/documents'  },
                { label: 'Aide & Support',  icon: HelpCircle, page: '/aide'       },
              ].map(item => (
                <button key={item.label} onClick={() => { navigate(item.page); setShowMenu(false); }} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px', background: 'none', border: 'none',
                  borderBottom: '1px solid #f0f0f0', color: '#1a1a1a', fontSize: 14, cursor: 'pointer',
                }}>
                  <item.icon size={18} color={RBC_BLUE} />
                  {item.label}
                </button>
              ))}
            </div>

            <div style={{ padding: '12px', borderTop: '1px solid #e5e7eb' }}>
              <button onClick={() => { setShowMenu(false); handleLogout(); }} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '12px', background: '#fff0f0', border: 'none',
                borderRadius: 8, color: '#dc2626', fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}>
                <LogOut size={18} /> Fermer la session
              </button>
            </div>
          </div>
        </>
      )}

      {showBlockedModal && (
        <BlockedAccountModal user={user} onClose={() => setShowBlockedModal(false)} onUnlock={async () => setShowBlockedModal(false)} />
      )}

      <BottomNavigation />
    </div>
  );
};

export default DashboardPage;