import {createCourseArchive, emitCourse, parseCourse, parseExternalExample} from './lib/course-notes.mjs';

const tables = ['ventas.csv', 'clientes.csv', 'metas.csv', 'leads.csv'];

function parseLab(data) {
  const csvBlocks = /^\*\*(\w+\.csv)\*\*[^\n]*\n\n\x60{3}csv\n([\s\S]+?)\n\x60{3}$/gm;
  const csvs = new Map(Array.from(data.matchAll(csvBlocks), ([, name, csv]) => [name, csv]));
  const conventionsStart = data.indexOf('**Preparación y convenciones de práctica**');
  if (csvs.size !== tables.length || tables.some(name => !csvs.has(name)) || conventionsStart < 0) {
    throw new Error('Faltan archivos o instrucciones del laboratorio de Tableau');
  }
  const files = Object.fromEntries(tables.map(name => [name, csvs.get(name)]));
  const guide = [
    '# Preparar los datos en Tableau',
    'Abre primero `ventas.csv` con **Connect → Text File**. Usa UTF-8, coma como delimitador y la primera fila como encabezados.',
    'Comprueba que `Fecha` y `Entrega` sean fechas y que `Unidades`, `Ventas` y `Costo` sean medidas numéricas. Usa `Linea` como identificador de cada fila y `Pedido` para contar pedidos distintos.',
    'Conserva los archivos `clientes.csv`, `metas.csv` y `leads.csv` para los ejemplos que los pidan.',
    data.slice(conventionsStart).trimEnd(),
  ].join('\n\n');
  return {...files, 'preparar-datos.md': guide};
}

async function prepareTableauSource(markdown) {
  const {groups, bootstrap} = parseCourse(markdown, 'tableau', parseExternalExample, /,\s*/, parseLab);
  const lab = await createCourseArchive('tableau-laboratorio', bootstrap);
  return {groups, downloads: {'tableau-laboratorio.zip': lab}};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'tableau', component: 'Tableau',
    parse: prepareTableauSource, check: process.argv.includes('--check')});
  console.log(`tableau: ${count} fichas cotejadas con specs/tableau.md.`);
}
