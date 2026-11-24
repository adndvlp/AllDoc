import {emitCourse, parseCourse} from './lib/course-notes.mjs';
import {rBasePackages, rPackages} from '../src/practice/adapters/r/environment.ts';

const packages = new Set([...rPackages, ...rBasePackages]);
const native = new Set(['entorno-y-paquetes/namespace-y-ayuda', 'reportes-reproducibles/quarto-y-r-markdown']);

function parseExample(part, id) {
  const [header, ...body] = part.trimEnd().split('\n');
  const source = body.join('\n').trim();
  const result = source.match(/^\*\*Resultado esperado\*\* (.+)$/m);
  const block = source.match(/^(`{3,})r\n([\s\S]+?)\n\1$/m);
  if (!result || !block) throw new Error('Ejemplo incompleto en ' + id);
  const code = block[2];
  const dependencies = Array.from(code.replace(/^\s*#.*$/gm, '').matchAll(/\b([\w.]+)::|\b(?:library|require)\((?:"|')?([\w.]+)/g),
    match => match[1] ?? match[2]);
  const skill = id.replace(/^r\/|\/\d+$/g, '');
  const external = native.has(skill) || skill.endsWith('/semillas-y-dependencias') || dependencies.some(name => !packages.has(name));
  const hint = source.slice(0, result.index).replace(block[0], '').trim();
  return {id, title: header.slice(5), language: 'r', code,
    hint: [hint, external ? 'Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.' : ''].filter(Boolean).join(' '),
    textOutput: result[1], resultLabel: 'Ver resultado esperado', ...(external ? {external: true} : {})};
}

export const parseRSource = markdown => parseCourse(markdown, 'r', parseExample, /,\s*/,
  data => data.match(/^```r\n([\s\S]+?)\n```$/m)?.[1]);

if (import.meta.main) {
  const count = await emitCourse({tool: 'r', component: 'R', dataset: 'r-commerce', dataExtension: 'R',
    parse: parseRSource, check: process.argv.includes('--check')});
  console.log(`R: ${count} fichas cotejadas con specs/r.md.`);
}
