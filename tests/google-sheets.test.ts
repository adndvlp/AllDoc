import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {initSync} from '@ironcalc/wasm';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';
import {searchEntries} from '../src/lib/search.ts';
import {googleSheetsCurriculum} from '../src/content/google-sheets-curriculum.ts';
import {applyExcelEdits, createExcelModel} from '../src/practice/adapters/excel/engine.ts';
import {excelExampleEdits, sheetsWorkbook} from '../src/practice/adapters/excel/workbook.ts';
import {googleSheetsInput} from '../src/practice/adapters/excel/google-sheets.ts';
import {excelSuggestions} from '../src/practice/adapters/excel/suggestions.ts';

const prefix = '/apuntes/analisis-de-datos/google-sheets/';

test('Google Sheets publica las 265 fichas y permite buscar QUERY', () => {
  const topic = getTopics('analisis-de-datos')[1];
  assert.equal(topic.id, 'google-sheets');
  assert.equal(topic.concepts.length, 265);
  assert.equal(topic.sections?.length, 37);
  assert.ok(topic.sections.every(group => group.collapsed));
  assert.ok(searchEntries(entries, 'QUERY').some(entry => entry.href === prefix + 'query/definicion'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-google-sheets-notes.mjs', '--check'], {encoding: 'utf8'}), /265 fichas/);
});

test('fórmulas de Sheets expanden matrices, calculan referencias y conservan el texto original', () => {
  initSync({module: readFileSync(new URL('../node_modules/@ironcalc/wasm/wasm_bg.wasm', import.meta.url))});
  const seed = createExcelModel('UTC', sheetsWorkbook);
  const baseline = seed.toBytes();
  seed.free();
  const edits = {
    'Ventas!F2': '150',
    'Practica!A1': '=ARRAYFORMULA(Ventas!E2:E9*Ventas!F2:F9)',
    'Practica!B1': '=FILTER(Ventas!A2:A9,Ventas!H2:H9="completed",Ventas!I2:I9="web")',
    'Practica!C1': '=SORT(Ventas!J2:J9,1,FALSE)',
    'Practica!D1': '={SUM(Ventas!J2:J9),"SORT(1,2,FALSE)"}',
  };
  const model = applyExcelEdits(baseline, JSON.stringify(edits), sheetsWorkbook);
  try {
    assert.equal(model.getFormattedCellValue(0, 2, 10), '300');
    assert.deepEqual([1, 2, 3, 4].map(row => model.getFormattedCellValue(3, row, 1)), ['300', '300', '600', '100']);
    assert.deepEqual([1, 2, 3, 4].map(row => model.getFormattedCellValue(3, row, 2)), ['101', '103', '106', '107']);
    assert.equal(model.getFormattedCellValue(3, 1, 3), '600');
    assert.equal(model.getFormattedCellValue(3, 1, 4), '2500');
    assert.equal(model.getFormattedCellValue(3, 1, 5), 'SORT(1,2,FALSE)');
    assert.deepEqual(excelExampleEdits(edits['Practica!A1'], sheetsWorkbook), {'Practica!A1': edits['Practica!A1']});
  } finally {model.free();}
  assert.throws(() => applyExcelEdits(baseline, '{"Scratch!A1":"1"}', sheetsWorkbook));
  assert.equal(googleSheetsInput('=SORT(1,2,"x)'), '=SORT(1,2,"x)');
  assert.equal(excelSuggestions('=ARRAYF', 7, true).items[0]?.insertText, 'ARRAYFORMULA(');
  assert.deepEqual(excelSuggestions('=ARRAYF', 7).items, []);
});

test('IronCalc evalúa las 159 variantes locales del temario', async () => {
  initSync({module: readFileSync(new URL('../node_modules/@ironcalc/wasm/wasm_bg.wasm', import.meta.url))});
  const seed = createExcelModel('UTC', sheetsWorkbook);
  const baseline = seed.toBytes();
  seed.free();
  let count = 0;
  for (const {key} of googleSheetsCurriculum) {
    const {notes} = await import(`../src/content/notes/google-sheets/${key}.ts`) as {notes: {examples: {
      id: string; code: string; external?: boolean; textOutput: string;
    }[]}[]};
    for (const example of notes.flatMap(note => note.examples).filter(example => !example.external)) {
      const model = applyExcelEdits(baseline, JSON.stringify(excelExampleEdits(example.code, sheetsWorkbook)), sheetsWorkbook);
      try {
        const result = model.getFormattedCellValue(3, 1, 1);
        assert.ok(result && (!result.startsWith('#') || example.textOutput.includes(result)), example.id + ' ' + result);
      } finally {model.free();}
      count++;
    }
  }
  assert.equal(count, 159);
});

test('Google Sheets prepara las cuatro hojas y mantiene sus ediciones separadas de Excel', async () => {
  const sheets = resolvePracticeContext(prefix + 'agregacion/sum');
  const excel = resolvePracticeContext('/apuntes/analisis-de-datos/excel/agregaciones/sum');
  assert.ok(sheets && excel);
  assert.notEqual(sheets.workspaceKey, excel.workspaceKey);
  assert.equal(sheets.profile.runtimeId, excel.profile.runtimeId);
  const seed = await editorBootstrap(sheets);
  assert.deepEqual(seed.schema.entities.map(entity => entity.name), ['Ventas', 'Clientes', 'Productos', 'Practica']);
});
