import {test} from 'node:test';
import assert from 'node:assert/strict';
import {runtimeCSP, trustedMessageOrigin, validateRuntimeLocation} from '../src/practice/isolation/policy.ts';

test('aislamiento: exige otro hostname y origen HTTP(S), sin credenciales, rutas o downgrade', () => {
  assert.deepEqual(validateRuntimeLocation('http://127.0.0.1:4173', 'http://localhost:4174'), {appOrigin: 'http://127.0.0.1:4173', runtimeOrigin: 'http://localhost:4174'});
  for (const runtime of ['http://127.0.0.1:4174', 'http://127.0.0.1:4173', 'javascript:alert(1)', 'data:text/html,x', 'https://user:pass@runtime.example', 'https://runtime.example/path', 'https://runtime.example?x=1']) assert.throws(() => validateRuntimeLocation('http://127.0.0.1:4173', runtime), runtime);
  assert.throws(() => validateRuntimeLocation('https://app.example', 'http://runtime.example'));
});

test('aislamiento: origen exacto normalizado, sin prefijos engañosos ni aceptar null', () => {
  assert.equal(trustedMessageOrigin('https://runtime.example:443', 'https://runtime.example'), true);
  for (const origin of ['null', 'https://runtime.example.evil.test', 'http://runtime.example', 'https://runtime.example:8443']) assert.equal(trustedMessageOrigin(origin, 'https://runtime.example'), false);
});

test('aislamiento: CSP propia restringe red, frames hijos, formularios y Workers al origen del runtime', () => {
  const policy = runtimeCSP({appOrigin: 'https://app.example', runtimeOrigin: 'https://runtime.example'});
  assert.match(policy, /default-src 'none'/); assert.match(policy, /worker-src 'self'/);
  assert.match(policy, /connect-src 'self'/); assert.match(policy, /frame-ancestors https:\/\/app.example/);
  assert.match(policy, /form-action 'none'/); assert.match(policy, /base-uri 'none'/);
});
