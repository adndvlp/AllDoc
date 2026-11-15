// Comando corto para evitar saltos de línea dentro del filtro al copiarlo.
const extra=process.argv.slice(2);
if(extra.some(arg=>arg!=='--list')) {
  console.error('Uso: node scripts/check-zoom.mjs [--list]');process.exitCode=1;
} else {
  process.argv=[process.execPath,new URL('./verify-browser.mjs',import.meta.url).pathname,
    '--suite=chromium','--grep=rotaci.*200',...extra];
  await import('./verify-browser.mjs');
}
