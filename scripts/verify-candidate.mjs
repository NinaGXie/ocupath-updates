import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

// No publishing side effects. The source checkout owns the native acceptance gate.
try {
  const { values } = parseArgs({ options: { source: { type: 'string' }, report: { type: 'string' }, commit: { type: 'string' } } });
  if (!values.source || !values.report || !/^[a-f0-9]{40}$/.test(values.commit || '')) throw new Error('Usage: node scripts/verify-candidate.mjs --source <Nina source checkout> --report <acceptance.json> --commit <expected full source SHA>');
  execFileSync(process.execPath, [fileURLToPath(new URL('./check-release-target.mjs', import.meta.url))], { stdio: 'inherit' });
  const source = path.resolve(values.source);
  const remote = execFileSync('git', ['remote', 'get-url', '--push', 'origin'], { cwd: source, encoding: 'utf8' }).trim();
  if (!/^(git@github.com:NinaGXie\/ocupathif_new\.git|https:\/\/github.com\/NinaGXie\/ocupathif_new(?:\.git)?)$/.test(remote)) throw new Error('Expected Nina source repository');
  execFileSync('git', ['cat-file', '-e', `${values.commit}^{commit}`], { cwd: source });
  const report = JSON.parse(fs.readFileSync(values.report, 'utf8'));
  if (report.sourceCommit !== values.commit) throw new Error('Candidate source does not match requested release commit');
  execFileSync(process.execPath, [path.join(source, 'standalone_builder/installation-acceptance.js'), 'verify', '--report', path.resolve(values.report)], { stdio: 'inherit' });
  console.log('Candidate acceptance passed. Review native evidence before publishing these exact bytes.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
