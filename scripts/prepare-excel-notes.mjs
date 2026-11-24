import {emitCourse, fence, parseCourse} from './lib/course-notes.mjs';

const nativeOnly = new Set([
  'excel/xlookup-y-xmatch/multiples-criterios/1',
  'excel/formulas-reutilizables-y-matrices/map-y-byrow-bycol/1',
  'excel/control-de-calidad-y-conciliacion/integridad-referencial/1',
  'excel/control-de-calidad-y-conciliacion/control-de-errores-y-excepciones/1',
]);

function parseExample(part, id) {
  const [line, ...body] = part.trimEnd().split('\n');
  const source = body.join('\n').trim();
  const result = source.match(/^\*\*Resultado esperado\*\* (.+)$/m);
  if (!result) throw new Error('Falta el resultado de ' + id);
  const block = source.slice(0, result.index).trim();
  const snippet = block.match(new RegExp(`^${fence}(excel|dax|vba|typescript|powerquery)\\n([\\s\\S]+?)\\n${fence}$`, 'm'));
  const [, language = 'text', code = ''] = snippet ?? [];
  const hint = (snippet ? block.replace(snippet[0], '') : block).trim();
  const external = language !== 'excel' || nativeOnly.has(id);
  const scope = external ? ' Practica este ejemplo en Excel con las funciones indicadas en la ficha.' : '';
  return {id, title: line.slice(5), language, code, hint: hint + scope,
    textOutput: result[1], resultLabel: 'Ver resultado esperado', ...(external ? {external: true} : {})};
}

function workbook(data) {
  const sheets = Array.from(data.matchAll(/^\*\*(Sales|Customers|Products|Targets|Leads)\*\*.*\n\n((?:^\|.+\|\n)+)/gm),
    ([, name, table]) => ({
      name,
      rows: table.trim().split('\n').filter((_, index) => index !== 1).map((line, index) =>
        line.slice(1, -1).split('|').map(value => index ? value.trim() : value.trim().replace(/^[A-Z]+: /, ''))),
    }));
  if (sheets.length !== 5 || sheets.some(({rows}) => rows.length < 2 || rows.some(row => row.length !== rows[0].length))) {
    throw new Error('Las cinco tablas de Excel deben tener encabezados y filas completas');
  }
  return JSON.stringify([...sheets, {name: 'Scratch', rows: []}]);
}

export const parseExcelSource = markdown => parseCourse(markdown, 'excel', parseExample, /,\s*/, workbook);

if (import.meta.main) {
  const count = await emitCourse({tool: 'excel', component: 'Excel', dataset: 'excel-sales', dataExtension: 'json',
    parse: parseExcelSource, check: process.argv.includes('--check')});
  console.log(`Excel: ${count} fichas cotejadas con specs/excel.md.`);
}
