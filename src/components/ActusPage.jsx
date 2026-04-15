import React, { useState } from 'react';
import { ChevronLeft, Bell, BellOff, ChevronRight, TrendingUp, Shield, Gift, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';
const BGC_GOLD = '#C9A84C';

const actus = [
  { id: 1, category: 'Offre',    title: 'Profitez de 3 mois offerts sur votre assurance auto BGC',    date: '12 jan. 2025', icon: Gift,      color: '#FEF9E7', iconColor: BGC_GOLD, unread: true  },
  { id: 2, category: 'Sécurité', title: 'Nouveau : authentification renforcée disponible',             date: '08 jan. 2025', icon: Shield,    color: '#DCFCE7', iconColor: '#16A34A', unread: true  },
  { id: 3, category: 'Marché',   title: 'Les taux hypothécaires en légère baisse ce mois-ci',          date: '05 jan. 2025', icon: TrendingUp,color: '#DBEAFE', iconColor: '#1D4ED8', unread: false },
  { id: 4, category: 'Info',     title: "Mise à jour des conditions générales d'utilisation BGC",      date: '02 jan. 2025', icon: Info,      color: '#FEE2E2', iconColor: BGC_RED,  unread: false },
];

const AlertesSection = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, label: 'Mon solde est inférieur à', value: '200 $', active: true  },
    { id: 2, label: 'Mon solde est supérieur à', value: '',      active: false },
  ]);

  const activeCount = alerts.filter(a => a.active).length;

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', paddingBottom: 96 }}>
      <div style={{ background: '#fff', padding: '20px 20px 16px' }}>
        <p style={{ fontSize: 18, fontWeight: 900, color: BGC_DARK, margin: 0 }}>Compte courant</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
          <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>0215 4578 9458</p>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600, background: '#FEE2E2', color: BGC_RED }}>
            <Bell style={{ width: 12, height: 12 }} /> {activeCount} activée
          </span>
        </div>
      </div>

      <div style={{ background: '#fff', padding: '16px 20px 8px', marginTop: 8 }}>
        <p style={{ fontSize: 15, fontWeight: 900, color: BGC_RED, margin: 0 }}>Être alerté quand...</p>
        <div style={{ marginTop: 4, width: 32, height: 4, borderRadius: 9999, background: BGC_GOLD }} />
      </div>

      <div style={{ background: '#fff', marginTop: 8 }}>
        {alerts.map((alert, i) => (
          <div key={alert.id}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: '#1F2937', margin: 0 }}>
                  {alert.label}{alert.value && <span style={{ fontWeight: 900 }}> {alert.value}</span>}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  {alert.active
                    ? <><Bell style={{ width: 14, height: 14, color: BGC_RED }} /><p style={{ fontSize: 11, fontWeight: 700, color: '#1F2937', margin: 0 }}>Par notification et email</p></>
                    : <><BellOff style={{ width: 14, height: 14, color: '#9CA3AF' }} /><p style={{ fontSize: 11, color: '#9CA3AF', margin: 0 }}>Désactivée</p></>
                  }
                </div>
              </div>
              <ChevronRight style={{ width: 20, height: 20, color: BGC_RED, flexShrink: 0 }} />
            </div>
            {i < alerts.length - 1 && <div style={{ margin: '0 20px', borderBottom: '1px solid #F0F0F0' }} />}
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
};

const ActusPage = () => {
  const navigate      = useNavigate();
  const [tab, setTab] = useState('actus');

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: 'Arial, sans-serif', paddingBottom: 96 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, position: 'sticky', top: 0, zIndex: 40, background: BGC_DARK, borderBottom: `3px solid ${BGC_RED}` }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft style={{ color: '#fff', width: 24, height: 24 }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ background: BGC_RED, borderRadius: 4, padding: '3px 7px' }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 12, letterSpacing: 1 }}>RBC</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', margin: 0 }}>
            {tab === 'actus' ? 'Mes Actus' : 'Mes Alertes'}
          </h1>
        </div>
        <div style={{ width: 24 }} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB', background: '#fff', padding: '0 16px' }}>
        {[{ id: 'actus', label: 'Actualités' }, { id: 'alertes', label: 'Mes alertes' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, paddingTop: 12, paddingBottom: 12, fontSize: 13, fontWeight: 600,
            border: 'none', background: 'none', cursor: 'pointer',
            color: tab === t.id ? BGC_RED : '#9CA3AF',
            borderBottom: tab === t.id ? `2px solid ${BGC_RED}` : '2px solid transparent',
            transition: 'color 0.2s',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'actus' ? (
        <>
          <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {actus.map((actu) => {
              const Icon = actu.icon;
              return (
                <button key={actu.id} style={{
                  width: '100%', background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex', alignItems: 'flex-start', gap: 12, textAlign: 'left', border: 'none', cursor: 'pointer',
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: actu.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: 20, height: 20, color: actu.iconColor }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '2px 6px', borderRadius: 4, background: '#FEE2E2', color: BGC_RED }}>
                        {actu.category}
                      </span>
                      {actu.unread && <span style={{ width: 8, height: 8, borderRadius: '50%', background: BGC_RED, flexShrink: 0 }} />}
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#1F2937', lineHeight: 1.4, margin: 0 }}>{actu.title}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>{actu.date}</p>
                  </div>
                  <ChevronRight style={{ width: 16, height: 16, color: '#D1D5DB', flexShrink: 0, marginTop: 4 }} />
                </button>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32, padding: '24px 16px', marginLeft: 16, marginRight: 16, borderRadius: 16, background: BGC_DARK, border: `1px solid ${BGC_GOLD}` }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>Paramétrez</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: BGC_GOLD, margin: 0 }}>vos alertes RBC</p>
          </div>
        </>
      ) : (
        <AlertesSection />
      )}

      <BottomNavigation />
    </div>
  );
};

export default ActusPage;