import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

const externalRequirements = [
  ['errores-y-validacion/json-schema', 'Requiere jsonschema en tu entorno de Python.'],
  ['apis-http/definicion', 'Ejecuta este ejemplo en un entorno con requests.'],
  ['apis-http/requests-get', 'Ejecuta este ejemplo en un entorno con requests y acceso a internet.'],
  ['apis-http/response-json', 'Requiere requests en tu entorno de Python.'],
  ['conversion-de-formatos/json-a-excel', 'Ejecuta este ejemplo en un entorno con pandas y openpyxl.'],
  ['conversion-de-formatos/excel-a-json', 'Ejecuta este ejemplo en un entorno con pandas y openpyxl.'],
];

function parseExample(part, id) {
  const example = parseInlineExample(part, id);
  const {language, hint} = example;
  const leaf = id.split('/').slice(1, -1).join('/');
  const reason = language === 'bash' ? 'Ejecuta este comando en una terminal con Python.' :
    externalRequirements.find(([key]) => key === leaf)?.[1];
  return {...example, hint: [hint, reason].filter(Boolean).join(' '), ...(reason || language === 'json' ? {external: true} : {})};
}

export function parseJsonSource(markdown) {
  return parseCourse(markdown, 'json', parseExample);
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'json', component: 'Json', dataset: 'json-orders',
    parse: parseJsonSource, check: process.argv.includes('--check')});
  console.log(`json: ${count} fichas cotejadas con specs/json.md.`);
}
