import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export function validateTarget(config, remote) {
  const allowed = ['https://github.com/NinaGXie/ocupath-updates', 'https://github.com/NinaGXie/ocupath-updates.git', 'git@github.com:NinaGXie/ocupath-updates.git'];
  if (!allowed.includes(remote.trim())) throw new Error('Push destination must be NinaGXie/ocupath-updates');
  if (config.sourceRepository !== 'NinaGXie/ocupathif_new' || config.releaseRepository !== 'NinaGXie/ocupath-updates') throw new Error('Repository ownership mismatch');
  if (config.publicBaseUrl !== 'https://ninagxie.github.io/ocupath-updates/ocupathif') throw new Error('Update feed ownership mismatch');
  if (config.releaseAssetBaseUrl !== 'https://github.com/NinaGXie/ocupath-updates/releases/download') throw new Error('Asset ownership mismatch');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const config = JSON.parse(readFileSync(new URL('../release-config.json', import.meta.url)));
  const remote = execFileSync('git', ['remote', 'get-url', '--push', 'origin'], { cwd: root, encoding: 'utf8' });
  validateTarget(config, remote);
  console.log('PASS: source, releases, push destination and future feeds belong to NinaGXie.');
  console.log(`Publication status: ${config.publicationStatus}`);
}
