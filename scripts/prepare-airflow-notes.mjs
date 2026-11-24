import {createCourseArchive, emitCourse, parseCourse, parseExternalExample} from './lib/course-notes.mjs';

function parseLab(data) {
  const orders = /^cat > \/tmp\/alldoc_airflow\/orders\.csv <<'CSV'\n([\s\S]+?)\nCSV$/m.exec(data)?.[1];
  const template = /^\x60{3}python\n([\s\S]+?)\n\x60{3}$/m.exec(data)?.[1];
  if (!orders || !template?.includes('dag_id="alldoc_ejemplo"') || !template.endsWith('\n    pass')) {
    throw new Error('Faltan los datos de pedidos o la plantilla de Airflow');
  }
  return {orders, template};
}

async function prepareAirflowSource(markdown) {
  const {groups, bootstrap: {orders, template}} = parseCourse(markdown, 'airflow', parseExternalExample, /;\s*/, parseLab);
  const salesExample = groups.find(group => group.key === 'pipeline-ventas')?.children[0]?.body.examples[0];
  if (salesExample?.language !== 'python') throw new Error('Falta el ejemplo del pipeline de ventas de Airflow');
  const salesBody = salesExample.code.split('\n').map(line => line ? '    ' + line : '').join('\n');
  const sales = template.replace('dag_id="alldoc_ejemplo"', 'dag_id="alldoc_resumen_ventas"')
    .replace(/\n    pass$/, '\n' + salesBody);
  const lab = await createCourseArchive('airflow-laboratorio', {
    'orders.csv': orders, 'dag_ejemplo.py': template, 'dag_resumen_ventas.py': sales,
  });
  return {groups, downloads: {'airflow-laboratorio.zip': lab}};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'airflow', component: 'Airflow',
    parse: prepareAirflowSource, check: process.argv.includes('--check')});
  console.log(`airflow: ${count} fichas cotejadas con specs/airflow.md.`);
}
