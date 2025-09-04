// api/send.js

export default async function handler(req, res) {
  // Gérer la requête pre-flight CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // S'assurer que la méthode est POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Récupérer l'URL secrète depuis les variables d'environnement de Vercel
  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!googleScriptUrl) {
    console.error('GOOGLE_SCRIPT_URL is not defined in environment variables.');
    return res.status(500).json({ error: 'Configuration server error.' });
  }

  try {
    // Récupérer les données du formulaire depuis le corps de la requête
    const formData = req.body;

    // Relayer la requête vers Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    // Google Script doit être configuré pour retourner un JSON valide
    const result = await response.json();

    if (result.status === 'success') {
      return res.status(200).json({ message: 'Data sent successfully to Google Sheet.' });
    } else {
      throw new Error(result.message || 'Failed to process data in Google Script.');
    }

  } catch (error) {
    console.error('Error forwarding request to Google Script:', error);
    return res.status(500).json({ error: 'An error occurred while sending the data.' });
  }
}