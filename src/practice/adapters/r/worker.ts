import type {ChannelType, WebR} from 'webr';
import type {CompletionRequest, RunRequest, RuntimeContext} from '../../contracts.ts';
import {isBridgeRequest, type BridgeReply} from '../../isolation/messages.ts';
import {createREngine} from './core.ts';
import {completeR} from './completion.ts';
import {rVersion, webRVersion} from './environment.ts';

declare const __WEBR_REPO_PATH__: string;
type ReplyBody = BridgeReply extends infer T ? T extends BridgeReply ? Omit<T, 'version' | 'session' | 'id'> : never : never;
const scope = self as unknown as {onmessage: ((event: MessageEvent) => void) | null; postMessage(value: unknown): void};
let session: string | null = null;
let engine: ReturnType<typeof createREngine> | null = null;
let busy = false;

scope.onmessage = ({data}) => {
  if (!session && data?.command === 'init' && typeof data.session === 'string' && isBridgeRequest(data, data.session)) session = data.session;
  if (!session || !isBridgeRequest(data, session)) return;
  const reply = (value: ReplyBody) => scope.postMessage({version: 1, session, id: data.id, ...value});
  if (busy) {reply({kind: 'failure', message: 'El motor R está ocupado'}); return;}
  busy = true;
  void (async () => {
    if (data.command === 'init') {
      const context = data.payload as RuntimeContext;
      if (engine || context.profile.runtimeId !== 'webr' || context.environment.runtime.version !== webRVersion) throw new Error('Contexto de R incompatible');
      const base = new URL(`/r/${webRVersion}/`, self.location.origin);
      const repo = new URL('/' + __WEBR_REPO_PATH__, base).href;
      const sdk = await import(/* webpackIgnore: true */ new URL('webr.js', base).href) as {WebR: typeof WebR; ChannelType: typeof ChannelType};
      const webR = new sdk.WebR({baseUrl: base.href, repoUrl: repo, channelType: sdk.ChannelType.PostMessage,
        interactive: false, downloadTimeout: 15_000});
      try {
        await webR.init();
        if (webR.version !== webRVersion || webR.versionR !== rVersion) throw new Error('Versión de WebR incompatible');
        const installed = new Set<string>();
        const next = createREngine(webR, async names => {
          const requested = names.filter(name => !installed.has(name));
          if (!requested.length) return;
          await webR.installPackages(requested, {repos: repo, quiet: true});
          const available = await webR.evalRBoolean(`all(c(${requested.map(name => JSON.stringify(name)).join(',')}) %in% .packages(all.available=TRUE))`);
          if (!available) throw new Error(`No se pudieron cargar los paquetes de R: ${requested.join(', ')}`);
          requested.forEach(name => installed.add(name));
        });
        await next.init(context.dataset);
        engine = next;
      } catch (error) {webR.close(); throw error;}
    } else {
      if (!engine) throw new Error('R sin inicializar');
      if (data.command === 'run') await engine.run(data.payload as RunRequest, event => reply({kind: 'event', event}));
      else if (data.command === 'inspect') {reply({kind: 'result', value: await engine.inspect()}); return;}
      else if (data.command === 'complete') {reply({kind: 'result', value: await completeR(data.payload as CompletionRequest, engine.functionNames)}); return;}
      else throw new Error('Comando de R no disponible');
    }
    reply({kind: 'result'});
  })().catch(error => reply({kind: 'failure', message: (error instanceof Error ? error.message : String(error)).slice(0, 4000)}))
    .finally(() => {busy = false;});
};
