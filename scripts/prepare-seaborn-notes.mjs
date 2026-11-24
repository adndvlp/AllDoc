import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

function parseExample(part, id) {
  const example = parseInlineExample(part, id);
  if (id === 'seaborn/introduccion/datasets-de-ejemplo/1') {
    return {...example, external: true, hint: example.hint + ' Ejecuta este ejemplo en Python local con acceso a Internet.'};
  }
  if (id === 'seaborn/introduccion/definicion/1') {
    return {...example, hint: example.hint + ' La gráfica se muestra en Resultado.'};
  }
  return example;
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'seaborn', component: 'Seaborn', dataset: 'seaborn-branches',
    parse: markdown => parseCourse(markdown, 'seaborn', parseExample, /;\s*/), check: process.argv.includes('--check')});
  console.log(`Seaborn: ${count} fichas cotejadas con specs/seaborn.md.`);
}
