import {selectBrowserProjects} from './browser-foundation.ts';

export type DesktopRunOptions = {projects: string[]; smoke: boolean; grep?: string; list: boolean; buildOnly: boolean};
export const desktopCaseIds = ['SQL-01', 'PY-01', 'SQL-02', 'PY-02', 'SQL-03', 'PY-03', 'SQL-04', 'PY-04', 'SQL-05', 'PY-05'] as const;
export const smokeCaseIds = ['SQL-01', 'PY-01'] as const;

export function parseDesktopRunArgs(args: readonly string[]): DesktopRunOptions {
  const names: string[] = [];
  const options: DesktopRunOptions = {projects: [], smoke: false, list: false, buildOnly: false};
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--smoke') options.smoke = true;
    else if (arg === '--list') options.list = true;
    else if (arg === '--build-only') options.buildOnly = true;
    else if (arg === '--project' || arg.startsWith('--project=')) {
      const value = arg === '--project' ? args[++index] : arg.slice('--project='.length);
      if (!value || value.startsWith('-')) throw new Error('Falta el nombre después de --project');
      names.push(value);
    } else if (arg === '-g' || arg === '--grep' || arg.startsWith('--grep=')) {
      const value = arg.startsWith('--grep=') ? arg.slice('--grep='.length) : args[++index];
      if (!value) throw new Error('Falta la expresión después de --grep');
      new RegExp(value); options.grep = value;
    } else throw new Error('Opción desconocida: ' + arg);
  }
  options.projects = selectBrowserProjects(names).filter(p => names.length || p.name.endsWith('-escritorio')).map(p => p.name);
  if (options.projects.some(name => !name.endsWith('-escritorio'))) throw new Error('El punto 2 comprueba escritorio; los otros tamaños corresponden al punto 3');
  if (options.buildOnly && (options.list || options.smoke || options.grep)) throw new Error('--build-only no se combina con filtros, --list o --smoke');
  return options;
}

type Case = {project: string; id: string; status: string; title: string; file: string; durationMs: number};
const record = (value: unknown): Record<string, unknown> => value !== null && typeof value === 'object' ? value as Record<string, unknown> : {};
const list = (value: unknown): unknown[] => Array.isArray(value) ? value : [];

/** Evalúa los resultados originales; los contadores por sí solos no acreditan cobertura. */
export function assessDesktopRun(input: unknown, options: DesktopRunOptions): {status: string; reasons: string[]; cases: Case[]} {
  const raw = record(input), stats = record(raw.stats), cases: Case[] = [], reasons: string[] = [], failures: string[] = [];
  const required: readonly string[] = options.smoke ? smokeCaseIds : desktopCaseIds;
  const seen = new Set<string>();
  const visit = (value: unknown) => {
    const suite = record(value);
    for (const item of list(suite.specs)) {
      const spec = record(item), title = String(spec.title ?? ''), file = String(spec.file ?? suite.file ?? '');
      const id = /^\[(SQL-\d+|PY-\d+)\]/.exec(title)?.[1] ?? '';
      for (const entry of list(spec.tests)) {
        const test = record(entry), results = list(test.results).map(record), result = results[0] ?? {};
        const project = String(test.projectName ?? ''), key = project + '/' + id;
        const valid = required.includes(id) && options.projects.includes(project) && /(?:^|\/)practice-desktop\.spec\.ts$/.test(file);
        const passed = test.expectedStatus === 'passed' && test.status === 'expected' && results.length === 1 && result.status === 'passed' && result.retry === 0;
        if (!valid) reasons.push('Caso o proyecto fuera del alcance: ' + key);
        if (seen.has(key)) reasons.push('Caso duplicado: ' + key);
        if (!passed) reasons.push('Caso sin aprobación estricta: ' + key);
        if (['failed', 'timedOut'].includes(String(result.status))) failures.push('Caso fallido: ' + key + ' (' + result.status + ')');
        seen.add(key);
        cases.push({project, id, status: passed ? 'passed' : String(result.status ?? test.status ?? 'missing'), title, file, durationMs: Number(result.duration ?? 0)});
      }
    }
    for (const child of list(suite.suites)) visit(child);
  };
  for (const suite of list(raw.suites)) visit(suite);
  if (list(raw.errors).length) reasons.push('Errores globales de Playwright');
  if (!cases.length) reasons.push('No se ejecutaron casos');
  for (const field of ['unexpected', 'flaky', 'skipped']) if (stats[field] !== 0) reasons.push('Contador no aprobado: ' + field);
  if (stats.expected !== cases.length) reasons.push('El contador no coincide con los casos originales');
  if (!options.grep) for (const project of options.projects) for (const id of required) if (!seen.has(project + '/' + id)) reasons.push('Falta ' + project + '/' + id);
  for (const project of options.projects) if (!cases.some(c => c.project === project)) reasons.push('Sin casos de ' + project);
  return {status: reasons.length ? 'incomplete' : options.grep ? 'subset-passed' : 'passed', reasons: [...failures, ...reasons], cases};
}

export async function beforeBrowserWork<T>(check: () => Promise<{status: string}>, work: () => Promise<T>): Promise<T> {
  if ((await check()).status !== 'ready') throw new Error('Preflight bloqueado: no se construyó ni inició la aplicación');
  return work();
}
