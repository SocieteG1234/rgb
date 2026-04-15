import React, { useState } from 'react';
import { ChevronLeft, FileText, Download, Eye, Lock, Shield, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from './Bottomnavigation';

const RBC_BLUE   = '#003168';
const RBC_BLUE2  = '#1a6fc4';
const RBC_GOLD   = '#FEDF00';

// ── Génération PDF dynamique avec jsPDF (chargé via CDN) ──────────
const loadJsPDF = () => new Promise((res) => {
  if (window.jspdf) { res(window.jspdf.jsPDF); return; }
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  script.onload = () => res(window.jspdf.jsPDF);
  document.head.appendChild(script);
});

const loadImage = (src) => new Promise((res) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload  = () => res(img);
  img.onerror = () => res(null);
  img.src = src;
});

const generateActeBlocage = async (user) => {
  const jsPDF = await loadJsPDF();
  const doc   = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const W      = 210;
  const BLUE   = [0, 49, 104];       // RBC_BLUE
  const GOLD   = [254, 223, 0];      // RBC_GOLD
  const BLUE2  = [26, 111, 196];     // RBC_BLUE2
  const WHITE  = [255, 255, 255];
  const GRAY   = [107, 114, 128];
  const LGRAY  = [243, 244, 246];
  const DARK   = [31, 41, 55];
  const RED    = [220, 38, 38];

  const userName    = (user.name || 'TITULAIRE').toUpperCase();
  const accountNum  = user.accountNumber || '—';
  const iban        = user.rib?.iban || 'CA76 XXXX XXXX XXXX XXXX XXXX XXX';
  const balance     = Number(user.balance || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' $';
  const unlockFee   = Number(user.unlockFee || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' $';
  const blockReason = user.blockReason || 'Blocage temporaire pour régularisation successorale';
  const manager     = user.manager || 'Marie Tremblay';
  const agency      = user.city ? `RBC ${user.city}` : 'RBC Banque Royale — Montréal';
  const blockDate   = '14 décembre 2017';
  const docDate     = '03 janvier 2018';
  const docRef      = `RBC-BLK-20180103-${String(user.id || 1).padStart(3, '0')}`;

  let y = 0;
  const PAGE_H   = 297;
  const MARGIN_B = 18;

  const checkPage = (needed = 20) => {
    if (y + needed > PAGE_H - MARGIN_B) {
      doc.addPage();
      y = 14;
    }
  };

  const sectionTitle = (title, yPos) => {
    doc.setFillColor(...BLUE);
    doc.rect(14, yPos, W - 28, 8, 'F');
    doc.setTextColor(...WHITE);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 18, yPos + 5.5);
    return yPos + 12;
  };

  const infoCol = (label, value, x, yy) => {
    doc.setTextColor(...GRAY);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text(label, x, yy);
    doc.setTextColor(...DARK);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(String(value), x, yy + 5);
  };

  // ── EN-TÊTE BLEU RBC ─────────────────────────────────────────
  doc.setFillColor(...BLUE);
  doc.rect(0, 0, W, 32, 'F');
  doc.setFillColor(...GOLD);
  doc.rect(0, 28, W, 4, 'F');

  // Logo RBC
  const logo = await loadImage('/images/RBC_logo.png');
  if (logo) {
    doc.addImage(logo, 'PNG', 8, 4, 38, 20);
  } else {
    doc.setTextColor(...WHITE);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('RBC', 14, 14);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Banque Royale du Canada', 14, 20);
  }

  // Titre centre
  doc.setTextColor(...WHITE);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('ACTE DE BLOCAGE DE COMPTE', W / 2, 12, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Document officiel — Confidentiel', W / 2, 18, { align: 'center' });

  // Réf droite
  doc.setFontSize(7.5);
  doc.text(`Réf. : ${docRef}`, W - 14, 12, { align: 'right' });
  doc.text(`Date : ${docDate}`, W - 14, 18, { align: 'right' });

  y = 38;

  // ── BANDEAU TITRE JAUNE RBC ───────────────────────────────────
  doc.setFillColor(...GOLD);
  doc.roundedRect(14, y, W - 28, 10, 2, 2, 'F');
  doc.setTextColor(...BLUE);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('NOTIFICATION DE MESURE CONSERVATOIRE', W / 2, y + 6.5, { align: 'center' });
  y += 16;

  // ── 1. INFORMATIONS DU COMPTE ─────────────────────────────────
  checkPage(50);
  y = sectionTitle('1. INFORMATIONS DU COMPTE', y);

  doc.setFillColor(...LGRAY);
  doc.rect(14, y, W - 28, 26, 'F');
  doc.setDrawColor(229, 231, 235);
  doc.rect(14, y, W - 28, 26, 'S');
  infoCol('Titulaire',       userName,   18,  y + 6);
  infoCol('N° Compte',       accountNum, 110, y + 6);
  infoCol('Agence',          agency,     18,  y + 17);
  infoCol('Date de blocage', blockDate,  110, y + 17);
  y += 30;

  doc.setFillColor(...LGRAY);
  doc.rect(14, y, W - 28, 10, 'F');
  doc.setDrawColor(229, 231, 235);
  doc.rect(14, y, W - 28, 10, 'S');
  doc.setTextColor(...GRAY); doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
  doc.text('IBAN / Transit', 18, y + 4);
  doc.setTextColor(...DARK); doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.text(iban, 18, y + 9);
  doc.setTextColor(...GRAY); doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
  doc.text('SWIFT/BIC', 140, y + 4);
  doc.setTextColor(...DARK); doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.text('ROYCCAT2XXX', 140, y + 9);
  y += 16;

  // ── 2. SITUATION FINANCIÈRE ───────────────────────────────────
  checkPage(40);
  y = sectionTitle('2. SITUATION FINANCIÈRE DU COMPTE', y);

  doc.setFillColor(230, 241, 251);
  doc.rect(14, y, 86, 18, 'F');
  doc.setDrawColor(...BLUE); doc.setLineWidth(0.8);
  doc.rect(14, y, 86, 18, 'S'); doc.setLineWidth(0.2);
  doc.setTextColor(...GRAY); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
  doc.text('Solde total du compte', 57, y + 6, { align: 'center' });
  doc.setTextColor(...BLUE); doc.setFontSize(14); doc.setFont('helvetica', 'bold');
  doc.text(balance, 57, y + 14, { align: 'center' });

  doc.setFillColor(254, 242, 242);
  doc.rect(110, y, 86, 18, 'F');
  doc.setDrawColor(...RED); doc.setLineWidth(0.8);
  doc.rect(110, y, 86, 18, 'S'); doc.setLineWidth(0.2);
  doc.setTextColor(...GRAY); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
  doc.text('Frais de déblocage requis', 153, y + 6, { align: 'center' });
  doc.setTextColor(...RED); doc.setFontSize(14); doc.setFont('helvetica', 'bold');
  doc.text(unlockFee, 153, y + 14, { align: 'center' });
  y += 24;

  // ── 3. MOTIF DU BLOCAGE ───────────────────────────────────────
  checkPage(55);
  y = sectionTitle('3. NATURE ET MOTIF DU BLOCAGE', y);

  doc.setFillColor(255, 253, 230);
  doc.rect(14, y, W - 28, 38, 'F');
  doc.setDrawColor(...GOLD); doc.setLineWidth(1);
  doc.rect(14, y, W - 28, 38, 'S'); doc.setLineWidth(0.2);
  doc.setTextColor(...DARK); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.text(`Motif : ${blockReason}`, 18, y + 7);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5);
  const motifLines = [
    "Suite au transfert de fonds provenant d'une succession, le compte fait actuellement l'objet",
    "d'une mesure de sécurité conformément aux règlements fiscaux et bancaires en vigueur.",
    "Ce blocage temporaire intervient dans le cadre de la vérification de l'origine des fonds",
    "ainsi que la régularisation des obligations fiscales liées à la succession du défunt.",
    "L'accès complet au compte sera rétabli dès la finalisation des formalités administratives,",
    "fiscales et notariales requises, ainsi que le règlement des frais de déblocage ci-dessus.",
  ];
  motifLines.forEach((line, i) => doc.text(line, 18, y + 14 + i * 4.8));
  y += 44;

  // ── 4. BASE LÉGALE ────────────────────────────────────────────
  checkPage(50);
  y = sectionTitle('4. BASE LÉGALE ET RÉGLEMENTAIRE', y);
  doc.setTextColor(...DARK); doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
  const legalItems = [
    'Loi sur le recyclage des produits de la criminalité et le financement des activités terroristes (LRPCFAT)',
    'Règlement sur le gel des avoirs — Loi sur les mesures économiques spéciales',
    "Articles 1806 et suivants du Code civil du Québec — Dévolution successorale",
    "Loi de l'impôt sur le revenu — Obligations déclaratives (Art. 150)",
    'Politique interne RBC — Procédures de conformité et de sécurité bancaire',
  ];
  legalItems.forEach((item, i) => doc.text(`• ${item}`, 18, y + i * 5.5));
  y += legalItems.length * 5.5 + 6;

  // ── 5. CONDITIONS DE DÉBLOCAGE ────────────────────────────────
  checkPage(60);
  y = sectionTitle('5. CONDITIONS DE DÉBLOCAGE', y);
  doc.setFillColor(...BLUE); doc.rect(14, y, W - 28, 8, 'F');
  doc.setTextColor(...WHITE); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
  doc.text('Étape', 20, y + 5.5);
  doc.text('Document / Action requise', 35, y + 5.5);
  doc.text('Délai', 175, y + 5.5, { align: 'right' });
  y += 8;
  const steps = [
    ['1', "Fournir l'acte notarial de succession certifié",                '5 à 10 jours'],
    ['2', 'Attestation fiscale de régularisation des droits de succession', '3 à 7 jours' ],
    ['3', `Règlement des frais de déblocage : ${unlockFee}`,                'Immédiat'    ],
    ['4', 'Validation par le département conformité RBC',                  '2 à 5 jours' ],
    ['5', "Rétablissement complet de l'accès au compte",                   'Sous 48h'    ],
  ];
  steps.forEach(([num, action, delay], i) => {
    const bg = i % 2 === 0 ? LGRAY : WHITE;
    doc.setFillColor(...bg);
    doc.rect(14, y, W - 28, 8, 'F');
    doc.setDrawColor(229, 231, 235); doc.rect(14, y, W - 28, 8, 'S');
    doc.setTextColor(...DARK); doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold'); doc.text(num, 20, y + 5.5);
    doc.setFont('helvetica', 'normal'); doc.text(action, 35, y + 5.5);
    doc.text(delay, 175, y + 5.5, { align: 'right' });
    y += 8;
  });
  y += 8;

  // ── 6. CONTACT ────────────────────────────────────────────────
  checkPage(45);
  y = sectionTitle('6. CONTACT ET INFORMATIONS', y);
  const contactCols = [
    { title: 'Conseiller(ère) assigné(e)', lines: [manager, 'marie.tremblay@rbc.com', '1 800 769-2511'] },
    { title: 'Service Conformité RBC',     lines: ['Département Succession', 'conformite@rbc.com', '1 800 769-2511'] },
    { title: 'Adresse postale',             lines: ['RBC — Service Conformité', '20 King Street West', 'Toronto, ON M5H 1C4'] },
  ];
  const colW = (W - 28) / 3;
  contactCols.forEach((col, i) => {
    const cx = 14 + i * colW;
    doc.setFillColor(...LGRAY); doc.rect(cx, y, colW, 22, 'F');
    doc.setDrawColor(229, 231, 235); doc.rect(cx, y, colW, 22, 'S');
    doc.setTextColor(...BLUE); doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    doc.text(col.title, cx + 4, y + 5);
    doc.setTextColor(...DARK); doc.setFont('helvetica', 'normal');
    col.lines.forEach((line, j) => doc.text(line, cx + 4, y + 10 + j * 4.5));
  });
  y += 28;

  // ── PIED DE PAGE ──────────────────────────────────────────────
  checkPage(35);
  doc.setDrawColor(229, 231, 235);
  doc.line(14, y, W - 14, y);
  y += 6;
  doc.setTextColor(...DARK); doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
  doc.text(`Document émis le ${docDate} — RBC Banque Royale du Canada`, 14, y);
  doc.text('Siège social : 200 Bay Street, Toronto, ON M5J 2J5', 14, y + 5);
  doc.setTextColor(...GRAY);
  doc.text('Ce document est généré automatiquement et a valeur officielle.', 14, y + 10);

  doc.setFillColor(230, 241, 251); doc.setDrawColor(...BLUE);
  doc.rect(130, y - 2, 66, 18, 'FD');
  doc.setTextColor(...BLUE); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
  doc.text('Cachet officiel RBC', 163, y + 3, { align: 'center' });
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5);
  doc.text('Direction Conformité & Risques', 163, y + 8, { align: 'center' });
  doc.text(`Validé électroniquement — ${docDate}`, 163, y + 13, { align: 'center' });

  doc.save(`acte_blocage_${userName.replace(/\s+/g, '_')}.pdf`);
};

// ── Page principale ────────────────────────────────────────────────
const GestionDocuments = () => {
  const navigate                      = useNavigate();
  const { user }                      = useAuth();
  const [downloading, setDownloading] = useState(null);

  if (!user) return null;

  const docDate = '03 janvier 2018';

  const documents = [
    {
      id:          'acte_blocage',
      titre:       'Acte de blocage de compte',
      description: user.blockReason || 'Notification de mesure conservatoire',
      date:        docDate,
      type:        'PDF',
      icon:        Lock,
      couleur:     '#fff8e1',
      iconColor:   RBC_BLUE,
      urgent:      true,
      visible:     !!user.isBlocked,
    },
    {
      id:          'rib',
      titre:       "Relevé d'Identité Bancaire (RIB)",
      description: 'Coordonnées bancaires — Transit, institution & IBAN',
      date:        docDate,
      type:        'PDF',
      icon:        FileText,
      couleur:     '#e3edf8',
      iconColor:   RBC_BLUE,
      urgent:      false,
      visible:     true,
      route:       '/rib',
    },
  ];

  const handleDownload = async (doc) => {
    setDownloading(doc.id);
    try {
      if (doc.id === 'acte_blocage') {
        await generateActeBlocage(user);
      } else if (doc.route) {
        navigate(doc.route);
      }
    } catch (e) {
      console.error(e);
    }
    setDownloading(null);
  };

  const handleConsult = (doc) => {
    if (doc.route) navigate(doc.route);
  };

  const visibleDocs = documents.filter(d => d.visible);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif', paddingBottom: 96 }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', position: 'sticky', top: 0, zIndex: 40,
        backgroundColor: RBC_BLUE,
      }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <ChevronLeft style={{ width: 24, height: 24, color: '#fff' }} />
        </button>
        <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 15, letterSpacing: 1, textTransform: 'uppercase', margin: 0 }}>
          Gestion de documents
        </h1>
        <div style={{ width: 32 }} />
      </div>

      {/* Bandeau doré RBC */}
      <div style={{ height: 4, backgroundColor: RBC_GOLD }} />

      {/* Intro */}
      <div style={{
        margin: '20px 16px 0',
        borderRadius: 16,
        padding: 16,
        color: '#fff',
        background: `linear-gradient(135deg, ${RBC_BLUE}, #1a4a8a)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            backgroundColor: RBC_GOLD,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Shield style={{ width: 22, height: 22, color: RBC_BLUE }} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{user.name}</p>
            <p style={{ fontSize: 12, opacity: 0.75, margin: 0 }}>
              N° {user.accountNumber} — Documents officiels RBC Banque Royale
            </p>
          </div>
        </div>

        {/* Infos financières */}
        {user.isBlocked && (
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ borderRadius: 12, padding: 12, backgroundColor: 'rgba(255,255,255,0.12)' }}>
              <p style={{ fontSize: 10, opacity: 0.7, margin: '0 0 2px' }}>Solde du compte</p>
              <p style={{ fontWeight: 900, fontSize: 16, margin: 0 }}>
                {Number(user.balance).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} $
              </p>
            </div>
            <div style={{ borderRadius: 12, padding: 12, backgroundColor: 'rgba(220,38,38,0.25)' }}>
              <p style={{ fontSize: 10, opacity: 0.7, margin: '0 0 2px' }}>Frais de déblocage</p>
              <p style={{ fontWeight: 900, fontSize: 16, margin: 0, color: '#fca5a5' }}>
                {Number(user.unlockFee).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} $
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Alerte compte bloqué */}
      {user.isBlocked && (
        <div style={{
          margin: '16px 16px 0',
          borderRadius: 16,
          padding: 16,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          backgroundColor: '#fff8e1',
          border: `1.5px solid ${RBC_GOLD}`,
        }}>
          <AlertTriangle style={{ width: 20, height: 20, flexShrink: 0, marginTop: 2, color: '#92400e' }} />
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#78350f', margin: '0 0 2px' }}>
              Compte temporairement bloqué
            </p>
            <p style={{ fontSize: 12, color: '#92400e', margin: 0 }}>
              {user.blockReason} — Blocage effectif depuis le 14 décembre 2017.
            </p>
          </div>
        </div>
      )}

      {/* Liste documents */}
      <div style={{ margin: '20px 16px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
          Documents disponibles
        </p>

        {visibleDocs.map((doc) => {
          const Icon = doc.icon;
          return (
            <div key={doc.id} style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              marginBottom: 12,
            }}>
              <div style={{ padding: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  backgroundColor: doc.couleur,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon style={{ width: 24, height: 24, color: doc.iconColor }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>{doc.titre}</p>
                    {doc.urgent && (
                      <span style={{
                        padding: '2px 8px', borderRadius: 20,
                        fontSize: 9, fontWeight: 700, color: '#fff',
                        backgroundColor: '#ef4444',
                      }}>
                        IMPORTANT
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: '#6b7280', margin: '2px 0 0' }}>{doc.description}</p>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: '4px 0 0' }}>
                    Émis le {doc.date} &bull; {doc.type}
                  </p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f3f4f6', display: 'flex' }}>
                <button
                  onClick={() => handleDownload(doc)}
                  disabled={downloading === doc.id}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 8, padding: '12px 0', fontSize: 12, fontWeight: 600,
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: RBC_BLUE,
                  }}
                >
                  {downloading === doc.id
                    ? <div style={{
                        width: 16, height: 16, borderRadius: '50%',
                        border: `2px solid ${RBC_BLUE}`, borderTopColor: 'transparent',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                    : <Download style={{ width: 16, height: 16 }} />}
                  {downloading === doc.id ? 'Génération...' : 'Télécharger'}
                </button>
                {doc.route && (
                  <>
                    <div style={{ width: 1, backgroundColor: '#f3f4f6' }} />
                    <button
                      onClick={() => handleConsult(doc)}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 8, padding: '12px 0', fontSize: 12, fontWeight: 600,
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: '#6b7280',
                      }}
                    >
                      <Eye style={{ width: 16, height: 16 }} />
                      Consulter
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info légale */}
      <div style={{
        margin: '0 16px',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Shield style={{ width: 20, height: 20, flexShrink: 0, marginTop: 2, color: RBC_BLUE }} />
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#1f2937', margin: '0 0 4px' }}>
              Documents officiels RBC Banque Royale
            </p>
            <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
              Ces documents sont émis par RBC Banque Royale du Canada et ont valeur officielle.
              Pour toute question, contactez votre conseiller(ère){' '}
              <span style={{ fontWeight: 600 }}>{user.manager}</span> ou appelez le{' '}
              <span style={{ fontWeight: 600 }}>1 800 769-2511</span>.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <BottomNavigation />
    </div>
  );
};

export default GestionDocuments;