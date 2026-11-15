export type BrowserCase = {id: string; file: string; label: string; scope: 'all' | 'desktop'; requirements: string[]; smoke?: boolean};
const cases: BrowserCase[] = [];
for (const [prefix, name] of [['SQL', 'SQL'], ['PY', 'pandas']]) {
  const add = (number: number, file: string, label: string, requirements: string[], desktop = false, smoke = false) => cases.push({id: prefix + '-' + String(number).padStart(2, '0'), file, label: name + ': ' + label, requirements, scope: desktop ? 'desktop' : 'all', ...(smoke ? {smoke: true} : {})});
  add(1, 'practice-desktop.spec.ts', 'editor diferido y filtro real con columnas y números correctos', ['CB-06', prefix === 'SQL' ? 'CB-10' : 'CB-11'], false, true);
  add(2, 'practice-desktop.spec.ts', 'resaltado, escritura, deshacer, rehacer, Tab y atajo listo', ['CB-07']);
  add(3, 'practice-desktop.spec.ts', 'sugerencias reales e inserción sin ejecutar', [prefix === 'SQL' ? 'CB-08' : 'CB-09']);
  add(4, 'practice-desktop.spec.ts', 'selección, error con ubicación y recuperación', ['CB-15']);
  add(5, 'practice-desktop.spec.ts', 'atajo durante preparación sin ejecución pendiente', ['CB-07', 'CB-20'], true);
  add(6, 'practice-state.spec.ts', 'sesión viva, esquema actualizado y reinicio limpio', [prefix === 'SQL' ? 'CB-10' : 'CB-11', prefix === 'SQL' ? 'CB-08' : 'CB-09']);
  add(7, 'practice-state.spec.ts', 'probar, recuperar y restaurar código conserva datos', ['CB-13']);
  add(8, 'practice-state.spec.ts', 'cero filas, null y HTML como texto seguro', ['CB-15']);
  add(9, 'practice-state.spec.ts', 'origen separado, almacenamiento, red y navegación protegidos', ['CB-16']);
  add(10, 'practice-errors.spec.ts', 'cancelación conserva edición y permite ejecutar después', ['CB-14'], true);
  add(11, 'practice-errors.spec.ts', 'timeout real reinicia el motor y conserva el borrador', ['CB-14'], true);
  add(12, 'practice-errors.spec.ts', 'salida grande acotada y aviso de truncamiento', ['CB-15'], true);
  add(13, 'practice-errors.spec.ts', 'descarga del motor fallida y reintento conserva código', ['CB-20'], true);
}
for (const [id, file, label, requirements, scope] of [
  ['APP-01', 'application.spec.ts', 'portada, catálogo, áreas y navegación de concepto', ['CB-01', 'CB-02'], 'all'],
  ['APP-02', 'application.spec.ts', 'encabezado, búsqueda por teclado, Esc y foco', ['CB-03', 'CB-04'], 'all'],
  ['APP-03', 'application.spec.ts', 'práctica, temas y búsqueda mantienen un modal y foco útil', ['CB-05'], 'all'],
  ['APP-04', 'application.spec.ts', 'acento, favoritos y recientes persisten al recargar', ['CB-19'], 'all'],
  ['APP-05', 'application.spec.ts', 'lector y sidebar independientes, extremos y contenido que cabe', ['CB-17'], 'all'],
  ['APP-06', 'application.spec.ts', 'texto al 200%, 320 px y cambio de disposición', ['CB-18'], 'all'],
  ['FLOW-01', 'practice-flow.spec.ts', 'contexto SQL/pandas, borradores IndexedDB y recarga sin ejecutar', ['CB-12', 'CB-19'], 'all'],
  ['FLOW-02', 'practice-flow.spec.ts', 'editor y tabla desplazan solo su región', ['CB-17'], 'all'],
  ['ERR-01', 'practice-errors.spec.ts', 'carga tardía, cierre y descarga del panel fallida con reintento', ['CB-20'], 'desktop'],
  ['ERR-02', 'practice-errors.spec.ts', 'IndexedDB bloqueado, memoria y reintento sin perder edición', ['CB-20', 'CB-19'], 'desktop'],
] as const) cases.push({id, file, label, requirements: [...requirements], scope});

export const browserCases: readonly BrowserCase[] = cases;
export const caseTitle = (id: string) => {
  const entry = browserCases.find(c => c.id === id);
  if (!entry) throw new Error('Caso desconocido: ' + id);
  return `[${id}] ${entry.smoke ? '@smoke ' : ''}${entry.scope === 'desktop' ? '@desktop ' : ''}${entry.label}`;
};
export const appliesToProject = (entry: BrowserCase, project: string) => entry.scope === 'all' || project.endsWith('-escritorio');
