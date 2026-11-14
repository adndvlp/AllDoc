export type RuntimeLocation = {appOrigin: string; runtimeOrigin: string};
export function validateRuntimeLocation(app: string, runtime: string): RuntimeLocation {
  const parent = new URL(app); const target = new URL(runtime);
  for (const url of [parent, target]) {
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('El origen debe ser HTTP(S), sin rutas o credenciales');
  }
  if (parent.hostname === target.hostname) throw new Error('Práctica necesita otro hostname para no compartir cookies por puerto');
  const local = [parent.hostname, target.hostname].every((host) => ['localhost', '127.0.0.1', '[::1]'].includes(host));
  if (!local && (parent.protocol !== 'https:' || target.protocol !== 'https:')) throw new Error('La publicación de práctica requiere HTTPS');
  return {appOrigin: parent.origin, runtimeOrigin: target.origin};
}
export function runtimeCSP(location: RuntimeLocation): string {
  return `default-src 'none'; script-src 'self' 'wasm-unsafe-eval' 'unsafe-eval'; worker-src 'self'; connect-src 'self'; frame-src 'none'; frame-ancestors ${location.appOrigin}; form-action 'none'; base-uri 'none'; object-src 'none'`;
}
export function trustedMessageOrigin(actual: string, expected: string): boolean {
  try {const a = new URL(actual); const b = new URL(expected); return a.origin !== 'null' && a.origin === b.origin;} catch {return false;}
}
