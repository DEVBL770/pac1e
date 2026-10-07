export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!googleScriptUrl) {
    return res.status(500).json({ error: 'Configuration serveur incorrecte.' });
  }

  const startedAt = Date.now();
  let stage = 'forward';
  try {
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    
    stage = 'parse_response';
    console.info('lead_forward_response', { upstreamStatus: response.status, elapsedMs: Date.now() - startedAt });
    const result = await response.json();
    stage = 'check_result';

    if (result.status === 'success') {
      return res.status(200).json({ message: 'Données envoyées avec succès.' });
    } else {
      throw new Error(result.message || 'Erreur Google Script.');
    }
  } catch (error) {
    // Une erreur de réponse ne prouve pas que l'Apps Script n'a pas déjà écrit la ligne.
    // Ne jamais journaliser le corps de la demande, l'URL du script ou les coordonnées.
    console.error('lead_forward_unconfirmed', { stage, elapsedMs: Date.now() - startedAt, errorName: error?.name });
    return res.status(502).json({ error: 'Confirmation du traitement impossible.', code: 'UPSTREAM_UNCONFIRMED' });
  }
}