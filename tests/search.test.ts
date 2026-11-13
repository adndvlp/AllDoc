import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeSearch, searchEntries} from '../src/lib/search.ts';
import type {SearchEntry} from '../src/lib/search.ts';

const entries: SearchEntry[] = [
  {id: 'test/consultas', title: 'Consultas', description: 'Ejemplos de SELECT y WHERE.', context: 'Análisis de datos / SQL', href: '/consultas', keywords: ['ejemplos']},
  {id: 'test/select', title: 'SELECT', description: 'Elige columnas.', context: 'Análisis de datos / SQL', href: '/select', keywords: ['seleccionar']},
  {id: 'test/where', title: 'WHERE', description: 'Filtra con una condición.', context: 'Análisis de datos / SQL', href: '/where', keywords: ['filtrar', 'condición']},
];

test('encuentra un concepto por lo que hace, sin recordar su nombre', () => {
  assert.deepEqual(searchEntries(entries, 'filtrar').map((entry) => entry.title), ['WHERE']);
});

test('ignora acentos y mayúsculas, y permite combinar área y concepto', () => {
  assert.equal(normalizeSearch('  ANÁLISIS  '), 'analisis');
  assert.deepEqual(searchEntries(entries, 'SQL CONDICION').map((entry) => entry.title), ['WHERE']);
});

test('una coincidencia exacta en el título precede una mención en la descripción', () => {
  assert.equal(searchEntries(entries, 'select')[0]?.title, 'SELECT');
});

test('una consulta sin coincidencias devuelve una lista vacía', () => {
  assert.deepEqual(searchEntries(entries, 'concepto inexistente'), []);
});
