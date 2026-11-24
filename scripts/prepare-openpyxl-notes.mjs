import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

const localLibraries = new Map([
  ['openpyxl/objetos-adicionales/insertar-imagen/1', 'Para practicar este ejemplo, instala Pillow en tu entorno local.'],
  ['openpyxl/integraciones/matplotlib/1', 'Para practicar este ejemplo, instala Matplotlib y Pillow en tu entorno local.'],
]);

function parseExample(part, id, note) {
  const example = parseInlineExample(part, id);
  const library = localLibraries.get(id);
  if (library) return {...example, hint: [example.hint, library].filter(Boolean).join(' '), external: true};
  if (note?.startsWith('Este ejemplo requiere el archivo indicado')) return {...example, external: true};
  if (id === 'openpyxl/workbook/definicion/1') {
    return {...example, hint: 'El editor prepara ventas_base.xlsx. Usa Reiniciar entorno para recuperar los datos iniciales.'};
  }
  return example;
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'openpyxl', component: 'Openpyxl', dataset: 'openpyxl-sales',
    parse: markdown => parseCourse(markdown, 'openpyxl', parseExample), check: process.argv.includes('--check')});
  console.log(`openpyxl: ${count} fichas cotejadas con specs/openpyxl.md.`);
}
