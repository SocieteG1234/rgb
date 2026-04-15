import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Lock, Menu, X } from 'lucide-react';

const RBC_BLUE  = '#003168';
const RBC_BLUE2 = '#1a6fc4';
const RBC_GOLD  = '#FEDF00';

/* ── Icônes SVG services ─────────────────────────────────── */
const IconHouse = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="1" y="1" width="34" height="34" rx="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M6 18L18 8l12 10" stroke={RBC_BLUE2} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <rect x="12" y="20" width="12" height="10" rx="1" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M15 30v-6h6v6" stroke={RBC_BLUE2} strokeWidth="1.5"/>
  </svg>
);
const IconAccount = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="1" y="1" width="34" height="34" rx="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <rect x="6" y="11" width="24" height="16" rx="2" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M6 16h24" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M10 22h8" stroke={RBC_BLUE2} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconChart = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="1" y="1" width="34" height="34" rx="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <polyline points="6,26 12,18 18,22 26,12 30,14" stroke={RBC_BLUE2} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCard = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="1" y="1" width="34" height="34" rx="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <rect x="5" y="12" width="26" height="14" rx="2" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M5 17h26" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M9 22h6" stroke={RBC_BLUE2} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconLoan = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="1" y="1" width="34" height="34" rx="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M11 25l4-14 4 10 4-6 3 10" stroke={RBC_BLUE2} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPiggy = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <ellipse cx="18" cy="21" rx="11" ry="9" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <circle cx="18" cy="12" r="4" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M29 21h3v4h-3" stroke={RBC_BLUE2} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 30v2M23 30v2" stroke={RBC_BLUE2} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="22" cy="20" r="1.5" fill={RBC_BLUE2}/>
  </svg>
);
const IconPercent = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="1" y="1" width="34" height="34" rx="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M10 26L26 10" stroke={RBC_BLUE2} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="13" r="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <circle cx="24" cy="23" r="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
  </svg>
);
const IconExchange = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="1" y="1" width="34" height="34" rx="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M8 14h20M24 10l4 4-4 4" stroke={RBC_BLUE2} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 22H8M12 18l-4 4 4 4" stroke={RBC_BLUE2} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCalc = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="1" y="1" width="34" height="34" rx="3" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <rect x="8" y="8" width="20" height="20" rx="2" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <rect x="11" y="11" width="14" height="6" rx="1" stroke={RBC_BLUE2} strokeWidth="1.5"/>
    <path d="M11 21h3M16.5 21h3M22 21h3M11 25h3M16.5 25h3M22 25h3" stroke={RBC_BLUE2} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="22" height="22">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={RBC_BLUE}/>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const services = [
  { icon: <IconHouse />,   label: 'Explorer les options hypothécaires' },
  { icon: <IconAccount />, label: 'Ouvrir un compte' },
  { icon: <IconChart />,   label: 'Placements aux particuliers' },
  { icon: <IconCard />,    label: 'Trouver une carte de crédit' },
  { icon: <IconLoan />,    label: 'Prêts et marges de crédit' },
  { icon: <IconPiggy />,   label: "Optimisation de l'épargne REER" },
];

const helpItems = [
  { icon: <IconPercent />,  label: 'Taux en vigueur' },
  { icon: <IconExchange />, label: 'Opérations de change' },
  { icon: <IconCalc />,     label: 'Calcul de vos versements hypothécaires' },
];

const accordionItems = [
  "Achat d'une maison",
  'Études',
  'Ressources pour les aînés',
  'Nouvellement arrivé au Canada',
  'Planification de la retraite à RBC',
  'Tutoriels sur les Services bancaires en ligne et mobiles',
];

const newsArticles = [
  {
    image: '/images/I2.jpeg',
    title: "Des affaires au-delà des frontières : East Mountain Forest Products bâtit une entreprise mondiale grâce à des partenariats de confiance",
    underline: true,
  },
  {
    image: '/images/I3.jpeg',
    title: "Tracer le cap à l'échelle mondiale : Comment OSI Maritime Systems s'est déployée au-delà des côtes canadiennes auprès de plus de 25 marines nationales dans le monde",
    underline: true,
  },
  {
    image: '/images/I4.jpeg',
    title: "Comment bénéficier d'une subvention majeure du gouvernement fédéral : trois stratégies pour les entreprises commerciales",
    underline: false,
  },
];

const footerBlueLinks = [
  { title: 'Placements', items: ['Taux', 'Taux hypothécaires', 'Fonds communs de placement'] },
  { title: 'Protégez votre argent', items: ["Renseignements sur le participant à la Société d'assurance-dépôts du Canada"] },
];

const footerSections = [
  { title: 'Produits', items: ['Comptes bancaires', 'Cartes de crédit', 'Prêts hypothécaires', 'Placements', 'Assurance'] },
  { title: 'Services', items: ['RBC Banque en direct', "L'appli Mobile RBC", 'Virement Interac', 'Paiement de factures'] },
  { title: 'À propos de RBC', items: ['Qui sommes-nous', 'Carrières', 'Relations avec les investisseurs', 'Responsabilité sociale'] },
  { title: 'Aide', items: ["Centre d'aide", 'Trouver une succursale', 'Prendre rendez-vous', 'Clavardez avec nous'] },
];

export default function HomePage({ onNavigateToLogin, onNavigateToInscription }) {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openFooter, setOpenFooter]       = useState(null);
  const [searchQuery, setSearchQuery]     = useState('');

  const linkBtn = (onClick, children, extra = {}) => (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 4, width: '100%',
      padding: '12px 0', background: 'none', border: 'none',
      borderBottom: '1px solid #e5e7eb', color: RBC_BLUE2,
      fontSize: 15, fontWeight: 500, cursor: 'pointer', textAlign: 'left',
      ...extra,
    }}>{children}</button>
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#fff', minHeight: '100vh' }}>

      {/* ══ HEADER ══ */}
      <header style={{ background: RBC_BLUE, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', gap: 10 }}>
            <img
              src="/images/L1.jpeg"
              alt="RBC"
              style={{ height: 40, width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
            />
            <div style={{
              display:'none', width:40, height:40, background:RBC_GOLD,
              borderRadius:'50%', alignItems:'center', justifyContent:'center',
              fontWeight:900, fontSize:13, color:RBC_BLUE,
            }}>RBC</div>
            <span style={{ color:'#fff', fontWeight:700, fontSize:16 }}>Banque Royale</span>
          </div>
          <div style={{ display:'flex', alignItems:'stretch' }}>
            <button onClick={onNavigateToLogin} style={{
              background:RBC_GOLD, border:'none', cursor:'pointer',
              display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', padding:'0 18px', gap:3,
            }}>
              <Lock size={20} color={RBC_BLUE}/>
              <span style={{ fontSize:11, fontWeight:700, color:RBC_BLUE, letterSpacing:0.5 }}>CONNEXION</span>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background:'none', border:'none', cursor:'pointer', padding:'0 18px', color:'#fff',
            }}>
              {menuOpen ? <X size={26}/> : <Menu size={26}/>}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:'#fff', borderTop:`3px solid ${RBC_GOLD}` }}>
            {['Particuliers','Entreprises','Marchés mondiaux','Gestion de patrimoine','Assurance'].map(item => (
              <button key={item} onClick={() => { setMenuOpen(false); onNavigateToLogin?.(); }} style={{
                display:'block', width:'100%', textAlign:'left', padding:'14px 20px',
                background:'none', border:'none', borderBottom:'1px solid #e5e7eb',
                color:RBC_BLUE, fontSize:15, fontWeight:600, cursor:'pointer',
              }}>{item}</button>
            ))}
            <button onClick={() => { setMenuOpen(false); onNavigateToInscription?.(); }} style={{
              display:'block', width:'100%', textAlign:'left', padding:'14px 20px',
              background:RBC_BLUE, border:'none', color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer',
            }}>Ouvrir un compte en ligne</button>
          </div>
        )}
      </header>

      {/* ══ HERO ══ */}
      <section style={{ background:'#f5ede0' }}>
        <div style={{ minHeight:260, background:'#e8ddd0', overflow:'hidden' }}>
          <img
            src="/images/I1.jpeg"
            alt="Investir dès aujourd'hui"
            style={{ width:'100%', height:260, objectFit:'cover', objectPosition:'top center', display:'block' }}
            onError={(e) => { e.target.style.display='none'; }}
          />
        </div>
        <div style={{ padding:'24px 20px 0' }}>
          <h1 style={{ fontSize:32, fontWeight:800, color:'#1a1a1a', lineHeight:1.2, marginBottom:14, fontFamily:'Georgia, serif' }}>
            Investir dès aujourd'hui
          </h1>
          <p style={{ fontSize:16, color:'#333', lineHeight:1.6, marginBottom:24 }}>
            Envisagez vos objectifs avec le soutien adéquat et un historique de rendement qui vous inspire confiance.
          </p>
          <button onClick={onNavigateToLogin} style={{
            width:'100%', padding:'16px', background:RBC_BLUE, color:'#fff',
            border:'none', fontSize:16, fontWeight:600, cursor:'pointer', marginBottom:24,
          }}>Commencer</button>
        </div>
        <div style={{ textAlign:'center', padding:'0 20px 28px' }}>
          <p style={{ fontSize:16, color:'#333', marginBottom:14 }}>
            Votre idée <em style={{ color:RBC_BLUE2, fontStyle:'italic', fontWeight:600 }}>de demain</em> prend vie ici.
          </p>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            background:'#ddd8d0', borderRadius:20, padding:'8px 14px',
          }}>
            <span style={{ color:'#666', fontSize:18, cursor:'pointer' }}>‹</span>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width:i===3?28:10, height:10, borderRadius:5, background:i===3?RBC_GOLD:'#fff' }}/>
            ))}
            <span style={{ color:'#666', fontSize:18, cursor:'pointer' }}>›</span>
            <div style={{
              width:28, height:28, borderRadius:'50%', border:'1.5px solid #888',
              display:'flex', alignItems:'center', justifyContent:'center', marginLeft:4, cursor:'pointer',
            }}>▶</div>
          </div>
        </div>
      </section>

      {/* ══ BIENVENUE + PRODUITS ══ */}
      <section style={{ padding:'32px 20px', background:'#fff' }}>
        <h2 style={{ fontSize:22, fontWeight:700, color:'#1a1a1a', textAlign:'center', marginBottom:12 }}>
          Bienvenue dans Services bancaires aux particuliers RBC
        </h2>
        <p style={{ fontSize:14, color:'#555', textAlign:'center', lineHeight:1.6, marginBottom:28 }}>
          Explorez les produits et services bancaires aux particuliers de RBC Banque Royale pour vous aider
          à gérer vos finances, à acheter une maison, à faire des placements et plus encore.
        </p>
        <div style={{ border:'1px solid #d1d5db', padding:'20px 16px' }}>
          <h3 style={{ fontSize:18, fontWeight:700, textAlign:'center', marginBottom:8, color:'#1a1a1a' }}>
            Produits et services de RBC
          </h3>
          <p style={{ fontSize:14, color:'#555', marginBottom:16 }}>
            Quels que soient vos besoins, nous avons ce qu'il vous faut.
          </p>
          {services.map((s, i) => (
            <button key={i} onClick={onNavigateToLogin} style={{
              display:'flex', alignItems:'center', gap:14, width:'100%',
              padding:'14px 0', background:'none', border:'none',
              borderBottom: i < services.length-1 ? '1px solid #e5e7eb' : 'none',
              cursor:'pointer', textAlign:'left',
            }}>
              {s.icon}
              <span style={{ color:RBC_BLUE2, fontSize:15, fontWeight:500 }}>{s.label}</span>
            </button>
          ))}
          <button onClick={onNavigateToLogin} style={{
            display:'flex', alignItems:'center', gap:4, marginTop:16,
            background:'none', border:'none', color:RBC_BLUE2, fontSize:15, fontWeight:600, cursor:'pointer',
          }}>
            Tout afficher <ChevronRight size={18}/>
          </button>
        </div>
      </section>

      {/* ══ SERVICE CLIENTÈLE ══ */}
      <section style={{ padding:'0 20px 32px', background:'#f5f5f5' }}>
        <div style={{ border:'1px solid #d1d5db', padding:'20px 16px', background:'#fff' }}>
          <h3 style={{ fontSize:18, fontWeight:700, color:'#1a1a1a', marginBottom:12 }}>Service clientèle</h3>
          <p style={{ fontWeight:700, fontSize:14, marginBottom:8 }}>Clavardez avec nous!</p>
          <p style={{ fontSize:14, color:'#555', lineHeight:1.6, marginBottom:16 }}>
            Ouvrez une session dans l'appli Mobile RBC ou dans Banque en direct et clavardez avec
            l'assistant virtuel pour obtenir des réponses rapides ou pour communiquer avec un expert-conseil.
          </p>
          {["Centre d'aide",'Trouver une succursale ou un GAB','Prendre rendez-vous','Clavardez avec nous !'].map((item,i) => (
            <button key={i} onClick={onNavigateToLogin} style={{
              display:'flex', alignItems:'center', gap:4, width:'100%',
              padding:'12px 0', background:'none', border:'none',
              borderBottom:'1px solid #e5e7eb', color:RBC_BLUE2,
              fontSize:15, fontWeight:500, cursor:'pointer', textAlign:'left',
            }}>
              {item} <ChevronRight size={16}/>
            </button>
          ))}
          <p style={{ fontWeight:700, fontSize:14, marginTop:16, marginBottom:8 }}>
            Avantages des services bancaires numériques :
          </p>
          {["L'appli Mobile RBC",'RBC Banque en direct','Regardez les tutoriels'].map((item,i) => (
            <button key={i} onClick={onNavigateToLogin} style={{
              display:'flex', alignItems:'center', gap:4, width:'100%',
              padding:'8px 0', background:'none', border:'none',
              color:RBC_BLUE2, fontSize:15, fontWeight:500, cursor:'pointer', textAlign:'left',
            }}>
              {item} <ChevronRight size={16}/>
            </button>
          ))}
        </div>
      </section>

      {/* ══ APPLI MOBILE RBC ══ */}
      <section style={{ padding:'0 20px 32px', background:'#fff' }}>
        <div style={{ border:'1px solid #d1d5db', padding:'20px 16px' }}>
          <h3 style={{ fontSize:18, fontWeight:700, textAlign:'center', marginBottom:20, color:'#1a1a1a' }}>
            Une commodité à découvrir
          </h3>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
            <img
              src="/images/L1.jpeg"
              alt="L'appli Mobile RBC"
              style={{ width:100, height:100, borderRadius:20, objectFit:'contain' }}
              onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
            />
            <div style={{
              display:'none', width:100, height:100, background:RBC_BLUE,
              borderRadius:20, alignItems:'center', justifyContent:'center',
              fontWeight:900, fontSize:18, color:RBC_GOLD,
            }}>RBC</div>
          </div>
          <button onClick={onNavigateToLogin} style={{
            background:'none', border:'none', color:RBC_BLUE2, fontSize:16, fontWeight:600, cursor:'pointer', padding:0,
          }}>L'appli Mobile RBC</button>
          <p style={{ fontSize:14, color:'#555', lineHeight:1.6, marginTop:8, marginBottom:16 }}>
            Payez des factures, envoyez des fonds, déposez des chèques et plus encore avec notre
            appli de services bancaires mobiles primée³.
          </p>
          <div style={{ borderTop:'1px solid #e5e7eb', paddingTop:12 }}>
            <button onClick={onNavigateToLogin} style={{
              display:'flex', alignItems:'center', gap:4,
              background:'none', border:'none', color:RBC_BLUE2, fontSize:15, fontWeight:600, cursor:'pointer',
            }}>
              En savoir plus <ChevronRight size={16}/>
            </button>
          </div>
        </div>

        {/* Comment vous aider */}
        <div style={{ marginTop:28 }}>
          <h3 style={{ fontSize:20, fontWeight:700, textAlign:'center', marginBottom:20, color:'#1a1a1a' }}>
            Comment pouvons-nous vous aider ?
          </h3>
          {helpItems.map((item,i) => (
            <button key={i} onClick={onNavigateToLogin} style={{
              display:'flex', alignItems:'center', gap:14, width:'100%',
              padding:'14px 0', background:'none', border:'none',
              borderBottom: i < helpItems.length-1 ? '1px solid #e5e7eb' : 'none',
              cursor:'pointer', textAlign:'left',
            }}>
              {item.icon}
              <span style={{ color:RBC_BLUE2, fontSize:15, fontWeight:500 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ══ ACCORDÉON ══ */}
      <section style={{ padding:'0 20px 32px', background:'#fff' }}>
        {accordionItems.map((item,i) => (
          <div key={i} style={{ borderBottom:'1px solid #e5e7eb' }}>
            <button
              onClick={() => setOpenAccordion(openAccordion===i ? null : i)}
              style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                width:'100%', padding:'16px 0', background:'none', border:'none',
                color:RBC_BLUE2, fontSize:16, fontWeight:600, cursor:'pointer', textAlign:'left',
              }}
            >
              {item}
              <ChevronDown size={20} style={{ flexShrink:0, transform:openAccordion===i?'rotate(180deg)':'none', transition:'0.2s' }}/>
            </button>
            {openAccordion===i && (
              <div style={{ paddingBottom:16, color:'#555', fontSize:14, lineHeight:1.6 }}>
                Découvrez comment RBC peut vous accompagner dans ce moment important de votre vie.
                <br/>
                <button onClick={onNavigateToLogin} style={{
                  marginTop:8, background:'none', border:'none',
                  color:RBC_BLUE2, fontWeight:600, cursor:'pointer', padding:0,
                }}>En savoir plus →</button>
              </div>
            )}
          </div>
        ))}

        {/* Recherche */}
        <div style={{ border:'1px solid #d1d5db', padding:'20px 16px', marginTop:28 }}>
          <p style={{ fontStyle:'italic', fontSize:18, color:'#1a1a1a', marginBottom:8 }}>
            Vous avez encore besoin d'aide ?
          </p>
          <div style={{ width:40, height:3, background:RBC_GOLD, marginBottom:16 }}/>
          <div style={{ display:'flex', gap:8 }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ flex:1, padding:'10px 12px', border:'1px solid #d1d5db', fontSize:14, outline:'none' }}
            />
            <button onClick={onNavigateToLogin} style={{
              padding:'10px 18px', background:'#e5e7eb', border:'1px solid #d1d5db',
              fontSize:14, fontWeight:600, cursor:'pointer', color:'#333',
            }}>Rechercher</button>
          </div>
        </div>
      </section>

      {/* ══ MES FINANCES D'ABORD ══ */}
      <section style={{ padding:'32px 20px', background:'#f5f5f5' }}>
        <h2 style={{ fontSize:22, fontWeight:700, textAlign:'center', marginBottom:12, color:'#1a1a1a' }}>
          Mes finances d'abord
        </h2>
        <p style={{ fontSize:14, color:'#555', textAlign:'center', lineHeight:1.6, marginBottom:24 }}>
          Utilisez les articles et les ressources contenus dans Mes finances d'abord pour prendre
          en main votre bien-être financier, gagner en confiance et atteindre vos objectifs de vie.
        </p>
        {newsArticles.map((article,i) => (
          <div key={i} onClick={onNavigateToLogin} style={{
            border:'1px solid #d1d5db', background:'#fff', marginBottom:16, cursor:'pointer',
          }}>
            <div style={{ height:200, background:'#e0e0e0', overflow:'hidden' }}>
              <img
                src={article.image}
                alt={article.title}
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                onError={(e) => { e.target.style.display='none'; }}
              />
            </div>
            <div style={{ padding:'16px' }}>
              <p style={{
                fontSize:16, fontWeight:600, color:'#1a1a1a', lineHeight:1.5,
                textDecoration: article.underline ? 'underline' : 'none',
              }}>{article.title}</p>
            </div>
          </div>
        ))}
        <div style={{ display:'flex', justifyContent:'center', marginTop:8 }}>
          <button onClick={onNavigateToLogin} style={{
            padding:'12px 40px', background:'none', border:`1px solid ${RBC_BLUE2}`,
            color:RBC_BLUE2, fontSize:15, fontWeight:600, cursor:'pointer',
          }}>Voir plus</button>
        </div>
      </section>

      {/* ══ TROUVER SUCCURSALE / GAB ══ */}
      <section style={{ position:'relative' }}>
        <div style={{ height:180, background:'#c8d8c0', overflow:'hidden' }}>
          <img
            src="/images/I1.jpeg"
            alt="Carte"
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
            onError={(e) => { e.target.style.display='none'; }}
          />
        </div>
        <div style={{
          margin:'-60px 20px 32px', background:'#fff',
          border:'1px solid #d1d5db', padding:'24px 20px', position:'relative', zIndex:2,
        }}>
          <h3 style={{ fontSize:20, fontWeight:700, color:'#1a1a1a', marginBottom:12 }}>
            Trouvez une succursale ou un GAB près de chez vous
          </h3>
          <p style={{ fontSize:14, color:'#555', marginBottom:16 }}>
            Recherchez par adresse, endroit, code postal, ou unité :
          </p>
          <input
            type="text"
            style={{
              width:'100%', padding:'12px', border:'1px solid #1a1a1a',
              fontSize:14, outline:'none', marginBottom:12, boxSizing:'border-box',
            }}
          />
          <button onClick={onNavigateToLogin} style={{
            width:'100%', padding:'14px', background:RBC_BLUE,
            color:'#fff', border:'none', fontSize:16, fontWeight:600, cursor:'pointer',
          }}>Rechercher</button>
        </div>
      </section>

      {/* ══ FOOTER BLEU ══ */}
      <footer style={{ background:RBC_BLUE }}>
        <div style={{ padding:'28px 20px' }}>
          {footerBlueLinks.map((section,i) => (
            <div key={i} style={{ marginBottom:20 }}>
              <p style={{ color:'#fff', fontWeight:700, fontSize:15, marginBottom:12 }}>{section.title}</p>
              {section.items.map((item,j) => (
                <button key={j} onClick={onNavigateToLogin} style={{
                  display:'flex', alignItems:'flex-start', gap:8, width:'100%',
                  padding:'8px 0', background:'none', border:'none',
                  color:'#fff', fontSize:14, cursor:'pointer', textAlign:'left',
                }}>
                  <ChevronRight size={16} style={{ flexShrink:0, marginTop:2 }}/>{item}
                </button>
              ))}
            </div>
          ))}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            border:'2px solid #fff', borderRadius:24, padding:'8px 16px', marginTop:8,
          }}>
            <span style={{ color:'#fff', fontWeight:700, fontSize:14, letterSpacing:1 }}>sadc 🔒 cdic</span>
          </div>
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.2)' }}>
          {footerSections.map((section,i) => (
            <div key={i} style={{ borderBottom:'1px solid rgba(255,255,255,0.15)' }}>
              <button
                onClick={() => setOpenFooter(openFooter===i ? null : i)}
                style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  width:'100%', padding:'14px 20px', background:'none', border:'none',
                  color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer',
                }}
              >
                {section.title}
                <ChevronDown size={18} style={{ transform:openFooter===i?'rotate(180deg)':'none', transition:'0.2s' }}/>
              </button>
              {openFooter===i && (
                <div style={{ padding:'0 20px 12px' }}>
                  {section.items.map((item,j) => (
                    <button key={j} onClick={onNavigateToLogin} style={{
                      display:'block', width:'100%', textAlign:'left',
                      padding:'6px 0', background:'none', border:'none',
                      color:'rgba(255,255,255,0.8)', fontSize:13, cursor:'pointer',
                    }}>{item}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background:'#4a4a4a', padding:'20px' }}>
          <p style={{ color:'#fff', fontSize:13, textAlign:'center', marginBottom:12, lineHeight:1.5 }}>
            Site Web de la Banque Royale du Canada, © 1995-2026
          </p>
          <p style={{ textAlign:'center', marginBottom:8, fontSize:12, lineHeight:2 }}>
            {["Conditions d'utilisation",'Accessibilité','Protection des renseignements et Sécurité','Publicité et témoins'].map((item,i,arr) => (
              <span key={i}>
                <button onClick={onNavigateToLogin} style={{
                  background:'none', border:'none', color:'#ccc',
                  fontSize:12, textDecoration:'underline', cursor:'pointer',
                }}>{item}</button>
                {i < arr.length-1 && <span style={{ color:'#999', margin:'0 4px' }}>|</span>}
              </span>
            ))}
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:20, marginTop:16 }}>
            {[FacebookIcon, InstagramIcon, XIcon, YouTubeIcon, LinkedInIcon].map((Icon, i) => (
              <button key={i} onClick={onNavigateToLogin} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
                <Icon/>
              </button>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:16 }}>
            <button
              onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
              style={{
                background:'none', border:'none', color:'#fff',
                fontSize:14, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6,
              }}
            >↑ Haut</button>
          </div>
        </div>
      </footer>
    </div>
  );
}