import {emitCourse, parseCourse, parseTextExample} from './lib/course-notes.mjs';

const outputByExample = new Map([
  ['scipy/robusta/rankdata/1', '[1.  2.5 2.5 4.  5. ]\n[1. 2. 2. 3. 4.]'],
  ['scipy/metodos-distribuciones/pdf-pmf/1', '0.3989\n0.25'],
]);

function parseExample(part, id) {
  const example = parseTextExample(part, id, 'Resultado esperado');
  const {title} = example;
  let {code, hint} = example;
  if (id === 'scipy/no-parametricas/kstest/1') {
    code = code.replace("stats.kstest(canal_a, 'norm', args=(115, 15))",
      'stats.kstest(canal_a, stats.norm(loc=115, scale=15).cdf)');
  }
  const external = id === 'scipy/io/matrix-market/1';
  if (external) hint += ' Ejecuta este ejemplo en Python local: Matrix Market requiere hilos que el editor web no admite.';
  return {id, title, code, hint, textOutput: outputByExample.get(id) ?? example.textOutput,
    resultLabel: 'Ver resultado esperado', ...(external ? {external: true} : {})};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'scipy', component: 'Scipy', dataset: 'scipy-business',
    parse: markdown => parseCourse(markdown, 'scipy', parseExample, /\s+/), check: process.argv.includes('--check')});
  console.log(`SciPy: ${count} fichas cotejadas con specs/scipy.md.`);
}
