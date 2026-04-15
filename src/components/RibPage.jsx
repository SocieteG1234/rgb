import React, { useState } from 'react';
import {
  ArrowLeft, Download, Share2, Copy, CheckCircle,
  Wallet, Clock, ArrowLeftRight, CreditCard, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';
const BGC_GOLD = '#C9A84C';

export default function RIBPage() {
  const navigate           = useNavigate();
  const { user: authUser } = useAuth();

  const [activeTab, setActiveTab] = useState('rib');
  const [copied, setCopied]       = useState(false);

  const defaultUser = {
    id: 1,
    name: 'MARIE-FRANÇOISE BOIGNON',
    accountNumber: '20250000011',
    rib: {
      iban:          'CA76 3000 4000 0100 0123 4567 890',
      bankCode:      '30004',
      branchCode:    '00001',
      accountNumber: '00123456789',
      key:           '90',
    },
  };

  const currentUser = authUser || defaultUser;

  const menuItems = [
    { id: 'solde',      icon: Wallet,        label: 'Solde'      },
    { id: 'historique', icon: Clock,          label: 'Historique' },
    { id: 'virement',   icon: ArrowLeftRight, label: 'Virement'   },
    { id: 'cartes',     icon: CreditCard,     label: 'Cartes'     },
    { id: 'rib',        icon: FileText,       label: 'RIB'        },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const routes = {
      solde:      '/dashboard',
      historique: '/historique',
      virement:   '/virement',
      cartes:     '/cartes',
      rib:        '/rib',
    };
    if (routes[tabId]) navigate(routes[tabId]);
  };

  const getBankInfo = (u) => {
    const swift = 'BGCACATXXXX';
    if (u.rib?.iban) {
      return {
        accountHolder: u.name,
        iban:          u.rib.iban,
        swift,
        accountNumber: u.accountNumber,
        bankCode:      u.rib.bankCode  || '30002',
        branchCode:    u.rib.branchCode,
        accountKey:    u.rib.key,
        countryCode:   u.rib.iban.substring(0, 2),
      };
    }
    return {
      accountHolder: u.name,
      iban:          'Non défini',
      swift,
      accountNumber: u.accountNumber,
      bankCode:      '30002',
      branchCode:    'N/A',
      accountKey:    'N/A',
      countryCode:   'CA',
    };
  };

  const bankInfo = getBankInfo(currentUser);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width  = 595;
    canvas.height = 842;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = BGC_DARK;
    ctx.fillRect(0, 0, canvas.width, 120);
    ctx.fillStyle = BGC_RED;
    ctx.fillRect(0, 112, canvas.width, 8);

    ctx.fillStyle = BGC_RED;
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('BGC', 40, 55);
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px Arial';
    ctx.fillText('Banque Générale du Canada', 40, 72);
    ctx.font = '9px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('Votre banque, votre avenir', 40, 88);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText("Relevé d'Identité Bancaire", 555, 65);

    let y = 160;
    ctx.textAlign = 'left';

    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.fillText('TITULAIRE DU COMPTE', 40, y);
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 18px Arial';
    ctx.fillText(bankInfo.accountHolder, 40, y + 25);
    y += 60;

    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.fillText('IBAN', 40, y);
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(40, y + 5, 515, 35);
    ctx.fillStyle = '#1f2937';
    ctx.font = '16px Courier New';
    ctx.fillText(bankInfo.iban, 50, y + 28);
    y += 60;

    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.fillText('CODE SWIFT/BIC', 40, y);
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(40, y + 5, 515, 35);
    ctx.fillStyle = '#1f2937';
    ctx.font = '16px Courier New';
    ctx.fillText(bankInfo.swift, 50, y + 28);
    y += 70;

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, y); ctx.lineTo(555, y);
    ctx.stroke();
    y += 25;

    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.fillText('DÉTAILS DU COMPTE', 40, y);
    y += 25;

    const gridData = [
      { label: 'Code banque',      value: bankInfo.bankCode,      x: 40  },
      { label: 'Code succursale',  value: bankInfo.branchCode,    x: 310 },
      { label: 'Numéro de compte', value: bankInfo.accountNumber, x: 40  },
      { label: 'Clé RIB',         value: bankInfo.accountKey,    x: 310 },
    ];

    gridData.forEach((item, i) => {
      const yPos = y + Math.floor(i / 2) * 50;
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.fillText(item.label, item.x, yPos);
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(item.x, yPos + 5, 235, 30);
      ctx.fillStyle = '#1f2937';
      ctx.font = '14px Courier New';
      ctx.fillText(item.value, item.x + 10, yPos + 25);
    });
    y += 130;

    ctx.strokeStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.moveTo(40, y); ctx.lineTo(555, y);
    ctx.stroke();
    y += 25;
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Document généré le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      canvas.width / 2, y
    );
    ctx.fillText('Ce RIB peut être utilisé pour effectuer des virements bancaires.', canvas.width / 2, y + 20);

    canvas.toBlob((blob) => {
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = `RIB_BGC_${currentUser.name.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const handleShare = async () => {
    const text = `RIB BGC - ${bankInfo.accountHolder}\n\nIBAN: ${bankInfo.iban}\nSWIFT: ${bankInfo.swift}`;
    if (navigator.share) {
      try { await navigator.share({ title: 'Mon RIB BGC', text }); }
      catch (err) { if (err.name !== 'AbortError') handleCopy(text); }
    } else {
      handleCopy(text);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      {/* Header */}
      <header style={{
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        position: 'sticky', top: 0, zIndex: 20,
        borderBottom: `3px solid ${BGC_RED}`,
      }}>
        <div style={{ maxWidth: 896, margin: '0 auto', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => navigate('/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563' }}>
            <ArrowLeft size={20} />
            <span style={{ fontSize: 14 }}>Retour</span>
          </button>

          {/* Logo BGC */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ background: BGC_RED, borderRadius: 4, padding: '4px 8px' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 14, letterSpacing: 1 }}>BGC</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 13, color: BGC_DARK }}>Banque Générale du Canada</span>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleShare}    style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8 }} title="Partager"><Share2 size={20} color="#4B5563" /></button>
            <button onClick={handleDownload} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8 }} title="Télécharger"><Download size={20} color="#4B5563" /></button>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <main style={{ maxWidth: 896, margin: '0 auto', padding: '24px 16px 96px' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 24 }}>

          {/* En-tête BGC */}
          <div style={{ padding: 24, background: BGC_DARK, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: `2px solid ${BGC_GOLD}`,
                background: 'rgba(255,255,255,0.08)',
              }}>
                <div style={{ color: BGC_RED, fontWeight: 900, fontSize: 20, letterSpacing: 2 }}>BGC</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 7, marginTop: 2 }}>Banque Générale du Canada</div>
              </div>
              <div>
                <h2 style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>Banque Générale du Canada</h2>
                <p style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>Relevé d'Identité Bancaire</p>
              </div>
            </div>
          </div>

          {/* Informations */}
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <p style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase', marginBottom: 4 }}>Titulaire du compte</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#1F2937' }}>{bankInfo.accountHolder}</p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <p style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase' }}>IBAN ({bankInfo.countryCode})</p>
                <button onClick={() => handleCopy(bankInfo.iban)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: BGC_RED, background: 'none', border: 'none', cursor: 'pointer' }}>
                  {copied ? <><CheckCircle size={14} /> Copié</> : <><Copy size={14} /> Copier</>}
                </button>
              </div>
              <p style={{ fontFamily: 'monospace', fontSize: 15, color: '#1F2937', background: '#F9FAFB', padding: '12px', borderRadius: 8 }}>{bankInfo.iban}</p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <p style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase' }}>Code SWIFT/BIC</p>
                <button onClick={() => handleCopy(bankInfo.swift)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: BGC_RED, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Copy size={14} /> Copier
                </button>
              </div>
              <p style={{ fontFamily: 'monospace', fontSize: 15, color: '#1F2937', background: '#F9FAFB', padding: '12px', borderRadius: 8 }}>{bankInfo.swift}</p>
            </div>

            <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: 16 }}>
              <p style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase', marginBottom: 12 }}>Détails du compte</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Code banque',      value: bankInfo.bankCode      },
                  { label: 'Code succursale',  value: bankInfo.branchCode    },
                  { label: 'N° de compte',     value: bankInfo.accountNumber },
                  { label: 'Clé RIB',          value: bankInfo.accountKey    },
                ].map(item => (
                  <div key={item.label}>
                    <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#1F2937' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <button onClick={handleDownload} style={{ background: BGC_RED, color: '#fff', padding: '16px', borderRadius: 12, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Download size={20} /> Télécharger
          </button>
          <button onClick={handleShare} style={{ background: '#fff', color: '#1F2937', padding: '16px', borderRadius: 12, border: '1px solid #E5E7EB', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Share2 size={20} /> Partager
          </button>
        </div>
      </main>

      {/* Bottom nav */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: `2px solid ${BGC_RED}`, boxShadow: '0 -2px 12px rgba(0,0,0,0.08)', zIndex: 40 }}>
        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            {menuItems.map(item => (
              <button key={item.id} onClick={() => handleTabClick(item.id)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', color: activeTab === item.id ? BGC_RED : '#6B7280' }}>
                <item.icon size={24} />
                <span style={{ fontSize: 11, fontWeight: 500 }}>{item.label}</span>
                {activeTab === item.id && <div style={{ width: 16, height: 2, borderRadius: 9999, background: BGC_RED }} />}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}