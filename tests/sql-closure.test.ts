import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdir, mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {assessCompletionSamples,type SqlSample} from '../scripts/lib/sql-closure.ts';

const samples = (duration = 70): SqlSample[] => Array.from({length: 30}, (_, index) => ({
  id: 'columna-' + index,
  eventAt: 200 + index * 150,
  observedAt: 200 + index * 150 + duration,
  timeOrigin: 100000,
  satisfied: true,
}));

test('el presupuesto usa p95 de las treinta interacciones completadas', () => {
  const measured = samples(98);
  measured[29].observedAt += 20;
  assert.equal(assessCompletionSamples(measured).status, 'passed');
  measured[28].observedAt += 5;
  assert.equal(assessCompletionSamples(measured).status, 'failed');
});

test('una muestra rápida no acredita un escenario incompleto', () => {
  assert.equal(assessCompletionSamples(samples().slice(0, 29)).status, 'incomplete');
});

test('el informe rechaza una muestra reciclada y un menú que nunca apareció', () => {
  const duplicates = samples();
  duplicates[29] = duplicates[0];
  assert.equal(assessCompletionSamples(duplicates).status, 'incomplete');
  const unsatisfied = samples();
  unsatisfied[0].satisfied = false;
  assert.equal(assessCompletionSamples(unsatisfied).status, 'incomplete');
});

test('la comparación SQL usa referencias revisadas aunque la ruta de candidatas esté vacía', async t => {
  const temporary = await mkdtemp(path.join(tmpdir(), 'alldoc-sql-snapshot-'));
  t.after(() => rm(temporary, {recursive: true, force: true}));
  const project = 'webkit-escritorio';
  const references = path.join(temporary, 'tests/sql-browser/__screenshots__', project);
  const reference = path.join(references, 'fixture.txt');
  const candidates = path.join(temporary, 'candidates');
  const config = path.join(temporary, 'playwright.config.ts');
  await mkdir(references, {recursive: true});
  await writeFile(reference, 'revisada');
  await writeFile(config, `
    import config from ${JSON.stringify(path.resolve('playwright.sql-verification.config.ts'))};
    export default {...config, testDir: '.', testMatch: 'fixture.spec.ts',
      projects: [{name: ${JSON.stringify(project)}}], reporter: 'line'};
  `);
  const fixture = (content: string) => writeFile(path.join(temporary, 'fixture.spec.ts'), `
    import {test, expect} from ${JSON.stringify(path.resolve('node_modules/@playwright/test/index.mjs'))};
    test('referencia', () => expect(${JSON.stringify(content)}).toMatchSnapshot('fixture.txt'));
  `);
  const run = (candidateDirectory: string, snapshots: 'none' | 'changed') =>
    spawnSync(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', '--config', config, '--update-snapshots=' + snapshots], {
      encoding: 'utf8', timeout: 20_000,
      env: {...process.env, SQL_VERIFICATION_SUITE: 'sql', SQL_VERIFICATION_REPORT_DIR: path.join(temporary, 'report'),
        SQL_VERIFICATION_CANDIDATES: candidateDirectory},
    });

  await fixture('revisada');
  const comparison = run('', 'none');
  assert.equal(comparison.status, 0, comparison.stdout + comparison.stderr);
  await fixture('candidata');
  const capture = run(candidates, 'changed');
  assert.equal(capture.status, 0, capture.stdout + capture.stderr);
  assert.equal(await readFile(reference, 'utf8'), 'revisada');
  assert.equal(await readFile(path.join(candidates, project, 'fixture.txt'), 'utf8'), 'candidata');
});

test('la revisión de la app SQL mantiene sus referencias separadas de la matriz histórica', () => {
  const result = spawnSync(process.execPath, ['--input-type=module', '-e',
    "import config from './playwright.sql-verification.config.ts'; console.log(config.snapshotPathTemplate);"], {
    encoding: 'utf8', timeout: 20_000,
    env: {...process.env, SQL_VERIFICATION_SUITE: 'visual', SQL_VERIFICATION_CANDIDATES: ''},
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), path.join('tests/sql-browser/app-screenshots', '{projectName}/{arg}{ext}'));
});
