import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {isDeepStrictEqual} from 'node:util';
import {sha256} from './baseline.ts';
import {compareRuns} from './final-verification.ts';

export async function loadRun(directory) {
  const report = JSON.parse(await readFile(path.join(directory, 'report.json'), 'utf8'));
  const bundle = JSON.parse(await readFile(path.join(directory, 'bundle.json'), 'utf8'));
  if (!isDeepStrictEqual(report.build.totals, bundle.totals) || !isDeepStrictEqual(report.build.pages, bundle.pages)) throw new Error('El inventario no coincide con report.json: ' + directory);
  const profiles = [];
  for (const profile of report.timings) {
    if (!['laptop', 'celular'].includes(profile.project)) throw new Error('Perfil de medición desconocido');
    const file = JSON.parse(await readFile(path.join(directory, `timings-${profile.project}.json`), 'utf8'));
    if (!isDeepStrictEqual(file, profile)) throw new Error('Las muestras no coinciden con report.json: ' + profile.project);
    profiles.push(file);
  }
  for (const capture of report.captures) for (const file of capture.files) {
    const filename = path.resolve(directory, file.path);
    if (!filename.startsWith(path.resolve(directory) + path.sep)) throw new Error('Captura fuera de su ejecución');
    if (sha256(await readFile(filename)) !== file.sha256) throw new Error('Captura con hash diferente: ' + filename);
  }
  return {report, bundle, profiles};
}

const number = (value) => typeof value === 'number' ? value.toFixed(2) : 'N/D';
export function comparisonMarkdown(result, reference, current) {
  const lines = ['# Comparación del rediseño', '', `Estado: **${result.status}**.`, '',
    `Referencia: ${reference}. Medición posterior: ${current}.`, '',
    'El presupuesto de 100 ms se evalúa con el mismo proxy DOM + siguiente rAF de la referencia. No es INP de campo ni una medición exacta de píxeles presentados.', '',
    '## Bundle', '', 'Bytes gzip por archivo. El total del build y los assets declarados en HTML se comparan por separado.', '',
    '| Conjunto | Antes | Después | Diferencia | Cambio |', '| --- | ---: | ---: | ---: | ---: |'];
  for (const [kind, d] of Object.entries(result.bundle.totals)) lines.push(`| ${kind.toUpperCase()} total | ${d.before ?? 'N/D'} | ${d.after ?? 'N/D'} | ${d.deltaBytes ?? 'N/D'} | ${number(d.percent)}% |`);
  for (const p of result.bundle.pages) for (const kind of ['js', 'css']) {const d = p[kind]; lines.push(`| ${p.html}: ${kind.toUpperCase()} declarado | ${d.before ?? 'N/D'} | ${d.after ?? 'N/D'} | ${d.deltaBytes ?? 'N/D'} | ${number(d.percent)}% |`);}
  lines.push('', '## Interacciones', '', '| Perfil | Acción | Muestras | p95 antes (ms) | p95 después (ms) | Presupuesto | Sin Event Timing |', '| --- | --- | ---: | ---: | ---: | --- | ---: |');
  for (const m of result.metrics) lines.push(`| ${m.project} | ${m.action} | ${m.after?.count ?? 0} | ${number(m.before?.p95)} | ${number(m.after?.p95)} | ${m.budget} | ${m.eventTiming.samplesWithoutEntries} |`);
  lines.push('', 'Favoritos se mide por primera vez: no se inventa una diferencia contra una función ausente en la referencia. Los resultados de búsqueda con índice cargado reutilizan las mismas 30 aperturas; no son muestras independientes adicionales.', '',
    '## Primera apertura', '', '| Perfil | Diálogo antes | Diálogo después | Resultados antes | Resultados después |', '| --- | ---: | ---: | ---: | ---: |');
  for (const p of result.cold) lines.push(`| ${p.project} | ${number(p.before?.dialogVisible)} | ${number(p.after?.dialogVisible)} | ${number(p.before?.resultsReady)} | ${number(p.after?.resultsReady)} |`);
  lines.push('', 'Cada apertura fría es una muestra única; no tiene percentiles. Las entradas Event Timing ausentes conservan su falta de cobertura y no se sustituyen por cero.', '', '## Condiciones y pendientes', '');
  if (!result.reasons.length) lines.push('Las condiciones de equipo, navegador, CPU, viewport, caché y red coinciden para las acciones compartidas.');
  for (const message of [...result.reasons, ...result.warnings]) lines.push('- ' + message);
  lines.push('', 'Las tareas de más de 50 ms se conservan con su fase. Cuando hay una traza de diagnóstico, corresponde a una reproducción separada después de medir, para no alterar la comparación con la referencia sin tracing. Revisar antes de atribuir una tarea al código nuevo.', '');
  return lines.join('\n');
}

export async function writeComparison(referenceDirectory, currentDirectory, outputDirectory) {
  const [before, after] = await Promise.all([loadRun(referenceDirectory), loadRun(currentDirectory)]);
  const comparison = compareRuns(before, after);
  comparison.reference = referenceDirectory;
  comparison.current = currentDirectory;
  await writeFile(path.join(outputDirectory, 'comparison.json'), JSON.stringify(comparison, null, 2) + '\n');
  await writeFile(path.join(outputDirectory, 'comparison.md'), comparisonMarkdown(comparison, referenceDirectory, currentDirectory));
  return comparison;
}
