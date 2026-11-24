import {emitCourse, fence, parseCourse, parseTextExample} from './lib/course-notes.mjs';

function parseExample(part, id) {
  const {title, language, code, hint, heading, textOutput} = parseTextExample(part, id, 'Resultado(?: esperado)?', 'python|bash');
  const external = heading === 'Resultado esperado';
  const instructions = language === 'bash' ? 'Ejecuta este comando en tu terminal.' :
    'Ejecuta este ejemplo en Python local con `sqlalchemy[asyncio]` y `aiosqlite`.';
  const output = id === 'sqlalchemy/pandas/params-index-col-y-parse-dates/1'
    ? textOutput.replace('datetime64[ns]', 'datetime64[us]') : textOutput;
  return {id, title, language, code, hint: external ? hint + ' ' + instructions : hint, textOutput: output,
    resultLabel: external ? 'Ver resultado esperado' : 'Ver resultado', ...(external ? {external: true} : {})};
}

export function parseSqlalchemySource(markdown) {
  const course = parseCourse(markdown, 'sqlalchemy', parseExample, /;\s*/);
  const [, data] = markdown.replaceAll('\r\n', '\n').split(/(?=^## )/m, 2);
  const blocks = Array.from(data.matchAll(new RegExp(`^${fence}python\n([\\s\\S]+?)\n${fence}$`, 'gm')),
    match => match[1]);
  if (blocks.length !== 2) throw new Error('Se requieren dos bloques de preparación de SQLAlchemy: Core y ORM');
  return {...course, bootstrap: blocks.join('\n\n')};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'sqlalchemy', component: 'Sqlalchemy', dataset: 'sqlalchemy-sales',
    parse: parseSqlalchemySource, check: process.argv.includes('--check')});
  console.log(`SQLAlchemy: ${count} fichas cotejadas con specs/sqlalchemy.md.`);
}
