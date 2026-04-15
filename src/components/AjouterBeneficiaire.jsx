import React, { useState } from 'react';
import { ArrowLeft, User, CheckCircle, Star, Send, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';
const BGC_GOLD = '#C9A84C';

const EMAILJS_SERVICE_ID  = 'service_zlw3u1o';
const EMAILJS_TEMPLATE_ID = 'template_b0bnvef';
const EMAILJS_PUBLIC_KEY  = '97pwynnX_1TDC0o0O';

export default function AjouterBeneficiaire({ onVirementSuccess, currency = '$', expediteurNom = 'Client BGC' }) {
  const navigate = useNavigate();

  // ── Étapes : 'beneficiaire' | 'virement' | 'succes'
  const [etape, setEtape]           = useState('beneficiaire');
  const [name, setName]             = useState('');
  const [iban, setIban]             = useState('');
  const [email, setEmail]           = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [montant, setMontant]       = useState('');
  const [motif, setMotif]           = useState('');
  const [sending, setSending]       = useState(false);
  const [error, setError]           = useState('');

  // ── Étape 1 → 2
  const handleNextEtape = () => {
    if (name && iban) setEtape('virement');
  };

  // ── Étape 2 : envoyer le virement + email
  const handleVirement = async () => {
    if (!montant || isNaN(montant) || Number(montant) <= 0) {
      setError('Veuillez saisir un montant valide.');
      return;
    }
    setSending(true);
    setError('');

    try {
      // Envoi email EmailJS au bénéficiaire
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email:      email,
          to_name:       name,
          from_name:     expediteurNom,
          montant:       new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(Number(montant)),
          currency,
          motif:         motif || 'Aucun motif précisé',
          date_virement: new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
        },
        EMAILJS_PUBLIC_KEY,
      );

      setEtape('succes');
    } catch (err) {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  // ────────────────────────────────────────────────────────────────
  // ÉTAPE SUCCÈS
  // ────────────────────────────────────────────────────────────────
  if (etape === 'succes') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20, padding: '40px 16px' }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#FEE2E2', border: `3px solid ${BGC_RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle size={48} color={BGC_RED} />
        </div>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: BGC_DARK, marginBottom: 8 }}>Virement envoyé !</h2>
          <p style={{ color: '#6B7280', fontSize: 14 }}>
            <strong>{new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(Number(montant))} {currency}</strong> ont été envoyés à <strong>{name}</strong>.
          </p>
          <p style={{ color: '#6B7280', fontSize: 13, marginTop: 6 }}>Une notification email a été envoyée au bénéficiaire.</p>
        </div>
        <div style={{ background: BGC_DARK, borderRadius: 16, padding: 20, width: '100%', maxWidth: 320, border: `2px solid ${BGC_GOLD}` }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Montant transféré</p>
          <p style={{ fontSize: 32, fontWeight: 900, color: BGC_GOLD, margin: 0 }}>
            {new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(Number(montant))} {currency}
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>À : {name}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{iban}</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ padding: '14px 36px', borderRadius: 100, border: 'none', background: BGC_RED, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 12px rgba(204,0,0,0.3)' }}
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────
  // ÉTAPE 2 : VIREMENT
  // ────────────────────────────────────────────────────────────────
  if (etape === 'virement') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Récap bénéficiaire */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#FEE2E2', border: `2px solid ${BGC_RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={26} color={BGC_RED} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, color: BGC_DARK, margin: 0, fontSize: 15 }}>{name}</p>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{iban}</p>
          </div>
          <button onClick={() => setEtape('beneficiaire')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BGC_RED, fontSize: 12, fontWeight: 600 }}>
            Modifier
          </button>
        </div>

        {/* Formulaire virement */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: BGC_DARK, margin: '0 0 20px 0' }}>Détails du virement</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Montant */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Montant *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number" value={montant} onChange={e => { setMontant(e.target.value); setError(''); }}
                  placeholder="0.00"
                  min="0"
                  style={{ width: '100%', padding: '14px 48px 14px 16px', border: `1px solid ${montant ? BGC_RED : '#D1D5DB'}`, borderRadius: 10, fontSize: 20, fontWeight: 700, outline: 'none', boxSizing: 'border-box', color: BGC_DARK }}
                  onFocus={e => e.target.style.borderColor = BGC_RED}
                  onBlur={e => e.target.style.borderColor = montant ? BGC_RED : '#D1D5DB'}
                />
                <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: BGC_RED, fontSize: 16 }}>{currency}</span>
              </div>
              {error && <p style={{ color: BGC_RED, fontSize: 12, marginTop: 6 }}>{error}</p>}
            </div>

            {/* Motif */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Motif (optionnel)</label>
              <input
                type="text" value={motif} onChange={e => setMotif(e.target.value)}
                placeholder="Ex: Remboursement loyer, Facture..."
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = BGC_RED}
                onBlur={e => e.target.style.borderColor = '#D1D5DB'}
              />
            </div>

            {/* Résumé */}
            {montant > 0 && (
              <div style={{ background: '#F9FAFB', borderRadius: 12, padding: 16, border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B7280' }}>Bénéficiaire</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: BGC_DARK }}>{name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: '#6B7280' }}>Total débité</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: BGC_RED }}>
                    {new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(Number(montant))} {currency}
                  </span>
                </div>
              </div>
            )}

            {/* Boutons */}
            <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
              <button
                onClick={() => setEtape('beneficiaire')}
                style={{ flex: 1, background: '#E5E7EB', color: '#374151', padding: '14px', borderRadius: 12, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
              >
                Retour
              </button>
              <button
                onClick={handleVirement}
                disabled={!montant || sending}
                style={{
                  flex: 2, background: !montant || sending ? '#FCA5A5' : BGC_RED, color: '#fff',
                  padding: '14px', borderRadius: 12, border: 'none', fontWeight: 700,
                  cursor: !montant || sending ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14,
                }}
              >
                {sending ? (
                  <>
                    <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Envoi en cours...
                  </>
                ) : (
                  <><Send size={18} /> Confirmer le virement</>
                )}
              </button>
            </div>
          </div>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────
  // ÉTAPE 1 : BÉNÉFICIAIRE
  // ────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>

      {/* Indicateur d'étapes */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: BGC_RED, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>1</div>
        <span style={{ fontSize: 12, fontWeight: 600, color: BGC_RED }}>Bénéficiaire</span>
        <ChevronRight size={16} color="#D1D5DB" />
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E5E7EB', color: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>2</div>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF' }}>Virement</span>
      </div>

      {/* Avatar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEE2E2', border: `3px solid ${BGC_RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={40} color={BGC_RED} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Nom */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Nom du bénéficiaire *</label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Ex: Sophie Martin"
            style={{ width: '100%', padding: '12px 16px', border: `1px solid ${name ? BGC_RED : '#D1D5DB'}`, borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = BGC_RED}
            onBlur={e => e.target.style.borderColor = name ? BGC_RED : '#D1D5DB'}
          />
        </div>

        {/* IBAN */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>IBAN *</label>
          <input
            type="text" value={iban} onChange={e => setIban(e.target.value)}
            placeholder="CA76 3000 4000 0300 0345 6789 012"
            style={{ width: '100%', padding: '12px 16px', border: `1px solid ${iban ? BGC_RED : '#D1D5DB'}`, borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = BGC_RED}
            onBlur={e => e.target.style.borderColor = iban ? BGC_RED : '#D1D5DB'}
          />
          <p style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>Format canadien : CA suivi de 25 chiffres</p>
        </div>

        {/* Email bénéficiaire */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Email du bénéficiaire *</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="exemple@email.com"
            style={{ width: '100%', padding: '12px 16px', border: `1px solid ${email ? BGC_RED : '#D1D5DB'}`, borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = BGC_RED}
            onBlur={e => e.target.style.borderColor = email ? BGC_RED : '#D1D5DB'}
          />
          <p style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>Pour la notification de réception du virement</p>
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
        <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ flex: 1, background: '#E5E7EB', color: '#374151', padding: '14px', borderRadius: 12, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
          >
            Annuler
          </button>
          <button
            onClick={handleNextEtape}
            disabled={!name || !iban || !email}
            style={{
              flex: 2, background: !name || !iban || !email ? '#FCA5A5' : BGC_RED,
              color: '#fff', padding: '14px', borderRadius: 12, border: 'none', fontWeight: 700,
              cursor: !name || !iban || !email ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14,
            }}
          >
            Suivant <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}