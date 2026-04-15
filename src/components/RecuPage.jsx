import React from 'react';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';

const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';
const BGC_GOLD = '#C9A84C';

export default function RecuPage({ navigate, virementData }) {
  if (!virementData) {
    return (
      <div style={{ minHeight: '100vh', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: 32, maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ fontSize: 28 }}>⚠️</span>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: BGC_DARK, marginBottom: 8 }}>Aucune donnée de virement</h2>
          <p style={{ color: '#6B7280', marginBottom: 24, fontSize: 14 }}>Les informations du virement ne sont pas disponibles.</p>
          <button onClick={() => navigate('/dashboard')} style={{ width: '100%', background: BGC_RED, color: '#fff', padding: '12px', borderRadius: 8, border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width  = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = BGC_DARK;
    ctx.fillRect(0, 0, canvas.width, 120);
    ctx.fillStyle = BGC_RED;
    ctx.fillRect(0, 112, canvas.width, 8);

    ctx.fillStyle = BGC_RED;
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('BGC', 40, 55);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText('Banque Générale du Canada', 40, 75);
    ctx.font = '9px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('Votre banque, votre avenir', 40, 92);

    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('REÇU DE VIREMENT', canvas.width - 40, 65);

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(200, 140, 400, 50);
    ctx.fillStyle = BGC_DARK;
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('✓ VIREMENT EFFECTUÉ', canvas.width / 2, 170);

    ctx.fillStyle = '#FFF8E1';
    ctx.fillRect(150, 210, 500, 60);
    ctx.strokeStyle = BGC_GOLD;
    ctx.lineWidth = 2;
    ctx.strokeRect(150, 210, 500, 60);
    ctx.fillStyle = '#5d4037';
    ctx.font = '11px Arial';
    ctx.fillText('RÉFÉRENCE', canvas.width / 2, 230);
    ctx.font = 'bold 16px Courier New';
    ctx.fillText(virementData.reference, canvas.width / 2, 255);

    ctx.fillStyle = BGC_RED;
    ctx.font = 'bold 42px Arial';
    ctx.fillText(`${virementData.amount} $`, canvas.width / 2, 320);

    ctx.textAlign = 'left';
    let y = 380;
    const details = [
      { label: 'ÉMETTEUR',    value: virementData.senderName  },
      { label: 'BÉNÉFICIAIRE',value: virementData.beneficiary },
      { label: 'EMAIL',       value: virementData.email       },
      { label: 'IBAN',        value: virementData.iban        },
      { label: 'BIC',         value: virementData.bic         },
      { label: 'DATE',        value: virementData.date        },
    ];

    details.forEach(detail => {
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px Arial';
      ctx.fillText(detail.label, 80, y);
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(detail.value || '—', 80, y + 20);
      y += 50;
    });

    if (virementData.message) {
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px Arial';
      ctx.fillText('MESSAGE', 80, y);
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px Arial';
      ctx.fillText(virementData.message, 80, y + 20);
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px Arial';
    ctx.fillText('Document généré le ' + new Date().toLocaleDateString('fr-FR'), canvas.width / 2, 960);

    canvas.toBlob((blob) => {
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = `Recu_BGC_${virementData.reference}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      {/* Header */}
      <header style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 20, borderBottom: `3px solid ${BGC_RED}` }}>
        <div style={{ maxWidth: 896, margin: '0 auto', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => navigate('/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563' }}>
            <ArrowLeft size={20} />
            <span style={{ fontSize: 14 }}>Retour</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ background: BGC_RED, borderRadius: 4, padding: '4px 8px' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 13, letterSpacing: 1 }}>BGC</span>
            </div>
          </div>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: BGC_DARK }}>Reçu</h1>
        </div>
      </header>

      <main style={{ maxWidth: 672, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

          {/* Header sombre BGC */}
          <div style={{ padding: 32, textAlign: 'center', background: BGC_DARK, color: '#fff' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: `2px solid ${BGC_GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={40} color={BGC_GOLD} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Virement effectué !</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Votre transaction a été traitée avec succès</p>
          </div>

          {/* Référence */}
          <div style={{ margin: '0 24px', marginTop: -16, background: '#FFF8E1', borderLeft: `4px solid ${BGC_GOLD}`, borderRadius: 8, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize: 11, color: '#92400E', marginBottom: 4 }}>RÉFÉRENCE DE TRANSACTION</p>
            <p style={{ fontSize: 16, fontWeight: 700, fontFamily: 'monospace', color: '#5d4037' }}>{virementData.reference}</p>
          </div>

          {/* Montant */}
          <div style={{ padding: '24px', textAlign: 'center', borderBottom: '1px solid #F0F0F0' }}>
            <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Montant</p>
            <p style={{ fontSize: 40, fontWeight: 700, color: BGC_RED }}>{virementData.amount} $</p>
          </div>

          {/* Détails */}
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'ÉMETTEUR',       value: virementData.senderName  },
              { label: 'BÉNÉFICIAIRE',   value: virementData.beneficiary },
              { label: 'EMAIL',          value: virementData.email       },
              { label: 'IBAN',           value: virementData.iban,  mono: true },
              { label: 'CODE BIC/SWIFT', value: virementData.bic,   mono: true },
              { label: 'DATE ET HEURE',  value: virementData.date        },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontSize: 15, color: '#1F2937', fontWeight: item.mono ? 400 : 600, fontFamily: item.mono ? 'monospace' : 'inherit' }}>{item.value || '—'}</p>
              </div>
            ))}
            {virementData.message && (
              <div>
                <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 4 }}>MESSAGE</p>
                <p style={{ fontSize: 15, color: '#374151' }}>{virementData.message}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ padding: 24, background: '#F9FAFB', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={handleDownload} style={{ width: '100%', background: BGC_RED, color: '#fff', padding: '14px', borderRadius: 8, border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14 }}>
              <Download size={20} /> Télécharger le reçu
            </button>
            <button onClick={() => navigate('/dashboard')} style={{ width: '100%', background: '#fff', color: '#374151', padding: '14px', borderRadius: 8, border: '1px solid #D1D5DB', fontWeight: 500, cursor: 'pointer', fontSize: 14 }}>
              Retour au tableau de bord
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}