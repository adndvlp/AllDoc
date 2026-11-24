import {emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

const localOnly = new Map([
  ['metodos-http/get', 'Ejecuta este ejemplo en Python local con acceso a Internet.'],
  ['https-y-configuracion-del-entorno/certificados-de-cliente', 'Usa un entorno Python local con certificados y un servidor HTTPS.'],
  ['proxies-y-protocolos/socks', 'Ejecuta la configuración en Python local con el extra SOCKS.'],
  ['proxies-y-protocolos/http-1-1-y-http-2', 'Usa Python local con Internet y el extra HTTP/2.'],
  ['streaming-y-archivos/httpx-stream-y-client-stream', 'Ejecuta la descarga en Python local con acceso a Internet.'],
  ['extensiones-de-bajo-nivel/tracing', 'Ejecuta las trazas en Python local con acceso a Internet.'],
  ['pruebas-de-integraciones-http/respx', 'Instala RESPX en tu entorno Python local.'],
  ['pruebas-de-integraciones-http/pytest-httpx', 'Ejecuta el archivo de prueba con pytest y pytest-httpx en Python local.'],
]);

export function parseHttpxSource(markdown) {
  const {groups, bootstrap: api} = parseCourse(markdown, 'httpx', (part, id) => {
    const example = parseInlineExample(part, id);
    const reason = localOnly.get(id.split('/').slice(1, -1).join('/'));
    if (reason) return {...example, external: true, hint: [example.hint, reason].join(' ')};
    const practiceCode = example.code.replace(/^(?:asyncio\.run\(main\(\)\)|anyio\.run\(main\))$/m, 'await main()');
    return practiceCode === example.code ? example : {...example, practiceCode};
  });
  const download = api.trimEnd();
  const bootstrap = download + '\n\nimport pandas as _pandas\npedidos = _pandas.DataFrame(PEDIDOS)';
  return {groups, bootstrap, download};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'httpx', component: 'Httpx', dataset: 'httpx-orders',
    parse: parseHttpxSource, check: process.argv.includes('--check')});
  console.log(`httpx: ${count} fichas cotejadas con specs/httpx.md.`);
}
