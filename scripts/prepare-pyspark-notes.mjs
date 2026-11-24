import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

function parseExample(part, id) {
  const procedure = /^#### (.+)\n\nPasos: (.+)\n\n\*\*Resultado esperado\*\* (.+)$/.exec(part.trimEnd());
  if (!procedure) return {...parseInlineExample(part, id), external: true};

  const [, title, instructions, textOutput] = procedure;
  return {id, title, steps: instructions.split('; '), code: '', external: true, hint: '', textOutput,
    resultLabel: 'Ver resultado esperado'};
}

export function parsePysparkSource(markdown) {
  const {groups, bootstrap} = parseCourse(markdown, 'pyspark', parseExample);
  return {groups, downloads: {'lab_pyspark.py': bootstrap}};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'pyspark', component: 'Pyspark',
    parse: parsePysparkSource, check: process.argv.includes('--check')});
  console.log(`pyspark: ${count} fichas cotejadas con specs/pyspark.md.`);
}
