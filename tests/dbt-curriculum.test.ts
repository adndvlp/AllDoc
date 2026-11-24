import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import JSZip from 'jszip';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';

test('dbt publica sus 189 fichas en 25 grupos sin abrir un perfil de práctica', () => {
  const topic = getTopics('analisis-de-datos').find(item => item.id === 'dbt');
  assert.equal(topic?.sections?.length, 25);
  assert.equal(topic.concepts.length, 189);
  const indexed = new Map(entries.map(entry => [entry.id, entry]));
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.equal(indexed.get(note.id)?.href, note.slug);
      assert.equal(resolvePracticeContext(note.slug), null);
    }
  }
  assert.deepEqual(indexed.get('analisis-de-datos/dbt/fundamentos-de-dbt/definicion')?.keywords,
    ['Fundamentos de dbt', 'Seguir una transformación']);
});

test('el ZIP de dbt incluye el proyecto PostgreSQL de la especificación sin credenciales', async () => {
  const zip = await JSZip.loadAsync(await readFile('static/practice/dbt/tienda_dbt.zip'), {checkCRC32: true});
  const files = Object.values(zip.files).filter(file => !file.dir).map(file => file.name).sort();
  assert.deepEqual(files.map(name => name.replace(/^tienda_dbt\//, '')), [
    'datos.sql', 'dbt_project.yml', 'models/intermediate/int_completed_orders.sql', 'models/marts/customer_revenue.sql',
    'models/marts/dim_customers.sql', 'models/marts/fct_orders.sql', 'models/staging/sources.yml',
    'models/staging/stg_customers.sql', 'models/staging/stg_orders.sql', 'profiles.example.yml', 'seeds/country_names.csv',
  ]);
  const profile = await zip.file('tienda_dbt/profiles.example.yml')!.async('string');
  assert.match(profile, /type: postgres/);
  assert.match(profile, /password: "\{\{ env_var\('DBT_ENV_SECRET_PASSWORD'\) \}\}"/);
  assert.match(await zip.file('tienda_dbt/datos.sql')!.async('string'), /insert into raw\.orders values/);
  assert.match(await zip.file('tienda_dbt/models/marts/customer_revenue.sql')!.async('string'), /ref\('fct_orders'\)/);
  assert.match(execFileSync(process.execPath, ['scripts/prepare-dbt-notes.mjs', '--check'], {encoding: 'utf8'}), /189 fichas/);
});
