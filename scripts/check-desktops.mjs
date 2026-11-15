// Completa los dos proyectos pendientes sin repetir la matriz Firefox/WebKit.
const extra=process.argv.slice(2);
if(extra.some(arg=>arg!=='--list')) {
  console.error('Uso: node scripts/check-desktops.mjs [--list]');process.exitCode=1;
} else {
  process.argv=[process.execPath,new URL('./verify-browser.mjs',import.meta.url).pathname,
    '--suite=chromium','--project=laptop','--project=escritorio',...extra];
  await import('./verify-browser.mjs');
}
