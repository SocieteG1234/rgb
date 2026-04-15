import React, { useState } from 'react';
import { ChevronLeft, User, Shield, Wifi, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from './BottomNavigation';

const RBC_BLUE = '#003168';
const RBC_GOLD = '#FEDF00';
const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';
const BGC_GOLD = '#C9A84C';

const formatCAD = (amount) =>
  new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' })
    .format(amount)
    .replace(/\$/, '$ CA');

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    style={{
      position: 'relative', display: 'inline-flex', alignItems: 'center',
      width: 48, height: 24, borderRadius: 9999, border: 'none', cursor: 'pointer',
      backgroundColor: enabled ? BGC_RED : '#D1D5DB',
      transition: 'background-color 0.2s', flexShrink: 0,
    }}
  >
    <span style={{
      display: 'inline-block', width: 20, height: 20, background: '#fff',
      borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transform: enabled ? 'translateX(26px)' : 'translateX(2px)',
      transition: 'transform 0.2s',
    }} />
  </button>
);

const CardVisual = ({ gradient, labelColor, type, textColor, user, cardNum, accountIndex }) => (
  <div style={{
    position: 'relative', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    overflow: 'hidden', padding: 12, aspectRatio: '1.586', width: '100%', color: textColor,
    background: gradient,
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 55%)', pointerEvents: 'none' }} />
    <div style={{
      position: 'absolute', right: 12, top: '50%', fontWeight: 900,
      fontSize: 10, color: labelColor, writingMode: 'vertical-rl',
      transform: 'translateY(-50%) rotate(180deg)', letterSpacing: '0.3em', opacity: 0.4,
    }}>{type}</div>
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Puce stylisée */}
        <div style={{ width: 28, height: 20, background: BGC_GOLD, borderRadius: 4, marginBottom: 4, opacity: 0.9 }} />
        <p style={{ fontSize: 11, fontWeight: 700, margin: 0 }}>Mes dépenses</p>
        <p style={{ fontSize: 9, opacity: 0.7, margin: 0 }}>sur 30 jours</p>
      </div>
      <p style={{ fontSize: 17, fontWeight: 900, letterSpacing: -0.5, margin: 0 }}>
        {user?.accounts?.[accountIndex]?.balance
          ? formatCAD(Number(user.accounts[accountIndex].balance))
          : '$ CA 0,00'}
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, margin: 0 }}>{user?.name || 'Titulaire'}</p>
          <p style={{ fontSize: 9, opacity: 0.7, margin: '2px 0 0' }}>{cardNum} &nbsp; 05/2028</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Logo RBC */}
          <img
            src="/images/L1.jpeg"
            alt="RBC"
            style={{ height: 20, width: 'auto', objectFit: 'contain', opacity: 0.9 }}
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          <span style={{ display: 'none', fontSize: 9, fontWeight: 900, color: textColor }}>RBC</span>
          <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.8 }}>VISA</div>
        </div>
      </div>
    </div>
  </div>
);

const CartePage = () => {
  const navigate              = useNavigate();
  const { user }              = useAuth();
  const [activeCard, setCard] = useState(0);
  const [activeTab, setTab]   = useState('parametres');
  const [locked, setLocked]   = useState(false);
  const [nfc, setNfc]         = useState(true);
  const [online, setOnline]   = useState(true);
  const [abroad, setAbroad]   = useState(false);

  const CARDS_DEF = [
    { id: 'prestige', label: 'Carte Prestige', gradient: `linear-gradient(135deg, ${BGC_GOLD} 0%, #e8d06a 30%, #c9a227 60%, #b8941f 100%)`, labelColor: BGC_DARK, textColor: BGC_DARK, type: 'PRESTIGE', cardNum: 'XX1289' },
    { id: 'standard', label: 'Carte Standard', gradient: `linear-gradient(135deg, ${BGC_DARK} 0%, #2d2d4e 50%, #1a1a3e 100%)`,                labelColor: '#ffffff',  textColor: '#ffffff',  type: 'VISA',     cardNum: 'XX4521' },
    { id: 'elite',    label: 'Carte Élite',    gradient: `linear-gradient(135deg, ${BGC_RED} 0%, #a00000 50%, #800000 100%)`,                  labelColor: '#ffffff',  textColor: '#ffffff',  type: 'ELITE',    cardNum: 'XX7893' },
  ];

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif', paddingBottom: 96, paddingTop: 0, backgroundColor: BGC_DARK }}>

      {/* Zone header + carousel */}
      <div style={{ backgroundColor: BGC_DARK, paddingBottom: 32, borderRadius: '0 0 24px 24px' }}>

        {/* Header fixé */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          backgroundColor: BGC_DARK, borderBottom: `2px solid ${BGC_RED}`,
        }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ChevronLeft style={{ color: '#fff', width: 24, height: 24 }} />
          </button>

          {/* Logo RBC */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img
              src="/images/L1.jpeg"
              alt="RBC"
              style={{ height: 32, width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
            <span style={{ display: 'none', color: RBC_GOLD, fontWeight: 900, fontSize: 18 }}>RBC</span>
            <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>Mes Cartes</h1>
          </div>

          <button onClick={() => navigate('/compte')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <User style={{ color: '#fff', width: 24, height: 24 }} />
          </button>
        </div>

        {/* Carousel mobile */}
        <div style={{ maxWidth: 768, margin: '0 auto', width: '100%', paddingTop: 72 }}>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 24px 8px', scrollSnapType: 'x mandatory' }}>
            {CARDS_DEF.map((c, i) => (
              <button key={c.id} onClick={() => setCard(i)} style={{
                scrollSnapAlign: 'center', flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer',
                width: '80vw', maxWidth: 320,
                transform: activeCard === i ? 'scale(1.04)' : 'scale(0.93)',
                opacity: activeCard === i ? 1 : 0.6,
                transition: 'all 0.3s',
              }}>
                <CardVisual gradient={c.gradient} labelColor={c.labelColor} type={c.type} textColor={c.textColor} cardNum={c.cardNum} user={user} accountIndex={i} />
                <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, marginTop: 8, color: 'rgba(255,255,255,0.8)' }}>{c.label}</p>
              </button>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
            {CARDS_DEF.map((_, i) => (
              <div key={i} style={{
                borderRadius: 9999, transition: 'all 0.3s',
                width: activeCard === i ? 16 : 6, height: 6,
                backgroundColor: activeCard === i ? BGC_RED : 'rgba(255,255,255,0.3)',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: 768, margin: '16px auto 0', padding: '0 16px' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>

          {/* Bouton SOS */}
          <div style={{ padding: '20px 24px 16px' }}>
            <button style={{
              width: '100%', padding: '12px', borderRadius: 9999, border: 'none',
              background: BGC_RED, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(204,0,0,0.3)',
            }}>
              SOS Carte
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB', padding: '0 24px' }}>
            {['parametres', 'options'].map(tab => (
              <button key={tab} onClick={() => setTab(tab)} style={{
                flex: 1, paddingBottom: 8, fontSize: 13, fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer',
                color: activeTab === tab ? BGC_RED : '#9CA3AF',
                borderBottom: activeTab === tab ? `2px solid ${BGC_RED}` : '2px solid transparent',
                transition: 'color 0.2s',
              }}>
                {tab === 'parametres' ? 'Paramètres' : 'Options'}
              </button>
            ))}
          </div>

          {/* Contenu tabs */}
          <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activeTab === 'parametres' ? (
              <>
                <button style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', background: '#fff', color: BGC_DARK }}>
                  <Apple style={{ width: 16, height: 16 }} /> Configurer Apple Pay
                </button>
                {[
                  { icon: Shield, label: 'Verrouillage de la carte', sub: locked ? 'Carte verrouillée' : 'Carte déverrouillée', val: locked, set: setLocked },
                  { icon: Wifi,   label: 'Paiement sans contact',    sub: nfc    ? 'Activé'           : 'Désactivé',           val: nfc,    set: setNfc    },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F9FAFB', borderRadius: 12, padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEE2E2', border: `2px solid ${BGC_RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <item.icon style={{ width: 20, height: 20, color: BGC_RED }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#1F2937', margin: 0 }}>{item.label}</p>
                        <p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>{item.sub}</p>
                      </div>
                    </div>
                    <Toggle enabled={item.val} onChange={item.set} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {[
                  { label: 'Paiement en ligne',      sub: online ? 'Activé' : 'Désactivé', val: online, set: setOnline },
                  { label: "Paiement à l'étranger",  sub: abroad ? 'Activé' : 'Désactivé', val: abroad, set: setAbroad },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F9FAFB', borderRadius: 12, padding: 16 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#1F2937', margin: 0 }}>{item.label}</p>
                      <p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>{item.sub}</p>
                    </div>
                    <Toggle enabled={item.val} onChange={item.set} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Gérez vos cartes</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>en toute autonomie</p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CartePage;