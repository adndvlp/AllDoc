import {Model} from '@ironcalc/wasm';
import type {RuntimeSchema} from '../../contracts.ts';
import {EXCEL_COLUMNS, EXCEL_ROWS, excelWorkbook, readExcelEdits} from './workbook.ts';

const columns = EXCEL_COLUMNS.map(name => ({name, type: 'text' as const}));

export function createExcelModel(timezone = 'UTC', workbook = excelWorkbook) {
  const model = new Model('Ventas', 'en', workbook.timezone ?? timezone, 'en');
  model.pauseEvaluation();
  workbook.sheets.forEach(({name, rows}, sheet) => {
    if (sheet) model.newSheet();
    model.renameSheet(sheet, name);
    rows.forEach((row, i) => row.forEach((value, j) => {
      if (value !== '') model.setUserInput(sheet, i + 1, j + 1, value);
    }));
  });
  model.resumeEvaluation();
  model.evaluate();
  return model;
}

export function applyExcelEdits(baseline: Uint8Array, content: string, workbook = excelWorkbook) {
  const edits = readExcelEdits(content, workbook);
  const model = Model.fromBytes(baseline, 'en');
  try {
    model.pauseEvaluation();
    for (const [address, value] of Object.entries(edits)) {
      const [name, cell] = address.split('!');
      const sheet = workbook.sheets.findIndex(item => item.name === name);
      model.setUserInput(sheet, Number(cell.slice(1)), EXCEL_COLUMNS.indexOf(cell[0]) + 1, workbook.input(value));
    }
    model.resumeEvaluation();
    model.evaluate();
    return model;
  } catch (error) {
    model.free();
    throw error;
  }
}

export function inspectExcel(model: Model | undefined, version = 0, workbook = excelWorkbook): RuntimeSchema {
  return {version, entities: workbook.sheets.map(({name, rows}, sheet) => ({
    name, kind: 'table', columns, rowCount: EXCEL_ROWS,
    preview: {columns, truncated: false, rows: Array.from({length: EXCEL_ROWS}, (_, row) =>
      EXCEL_COLUMNS.map((_, col) => model ? model.getFormattedCellValue(sheet, row + 1, col + 1) :
        rows[row]?.[col] ?? ''))},
  }))};
}
