import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ArrowUpRight, ArrowDownRight, Download, Wallet, Clock, ArrowLeftRight, CreditCard, FileText } from 'lucide-react';

const RBC_BLUE  = '#003168';
const RBC_GOLD  = '#FEDF00';
const RBC_BLUE2 = '#1a6fc4';

const formatCAD = (amount) =>
  new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' })
    .format(amount)
    .replace(/\$/, '$ CA');

export default function HistoriquePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab]   = useState('historique');
  const [filterType, setFilterType] = useState('all');

  const allTransactions = user?.transactions || [];

  const filteredTransactions = allTransactions.filter(tx => {
    const matchesSearch =
      tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'all')      return matchesSearch;
    if (filterType === 'virement') return matchesSearch && tx.type.toLowerCase().includes('virement');
    if (filterType === 'achat')    return matchesSearch && tx.type.toLowerCase().includes('achat');
    if (filterType === 'retrait')  return matchesSearch && tx.type.toLowerCase().includes('retrait');
    return matchesSearch;
  });

  const menuItems = [
    { id: 'solde',      icon: Wallet,        label: 'Solde'      },
    { id: 'historique', icon: Clock,          label: 'Historique' },
    { id: 'virement',   icon: ArrowLeftRight, label: 'Virement'   },
    { id: 'cartes',     icon: CreditCard,     label: 'Cartes'     },
    { id: 'rib',        icon: FileText,       label: 'RIB'        },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const routes = { solde:'/dashboard', historique:'/historique', virement:'/virement', cartes:'/cartes', rib:'/rib' };
    if (routes[tabId]) navigate(routes[tabId]);
  };

  const balance = user?.accounts?.[0]?.balance ?? user?.balance ?? 0;

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ background: RBC_BLUE }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <button onClick={() => navigate('/dashboard')} style={{
                display: 'flex', alignItems: 'center', gap: 6, background: 'none',
                border: 'none', color: '#fff', cursor: 'pointer', fontSize: 14,
              }}>
                <ArrowLeft size={20} /> Retour
              </button>

              {/* Logo */}
              <img
                src="/images/L1.jpeg"
                alt="RBC"
                style={{ height: 32, width: 'auto', objectFit: 'contain' }}
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
              />
              <span style={{ display: 'none', color: RBC_GOLD, fontWeight: 900, fontSize: 18 }}>RBC</span>

              <button style={{ background:'none', border:'none', color:'#fff', cursor:'pointer' }}>
                <Download size={20} />
              </button>
            </div>
            <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 14 }}>
              Historique des transactions
            </h1>
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#888" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text" placeholder="Rechercher une transaction..."
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%', padding: '11px 12px 11px 38px', border: 'none',
                  borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ background: RBC_GOLD, height: 4 }} />
      </header>

      <main style={{ maxWidth: 600, margin: '0 auto', padding: '16px 16px 120px' }}>

        {/* Solde */}
        <div style={{ background: RBC_BLUE, borderRadius: 12, padding: '20px', marginBottom: 16, color: '#fff' }}>
          <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Solde actuel</p>
          <p style={{ fontSize: 30, fontWeight: 800 }}>{formatCAD(balance)}</p>
        </div>

        {/* Filtres */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { id: 'all',      label: 'Tout'      },
            { id: 'virement', label: 'Virements' },
            { id: 'achat',    label: 'Achats'    },
            { id: 'retrait',  label: 'Retraits'  },
          ].map(f => (
            <button key={f.id} onClick={() => setFilterType(f.id)} style={{
              padding: '8px 16px', borderRadius: 8, fontWeight: 600, fontSize: 13,
              whiteSpace: 'nowrap', border: `1.5px solid ${filterType === f.id ? RBC_BLUE : '#d1d5db'}`,
              background: filterType === f.id ? RBC_BLUE : '#fff',
              color: filterType === f.id ? '#fff' : '#555', cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>

        {/* Liste transactions */}
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {filteredTransactions.map((tx, i) => (
            <div key={tx.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
              borderBottom: i < filteredTransactions.length - 1 ? '1px solid #f0f0f0' : 'none',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: tx.isCredit ? '#e8f5e9' : '#fef2f2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {tx.isCredit
                  ? <ArrowDownRight size={22} color="#16a34a" />
                  : <ArrowUpRight   size={22} color="#dc2626" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.type}</p>
                <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{tx.date}</p>
                <p style={{ fontSize: 10, color: '#bbb', fontFamily: 'monospace' }}>{tx.reference}</p>
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: tx.isCredit ? '#16a34a' : '#dc2626', flexShrink: 0 }}>
                {tx.isCredit ? '+' : ''}{formatCAD(tx.amount)}
              </p>
            </div>
          ))}
          {filteredTransactions.length === 0 && (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ color: '#888', fontSize: 14 }}>Aucune transaction trouvée</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom nav */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #e5e7eb', zIndex: 40 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex' }}>
          {menuItems.map(item => (
            <button key={item.id} onClick={() => handleTabClick(item.id)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === item.id ? RBC_BLUE : '#9ca3af',
            }}>
              <item.icon size={22} />
              <span style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</span>
              {activeTab === item.id && <div style={{ width: 16, height: 3, background: RBC_BLUE, borderRadius: 2 }} />}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}