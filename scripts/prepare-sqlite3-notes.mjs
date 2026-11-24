import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

function parseExample(part, id) {
  const example = parseInlineExample(part, id);
  if (id === 'sqlite3/callbacks-y-control-de-ejecucion/interrupt/1') {
    return {...example, external: true, hint: example.hint + ' Ejecútalo en Python local con soporte de hilos.'};
  }
  if (example.language === 'bash') return {...example, external: true};
  if (id === 'sqlite3/conexion-a-sqlite/definicion/1') {
    return {...example, hint: example.hint + ' El editor abre `con` con los datos de tienda. Datos muestra los cambios confirmados. Usa Reiniciar entorno para recuperar los datos iniciales.'};
  }
  return example;
}

function parseSqlite3Source(markdown) {
  const {groups, bootstrap} = parseCourse(markdown, 'sqlite3', parseExample);
  return {groups, bootstrap: bootstrap + '\n\ncon = abrir_demo()'};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'sqlite3', component: 'Sqlite3', dataset: 'sqlite3-shop',
    parse: parseSqlite3Source, check: process.argv.includes('--check')});
  console.log(`sqlite3: ${count} fichas cotejadas con specs/sqlite3.md.`);
}
