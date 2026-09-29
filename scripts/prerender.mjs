// Pre-rendu statique par route : remplit le HTML initial avec le contenu rendu,
// et injecte a chaque route son titre, sa meta description et son canonical.
// Fonctionne en local comme sur le build Vercel (puppeteer embarque Chrome).
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = 'dist';
const BASE_URL = 'https://www.global-environnement.fr';

const ROUTES = [
  {
    path: '/',
    title: "Pompe à chaleur air/eau et chauffe-eau thermodynamique | GLOBAL ENVIRONNEMENT",
    description: "Remplacez votre chaudière par une pompe à chaleur air/eau et produisez votre eau chaude plus efficacement. Vérifiez votre éligibilité aux aides (MaPrimeRénov', CEE) et demandez un devis personnalisé avec GLOBAL ENVIRONNEMENT.",
  },
  {
    // Page 404 : rendue via une route inexistante puis servie par Vercel avec le statut 404
    path: '/__page-inconnue__',
    out: '404.html',
    title: 'Page introuvable | GLOBAL ENVIRONNEMENT',
    description: "La page demandée n'existe pas. Retournez à l'accueil de GLOBAL ENVIRONNEMENT.",
    noindex: true,
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales | GLOBAL ENVIRONNEMENT',
    description: "Informations légales du site GLOBAL ENVIRONNEMENT : identité de l'éditeur, coordonnées, hébergement et propriété intellectuelle.",
  },
  {
    path: '/politique-de-confidentialite',
    title: 'Politique de confidentialité et cookies | GLOBAL ENVIRONNEMENT',
    description: "Comment GLOBAL ENVIRONNEMENT traite vos données personnelles : données collectées, finalités, durées de conservation, cookies, consentement et vos droits.",
  },
  {
    path: '/conditions-generales-utilisation',
    title: "Conditions d'utilisation | GLOBAL ENVIRONNEMENT",
    description: "Conditions d'utilisation du site GLOBAL ENVIRONNEMENT : caractère indicatif du test d'éligibilité, demande de devis, liens et contact.",
  },
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
};

function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = join(DIST, urlPath);
      if (urlPath.endsWith('/')) file = join(file, 'index.html');
      if (!existsSync(file) && existsSync(join(file, 'index.html'))) file = join(file, 'index.html');
      if (!existsSync(file)) file = join(DIST, 'index.html'); // repli SPA pour le pre-rendu
      try {
        const data = await readFile(file);
        res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404).end();
      }
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

function applyMeta(html, route) {
  const canonical = BASE_URL + (route.path === '/' ? '/' : route.path);
  if (route.noindex) {
    return html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
      .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex" />');
  }
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`);
}

async function main() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8');
  const { server, port } = await serve();

  let browser;
  const launch = () => puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    browser = await launch();
  } catch (e) {
    // Sur Vercel (et tout CI), Chrome n'est pas toujours present : installation explicite puis nouvel essai.
    console.warn('Navigateur absent, installation de Chrome pour le pre-rendu...');
    const { execSync } = await import('node:child_process');
    try {
      execSync('npx puppeteer browsers install chrome', { stdio: 'inherit' });
      browser = await launch();
    } catch (e2) {
      server.close();
      // Sur Vercel, un echec du pre-rendu doit casser le build plutot que
      // publier silencieusement le site non pre-rendu.
      if (process.env.VERCEL) {
        console.error('ECHEC PRE-RENDU EN BUILD VERCEL :', e2.message);
        process.exit(1);
      }
      console.warn('Pre-rendu ignore (navigateur indisponible) :', e2.message);
      return;
    }
  }

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://127.0.0.1:${port}${route.path}`, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.waitForSelector('#root *', { timeout: 30000 });
      const content = await page.$eval('#root', (el) => el.innerHTML);
      const html = applyMeta(template, route).replace(
        '<div id="root"></div>',
        `<div id="root">${content}</div>`
      );
      if (route.out) {
        await writeFile(join(DIST, route.out), html);
      } else {
        const outDir = route.path === '/' ? DIST : join(DIST, route.path);
        if (route.path !== '/') await mkdir(outDir, { recursive: true });
        await writeFile(join(outDir, 'index.html'), html);
      }
      console.log(`Pre-rendu : ${route.path} (${content.length} caracteres de contenu)`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => {
  console.warn('Pre-rendu ignore (erreur) :', e.message);
  // Sur Vercel, l'echec du pre-rendu est bloquant (ne pas publier un site non pre-rendu).
  process.exit(process.env.VERCEL ? 1 : 0);
});
