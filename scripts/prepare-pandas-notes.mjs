import {emitCourse, parseCourse, parseTextExample} from './lib/course-notes.mjs';

function parseExample(part, id, note) {
  const {title, code: sourceCode, hint, heading, textOutput} = parseTextExample(part, id, 'Resultado (?:comprobado|esperado)');
  // Pyodide lleva pytz, mientras que sus datos de zona IANA se distribuyen aparte.
  const nativeZone = ".tz_localize('America/Mexico_City')";
  const code = id === 'pandas/series-temporales/zonas-horarias/1' && sourceCode.includes(nativeZone)
    ? 'from pytz import timezone\n\n' + sourceCode.replace(nativeZone, ".tz_localize(timezone('America/Mexico_City'))")
    : sourceCode;
  return {id, title, code, hint, textOutput,
    resultLabel: heading === 'Resultado comprobado' ? 'Ver resultado en pandas 2.2.3' : 'Ver resultado esperado',
    ...(note?.startsWith('Requiere ') ? {external: true} : {})};
}

export function parsePandasSource(markdown) {
  return parseCourse(markdown, 'pandas', parseExample);
}

export function preparePandasNotes({check = false} = {}) {
  return emitCourse({tool: 'pandas', component: 'Pandas', dataset: 'pandas-commerce', parse: parsePandasSource, check});
}

if (import.meta.main) {
  const count = await preparePandasNotes({check: process.argv.includes('--check')});
  console.log(`pandas: ${count} fichas cotejadas con specs/pandas.md.`);
}
