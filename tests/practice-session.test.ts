import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createDraftStore} from '../src/practice/drafts.ts';
import {createPracticeSessionManager, type SessionOptions} from '../src/practice/session-manager.ts';
import {context, deferred, engineFixture, environment, memoryRepository, until, workspace} from './fixtures/practice-session.ts';

function setup(options: Partial<SessionOptions> = {}) {
  const engines = engineFixture(); const repository = memoryRepository();
  const drafts = createDraftStore(() => repository.repository, {debounceMs: 60_000});
  const manager = createPracticeSessionManager({registry: engines.registry, drafts,
    bootstrap: async (ctx) => ({workspace: workspace(ctx), environment}), ...options});
  return {engines, drafts, repository, manager, async close() {await manager.dispose(); await drafts.close();}};
}

test('medición de práctica: fases independientes por perfil sin conservar texto del usuario', async () => {
  const names = ['bootstrap', 'draft', 'dataset', 'runtime-init', 'inspect'];
  for (const name of names) performance.clearMeasures('alldoc-practice/' + name);
  const f = setup();
  try {
    await f.manager.setContext(context()); await f.manager.open();
    for (const name of names) {
      const entries = performance.getEntriesByName('alldoc-practice/' + name) as PerformanceMeasure[];
      assert.equal(entries.length, 1, name);
      assert.ok(entries[0].duration >= 0); assert.equal(entries[0].detail.profileId, context().profile.id);
      assert.equal(entries[0].detail.status, 'success');
      assert.equal(JSON.stringify(entries[0].detail).includes('SELECT'), false);
    }
    await f.manager.collapse(); await f.manager.open();
    for (const name of names) assert.equal(performance.getEntriesByName('alldoc-practice/' + name).length, 1);
  } finally {await f.close();}
});

test('sesión: completar mientras llega la inspección no descarta el nuevo esquema del motor', async () => {
  const f = setup();
  try {
    await f.manager.setContext(context()); await f.manager.open();
    const inspect = deferred<import('../src/practice/contracts.ts').RuntimeSchema>(); f.engines.deferInspect(inspect.promise);
    const running = f.manager.execute(); await until(() => f.engines.calls.runs.length === 1);
    f.engines.emit(0, {type: 'end', status: 'success', environmentReset: false});
    await running;
    await until(() => f.manager.getSnapshot().phase === 'ready');
    await f.manager.complete(3);
    inspect.resolve({version: 9, entities: [{name: 'ventas', kind: 'table', columns: [{name: 'importe', type: 'integer'}]}]});
    await until(() => f.manager.getSnapshot().schema.version === 9);
    assert.equal(f.manager.getSnapshot().schema.entities[0].name, 'ventas');
  } finally {await f.close();}
});

test('sesión: ejecutar durante preparación no encola trabajo cuando el motor queda listo', async () => {
  const f=setup();const gate=deferred();let opening:Promise<void>|undefined;let requested:Promise<void>|undefined;
  try {
    await f.manager.setContext(context());f.engines.deferInit(gate.promise);opening=f.manager.open();
    await until(()=>f.engines.calls.init===1);assert.equal(f.manager.getSnapshot().phase,'loading');
    requested=f.manager.execute();gate.resolve();await opening;
    await new Promise(resolve=>setTimeout(resolve,0));assert.equal(f.engines.calls.runs.length,0);
    await requested;
  } finally {
    gate.resolve();if(f.engines.calls.runs.length)f.engines.emit(0,{type:'end',status:'success',environmentReset:false});
    await opening;await requested;await f.close();
  }
});

test('sesión: inspección nueva descarta una sugerencia pendiente del esquema anterior aunque no cambie el texto',async()=>{
 const f=setup();const inspect=deferred<import('../src/practice/contracts.ts').RuntimeSchema>();const completion=deferred<import('../src/practice/contracts.ts').CompletionResult>();
 let pending:Promise<unknown>|undefined;
 try{
  await f.manager.setContext(context());await f.manager.open();f.engines.deferInspect(inspect.promise);
  const running=f.manager.execute();await until(()=>f.engines.calls.runs.length===1);f.engines.emit(0,{type:'end',status:'success',environmentReset:false});await running;
  f.engines.deferCompletion(completion.promise);pending=f.manager.complete(3);await until(()=>f.engines.calls.completion.length===1);const request=f.engines.calls.completion[0];
  inspect.resolve({version:9,entities:[{name:'productos',kind:'table',columns:[{name:'actual',type:'text'}]}]});await until(()=>f.manager.getSnapshot().schema.version===9);
  completion.resolve({...request,from:0,to:3,items:[{label:'eliminada',insertText:'eliminada'}]});assert.equal(await pending,null);
 }finally{inspect.resolve({version:9,entities:[]});completion.resolve({requestId:'late',workspaceId:'sql',generation:0,revision:0,file:'main.sql',from:0,to:0,items:[]});await pending;await f.close();}
});

for(const status of ['cancelled','timeout'] as const)test(`sesión: recuperación explícita tras ${status} reconstruye SQL/pandas una vez y no encola otro atajo`,async()=>{
 for(const tool of ['sql','pandas']){
  const f=setup({timeoutMs:50});const gate=deferred();let first:Promise<void>|undefined;let second:Promise<void>|undefined;
  try{
   await f.manager.setContext(context(tool));await f.manager.open();first=f.manager.execute();await until(()=>f.engines.calls.runs.length===1);
   const path=tool==='sql'?'main.sql':'main.py';const content=tool==='sql'?'SELECT 9;':'productos.head(1)';f.manager.edit(path,content);
   if(status==='cancelled')await f.manager.stop();await first;
   assert.equal(f.manager.getSnapshot().events.at(-1)?.type,'end');assert.equal((f.manager.getSnapshot().events.at(-1) as {status:string}).status,status);
   assert.equal(f.engines.calls.active,0);assert.equal(f.engines.calls.created,1);assert.equal(f.manager.getSnapshot().phase,'ready');
   f.engines.deferInit(gate.promise);second=f.manager.execute();await new Promise(resolve=>setImmediate(resolve));
   assert.equal(f.engines.calls.init,2,'La siguiente ejecución explícita debe preparar otro motor');assert.equal(f.manager.getSnapshot().phase,'loading');
   await f.manager.execute();assert.equal(f.engines.calls.runs.length,1);gate.resolve();await until(()=>f.engines.calls.runs.length===2);
   f.engines.emit(1,{type:'end',status:'success',environmentReset:false});await second;
   assert.equal(f.engines.calls.runs[1].files[0].content,content);assert.equal(f.engines.calls.runs.length,2);assert.equal(f.engines.calls.maxActive,1);
  }finally{gate.resolve();if(f.engines.calls.runs.length>1)f.engines.emit(1,{type:'end',status:'success',environmentReset:false});await first;await second;await f.close();}
 }
});

test('sesión: comienza colapsada y navegar sin abrir no carga motores ni borradores', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.setContext(context('pandas'));
  assert.equal(f.manager.getSnapshot().phase, 'collapsed');
  assert.equal(f.engines.calls.created, 0); assert.equal(f.repository.calls.reads, 0); await f.close();
});

test('sesión: SELECT → WHERE conserva motor y código; SQL → pandas → SQL recupera borradores independientes', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open();
  f.manager.edit('main.sql', 'SELECT 42;'); const sql = f.manager.getSnapshot().draft!.workspace;
  await f.manager.setContext(context('sql', 'where'));
  assert.equal(f.manager.getSnapshot().draft!.workspace, sql); assert.equal(f.engines.calls.created, 1);
  await f.manager.setContext(context('pandas')); assert.equal(f.engines.calls.disposed, 1);
  assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'productos.head()');
  f.manager.edit('main.py', 'productos.shape'); await f.manager.setContext(context());
  assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT 42;');
  assert.equal(f.engines.calls.maxActive, 1); assert.equal(f.engines.calls.runs.length, 0);
  assert.match(f.manager.getSnapshot().notice ?? '', /reinici|restaur/i); await f.close();
});

test('sesión: el contexto preparado publica su borrador antes de liberar la VM anterior y permite editar sin ejecutarla', async () => {
  const f = setup(); const gate = deferred(); let changing: Promise<void> | undefined;
  try {
    await f.manager.setContext(context('pandas')); await f.manager.open();
    f.manager.edit('main.py', 'productos.head(2)');
    await f.manager.setContext(context());
    const prepared = f.drafts.get(context('pandas').workspaceKey);
    f.engines.deferDispose(gate.promise);
    changing = f.manager.setContext(context('pandas'));
    const snapshot = f.manager.getSnapshot();
    assert.equal(snapshot.context?.workspaceKey, context('pandas').workspaceKey);
    assert.equal(snapshot.phase, 'loading'); assert.equal(snapshot.draft, prepared);
    assert.equal(f.engines.calls.created, 2); assert.equal(f.engines.calls.runs.length, 0);
    assert.equal(await f.manager.complete(2), null);
    f.manager.edit('main.py', 'productos.head(3)');
    gate.resolve(); await changing;
    assert.equal(f.manager.getSnapshot().draft?.workspace.files[0].content, 'productos.head(3)');
    assert.equal(f.engines.calls.maxActive, 1);
  } finally {gate.resolve(); await changing; await f.close();}
});

test('sesión: cambiar de contexto publica generación y borrador juntos, sin un estado nuevo del contexto anterior', async () => {
  const f = setup(); const gate = deferred(); let changing: Promise<void> | undefined;
  try {
    await f.manager.setContext(context('pandas')); await f.manager.open();
    await f.manager.setContext(context());
    f.engines.deferDispose(gate.promise);
    const before = f.manager.getSnapshot(); const snapshots: ReturnType<typeof f.manager.getSnapshot>[] = [];
    const unsubscribe = f.manager.subscribe(() => snapshots.push(f.manager.getSnapshot()));
    changing = f.manager.setContext(context('pandas'));
    unsubscribe();
    assert.equal(snapshots.length, 1);
    assert.equal(snapshots[0].generation, before.generation + 1);
    assert.equal(snapshots[0].context?.workspaceKey, context('pandas').workspaceKey);
    assert.equal(snapshots[0].draft?.workspace.id, context('pandas').workspaceKey);
    assert.equal(snapshots[0].phase, 'loading');
  } finally {gate.resolve(); await changing; await f.close();}
});

test('sesión: editar o guardar un borrador inactivo no notifica ni reemplaza el snapshot activo', async () => {
  const f = setup();
  try {
    await f.manager.setContext(context()); await f.manager.open();
    await f.manager.setContext(context('pandas'));
    const before = f.manager.getSnapshot(); let notifications = 0;
    const unsubscribe = f.manager.subscribe(() => {notifications++;});
    f.drafts.edit(context().workspaceKey, 'main.sql', 'SELECT 9;');
    await f.drafts.flush(context().workspaceKey);
    assert.equal(f.manager.getSnapshot(), before); assert.equal(notifications, 0);
    f.manager.edit('main.py', 'productos.head(2)');
    assert.notEqual(f.manager.getSnapshot(), before); assert.equal(notifications, 1);
    assert.equal(f.manager.getSnapshot().draft?.workspace.files[0].content, 'productos.head(2)');
    unsubscribe();
  } finally {await f.close();}
});

test('sesión: abrir la práctica ya abierta y preparada es idempotente para los suscriptores', async () => {
  const f = setup();
  try {
    await f.manager.setContext(context()); await f.manager.open();
    const before = f.manager.getSnapshot(); let notifications = 0;
    const unsubscribe = f.manager.subscribe(() => {notifications++;});
    await f.manager.open();
    assert.equal(f.manager.getSnapshot(), before); assert.equal(notifications, 0);
    assert.equal(f.engines.calls.created, 1); assert.equal(f.engines.calls.init, 1);
    unsubscribe();
  } finally {await f.close();}
});

test('sesión: salir oculta, volver recuerda apertura y recargar empieza colapsado', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open(); await f.manager.setContext(null);
  assert.equal(f.manager.getSnapshot().visible, false); assert.equal(f.manager.getSnapshot().openRequested, true);
  await f.manager.setContext(context()); assert.equal(f.manager.getSnapshot().phase, 'ready');
  await f.close(); const next = setup(); await next.manager.setContext(context());
  assert.equal(next.manager.getSnapshot().openRequested, false); await next.close();
});

test('sesión: cerrar durante init y su respuesta tardía no reabren el panel ni retienen el motor', async () => {
  const f = setup(); const gate = deferred(); f.engines.deferInit(gate.promise);
  await f.manager.setContext(context()); const opening = f.manager.open(); await until(() => f.engines.calls.init === 1);
  await f.manager.collapse(); gate.resolve(); await opening;
  assert.equal(f.manager.getSnapshot().phase, 'collapsed'); assert.equal(f.engines.calls.active, 0);
  await f.manager.open(); assert.equal(f.manager.getSnapshot().phase, 'ready'); await f.close();
});

test('sesión: contexto nuevo puede iniciar aunque init anterior no responda; nunca hay dos motores', async () => {
  const f = setup(); const gate = deferred(); f.engines.deferInit(gate.promise);
  await f.manager.setContext(context()); const old = f.manager.open(); await until(() => f.engines.calls.init === 1);
  await f.manager.setContext(context('pandas')); assert.equal(f.manager.getSnapshot().draft!.workspace.activeFile, 'main.py');
  gate.resolve(); await old; assert.equal(f.manager.getSnapshot().context!.toolKey, context('pandas').toolKey);
  assert.equal(f.engines.calls.maxActive, 1); await f.close();
});

test('sesión: editar durante run conserva su revisión; un solo end y esquema tardío no pisa otro run', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open();
  const running = f.manager.execute(); await until(() => f.engines.calls.runs.length === 1);
  f.manager.edit('main.sql', 'SELECT 2;');
  assert.equal(f.engines.calls.runs[0].files[0].content, 'SELECT * FROM productos;');
  assert.equal(f.engines.calls.runs[0].revision, 0);
  const inspect = deferred<import('../src/practice/contracts.ts').RuntimeSchema>(); f.engines.deferInspect(inspect.promise);
  f.engines.emit(0, {type: 'end', status: 'success', environmentReset: false}); await running;
  const second = f.manager.execute(); await until(() => f.engines.calls.runs.length === 2);
  inspect.resolve({version: 999, entities: []}); f.engines.emit(1, {type: 'end', status: 'success', environmentReset: false}); await second;
  await until(() => f.manager.getSnapshot().schema.version === 2);
  assert.equal(f.manager.getSnapshot().events.filter((event) => event.type === 'end').length, 1); await f.close();
});

test('sesión: cancelación y eventos tardíos no contaminan el nuevo contexto', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open(); const running = f.manager.execute();
  await until(() => f.engines.calls.runs.length === 1); await f.manager.setContext(context('pandas')); await running;
  f.engines.emit(0, {type: 'stream', channel: 'stdout', text: 'viejo'});
  assert.equal(f.manager.getSnapshot().events.length, 0); assert.equal(f.engines.calls.cancelled, 1); await f.close();
});

test('sesión: timeout fuerza liberación aunque cancel no conteste y emite exactamente un end', async () => {
  const f = setup({timeoutMs: 15, cancelGraceMs: 5}); f.engines.deferCancel(deferred<{environmentReset: boolean}>().promise);
  await f.manager.setContext(context()); await f.manager.open(); await f.manager.execute();
  const ends = f.manager.getSnapshot().events.filter((event) => event.type === 'end');
  assert.equal(ends.length, 1); assert.equal(ends[0].status, 'timeout'); assert.equal(ends[0].environmentReset, true);
  assert.equal(f.engines.calls.active, 0); assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT * FROM productos;'); await f.close();
});

test('sesión: salida inválida, fin ausente y presupuesto de salida terminan sin un run colgado', async () => {
  for (const kind of ['invalid', 'missing-end', 'overflow']) {
    const f = setup({maxOutputBytes: 512}); await f.manager.setContext(context()); await f.manager.open();
    const running = f.manager.execute(); await until(() => f.engines.calls.runs.length === 1);
    if (kind === 'invalid') f.engines.emit(0, {type: 'stream', channel: 'otro', text: 'x'});
    if (kind === 'missing-end') f.engines.finish(0);
    if (kind === 'overflow') f.engines.emit(0, {type: 'stream', channel: 'stdout', text: 'ñ'.repeat(500)});
    await running;
    assert.equal(f.manager.getSnapshot().events.filter((event) => event.type === 'end').length, 1);
    assert.equal(f.manager.getSnapshot().phase, 'ready');
    assert.match(f.manager.getSnapshot().notice ?? '', /salida|protocolo|fin/i); await f.close();
  }
});

test('sesión: completar ignora respuestas de una revisión anterior y no bloquea editar', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open();
  const completion = deferred<import('../src/practice/contracts.ts').CompletionResult>(); f.engines.deferCompletion(completion.promise);
  const pending = f.manager.complete(2); await until(() => f.engines.calls.completion.length === 1);
  f.manager.edit('main.sql', 'SELECT nombre FROM productos;'); const request = f.engines.calls.completion[0];
  completion.resolve({...request, from: 0, to: 2, items: [{label: 'viejo', insertText: 'viejo'}]});
  assert.equal(await pending, null); assert.equal((await f.manager.complete(2))!.items[0].label, 'productos'); await f.close();
});

test('sesión: reiniciar entorno conserva texto, no ejecuta y colapsar libera tras inactividad', async () => {
  const f = setup({idleMs: 5}); await f.manager.setContext(context()); await f.manager.open(); f.manager.edit('main.sql', 'SELECT 8;');
  await f.manager.resetEnvironment(); assert.equal(f.engines.calls.resets, 1);
  assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT 8;'); assert.equal(f.engines.calls.runs.length, 0);
  await f.manager.collapse(); await until(() => f.engines.calls.active === 0); await f.manager.open();
  assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT 8;'); await f.close();
});

test('sesión: error de init se puede reintentar sin duplicar recursos ni ejecutar', async () => {
  const f = setup(); const gate = deferred(); f.engines.deferInit(gate.promise);
  await f.manager.setContext(context()); const opening = f.manager.open(); await until(() => f.engines.calls.init === 1);
  gate.reject(new Error('descarga falló')); await opening; assert.equal(f.manager.getSnapshot().phase, 'error');
  await f.manager.retry(); assert.equal(f.manager.getSnapshot().phase, 'ready'); assert.equal(f.engines.calls.maxActive, 1);
  assert.equal(f.engines.calls.runs.length, 0); await f.close();
});

test('sesión: ejecutar esperando una carga anterior no ejecuta el contexto al que se navegó', async () => {
  const f = setup(); const gate = deferred(); f.engines.deferInit(gate.promise);
  await f.manager.setContext(context()); const opening = f.manager.open(); await until(() => f.engines.calls.init === 1);
  const run = f.manager.execute(); await f.manager.setContext(context('pandas'));
  gate.resolve(); await opening;
  // Una ejecución incorrecta no debe obligar a esperar el timeout de 10 segundos.
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(f.engines.calls.runs.length, 0); await run; await f.close();
});

test('sesión: un end que perdió el entorno espera dispose antes de permitir otra ejecución', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open();
  const gate = deferred(); f.engines.deferDispose(gate.promise);
  const run = f.manager.execute(); await until(() => f.engines.calls.runs.length === 1);
  f.engines.emit(0, {type: 'end', status: 'error', environmentReset: true});
  await new Promise((resolve) => setImmediate(resolve));
  let returned = false; const next = f.manager.execute().then(() => {returned = true;});
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(returned, true); assert.equal(f.engines.calls.runs.length, 1);
  gate.resolve(); await run; await next; await f.close();
});

test('sesión: reinicios concurrentes comparten operación sin construir otro motor', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open();
  const gate = deferred(); f.engines.deferReset(gate.promise);
  const one = f.manager.resetEnvironment(); await until(() => f.engines.calls.resets === 1);
  const two = f.manager.resetEnvironment(); await new Promise((resolve) => setImmediate(resolve));
  assert.equal(f.engines.calls.created, 1); assert.equal(f.engines.calls.resets, 1);
  gate.resolve(); await one; await two; assert.equal(f.manager.getSnapshot().phase, 'ready'); await f.close();
});

test('sesión: si dispose no responde, el contexto siguiente falla sin crear un segundo motor', async () => {
  const f = setup({cancelGraceMs: 5}); await f.manager.setContext(context()); await f.manager.open();
  f.engines.deferDispose(deferred().promise); await f.manager.setContext(context('pandas'));
  assert.equal(f.manager.getSnapshot().phase, 'error'); assert.equal(f.engines.calls.created, 1); await f.close();
});

test('sesión: cancelar sin perder entorno conserva el motor y rechaza sugerencias de un contexto anterior', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open();
  f.engines.deferCancel(Promise.resolve({environmentReset: false})); const run = f.manager.execute();
  await until(() => f.engines.calls.runs.length === 1); await f.manager.stop(); await run;
  assert.equal(f.engines.calls.active, 1); assert.equal(f.manager.getSnapshot().events.at(-1)!.type, 'end');
  const gate = deferred<import('../src/practice/contracts.ts').CompletionResult>(); f.engines.deferCompletion(gate.promise);
  const pending = f.manager.complete(2); await until(() => f.engines.calls.completion.length === 1);
  const request = f.engines.calls.completion[0]; await f.manager.setContext(context('pandas'));
  gate.resolve({...request, from: 0, to: 2, items: []}); assert.equal(await pending, null); await f.close();
});

test('sesión: cambiar de herramienta no espera un reset viejo que ignora AbortSignal', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open();
  const gate = deferred(); f.engines.deferReset(gate.promise);
  const resetting = f.manager.resetEnvironment(); await until(() => f.engines.calls.resets === 1);
  const changing = f.manager.setContext(context('pandas')); await new Promise((resolve) => setImmediate(resolve));
  const initializedBeforeOldReset = f.engines.calls.init;
  gate.resolve(); await resetting; await changing;
  assert.equal(initializedBeforeOldReset, 2); assert.equal(f.manager.getSnapshot().phase, 'ready'); await f.close();
});

test('sesión: SQL → pandas → SQL durante descarga solo construye el último motor', async () => {
  const engines = engineFixture(); const gate = deferred<import('../src/practice/contracts.ts').AdapterFactories>();
  let first = true;
  const f = setup({registry: {...engines.registry, async loadProviders(id) {
    if (first) {first = false; return gate.promise;} return engines.registry.loadProviders(id);
  }}});
  await f.manager.setContext(context()); const opening = f.manager.open(); await new Promise((resolve) => setImmediate(resolve));
  const pandas = f.manager.setContext(context('pandas')); const sql = f.manager.setContext(context());
  await pandas; await sql; gate.resolve(engines.factories); await opening;
  assert.equal(engines.calls.created, 1); assert.equal(f.manager.getSnapshot().context!.profile.languageId, 'sql');
  await f.close(); assert.equal(engines.calls.active, 0);
});

test('sesión: reiniciar durante ejecución cancela y deja un motor preparado conservando el código', async () => {
  const f = setup(); await f.manager.setContext(context()); await f.manager.open();
  f.manager.edit('main.sql', 'SELECT 9;'); const run = f.manager.execute();
  await until(() => f.engines.calls.runs.length === 1); await f.manager.resetEnvironment(); await run;
  assert.equal(f.engines.calls.created, 2); assert.equal(f.engines.calls.active, 1);
  assert.equal(f.manager.getSnapshot().phase, 'ready');
  assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT 9;'); await f.close();
});
