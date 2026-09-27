import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const screensDir = path.join(root, 'public', 'screens');
const folders = fs.readdirSync(screensDir).filter(name => /^\d{2}_/.test(name)).sort();
const problems = [];

const routesSource = fs.readFileSync(path.join(root, 'src', 'routes.js'), 'utf8');
const routePairs = [...routesSource.matchAll(/['"]?([a-z0-9-]+)['"]?\s*:\s*['"](\d{2}_[^'"]+)['"]/g)];
const routes = new Map(routePairs.map(m => [m[1], m[2]]));

if (folders.length !== 29) problems.push(`Expected 29 screens, found ${folders.length}`);
if (routes.size !== 29) problems.push(`Expected 29 application routes, found ${routes.size}`);

for (const [route, folder] of routes) {
  if (!folders.includes(folder)) problems.push(`Route ${route} points to missing folder ${folder}`);
}

const ignoredAnchors = new Set(['', 'movements', 'operations', 'purchasing', 'kitchen']);
const bridgeAliases = new Set(['record-wastage', 'edit-supplier', 'review-finalize']);

for (const folder of folders) {
  const htmlPath = path.join(screensDir, folder, 'index.html');
  const pngPath = path.join(screensDir, folder, 'screen.png');
  if (!fs.existsSync(htmlPath)) problems.push(`${folder}: missing index.html`);
  if (!fs.existsSync(pngPath)) problems.push(`${folder}: missing screen.png`);
  if (!fs.existsSync(htmlPath)) continue;

  const html = fs.readFileSync(htmlPath, 'utf8');
  const bridgeCount = (html.match(/integration-bridge\.js/g) || []).length;
  if (bridgeCount !== 1) problems.push(`${folder}: expected one integration bridge, found ${bridgeCount}`);

  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map(m => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) problems.push(`${folder}: duplicate IDs ${[...new Set(dupes)].join(', ')}`);

  const hashes = new Set();
  for (const m of html.matchAll(/href=["']#([^"']*)["']/g)) hashes.add(m[1]);
  for (const m of html.matchAll(/(?:window\.)?location\.hash\s*=\s*["']#?([^"']+)["']/g)) hashes.add(m[1]);
  for (const hash of hashes) {
    if (ignoredAnchors.has(hash)) continue;
    if (!routes.has(hash) && !bridgeAliases.has(hash)) {
      problems.push(`${folder}: unresolved inter-screen hash #${hash}`);
    }
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`PASS: 29/29 screens, 29 routes, bridge injection, hash resolution, and duplicate-ID checks.`);
