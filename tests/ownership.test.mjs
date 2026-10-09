import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateTarget } from '../scripts/check-release-target.mjs';
const config = JSON.parse(readFileSync(new URL('../release-config.json', import.meta.url)));
test('allows Nina release destination', () => validateTarget(config, 'git@github.com:NinaGXie/ocupath-updates.git'));
test('rejects former owner push destination', () => assert.throws(() => validateTarget(config, 'https://github.com/Yuqian1017/ocupath-updates.git'), /Push destination/));
test('rejects old feed and asset ownership', () => {
  assert.throws(() => validateTarget({...config, publicBaseUrl:'https://updates.ocupath.ai/ocupathif'}, 'https://github.com/NinaGXie/ocupath-updates.git'), /feed ownership/);
  assert.throws(() => validateTarget({...config, releaseAssetBaseUrl:'https://github.com/Yuqian1017/ocupath-updates/releases/download'}, 'https://github.com/NinaGXie/ocupath-updates.git'), /Asset ownership/);
});
