import {test} from 'node:test';
import assert from 'node:assert/strict';
import {concepts} from '../src/content/concepts.ts';
import type {EnabledPracticeProfile, PracticeRegistration} from '../src/practice/contracts.ts';
import {createPracticeRegistry} from '../src/practice/registry.ts';
import {practiceRegistry} from '../src/practice/profiles.ts';
import {createPracticeContextResolver, workspaceKey} from '../src/practice/context.ts';
import {pandasConcept, registration, sqlProfile} from './fixtures/practice.ts';

test('SQL habilita proveedores diferidos; pandas conserva su ejecución pendiente', async () => {
  assert.deepEqual(practiceRegistry.list().map((profile) => [profile.id, profile.toolKey, profile.availability]), [
    ['sql-sqlite', 'analisis-de-datos/sql', 'enabled'],
    ['python-pandas', 'analisis-de-datos/pandas', 'planned'],
  ]);
  assert.deepEqual(practiceRegistry.get('sql-sqlite')?.defaultDataset, {id: 'productos-basico', version: 1});
  const providers = await practiceRegistry.loadProviders('sql-sqlite');
  assert.equal(typeof providers.createRuntime, 'function');
  await assert.rejects(practiceRegistry.loadProviders('python-pandas'), /pendiente/);
  assert.ok(createPracticeContextResolver({registry: practiceRegistry})('/apuntes/analisis-de-datos/sql/select'));
});

test('SELECT y WHERE comparten identidad de workspace; no se deriva contexto de categorías ni de títulos', () => {
  const fixture = registration();
  const registry = createPracticeRegistry([fixture.entry]);
  const resolve = createPracticeContextResolver({registry});
  const select = resolve('/apuntes/analisis-de-datos/sql/select');
  const where = resolve('/apuntes/analisis-de-datos/sql/where/?origen=prueba#ejemplo');
  assert.ok(select, 'SELECT debe resolver su concepto canónico');
  assert.ok(where, 'WHERE debe resolver su concepto canónico');
  assert.equal(select.toolKey, 'analisis-de-datos/sql');
  assert.equal(select.profile.id, 'sql-sqlite');
  assert.equal(select.workspaceKey, where.workspaceKey);
  assert.notEqual(select.conceptId, where.conceptId);
  for (const route of ['/', '/apuntes/analisis-de-datos', '/apuntes/analisis-de-datos/sql',
    '/apuntes/analisis-de-datos/sql/SELECT', '/apuntes/analisis-de-datos/sql/where/otro',
    '/apuntes/analisis-de-datos/sql/desconocido', 'https://otro.test/apuntes/analisis-de-datos/sql/select']) {
    assert.equal(resolve(route), null, route);
  }
  assert.deepEqual(fixture.calls, {runtime: 0, completion: 0, dataset: 0, constructed: 0});
});

test('pandas cambia de perfil y workspace mediante su metadata publicada', () => {
  const sql = registration();
  const pandas = registration({...sqlProfile, id: 'python-pandas', label: 'pandas',
    toolKey: 'analisis-de-datos/pandas', languageId: 'python', runtimeId: 'pyodide', completionId: 'python-jedi'});
  const registry = createPracticeRegistry([sql.entry, pandas.entry]);
  assert.equal(createPracticeContextResolver({registry})(pandasConcept.slug)?.profile.id, 'python-pandas');
  const resolve = createPracticeContextResolver({registry});
  const sqlContext = resolve(concepts[0].slug);
  const pandasContext = resolve(pandasConcept.slug);
  assert.ok(sqlContext); assert.ok(pandasContext);
  assert.equal(pandasContext.profile.languageId, 'python');
  assert.notEqual(sqlContext.workspaceKey, pandasContext.workspaceKey);
  assert.equal(resolve(concepts[1].slug)?.workspaceKey, sqlContext.workspaceKey);
  assert.equal(pandas.calls.runtime, 0);
});

test('la clave separa herramienta, perfil, dataset y versión; no depende del concepto ni de versiones del motor', () => {
  const key = workspaceKey(sqlProfile);
  assert.equal(workspaceKey({...sqlProfile}), key);
  for (const profile of [
    {...sqlProfile, toolKey: 'analisis-de-datos/otro'}, {...sqlProfile, id: 'sql-postgres'},
    {...sqlProfile, defaultDataset: {id: 'negocio', version: 1}},
    {...sqlProfile, defaultDataset: {id: 'productos-basico', version: 2}},
  ]) assert.notEqual(workspaceKey(profile), key);
});

test('un tercer lenguaje y varios perfiles SQL usan el mismo registro y resolver sin ramas por lenguaje', async () => {
  const rustProfile: EnabledPracticeProfile = {...sqlProfile, id: 'rust', label: 'Rust',
    toolKey: 'desarrollo-web/rust', languageId: 'rust', runtimeId: 'rust-remote', completionId: 'rust-analyzer',
    executionLocation: 'remote', capabilities: {...sqlProfile.capabilities, multipleFiles: true, tables: false}};
  const rust = registration(rustProfile);
  const sqlite = registration();
  const postgres = registration({...sqlProfile, id: 'sql-postgres', label: 'PostgreSQL', runtimeId: 'pglite'});
  const registry = createPracticeRegistry([{...sqlite.entry, defaultForTool: true}, postgres.entry, rust.entry]);
  const rustConcept = {...pandasConcept, id: 'desarrollo-web/rust/inicio', areaId: 'desarrollo-web' as const,
    topicId: 'rust', slug: '/apuntes/desarrollo-web/rust/inicio'};
  const resolve = createPracticeContextResolver({registry, entries: [...concepts, rustConcept]});
  assert.equal(registry.forTool('analisis-de-datos/sql').length, 2);
  assert.equal(resolve(concepts[0].slug)?.profile.id, 'sql-sqlite');
  const context = resolve(rustConcept.slug); assert.ok(context);
  assert.equal(context.profile.runtimeId, 'rust-remote');
  assert.equal(rust.calls.runtime, 0);
  const providers = await registry.loadProviders(context.profile.id);
  const runtime = providers.createRuntime();
  const output = [];
  for await (const event of runtime.run({runId: 'test', generation: 1, revision: 0,
    workspaceId: context.workspaceKey, entryFile: 'main.rs', files: [{path: 'main.rs', languageId: 'rust', content: 'código de prueba'}]})) output.push(event);
  assert.equal(output[0].type, 'stream');
  assert.equal(output.at(-1)?.type, 'end');
  assert.equal(rust.calls.constructed, 1);
});

test('consultar perfiles es puro; cargar proveedores es explícito, comparte promesa y no construye motores', async () => {
  const fixture = registration();
  const registry = createPracticeRegistry([fixture.entry]);
  registry.list(); registry.get('sql-sqlite'); registry.forTool('analisis-de-datos/sql');
  assert.equal(fixture.calls.runtime, 0);
  const first = registry.loadProviders('sql-sqlite');
  const second = registry.loadProviders('sql-sqlite');
  await Promise.allSettled([first, second]);
  assert.equal(first, second);
  const providers = await first;
  assert.equal(providers.createRuntime, fixture.factories.createRuntime);
  assert.deepEqual(fixture.calls, {runtime: 1, completion: 1, dataset: 1, constructed: 0});
  assert.equal(await registry.loadProviders('sql-sqlite'), providers);
});

test('una carga fallida puede reintentarse y no queda guardada como proveedor válido', async () => {
  const fixture = registration(); let attempts = 0;
  const registry = createPracticeRegistry([{...fixture.entry, loaders: {...fixture.entry.loaders!,
    async runtime() {if (++attempts === 1) throw new Error('sin red'); return fixture.factories.createRuntime;},
  }}]);
  await assert.rejects(registry.loadProviders('sql-sqlite'), /sin red/);
  assert.equal((await registry.loadProviders('sql-sqlite')).createRuntime, fixture.factories.createRuntime);
  assert.equal(attempts, 2);
  await assert.rejects(registry.loadProviders('no-existe'), /desconocido/);
});

test('el registro rechaza identidades ambiguas, capacidades inválidas y perfiles habilitados sin proveedores', () => {
  const fixture = registration();
  assert.throws(() => createPracticeRegistry([fixture.entry, fixture.entry]), /duplicado/);
  const other = registration({...sqlProfile, id: 'sql-otro'});
  assert.throws(() => createPracticeRegistry([fixture.entry, other.entry]), /predeterminado/);
  assert.throws(() => createPracticeRegistry([{...fixture.entry, defaultForTool: true}, {...other.entry, defaultForTool: true}]), /predeterminado/);
  for (const bad of [
    {...fixture.entry, loaders: undefined},
    {...fixture.entry, profile: {...sqlProfile, capabilities: {...sqlProfile.capabilities, tables: 'sí'}}},
    {...fixture.entry, profile: {...sqlProfile, defaultDataset: {id: 'productos-basico', version: 0}}},
    {...fixture.entry, profile: {...sqlProfile, executionLocation: 'mágico'}},
    {...fixture.entry, profile: {...sqlProfile, availability: 'planned'}},
  ]) assert.throws(() => createPracticeRegistry([bad as unknown as PracticeRegistration]), /perfil|proveedor/i);
});

test('un perfil inválido no muta el registro después de crearlo y el contexto exige metadata coherente', () => {
  const fixture = registration({...sqlProfile, defaultDataset: {...sqlProfile.defaultDataset}, capabilities: {...sqlProfile.capabilities}});
  const registry = createPracticeRegistry([fixture.entry]);
  // La configuración externa no puede alterar claves o capacidades ya registradas.
  (fixture.entry.profile.defaultDataset as {version: number}).version = 99;
  assert.equal(registry.get('sql-sqlite')?.defaultDataset.version, 1);
  assert.ok(Object.isFrozen(registry.get('sql-sqlite')?.capabilities));
  assert.throws(() => createPracticeContextResolver({registry, entries: [concepts[0], concepts[0]]}), /duplicad/);
  assert.throws(() => createPracticeContextResolver({registry, entries: [{...concepts[0], topicId: 'pandas'}]}), /metadata|concepto/i);
});
