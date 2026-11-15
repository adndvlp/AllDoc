import {selectBrowserProjects} from './browser-foundation.ts';
import {browserCases, appliesToProject} from './browser-cases.ts';

export type BrowserRunOptions = {projects: string[]; smoke: boolean; grep?: string; list: boolean; buildOnly: boolean; desktop?: boolean};
export const desktopCaseIds = ['SQL-01', 'PY-01', 'SQL-02', 'PY-02', 'SQL-03', 'PY-03', 'SQL-04', 'PY-04', 'SQL-05', 'PY-05'] as const;
export const smokeCaseIds = ['SQL-01', 'PY-01'] as const;

export function effectiveBrowserProjects(names: readonly string[], common: Record<string, unknown>, origin: string) {
  return selectBrowserProjects(names).map(project => ({...project, use: {...common, ...project.use, baseURL: origin}}));
}

export function parseBrowserRunArgs(args: readonly string[]): BrowserRunOptions {
  const names: string[] = [];
  const options: BrowserRunOptions = {projects: [], smoke: false, list: false, buildOnly: false};
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--smoke') options.smoke = true;
    else if (arg === '--list') options.list = true;
    else if (arg === '--build-only') options.buildOnly = true;
    else if (arg === '--desktop') options.desktop = true;
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
  options.projects = selectBrowserProjects(names).filter(p => names.length || !(options.smoke || options.desktop) || p.name.endsWith('-escritorio')).map(p => p.name);
  if (options.desktop && options.projects.some(name => !name.endsWith('-escritorio'))) throw new Error('--desktop requiere proyectos de escritorio');
  if (options.buildOnly && (options.list || options.smoke || options.grep)) throw new Error('--build-only no se combina con filtros, --list o --smoke');
  return options;
}

type Case = {project: string; id: string; status: string; title: string; file: string; durationMs: number};
type Coverage = {project: string; requirement: string; status: string; requiredCases: string[]; passedCases: string[]; missingCases: string[]};
const record = (value: unknown): Record<string, unknown> => value !== null && typeof value === 'object' ? value as Record<string, unknown> : {};
const list = (value: unknown): unknown[] => Array.isArray(value) ? value : [];

/** Evalúa los resultados originales; los contadores por sí solos no acreditan cobertura. */
export function assessBrowserRun(input: unknown, options: BrowserRunOptions): {status: string; reasons: string[]; cases: Case[]; coverage: Coverage[]} {
  const raw = record(input), stats = record(raw.stats), cases: Case[] = [], reasons: string[] = [], failures: string[] = [];
  const catalog = browserCases.filter(c => options.smoke ? c.smoke : options.desktop ? desktopCaseIds.includes(c.id as typeof desktopCaseIds[number]) : true);
  const required = (project: string) => catalog.filter(c => appliesToProject(c, project)).map(c => c.id);
  const seen = new Set<string>();
  const visit = (value: unknown) => {
    const suite = record(value);
    for (const item of list(suite.specs)) {
      const spec = record(item), title = String(spec.title ?? ''), file = String(spec.file ?? suite.file ?? '');
      const id = /^\[([A-Z]+-\d+)\]/.exec(title)?.[1] ?? '';
      for (const entry of list(spec.tests)) {
        const test = record(entry), results = list(test.results).map(record), result = results[0] ?? {};
        const project = String(test.projectName ?? ''), key = project + '/' + id;
        const caseSpec = catalog.find(c => c.id === id);
        const valid = Boolean(caseSpec && required(project).includes(id) && options.projects.includes(project) && file === caseSpec.file);
        const passed = test.expectedStatus === 'passed' && test.status === 'expected' && results.length === 1 && result.status === 'passed' && result.retry === 0;
        if (!valid) reasons.push('Caso o proyecto fuera del alcance: ' + key);
        if (seen.has(key)) reasons.push('Caso duplicado: ' + key);
        if (!passed) reasons.push('Caso sin aprobación estricta: ' + key);
        if (['failed', 'timedOut'].includes(String(result.status))) failures.push('Caso fallido: ' + key + ' (' + result.status + ')');
        seen.add(key);
        cases.push({project, id, status: passed && valid ? 'passed' : !valid ? 'invalid' : String(result.status ?? test.status ?? 'missing'), title, file, durationMs: Number(result.duration ?? 0)});
      }
    }
    for (const child of list(suite.suites)) visit(child);
  };
  for (const suite of list(raw.suites)) visit(suite);
  if (list(raw.errors).length) reasons.push('Errores globales de Playwright');
  if (!cases.length) reasons.push('No se ejecutaron casos');
  for (const field of ['unexpected', 'flaky', 'skipped']) if (stats[field] !== 0) reasons.push('Contador no aprobado: ' + field);
  if (stats.expected !== cases.length) reasons.push('El contador no coincide con los casos originales');
  if (!options.grep) {
    for (const project of options.projects) for (const id of required(project)) if (!seen.has(project + '/' + id)) reasons.push('Falta ' + project + '/' + id);
  } else {
    for (const project of options.projects) for (const id of new Set(cases.map(c => c.id))) {
      if (required(project).includes(id) && !seen.has(project + '/' + id)) reasons.push('Falta el caso filtrado ' + project + '/' + id);
    }
  }
  const coverage = options.projects.flatMap(project => Array.from({length: 20}, (_, index) => {
    const requirement = 'CB-' + String(index + 1).padStart(2, '0');
    // La evidencia siempre se contrasta con el catálogo completo, aunque se
    // haya seleccionado un filtro o el recorrido histórico de escritorio.
    const requiredCases = browserCases.filter(c => appliesToProject(c, project) && c.requirements.includes(requirement)).map(c => c.id);
    const passedCases = requiredCases.filter(id => cases.filter(c => c.project === project && c.id === id && c.status === 'passed').length === 1);
    const missingCases = requiredCases.filter(id => !passedCases.includes(id));
    return {project, requirement, status: !requiredCases.length ? 'not-applicable' : missingCases.length ? 'incomplete' : 'passed', requiredCases, passedCases, missingCases};
  }));
  return {status: reasons.length ? 'incomplete' : options.grep ? 'subset-passed' : 'passed', reasons: [...failures, ...reasons], cases, coverage};
}

export async function beforeBrowserWork<T>(check: () => Promise<{status: string}>, work: () => Promise<T>): Promise<T> {
  if ((await check()).status !== 'ready') throw new Error('Preflight bloqueado: no se construyó ni inició la aplicación');
  return work();
}
