import type {DatasetAdapter} from '../../contracts.ts';
import {EXCEL_COLUMNS, EXCEL_ROWS, getSpreadsheet} from './workbook.ts';

const columns = EXCEL_COLUMNS.map(name => ({name, type: 'text' as const}));
export function spreadsheetSchema(id: string) {
  return {version: 0, entities: getSpreadsheet(id).sheets.map(({name}) => ({name, kind: 'table' as const, columns, rowCount: EXCEL_ROWS}))};
}

export function createExcelDataset(): DatasetAdapter {
  return {async materialize(reference, runtimeId, signal) {
    signal.throwIfAborted();
    if (runtimeId !== 'ironcalc' || reference.version !== 1) {
      throw new Error('Libro de práctica desconocido');
    }
    return {reference, bootstrap: getSpreadsheet(reference.id).bootstrap, files: [], schema: spreadsheetSchema(reference.id)};
  }};
}
