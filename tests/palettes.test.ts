import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {defaultPalette, getPalette, palettes, paletteBootstrapScript} from '../src/content/palettes.ts';

function restore(saved: unknown, blocked = false) {
  const document = {documentElement: {dataset: {} as Record<string, string>}};
  const localStorage = {getItem() {
    if (blocked) throw new Error('Storage unavailable');
    return saved;
  }};
  vm.runInNewContext(paletteBootstrapScript, {document, localStorage});
  return document.documentElement.dataset.palette;
}

test('restaura cualquiera de los ocho colores guardados antes de pintar', () => {
  for (const palette of palettes) {
    assert.equal(restore(palette.id), palette.id);
    assert.equal(getPalette(palette.id).id, palette.id);
  }
});

test('convierte las antiguas paletas al color equivalente', () => {
  for (const [saved, expected] of Object.entries({
    grafito: 'blanco', 'vscode-dark-plus': 'azul', cobalto: 'azul', oceano: 'cian',
  })) {
    assert.equal(getPalette(saved).id, expected);
    assert.equal(restore(saved), expected);
  }
});

test('una elección inválida o la falta de almacenamiento conserva un color válido', () => {
  for (const invalid of [null, undefined, '', 'unknown', '__proto__', 42]) {
    assert.equal(getPalette(invalid).id, defaultPalette);
    assert.equal(restore(invalid), defaultPalette);
  }
  assert.equal(restore('violeta', true), defaultPalette);
});

test('los colores del texto tienen contraste suficiente sobre negro', () => {
  for (const palette of palettes) {
    const channels = palette.color.slice(1).match(/../g)!.map((part) => parseInt(part, 16) / 255);
    const [r, g, b] = channels.map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    const contrast = (.2126 * r + .7152 * g + .0722 * b + .05) / .05;
    assert.ok(contrast >= 4.5, palette.name + ': ' + contrast.toFixed(2));
  }
});
