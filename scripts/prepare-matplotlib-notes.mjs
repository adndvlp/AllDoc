import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

function parseExample(part, id) {
  const example = parseInlineExample(part, id);
  if (/^matplotlib\/interactividad\/(eventos-callbacks|widgets)\//.test(id)) {
    return {...example, external: true, hint: example.hint + ' Ejecuta este ejemplo en Python local o Jupyter con un backend interactivo.'};
  }
  if (id === 'matplotlib/fundamentos/definicion/1') {
    return {...example, hint: example.hint + ' En AllDoc la gráfica aparece en Resultado y se puede descargar en PNG.'};
  }
  return example;
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'matplotlib', component: 'Matplotlib', dataset: 'matplotlib-sales',
    parse: markdown => parseCourse(markdown, 'matplotlib', parseExample), check: process.argv.includes('--check')});
  console.log(`Matplotlib: ${count} fichas cotejadas con specs/matplotlib.md.`);
}
