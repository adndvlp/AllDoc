import {test} from 'node:test';
import assert from 'node:assert/strict';
import type {PyodideAPI, loadPyodide} from 'pyodide';
import {initializePythonVM} from '../src/practice/adapters/python/initialize.ts';
import {deferred, until} from './fixtures/practice-session.ts';

test('inicialización Python: no anuncia VM lista antes de terminar la carga explícita de paquetes', async () => {
  const packages = deferred(); const calls: string[][] = [];
  // Doble solo del ciclo de vida. La conformidad del núcleo usa Pyodide real.
  const vm = {async loadPackage(names: string[]) {calls.push(names); await packages.promise;}} as unknown as PyodideAPI;
  const load = (async () => vm) as typeof loadPyodide;
  let ready = false;
  const task = initializePythonVM(load, {}).then((value) => {ready = true; return value;});
  await until(() => ready || calls.length > 0);
  try {assert.equal(ready, false); assert.deepEqual(calls, [['pandas', 'jedi']]);}
  finally {packages.resolve(); await task;}
  assert.equal(ready, true); assert.equal(await task, vm);
});
test('inicialización Python: un error de paquetes rechaza la preparación y no entrega una VM parcial', async () => {
  const vm = {async loadPackage() {throw new Error('Paquete incompleto');}} as unknown as PyodideAPI;
  await assert.rejects(initializePythonVM((async () => vm) as typeof loadPyodide, {}), /Paquete incompleto/);
});
test('inicialización Python: un fallo comunicado por callback tampoco entrega una VM parcial', async () => {
  const vm = {async loadPackage(_names: string[], options?: {errorCallback?(message: string): void}) {
    options?.errorCallback?.('No se pudo instalar jedi'); return [];
  }} as unknown as PyodideAPI;
  await assert.rejects(initializePythonVM((async () => vm) as typeof loadPyodide, {}), /instalar jedi/);
});
