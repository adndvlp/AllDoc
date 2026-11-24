import {emitCourse, parseCourse, parseTextExample} from './lib/course-notes.mjs';

const localExamples = new Map([
  ['numpy/precision-y-errores-numericos/errstate-y-seterr/1',
    'Ejecuta este ejemplo en Python local para observar FloatingPointError. El editor omite esa excepción en esta división.'],
  ['numpy/archivos-e-intercambio-de-datos/memmap/1',
    'Ejecuta este ejemplo en Python local. El sistema de archivos del editor no admite este mapeo.'],
]);

function parseExample(part, id) {
  const example = parseTextExample(part, id, 'Resultado');
  const {title, textOutput} = example;
  let {code, hint} = example;
  const local = localExamples.get(id);
  if (id === 'numpy/dimensiones-y-ejes/resize/1') {
    code = code.replace('a.resize(5)', 'a.resize(5, refcheck=False)');
    hint += ' Aquí se omite la comprobación de referencias porque a es un array recién creado sin vistas ni alias.';
  }
  if (local) hint += ' ' + local;
  return {id, title, code, hint, textOutput, resultLabel: 'Ver resultado en NumPy 2.3.5', ...(local ? {external: true} : {})};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'numpy', component: 'Numpy', dataset: 'numpy-sales',
    parse: markdown => parseCourse(markdown, 'numpy', parseExample, /;\s*/), check: process.argv.includes('--check')});
  console.log(`NumPy: ${count} fichas cotejadas con specs/numpy.md.`);
}
