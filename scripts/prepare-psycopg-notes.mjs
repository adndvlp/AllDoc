import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

export function parsePsycopgSource(markdown) {
  const {groups, bootstrap} = parseCourse(markdown, 'psycopg',
    (part, id) => ({...parseInlineExample(part, id), external: true}), /;\s*/);
  const start = bootstrap.indexOf('\nwith psycopg.connect(BASE_DSN) as conn:');
  if (start < 0) throw new Error('Falta el inicio de la preparación de Psycopg');
  const config = bootstrap.slice(0, start);
  const setup = bootstrap.slice(start + 1).split('\n').map(line => line ? '    ' + line : line).join('\n');
  return {groups, downloads: {'lab_psycopg.py': config + '\nif __name__ == "__main__":\n' + setup}};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'psycopg', component: 'Psycopg',
    parse: parsePsycopgSource, check: process.argv.includes('--check')});
  console.log(`psycopg: ${count} fichas cotejadas con specs/psycopg.md.`);
}
