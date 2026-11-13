export const paletteStorageKey = 'alldoc-palette';
export const defaultPalette = 'azul';

export const palettes = [
  {id: 'azul', name: 'Azul', description: 'Azul eléctrico', color: '#3794ff'},
  {id: 'violeta', name: 'Violeta', description: 'Violeta intenso', color: '#b02cff'},
  {id: 'verde', name: 'Verde', description: 'Verde brillante', color: '#00e676'},
  {id: 'ambar', name: 'Ámbar', description: 'Ámbar intenso', color: '#ffb300'},
  {id: 'cian', name: 'Cian', description: 'Cian eléctrico', color: '#00d9ff'},
  {id: 'rosa', name: 'Fucsia', description: 'Fucsia intenso', color: '#ff1493'},
  {id: 'rojo', name: 'Rojo', description: 'Rojo vivo', color: '#ff3030'},
  {id: 'blanco', name: 'Blanco', description: 'Blanco puro', color: '#ffffff'},
] as const;

export type PaletteId = (typeof palettes)[number]['id'];

const legacyPaletteIds: Record<string, PaletteId> = {
  grafito: 'blanco',
  'vscode-dark-plus': 'azul',
  cobalto: 'azul',
  oceano: 'cian',
};

export function getPalette(value: unknown) {
  const id = typeof value === 'string' ? legacyPaletteIds[value] ?? value : defaultPalette;
  return palettes.find((palette) => palette.id === id) ?? palettes[0];
}

// Restaura el color de texto antes de pintar y acepta las elecciones anteriores.
export const paletteBootstrapScript =
  '(function(){var p=' + JSON.stringify(defaultPalette) + ';' +
  'try{var s=localStorage.getItem(' + JSON.stringify(paletteStorageKey) + ');' +
  'var m=' + JSON.stringify(legacyPaletteIds) + ';s=m[s]||s;' +
  'if(' + JSON.stringify(palettes.map((palette) => palette.id)) + '.includes(s))p=s;' +
  '}catch(e){}document.documentElement.dataset.palette=p;})();';
