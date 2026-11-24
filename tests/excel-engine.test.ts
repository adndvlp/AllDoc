import {test, before} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {initSync} from '@ironcalc/wasm';
import {applyExcelEdits, createExcelModel, inspectExcel} from '../src/practice/adapters/excel/engine.ts';
import {excelExampleEdits, readExcelEdits, toEngineInput} from '../src/practice/adapters/excel/workbook.ts';
import {excelCurriculum} from '../src/content/excel-curriculum.ts';

let baseline: Uint8Array;
before(() => {
  const require = createRequire(import.meta.url);
  initSync({module: readFileSync(require.resolve('@ironcalc/wasm/wasm_bg.wasm'))});
  const model = createExcelModel();
  baseline = model.toBytes();
  model.free();
});

test('IronCalc calcula referencias entre hojas, tablas del dataset y recálculo tras editar', () => {
  const first = applyExcelEdits(baseline, JSON.stringify({
    'Scratch!A1': '=SUM(tSales[amount])',
    'Scratch!A2': '=SUMIFS(tSales[amount],tSales[status],"completed")',
    'Scratch!A3': '=SUMIFS(tSales[amount],tSales[order_date],">="&DATE(2026,2,1),tSales[status],"completed")',
  }));
  try {
    assert.deepEqual([1, 2, 3].map(row => first.getFormattedCellValue(5, row, 1)), ['2100', '1200', '700']);
    const next = applyExcelEdits(baseline, JSON.stringify({
      'Sales!I2': '250', 'Scratch!A1': '=SUM(Sales!I2:I9)', 'Scratch!B1': '=SEQUENCE(3,1,10,2)',
    }));
    try {
      assert.equal(next.getFormattedCellValue(5, 1, 1), '2150');
      assert.deepEqual([1, 2, 3].map(row => next.getFormattedCellValue(5, row, 2)), ['10', '12', '14']);
      assert.equal(inspectExcel(next, 7).version, 7);
      assert.equal(first.getFormattedCellValue(5, 1, 1), '2100');
    } finally {next.free();}
  } finally {first.free();}
});

test('las referencias estructuradas respetan cadenas y el borrador rechaza direcciones y valores inválidos', () => {
  assert.equal(toEngineInput('=SUM(tSales[amount])+LEN("tSales[amount]")'), `=SUM('Sales'!$I$2:$I$9)+LEN("tSales[amount]")`);
  assert.deepEqual(excelExampleEdits('=SEQUENCE(4)\n=SUM(tSales[amount])'), {
    'Scratch!A1': '=SEQUENCE(4)', 'Scratch!A11': '=SUM(tSales[amount])',
  });
  for (const input of ['[]','{"Sales!A0":"x"}','{"Scratch!A31":"x"}','{"Scratch!A1":8}', '{"__proto__":""}']) {
    assert.throws(() => readExcelEdits(input));
  }
});

test('las 126 variantes de fórmula marcadas para la web calculan en IronCalc', async () => {
  let count = 0;
  for (const {key} of excelCurriculum) {
    const {notes} = await import(`../src/content/notes/excel/${key}.ts`) as {notes: {examples: {
      id: string; code: string; external?: boolean; textOutput: string;
    }[]}[]};
    for (const example of notes.flatMap(item => item.examples).filter(example => !example.external)) {
      const edits = excelExampleEdits(example.code);
      const model = applyExcelEdits(baseline, JSON.stringify(edits));
      try {
        for (const address of Object.keys(edits)) {
          const result = model.getFormattedCellValue(5, Number(address.slice(9)), 1);
          assert.ok(result && (!result.startsWith('#') || example.textOutput.includes(result)), example.id + ' ' + result);
        }
      } finally {model.free();}
      count++;
    }
  }
  assert.equal(count, 126);
});
