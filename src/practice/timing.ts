/** Una entrada acotada por fase; nunca registra documentos ni resultados. */
export async function practicePhase<T>(name: string, work: () => Promise<T>, detail: Record<string, string | number> = {}): Promise<T> {
  const clock = globalThis.performance; const start = clock?.now(); let status = 'error';
  try {const result = await work(); status = 'success'; return result;}
  finally {
    if (clock && start !== undefined) try {
      const key = 'alldoc-practice/' + name;
      clock.clearMeasures(key); clock.measure(key, {start, end: clock.now(), detail: {...detail, status}});
    } catch { /* La observabilidad no cambia la ejecución en un navegador sin esta API. */ }
  }
}
