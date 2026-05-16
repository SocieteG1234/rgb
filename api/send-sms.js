// api/send-sms.js
// ── Vercel Serverless Function ─────────────────────────────────────
// Ce fichier doit être placé dans le dossier /api à la racine du projet

const TEXTBELT_API_KEY = process.env.TEXTBELT_API_KEY || '9039e5030fc31f36d4716240aa85f4759ab35de5djF1aeFRXVfE6EbKmLhAaDLit';

export default async function handler(req, res) {
  // ── CORS headers ───────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { telephone, message } = req.body;

  if (!telephone || !message) {
    return res.status(400).json({ error: 'Téléphone et message requis' });
  }

  try {
    const response = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone:   telephone.replace(/\s/g, ''),
        message,
        key:     TEXTBELT_API_KEY,
      }),
    });

    const data = await response.json();

    console.log('TextBelt response:', data); // pour debug dans les logs Vercel

    if (!data.success) {
      return res.status(400).json({ success: false, error: data.error || 'Erreur envoi SMS', quotaRemaining: data.quotaRemaining });
    }

    return res.status(200).json({ success: true, quotaRemaining: data.quotaRemaining });

  } catch (err) {
    console.error('Erreur TextBelt:', err);
    return res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
}