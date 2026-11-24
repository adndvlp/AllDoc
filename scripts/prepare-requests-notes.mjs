import {readFile} from 'node:fs/promises';
import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

const localOnly = new Map([
  ['pruebas/librerias-mock', 'Instala requests-mock para ejecutarlo en Python local.'],
  ['concurrencia/thread-pool', 'Ejecuta este ejemplo en Python local con soporte de hilos.'],
]);
const serverStart = '\nThreadingHTTPServer(("127.0.0.1", 8765), API).serve_forever()';
const transport = (await readFile(new URL('./lib/requests-practice.py', import.meta.url), 'utf8')).trimEnd();

export function parseRequestsSource(markdown) {
  const {groups, bootstrap: server} = parseCourse(markdown, 'requests', (part, id) => {
    const example = parseInlineExample(part, id);
    const reason = localOnly.get(id.split('/').slice(1, -1).join('/'));
    return reason ? {...example, external: true, hint: [example.hint, reason].join(' ')} : example;
  });
  if (!server.endsWith(serverStart)) throw new Error('Cambió el arranque del servidor de práctica de requests');
  return {groups, bootstrap: server.slice(0, -serverStart.length).trimEnd() + '\n\n' + transport, download: server};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'requests', component: 'Requests', dataset: 'requests-orders',
    parse: parseRequestsSource, check: process.argv.includes('--check')});
  console.log(`requests: ${count} fichas cotejadas con specs/requests.md.`);
}
