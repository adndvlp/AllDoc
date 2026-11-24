import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

const tool = 'mysql-connector-python';

function localFiles(data) {
  const sql = data.match(/^```sql\n([\s\S]+?)\n```$/m)?.[1];
  const helper = data.match(/^```python\n([\s\S]+?)\n```$/m)?.[1];
  if (!sql || !helper) throw new Error('Faltan los archivos de laboratorio de MySQL');
  return {'datos.sql': sql, 'lab_mysql.py': helper};
}

export function parseMysqlConnectorPythonSource(markdown) {
  const {groups, bootstrap: downloads} = parseCourse(markdown, tool,
    (part, id) => ({...parseInlineExample(part, id), external: true}), /,\s*/, localFiles);
  return {groups, downloads};
}

if (import.meta.main) {
  const count = await emitCourse({tool, component: 'MysqlConnectorPython',
    parse: parseMysqlConnectorPythonSource, check: process.argv.includes('--check')});
  console.log(`${tool}: ${count} fichas cotejadas con specs/${tool}.md.`);
}
