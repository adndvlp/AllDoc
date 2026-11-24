import {emitCourse, fence, parseCourse} from './lib/course-notes.mjs';

const nativeGroups = new Set(['query', 'funciones-de-base-de-datos', 'importacion-y-fuentes-externas']);
const nativeFormulas = new Set([
  'agregacion/countunique', 'agregacion/average-weighted', 'agregaciones-con-condiciones/countuniqueifs',
  'texto/split', 'expresiones-regulares/definicion', 'expresiones-regulares/regexmatch', 'filter-sort-unique/sortn',
  'calidad-y-limpieza-de-datos/granularidad-y-doble-conteo', 'visualizacion/sparkline',
]);

function parseExample(part, id) {
  const [header, ...body] = part.trimEnd().split('\n');
  const source = body.join('\n').trim();
  const result = source.match(/^\*\*Resultado esperado\*\* (.+)$/m);
  if (!result) throw new Error('Falta el resultado de ' + id);
  const block = source.slice(0, result.index).trim();
  const snippet = block.match(new RegExp(`^${fence}(text|javascript|python)\\n([\\s\\S]+?)\\n${fence}$`, 'm'));
  const [, language = 'text', code = ''] = snippet ?? [];
  const hint = (snippet ? block.replace(snippet[0], '') : block).trim();
  const formula = language === 'text' && code.startsWith('=');
  const [, group, concept] = id.split('/');
  const external = !formula || nativeGroups.has(group) || nativeFormulas.has(group + '/' + concept);
  return {id, title: header.slice(5), language: formula ? 'excel-formula' : language, code,
    hint: [hint, external ? 'Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.' : ''].filter(Boolean).join(' '),
    textOutput: result[1], resultLabel: 'Ver resultado esperado', ...(external ? {external: true} : {})};
}

function workbook(data) {
  const sheets = Array.from(data.matchAll(new RegExp(`^\\*\\*(Ventas|Clientes|Productos) \\(A1:[A-Z]\\d+\\)\\*\\*\\n\\n${fence}tsv\\n([\\s\\S]+?)\\n${fence}$`, 'gm')),
    ([, name, text]) => ({name, rows: text.split('\n').map(row => row.split('\t'))}));
  if (sheets.map(sheet => sheet.name).join(',') !== 'Ventas,Clientes,Productos'
    || sheets.some(({rows}) => rows.length < 2 || rows.some(row => row.length !== rows[0].length))) {
    throw new Error('Las tres hojas de Google Sheets deben tener encabezados y filas completas');
  }
  const [headers, ...orders] = sheets[0].rows;
  sheets[0].rows = [[...headers, 'importe', 'costo_total'], ...orders.map((order, index) => {
    const row = index + 2;
    return [...order, `=E${row}*F${row}`, `=E${row}*G${row}`];
  })];
  return JSON.stringify([...sheets, {name: 'Practica', rows: []}]);
}

export const parseGoogleSheetsSource = markdown => parseCourse(markdown, 'google-sheets', parseExample, /;\s*/, workbook);

if (import.meta.main) {
  const count = await emitCourse({tool: 'google-sheets', component: 'GoogleSheets', dataset: 'google-sheets-ventas',
    dataExtension: 'json', parse: parseGoogleSheetsSource, check: process.argv.includes('--check')});
  console.log(`Google Sheets: ${count} fichas cotejadas con specs/google-sheets.md.`);
}
