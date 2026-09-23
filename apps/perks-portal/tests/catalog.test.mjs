import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadCatalog, matches } from '../src/catalog.mjs';

const catalogPath=new URL('../private/catalog.json',import.meta.url);
test('private catalog has sourced, redeemable records and distinguishes pending offers',{skip:!existsSync(catalogPath)},()=>{
  const catalog=loadCatalog(fileURLToPath(catalogPath));
  assert.equal(catalog.perks.length,21);
  assert.equal(catalog.perks.filter(p=>!p.pending).length,20);
  assert.ok(catalog.perks.find(p=>p.id==='zettabyte').pending);
  assert.ok(catalog.perks.find(p=>p.id==='linear'));
  assert.ok(catalog.perks.find(p=>p.id==='deel'));
  for(const perk of catalog.perks){assert.ok(!/^(TBD|See below)$/i.test(perk.instructions));assert.ok(perk.source.startsWith('https://'));}
  const json=readFileSync(catalogPath,'utf8');
  for(const excluded of ['Granola','Wispr Flow','Devin (Cognition)','Supabase','PostHog','Perplexity'])assert.ok(!json.includes(excluded));
});
test('search combines category and words across benefits',()=>{
  const perk={name:'Partner',category:'Engineering',headline:'Cloud credits',description:'Build globally',offer:'Starter benefit',eligibility:''};
  assert.equal(matches(perk,'CLOUD build','Engineering'),true);
  assert.equal(matches(perk,'cloud','Marketing'),false);
  assert.equal(matches(perk,'missing','Engineering'),false);
});
