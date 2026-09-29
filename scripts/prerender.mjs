// Pre-rendu statique par route via rendu React côté serveur (sans navigateur) :
// remplit le HTML initial avec le contenu rendu et injecte à chaque route
// son titre, sa meta description et son canonical.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const DIST = 'dist';
const BASE_URL = 'https://www.global-environnement.fr';
const SSR_BUNDLE = 'node_modules/.cache/ge-ssr-entry.cjs';

const ROUTES = [
  {
    path: '/',
    title: "Pompe à chaleur air/eau et chauffe-eau thermodynamique | GLOBAL ENVIRONNEMENT",
    description: "Remplacez votre chaudière par une pompe à chaleur air/eau et produisez votre eau chaude plus efficacement. Vérifiez votre éligibilité aux aides (MaPrimeRénov', CEE) et demandez un devis personnalisé avec GLOBAL ENVIRONNEMENT.",
  },
  {
    // Page 404 : rendue puis servie par Vercel avec le statut 404
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

async function buildSsrBundle() {
  const esbuild = await import('esbuild');
  await esbuild.build({
    entryPoints: ['scripts/entry-ssr.jsx'],
    bundle: true,
    outfile: SSR_BUNDLE,
    format: 'cjs',
    platform: 'node',
    jsx: 'automatic',
    logLevel: 'silent',
    plugins: [
      {
        name: 'stub-assets',
        setup(build) {
          build.onResolve({ filter: /\.(css|png|jpg|jpeg|svg|webp)$/ }, () => ({ path: 'stub', namespace: 'stub' }));
          build.onResolve({ filter: /^aos$/ }, () => ({ path: 'stub', namespace: 'stub' }));
          build.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({ contents: 'export default ""', loader: 'js' }));
        },
      },
    ],
  });
}

async function main() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8');
  await buildSsrBundle();

  const require = createRequire(import.meta.url);
  const { renderRoute } = require(`../${SSR_BUNDLE}`);

  for (const route of ROUTES) {
    const content = renderRoute(route.path);
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
  }
}

main().catch((e) => {
  console.error('ECHEC PRE-RENDU :', e);
  // Bloquant partout : ne jamais publier un site dont le pre-rendu a echoue.
  process.exit(1);
});
