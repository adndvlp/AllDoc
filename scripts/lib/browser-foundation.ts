export type BrowserEngine = 'firefox' | 'webkit';
export type BrowserProject = {name: string; use: {browserName: BrowserEngine; viewport: {width: number; height: number};
  isMobile: boolean; hasTouch: boolean; deviceScaleFactor: number}};
export type BrowserHandle = {version(): string; close(): Promise<void>};
export type BrowserLauncher = {launch(options: {headless: boolean; timeout: number}): Promise<BrowserHandle>};
export type BrowserCheck = {engine: BrowserEngine; status: 'ready' | 'missing-executable' | 'launch-failed' | 'version-failed' | 'close-failed';
  version?: string; error?: string; details?: string; durationMs: number};
export type BrowserPreflight = {status: 'ready' | 'blocked'; projects: string[]; engines: BrowserCheck[]; diagnostic: string | null};

export function browserProjects(): BrowserProject[] {
  const sizes = [['estrecho', 390, 844], ['tableta', 768, 1024], ['escritorio', 1280, 800]] as const;
  return (['firefox', 'webkit'] as const).flatMap(engine => sizes.map(([size, width, height]) => ({
    name: engine + '-' + size,
    use: {browserName: engine, viewport: {width, height}, isMobile: engine === 'webkit' && size !== 'escritorio',
      hasTouch: engine === 'webkit' && size !== 'escritorio', deviceScaleFactor: 1},
  })));
}

export function selectBrowserProjects(names: readonly string[] = []): BrowserProject[] {
  const projects = browserProjects();
  for (const name of names) if (!projects.some(project => project.name === name)) {
    throw new Error(`Proyecto desconocido: ${name || '(vacío)'}. Disponibles: ${projects.map(p => p.name).join(', ')}`);
  }
  return names.length ? projects.filter(project => names.includes(project.name)) : projects;
}

export function parseBrowserPreflightArgs(args: readonly string[]): {projects: string[]; list: boolean} {
  const projects: string[] = []; let list = false;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--list') {list = true; continue;}
    if (arg === '--project' || arg.startsWith('--project=')) {
      const value = arg === '--project' ? args[++index] : arg.slice('--project='.length);
      if (!value || value.startsWith('-')) throw new Error('Falta el nombre después de --project');
      projects.push(value);
    } else throw new Error(`Opción desconocida: ${arg}. Uso: npm run test:browser:preflight [-- --project=nombre | --list]`);
  }
  selectBrowserProjects(projects);
  return {projects, list};
}

const message = (error: unknown) => (error instanceof Error ? error.message : String(error)).replace(/\u001b\[[0-9;]*m/g, '');
const summary = (error: unknown) => message(error).split('\n')[0].slice(0, 400);

async function closeBrowser(browser: BrowserHandle, timeoutMs: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([browser.close(), new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(`El cierre no terminó en ${timeoutMs} ms`)), timeoutMs);
    })]);
  } finally {clearTimeout(timer);}
}

export async function preflightBrowsers(names: readonly string[], launchers: Partial<Record<BrowserEngine, BrowserLauncher>>,
  options: {launchTimeoutMs?: number; closeTimeoutMs?: number;
    onProgress?(event: {engine: BrowserEngine; status: 'checking' | BrowserCheck['status']}): void} = {}): Promise<BrowserPreflight> {
  const projects = selectBrowserProjects(names);
  const launchTimeoutMs = options.launchTimeoutMs ?? 15_000, closeTimeoutMs = options.closeTimeoutMs ?? 5_000;
  for (const value of [launchTimeoutMs, closeTimeoutMs]) if (!Number.isFinite(value) || value <= 0) throw new Error('Plazo de preflight inválido');
  const engines: BrowserCheck[] = [];
  const progress = (engine: BrowserEngine, status: 'checking' | BrowserCheck['status']) => {
    try {options.onProgress?.({engine, status});} catch { /* El reporter no cambia el diagnóstico ni la liberación. */ }
  };
  for (const engine of new Set(projects.map(project => project.use.browserName))) {
    progress(engine, 'checking');
    const started = performance.now(); let browser: BrowserHandle | undefined;
    const check: BrowserCheck = {engine, status: 'launch-failed', durationMs: 0};
    try {
      const launcher = launchers[engine];
      if (!launcher) throw new Error(`Falta el launcher ${engine}`);
      browser = await launcher.launch({headless: true, timeout: launchTimeoutMs});
      check.status = 'version-failed';
      const version = browser.version();
      if (typeof version !== 'string' || !version.trim()) throw new Error(`No se obtuvo la versión de ${engine}`);
      check.version = version; check.status = 'ready';
    } catch (error) {
      if (message(error).includes("Executable doesn't exist")) check.status = 'missing-executable';
      check.error = summary(error); check.details = message(error).slice(0, 16000);
    } finally {
      if (browser) try {await closeBrowser(browser, closeTimeoutMs);}
      catch (error) {check.status = 'close-failed'; check.error = summary(error); check.details = message(error).slice(0, 16000);}
      check.durationMs = performance.now() - started; engines.push(check);
      progress(engine, check.status);
    }
  }
  const failed = engines.filter(check => check.status !== 'ready');
  const missing = failed.filter(check => check.status === 'missing-executable').map(check => check.engine);
  const diagnostic = failed.length ? failed.map(check => `${check.engine}: ${check.error}`).join('; ')
    + (missing.length ? `. Ejecuta npx playwright install ${missing.join(' ')}` : '') : null;
  return {status: failed.length ? 'blocked' : 'ready', projects: projects.map(p => p.name), engines, diagnostic};
}
