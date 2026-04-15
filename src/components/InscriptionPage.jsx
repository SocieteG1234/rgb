import React, { useState } from 'react';
import { ArrowLeft, X, Copy, Check, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RBC_BLUE = '#003168';
const RBC_GOLD = '#FEDF00';

const InscriptionPage = ({ navigate }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    code: '', confirmCode: '', country: 'CANADA',
  });
  const [showError, setShowError]               = useState(false);
  const [errorMessage, setErrorMessage]         = useState('');
  const [isLoading, setIsLoading]               = useState(false);
  const [registrationSuccess, setSuccess]       = useState(false);
  const [generatedId, setGeneratedId]           = useState('');
  const [copied, setCopied]                     = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowError(false);
  };

  const generateClientId = () => {
    let id = '';
    for (let i = 0; i < 11; i++) id += Math.floor(Math.random() * 10);
    return id;
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(generatedId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.code || !formData.confirmCode) {
      setErrorMessage('Veuillez remplir tous les champs'); setShowError(true); return;
    }
    if (formData.code.length < 6) {
      setErrorMessage('Le code doit contenir au moins 6 chiffres'); setShowError(true); return;
    }
    if (formData.code !== formData.confirmCode) {
      setErrorMessage('Les codes ne correspondent pas'); setShowError(true); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Email invalide'); setShowError(true); return;
    }
    setIsLoading(true);
    try {
      const newId = generateClientId();
      if (register) await register({ ...formData, name: `${formData.firstName} ${formData.lastName}`, clientNumber: newId });
      setGeneratedId(newId);
      setSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || 'Une erreur est survenue'); setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (hasValue) => ({
    width: '100%', padding: '12px 14px',
    border: `2px solid ${hasValue ? RBC_BLUE : '#d1d5db'}`,
    borderRadius: 2, fontSize: 14, outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  });

  const labelStyle = {
    display: 'block', fontSize: 12, fontWeight: 700, color: '#444',
    marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5,
  };

  if (registrationSuccess) return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', borderRadius: 4, padding: '2rem', maxWidth: 400, width: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, background: '#e8f5e9', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem',
        }}>
          <Check size={36} color="#2e7d32" />
        </div>
        <h2 style={{ color: RBC_BLUE, fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Inscription réussie !</h2>
        <p style={{ color: '#555', fontSize: 14, marginBottom: '1.5rem' }}>Votre compte RBC Banque Royale a été créé.</p>

        <div style={{ background: RBC_BLUE, borderRadius: 4, padding: '1.5rem', marginBottom: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            Votre numéro client
          </p>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 4, padding: '12px', marginBottom: 12 }}>
            <p style={{ color: '#fff', fontSize: 28, fontWeight: 900, letterSpacing: 2 }}>{generatedId}</p>
          </div>
          <button onClick={handleCopyId} style={{
            width: '100%', padding: '10px', background: 'rgba(255,255,255,0.25)',
            border: 'none', borderRadius: 4, color: '#fff', fontWeight: 600, fontSize: 13,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {copied ? <><Check size={16} />Copié !</> : <><Copy size={16} />Copier le numéro</>}
          </button>
        </div>

        <div style={{ background: '#fffde7', border: '2px solid #f5c518', borderRadius: 4, padding: '12px', marginBottom: '1.5rem', textAlign: 'left' }}>
          <p style={{ color: '#5d4037', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>⚠️ IMPORTANT</p>
          <p style={{ color: '#5d4037', fontSize: 12 }}>
            Conservez ce numéro à 11 chiffres. Il vous sera nécessaire pour vous connecter.
          </p>
        </div>

        <button onClick={() => navigate('/login')} style={{
          width: '100%', padding: '14px', background: RBC_BLUE, color: '#fff',
          border: 'none', borderRadius: 2, fontSize: 15, fontWeight: 700, cursor: 'pointer',
        }}>
          Ouvrir une session
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>

      {/* Header */}
      <header style={{ background: RBC_BLUE, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>

        <div style={{ background: RBC_GOLD, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 18px', gap: 3 }}>
          <Lock size={20} color={RBC_BLUE} />
          <span style={{ fontSize: 11, fontWeight: 700, color: RBC_BLUE }}>INSCRIPTION</span>
        </div>
      </header>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <button onClick={() => navigate('/')} style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none',
          border: 'none', color: RBC_BLUE, cursor: 'pointer', fontSize: 14,
          fontWeight: 600, marginBottom: '1.5rem', padding: 0,
        }}>
          <ArrowLeft size={18} /> Retour
        </button>

        <div style={{ background: '#fff', borderRadius: 4, padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img src="/images/L1.jpeg" alt="RBC" style={{ height: 52, objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }} />
            <h2 style={{ color: RBC_BLUE, fontSize: 20, fontWeight: 700, marginTop: 12 }}>Ouvrir un compte</h2>
            <p style={{ color: '#666', fontSize: 13 }}>RBC Banque Royale</p>
          </div>

          {showError && (
            <div style={{
              background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: 4,
              padding: '12px 14px', marginBottom: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: '#c62828', fontSize: 13 }}>{errorMessage}</span>
              <button onClick={() => setShowError(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} color="#c62828" />
              </button>
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Prénom *', name: 'firstName', type: 'text' },
              { label: 'Nom *', name: 'lastName', type: 'text' },
              { label: 'Courriel *', name: 'email', type: 'email', placeholder: 'exemple@courriel.com' },
            ].map(field => (
              <div key={field.name}>
                <label style={labelStyle}>{field.label}</label>
                <input
                  type={field.type} name={field.name} value={formData[field.name]}
                  onChange={handleChange} placeholder={field.placeholder}
                  style={inputStyle(formData[field.name])} disabled={isLoading} required autoComplete="off"
                />
              </div>
            ))}

            <div>
              <label style={labelStyle}>Pays</label>
              <select name="country" value={formData.country} onChange={handleChange}
                style={{ ...inputStyle(true), appearance: 'none' }} disabled={isLoading}>
                {['CANADA','FRANCE','BELGIQUE','SUISSE','MAROC','CÔTE D\'IVOIRE','SÉNÉGAL','CAMEROUN'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Code secret (min. 6 chiffres) *</label>
              <input type="password" name="code" value={formData.code} onChange={handleChange}
                style={inputStyle(formData.code)} disabled={isLoading} minLength="6" required autoComplete="new-password" />
            </div>

            <div>
              <label style={labelStyle}>Confirmer le code *</label>
              <input type="password" name="confirmCode" value={formData.confirmCode} onChange={handleChange}
                style={inputStyle(formData.confirmCode)} disabled={isLoading} minLength="6" required autoComplete="new-password" />
            </div>

            <button type="submit" disabled={isLoading} style={{
              width: '100%', padding: '14px', background: isLoading ? '#90a4c8' : RBC_BLUE,
              color: '#fff', border: 'none', borderRadius: 2,
              fontSize: 16, fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: 8,
            }}>
              {isLoading ? 'Inscription en cours...' : "S'inscrire"}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: 13, color: '#555' }}>
            Déjà un compte ?{' '}
            <button onClick={() => navigate('/login')} style={{
              background: 'none', border: 'none', color: RBC_BLUE,
              fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: 13,
            }}>Ouvrir une session</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;