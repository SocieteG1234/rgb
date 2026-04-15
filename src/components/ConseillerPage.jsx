import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Phone, Mail, MessageCircle, Calendar, Clock, X, Send, CheckCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from './Bottomnavigation';

const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';
const BGC_GOLD = '#C9A84C';

const AUTO_REPLIES = [
  "Bien sûr, je comprends votre demande. Pouvez-vous me donner plus de détails ?",
  "Je vais vérifier cela pour vous immédiatement.",
  "Votre demande a bien été prise en compte. Je vous recontacte sous 24h.",
  "N'hésitez pas à me poser d'autres questions, je suis là pour vous aider.",
  "Je vous conseille de consulter votre espace client pour plus d'informations.",
  "Votre dossier est en cours de traitement. Tout se passe bien de notre côté.",
];

// ── Modal RDV ─────────────────────────────────────────────────────
const RDVModal = ({ onClose }) => {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm]       = useState({ date: '', heure: '', motif: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const HORAIRES = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];
  const MOTIFS   = ['Gestion de compte','Prêt hypothécaire','Épargne & placements','Assurance','Carte bancaire','Autre'];

  const handleSubmit = async () => {
    if (!form.date || !form.heure || !form.motif) { setError('Veuillez remplir tous les champs.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  if (success) return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#fff', width: '100%', maxWidth: 448, borderRadius: '24px 24px 0 0', padding: 24, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle style={{ color: '#16A34A', width: 32, height: 32 }} />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: RK, marginBottom: 8 }}>Rendez-vous confirmé !</h2>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>
          <span style={{ fontWeight: 600, color: BGC_RED }}>
            {new Date(form.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span> à <span style={{ fontWeight: 600, color: BGC_RED }}>{form.heure}</span>
        </p>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>Motif : {form.motif}</p>
        <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: 9999, fontWeight: 700, background: BGC_RED, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14 }}>
          Fermer
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#fff', width: '100%', maxWidth: 448, borderRadius: '24px 24px 0 0', padding: 24, paddingBottom: 32, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: BGC_RED }}>Prendre rendez-vous</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X style={{ color: '#9CA3AF', width: 20, height: 20 }} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {error && <p style={{ fontSize: 12, color: BGC_RED, background: '#FEE2E2', borderRadius: 12, padding: 12 }}>{error}</p>}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase' }}>Date</label>
            <input type="date" min={today} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
              style={{ width: '100%', border: `2px solid ${form.date ? BGC_RED : '#E5E7EB'}`, borderRadius: 12, padding: '12px 16px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase' }}>Heure</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {HORAIRES.map(h => (
                <button key={h} onClick={() => setForm({ ...form, heure: h })} style={{
                  padding: '8px', borderRadius: 12, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  border: `2px solid ${form.heure === h ? BGC_RED : '#E5E7EB'}`,
                  background: form.heure === h ? '#FEE2E2' : '#fff',
                  color: form.heure === h ? BGC_RED : '#6B7280',
                }}>{h}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase' }}>Motif</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {MOTIFS.map(m => (
                <button key={m} onClick={() => setForm({ ...form, motif: m })} style={{
                  textAlign: 'left', padding: '12px 16px', borderRadius: 12, fontSize: 13, cursor: 'pointer',
                  border: `2px solid ${form.motif === m ? BGC_RED : '#E5E7EB'}`,
                  background: form.motif === m ? '#FEE2E2' : '#fff',
                  color: form.motif === m ? BGC_RED : '#374151',
                  fontWeight: form.motif === m ? 600 : 400,
                }}>{m}</button>
              ))}
            </div>
          </div>
          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', padding: '16px', borderRadius: 9999, fontWeight: 700, fontSize: 13,
            background: BGC_RED, color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
          }}>
            {loading ? 'Confirmation...' : 'Confirmer le rendez-vous'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Page Chat ─────────────────────────────────────────────────────
const ChatPage = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'conseiller', text: "Bonjour ! Je suis Jean Tremblay, votre conseiller BGC. Comment puis-je vous aider ?", time: new Date() }
  ]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef           = useRef(null);
  const replyIndex          = useRef(0);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: input.trim(), time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
    setTyping(false);
    const reply = AUTO_REPLIES[replyIndex.current % AUTO_REPLIES.length];
    replyIndex.current++;
    setMessages(prev => [...prev, { id: Date.now() + 1, from: 'conseiller', text: reply, time: new Date() }]);
  };

  const fmt = (d) => d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#F5F5F5' }}>
      {/* Header */}
      <div style={{ background: BGC_DARK, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, borderBottom: `3px solid ${BGC_RED}` }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <ChevronLeft style={{ color: '#fff', width: 24, height: 24 }} />
        </button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: BGC_RED, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>J</div>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>Jean Tremblay</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, margin: 0 }}>Conseiller RBC en ligne</p>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
            {msg.from === 'conseiller' && (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: BGC_RED, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>J</div>
            )}
            <div style={{ maxWidth: '75%' }}>
              <div style={{
                padding: '10px 16px', borderRadius: 18, fontSize: 14,
                ...(msg.from === 'user'
                  ? { background: BGC_RED, color: '#fff', borderBottomRightRadius: 4 }
                  : { background: '#fff', color: '#1F2937', borderBottomLeftRadius: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }),
              }}>{msg.text}</div>
              <p style={{ fontSize: 10, color: '#9CA3AF', margin: '4px 4px 0', textAlign: msg.from === 'user' ? 'right' : 'left' }}>{fmt(msg.time)}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: BGC_RED, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>J</div>
            <div style={{ background: '#fff', padding: '12px 16px', borderRadius: 18, borderBottomLeftRadius: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', gap: 4 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#9CA3AF', animation: 'bounce 1s infinite', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Saisie */}
      <div style={{ background: '#fff', borderTop: '1px solid #E5E7EB', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <input type="text" placeholder="Écrivez votre message..." value={input}
          onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, background: '#F3F4F6', border: 'none', borderRadius: 24, padding: '10px 16px', fontSize: 14, outline: 'none' }} />
        <button onClick={sendMessage} disabled={!input.trim()} style={{
          width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
          background: input.trim() ? BGC_RED : '#D1D5DB',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s',
        }}>
          <Send style={{ color: '#fff', width: 16, height: 16 }} />
        </button>
      </div>
    </div>
  );
};

// ── Page principale ───────────────────────────────────────────────
const ConseillerPage = () => {
  const navigate               = useNavigate();
  const { user, logout }       = useAuth();
  const [showRDV, setShowRDV]   = useState(false);
  const [showChat, setShowChat] = useState(false);

  const conseiller = {
    name:    'Jean Tremblay',
    role:    'Votre conseiller personnel BGC',
    agency:  'Agence Montréal Centre',
    phone:   '514 123 45 67',
    email:   'jean.tremblay@bgc.ca',
    hours:   'Lun–Ven : 9h00 – 18h00',
    nextRdv: 'Aucun rendez-vous prévu',
  };

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) { logout(); navigate('/'); }
  };

  if (showChat) return <ChatPage onClose={() => setShowChat(false)} />;

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: 'Arial, sans-serif', paddingBottom: 96 }}>
      {showRDV && <RDVModal onClose={() => setShowRDV(false)} />}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, position: 'sticky', top: 0, zIndex: 40, background: BGC_DARK, borderBottom: `3px solid ${BGC_RED}` }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft style={{ color: '#fff', width: 24, height: 24 }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ background: BGC_RED, borderRadius: 4, padding: '3px 7px' }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 12, letterSpacing: 1 }}>RBC</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', margin: 0 }}>Mon Conseiller</h1>
        </div>
        <div style={{ width: 24 }} />
      </div>

      {/* Avatar conseiller */}
      <div style={{ margin: 16, borderRadius: 16, padding: 20, color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', background: `linear-gradient(135deg, ${BGC_DARK}, #2d2d4e)`, border: `1px solid ${BGC_GOLD}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: BGC_RED, border: `3px solid ${BGC_GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900 }}>
            {conseiller.name.charAt(0)}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>{conseiller.name}</p>
            <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>{conseiller.role}</p>
            <p style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>{conseiller.agency}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ fontSize: 11, opacity: 0.8 }}>En ligne</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 16px', marginTop: 4 }}>
        {[
          { href: `tel:${conseiller.phone.replace(/\s/g, '')}`, icon: Phone, label: 'Appeler', sub: conseiller.phone, color: BGC_RED },
          { href: `mailto:${conseiller.email}`, icon: Mail, label: 'Email', sub: conseiller.email, color: BGC_RED },
        ].map(a => (
          <a key={a.label} href={a.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a.icon style={{ width: 20, height: 20, color: BGC_RED }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1F2937' }}>{a.label}</span>
            <span style={{ fontSize: 10, color: '#9CA3AF', textAlign: 'center', wordBreak: 'break-all' }}>{a.sub}</span>
          </a>
        ))}
        <button onClick={() => setShowChat(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', position: 'relative' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageCircle style={{ width: 20, height: 20, color: BGC_RED }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#1F2937' }}>Message</span>
          <span style={{ fontSize: 10, color: '#9CA3AF' }}>Messagerie sécurisée</span>
          <div style={{ position: 'absolute', top: 12, right: 12, width: 10, height: 10, borderRadius: '50%', background: '#4ade80', border: '2px solid #fff' }} />
        </button>
        <button onClick={() => setShowRDV(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF9E7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar style={{ width: 20, height: 20, color: BGC_GOLD }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#1F2937' }}>Rendez-vous</span>
          <span style={{ fontSize: 10, color: '#9CA3AF' }}>Prendre RDV</span>
        </button>
      </div>

      {/* Horaires */}
      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Clock style={{ width: 16, height: 16, color: BGC_RED }} />
          <p style={{ fontSize: 14, fontWeight: 700, color: '#1F2937', margin: 0 }}>Disponibilités</p>
        </div>
        <p style={{ fontSize: 13, color: '#4B5563' }}>{conseiller.hours}</p>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F0F0F0' }}>
          <p style={{ fontSize: 11, color: '#9CA3AF' }}>Prochain rendez-vous</p>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#374151', marginTop: 2 }}>{conseiller.nextRdv}</p>
        </div>
      </div>

      {/* Déconnexion */}
      <div style={{ margin: '16px 16px 8px' }}>
        <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px', borderRadius: 16, fontWeight: 600, fontSize: 13, color: BGC_RED, background: '#FEE2E2', border: 'none', cursor: 'pointer' }}>
          <LogOut style={{ width: 16, height: 16 }} /> Se déconnecter
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ConseillerPage;