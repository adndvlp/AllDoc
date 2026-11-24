import {createCourseArchive, emitCourse, parseCourse, parseExternalExample} from './lib/course-notes.mjs';

const connectionTemplate = `[alldoc]
account = "organizacion-cuenta"
user = "usuario_de_prueba"
role = "ROL_DEL_LABORATORIO"
warehouse = "ALLDOC_WH"
database = "ALLDOC_LAB"
schema = "PRACTICE"
# authenticator = "externalbrowser"`;

function parseLab(data) {
  const sql = /^\x60{3}sql\n([\s\S]+?)\n\x60{3}$/m.exec(data)?.[1];
  const csv = /^\x60{3}csv\n([\s\S]+?)\n\x60{3}$/m.exec(data)?.[1];
  if (!sql || !csv) throw new Error('Falta el SQL de preparación o el CSV de ventas de Snowflake');
  return {'preparar.sql': sql, 'ventas.csv': csv, 'connections.example.toml': connectionTemplate};
}

async function prepareSnowflakeSource(markdown) {
  const {groups, bootstrap} = parseCourse(markdown, 'snowflake', parseExternalExample, /;\s*/, parseLab);
  const lab = await createCourseArchive('snowflake-laboratorio', bootstrap);
  return {groups, downloads: {'snowflake-laboratorio.zip': lab}};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'snowflake', component: 'Snowflake',
    parse: prepareSnowflakeSource, check: process.argv.includes('--check')});
  console.log(`snowflake: ${count} fichas cotejadas con specs/snowflake.md.`);
}
