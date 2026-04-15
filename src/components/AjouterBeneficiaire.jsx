import React, { useState } from 'react';
import { ArrowLeft, User, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';
const BGC_GOLD = '#C9A84C';

export default function AjouterBeneficiaire() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [name, setName]               = useState('');
  const [iban, setIban]               = useState('');
  const [isFavorite, setIsFavorite]   = useState(false);

  const handleSubmit = () => {
    if (name && iban) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/virement');
      }, 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>

      {/* Modal succès */}
      {showSuccess && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, maxWidth: 400, width: '100%', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEE2E2', border: `3px solid ${BGC_RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={40} color={BGC_RED} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: BGC_DARK, marginBottom: 8 }}>Bénéficiaire ajouté !</h3>
            <p style={{ color: '#6B7280', marginBottom: 16 }}>{name} a été ajouté à votre liste</p>
            <div style={{ width: 48, height: 4, margin: '0 auto', borderRadius: 9999, background: BGC_GOLD }} />
          </div>
        </div>
      )}

      {/* Header BGC */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ background: BGC_DARK, borderBottom: `3px solid ${BGC_RED}` }}>
          <div style={{ maxWidth: 896, margin: '0 auto', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => navigate('/virement')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}>
              <ArrowLeft size={24} />
              <span style={{ fontSize: 14 }}>Retour</span>
            </button>
                       <div className="flex items-center gap-2">
              <img
                src="/images/L1.jpeg"
                alt="LCL"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            <div style={{ width: 80 }} />
          </div>
           </div>
          <p style={{ color: '#fff', textAlign: 'center', paddingBottom: 12, fontWeight: 600, fontSize: 16 }}>Ajouter un bénéficiaire</p>
        </div>
      </header>

      <main style={{ maxWidth: 896, margin: '0 auto', padding: '24px 16px 96px' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>

          {/* Avatar */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEE2E2', border: `3px solid ${BGC_RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={40} color={BGC_RED} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Nom */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Nom du bénéficiaire *</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Sophie Martin"
                style={{ width: '100%', padding: '12px 16px', border: `1px solid ${name ? BGC_RED : '#D1D5DB'}`, borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = BGC_RED}
                onBlur={e => e.target.style.borderColor = name ? BGC_RED : '#D1D5DB'}
              />
            </div>

            {/* IBAN */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>IBAN *</label>
              <input
                type="text" value={iban} onChange={(e) => setIban(e.target.value)}
                placeholder="CA76 3000 4000 0300 0345 6789 012"
                style={{ width: '100%', padding: '12px 16px', border: `1px solid ${iban ? BGC_RED : '#D1D5DB'}`, borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = BGC_RED}
                onBlur={e => e.target.style.borderColor = iban ? BGC_RED : '#D1D5DB'}
              />
              <p style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>Format canadien : CA suivi de 25 chiffres</p>
            </div>

            {/* Favoris */}
            <div style={{ background: '#F9FAFB', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Star size={24} color={isFavorite ? BGC_GOLD : '#9CA3AF'} fill={isFavorite ? BGC_GOLD : 'none'} />
                  <div>
                    <p style={{ fontWeight: 600, color: '#1F2937', margin: 0, fontSize: 14 }}>Ajouter aux favoris</p>
                    <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Accès rapide depuis la page d'accueil</p>
                  </div>
                </div>
                <button onClick={() => setIsFavorite(!isFavorite)} style={{
                  position: 'relative', width: 56, height: 32, borderRadius: 9999, border: 'none', cursor: 'pointer',
                  background: isFavorite ? BGC_RED : '#D1D5DB', transition: 'background 0.2s',
                }}>
                  <div style={{
                    position: 'absolute', width: 24, height: 24, background: '#fff', borderRadius: '50%',
                    top: 4, transition: 'all 0.2s',
                    right: isFavorite ? 4 : undefined, left: isFavorite ? undefined : 4,
                  }} />
                </button>
              </div>
            </div>

            {/* Boutons */}
            <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
              <button onClick={() => navigate('/virement')} style={{ flex: 1, background: '#E5E7EB', color: '#374151', padding: '16px', borderRadius: 12, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                Annuler
              </button>
              <button onClick={handleSubmit} disabled={!name || !iban} style={{
                flex: 1, background: !name || !iban ? '#FCA5A5' : BGC_RED, color: '#fff', padding: '16px',
                borderRadius: 12, border: 'none', fontWeight: 700, cursor: !name || !iban ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14,
                transition: 'background 0.2s',
              }}>
                <CheckCircle size={20} /> Ajouter
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}