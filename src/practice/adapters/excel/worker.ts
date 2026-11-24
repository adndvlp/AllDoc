import init, {type Model} from '@ironcalc/wasm';
import type {CompletionRequest, RunRequest, RuntimeContext} from '../../contracts.ts';
import {isBridgeRequest, type BridgeReply} from '../../isolation/messages.ts';
import {applyExcelEdits, createExcelModel, inspectExcel} from './engine.ts';
import {excelSuggestions} from './suggestions.ts';
import {excelWorkbook, getSpreadsheet, sheetsWorkbook} from './workbook.ts';

type ReplyBody = BridgeReply extends infer T ? T extends BridgeReply ? Omit<T, 'version' | 'session' | 'id'> : never : never;
const worker = self as unknown as {onmessage: ((event: MessageEvent) => void) | null; postMessage(value: unknown): void};
let session = '', busy = false, version = 0;
let engine: Model | undefined, baseline: Uint8Array | undefined;
let workbook = excelWorkbook;
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

worker.onmessage = ({data}) => {
  if (!session && data?.command === 'init' && typeof data.session === 'string' && isBridgeRequest(data, data.session)) session = data.session;
  if (!session || !isBridgeRequest(data, session)) return;
  const reply = (body: ReplyBody) => worker.postMessage({version: 1, session, id: data.id, ...body});
  if (busy) {reply({kind: 'failure', message: 'El libro está calculando'}); return;}
  busy = true;
  void (async () => {
    switch (data.command) {
      case 'init': {
        const {dataset, profile} = data.payload as RuntimeContext;
        const selection = getSpreadsheet(dataset.reference.id);
        if (engine || profile.runtimeId !== 'ironcalc' || dataset.bootstrap !== selection.bootstrap) throw new Error('Libro incompatible');
        await init();
        workbook = selection;
        engine = createExcelModel(timezone, workbook);
        baseline = engine.toBytes();
        break;
      }
      case 'inspect': {
        if (!engine) throw new Error('Libro sin inicializar');
        reply({kind: 'result', value: inspectExcel(engine, version, workbook)});
        return;
      }
      case 'run': {
        const {runId, generation, revision, files, entryFile} = data.payload as RunRequest;
        const file = files.find(item => item.path === entryFile && item.languageId === 'excel');
        if (!baseline || !file) throw new Error('Libro sin inicializar');
        const next = applyExcelEdits(baseline, file.content, workbook);
        engine?.free();
        engine = next;
        version++;
        reply({kind: 'event', event: {protocolVersion: 1, runId, generation, revision, type: 'end', status: 'success', environmentReset: false}});
        break;
      }
      case 'reset':
        engine?.free();
        engine = createExcelModel(timezone, workbook);
        version++;
        break;
      case 'complete': {
        const request = data.payload as CompletionRequest;
        reply({kind: 'result', value: {requestId: request.requestId, generation: request.generation, revision: request.revision,
          workspaceId: request.workspaceId, file: request.file, ...excelSuggestions(request.document, request.position, workbook === sheetsWorkbook)}});
        return;
      }
    }
    reply({kind: 'result'});
  })().catch(error => reply({kind: 'failure', message: error instanceof Error ? error.message : String(error)}))
    .finally(() => {busy = false;});
};
