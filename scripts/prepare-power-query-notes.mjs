import {createCourseArchive, emitCourse, parseCourse, parseExternalExample} from './lib/course-notes.mjs';

const queryNames = ['Pedidos', 'Clientes', 'Leads', 'Presupuesto', 'Importacion'];

function baseQueries(data) {
  const queries = new Map(Array.from(data.matchAll(/^\*\*(\w+)\*\*\n\n```powerquery\n([\s\S]+?)\n```$/gm),
    ([, name, code]) => [name, code]));
  if (queries.size !== queryNames.length || queryNames.some(name => !queries.has(name))) {
    throw new Error('Faltan las consultas base de Power Query');
  }
  return Object.fromEntries(queryNames.map(name => [name + '.pq', queries.get(name)]));
}

export function parsePowerQuerySource(markdown) {
  return parseCourse(markdown, 'power-query', parseExternalExample, /,\s*/, baseQueries);
}

async function preparePowerQuerySource(markdown) {
  const {groups, bootstrap: files} = parsePowerQuerySource(markdown);
  const zip = await createCourseArchive('power-query-datos', files);
  return {groups, downloads: {'power-query-datos.zip': zip}};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'power-query', component: 'PowerQuery',
    parse: preparePowerQuerySource, check: process.argv.includes('--check')});
  console.log(`power-query: ${count} fichas cotejadas con specs/power-query.md.`);
}
