import {excelSalesBootstrap} from '../../datasets/rows/excel-sales.ts';
import {googleSheetsVentasBootstrap} from '../../datasets/rows/google-sheets-ventas.ts';
import {googleSheetsInput} from './google-sheets.ts';

export const EXCEL_ROWS = 30;
export const EXCEL_COLUMNS = Array.from('ABCDEFGHIJKLMNOP');
export const EXCEL_FILE = 'libro.json';
export type ExcelEdits = Record<string, string>;
type Sheet = {name: string; rows: readonly (readonly string[])[]};
type Spreadsheet = {
  id: string;
  scratch: string;
  bootstrap: string;
  sheets: readonly Sheet[];
  input: (value: string) => string;
  timezone?: string;
};
export const excelSheets = JSON.parse(excelSalesBootstrap) as readonly Sheet[];
export const excelWorkbook: Spreadsheet = {id: 'excel-ventas',
  bootstrap: excelSalesBootstrap, sheets: excelSheets, scratch: 'Scratch', input: toEngineInput};
export const sheetsWorkbook: Spreadsheet = {id: 'google-sheets-ventas',
  bootstrap: googleSheetsVentasBootstrap, sheets: JSON.parse(googleSheetsVentasBootstrap) as readonly Sheet[],
  scratch: 'Practica', input: googleSheetsInput, timezone: 'America/Mexico_City'};

export function getSpreadsheet(id: string): Spreadsheet {
  if (id === excelWorkbook.id) return excelWorkbook;
  if (id === sheetsWorkbook.id) return sheetsWorkbook;
  throw new Error('Libro de práctica desconocido');
}
export const excelTables = excelSheets.slice(0, 5).map((sheet, index) => ({
  ...sheet, table: 't' + sheet.name, index,
}));

export function cellAddress(sheet: string, row: number, column: number) {
  return sheet + '!' + EXCEL_COLUMNS[column - 1] + row;
}

export function readExcelEdits(content: string, workbook = excelWorkbook): ExcelEdits {
  const value: unknown = JSON.parse(content);
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Libro de Excel inválido');
  const edits: ExcelEdits = {};
  for (const [address, text] of Object.entries(value)) {
    const match = /^([A-Za-z]+)![A-P]([1-9]\d?)$/.exec(address);
    if (!match || !workbook.sheets.some(sheet => sheet.name === match[1]) || Number(match[2]) > EXCEL_ROWS
      || typeof text !== 'string' || text.length > 8192) {
      throw new Error('Celda de Excel inválida');
    }
    edits[address] = text;
  }
  return edits;
}

export function excelExampleEdits(code: string, workbook = excelWorkbook): ExcelEdits {
  const formulas = code.trim().split('\n').map(line => line.trim());
  if (formulas.length > 3 || formulas.some(line => !line.startsWith('='))) throw new Error('Ejemplo de hoja inválido');
  return Object.fromEntries(formulas.map((formula, index) => [cellAddress(workbook.scratch, 1 + index * 10, 1), formula]));
}

export function toEngineInput(value: string) {
  if (!value.startsWith('=')) return value;
  return value.replace(/"(?:[^"]|"")*"|(?<![\w.])(t\w+)\[([^\[\]]+)\]/gi, (token, name: string | undefined, field: string) => {
    if (!name) return token;
    const sheet = excelTables.find(table => table.table.toLowerCase() === name.toLowerCase());
    const index = sheet?.rows[0].findIndex(column => column.toLowerCase() === field.toLowerCase()) ?? -1;
    if (!sheet || index < 0) return token;
    const letter = EXCEL_COLUMNS[index];
    return `'${sheet.name}'!$${letter}$2:$${letter}$${sheet.rows.length}`;
  });
}
