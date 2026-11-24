import {createCourseArchive, emitCourse, parseCourse, parseExternalExample} from './lib/course-notes.mjs';

const tables = ['Clientes', 'Productos', 'Pedidos', 'Metas', 'Sucios', 'PresupuestoAncho', 'Accesos'];

function parseLab(data) {
  const csvBlocks = /^\*\*(\w+)\*\*[^\n]*\n\n\x60{3}csv\n([\s\S]+?)\n\x60{3}$/gm;
  const csvs = new Map(Array.from(data.matchAll(csvBlocks), ([, name, csv]) => [name, csv]));
  const modelStart = data.indexOf('**Preparación del modelo**');
  if (csvs.size !== tables.length || tables.some(name => !csvs.has(name)) || modelStart < 0) {
    throw new Error('Faltan datos o instrucciones del modelo de Power BI');
  }
  const files = Object.fromEntries(tables.map(name => [name + '.csv', csvs.get(name)]));
  const guide = [
    '# Preparar el modelo en Power BI Desktop',
    'En Windows, importa cada CSV desde **Inicio → Obtener datos → Texto o CSV**. Selecciona UTF-8 y coma como delimitador. Usa el nombre del archivo sin extensión para cada consulta.',
    'En Power Query asigna números enteros a los identificadores y a Cantidad, fechas a Fecha, Envio y MesInicio, y número decimal fijo a Precio, Costo y Meta. Conserva como texto los campos de nombres, país, ciudad, categoría y estado. Las celdas vacías representan valores nulos.',
    'Configura todas las columnas de Sucios como texto y desactiva su carga al modelo. Conserva PresupuestoAncho para las fichas de transformación y Accesos para la práctica de seguridad dinámica.',
    data.slice(modelStart).trimEnd(),
  ].join('\n\n');
  return {...files, 'preparar-modelo.md': guide};
}

async function preparePowerBiSource(markdown) {
  const {groups, bootstrap} = parseCourse(markdown, 'powerbi', parseExternalExample, /,\s*/, parseLab);
  const lab = await createCourseArchive('powerbi-laboratorio', bootstrap);
  return {groups, downloads: {'powerbi-laboratorio.zip': lab}};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'powerbi', component: 'PowerBi',
    parse: preparePowerBiSource, check: process.argv.includes('--check')});
  console.log(`powerbi: ${count} fichas cotejadas con specs/powerbi.md.`);
}
