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

  try {
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    
    const result = await response.json();

    if (result.status === 'success') {
      return res.status(200).json({ message: 'Données envoyées avec succès.' });
    } else {
      throw new Error(result.message || 'Erreur Google Script.');
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de l\'envoi des données.' });
  }
}