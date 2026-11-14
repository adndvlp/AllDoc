import {useEffect, useId, useRef, useState, type ComponentType} from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {usePractice} from '../PracticeProvider';
import {useSearch} from '../SearchProvider';
import Icon from '../Icon';
import type {PracticeLayout} from '@site/src/practice/layout';
import {canExecutePractice} from '@site/src/practice/interaction';
import type {RunRequest, Workspace} from '@site/src/practice/contracts';
import type {PracticeDataset} from '@site/src/practice/datasets/types';
import {hasOtherModal, openExclusiveModal, suspendDialogEvent} from '@site/src/lib/dialog-coordination';
import type Editor from '../PracticeEditor';
import PracticeResults from '../PracticeResults';
import styles from './styles.module.css';

const tabs = ['Código', 'Datos', 'Resultados'] as const;
let editorPromise: Promise<{default: typeof Editor}> | undefined;
const loadEditor = () => editorPromise ??= import(/* webpackChunkName: "practice-editor" */ '../PracticeEditor')
  .catch((error) => {editorPromise = undefined; throw error;});

export default function PracticePanel({layout}: {layout: PracticeLayout}) {
  const practice = usePractice(); const {store: search} = useSearch(); const topics = useNavbarMobileSidebar();
  const dialog = useRef<HTMLDialogElement>(null); const programmaticCloses = useRef(0); const suspended = useRef(false);
  const latest = useRef({practice, layout}); latest.current = {practice, layout};
  const previousWorkspace = useRef<Workspace | null>(null);
  const selection = useRef<{id: string; path: string; range: RunRequest['selection']} | null>(null);
  if (practice.state.draft) previousWorkspace.current = practice.state.draft.workspace;
  const workspace = practice.state.draft?.workspace ?? previousWorkspace.current;
  const [activeTab, setActiveTab] = useState(0); const [EditorComponent, setEditor] = useState<ComponentType<Parameters<typeof Editor>[0]> | null>(null);
  const [editorError, setEditorError] = useState(false); const [attempt, setAttempt] = useState(0);
  const [data, setData] = useState<PracticeDataset | null>(null); const [message, setMessage] = useState<string | null>(null);
  const id = useId(); const openedBefore = useRef(false);
  const codeMenu = useRef<HTMLDetailsElement>(null);
  const closeForState = () => {if (dialog.current?.open) {programmaticCloses.current++; dialog.current.close();}};
  useEffect(() => {
    const menu = codeMenu.current;
    const dismiss = (event: PointerEvent) => {if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;};
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  useEffect(() => {if (codeMenu.current) codeMenu.current.open = false;}, [practice.visible, practice.context?.workspaceKey]);
  useEffect(() => {
    if (!practice.state.codeAction || !EditorComponent) return;
    setActiveTab(0);
  }, [practice.state.codeAction, EditorComponent]);

  useEffect(() => {
    const element = dialog.current!;
    const reconcile = () => {
      const {practice, layout} = latest.current;
      if (!practice.visible) {suspended.current = false; closeForState(); return;}
      if (layout === 'modal' && hasOtherModal(element)) {suspended.current = true; closeForState(); return;}
      if (suspended.current && document.querySelector('dialog:modal')) return;
      suspended.current = false;
      const modal = layout === 'modal';
      const active = element.contains(document.activeElement) ? document.activeElement as HTMLElement : null;
      if (element.open && element.matches(':modal') !== modal) closeForState();
      if (!element.open) {
        element.parentElement?.querySelector<HTMLButtonElement>('[data-practice-trigger]')?.focus({preventScroll: true});
        if (modal) openExclusiveModal(element);
        else element.show();
        if (openedBefore.current) active?.focus({preventScroll: true});
        openedBefore.current = true;
      }
    };
    reconcile();
  }, [practice.visible, layout]);
  useEffect(() => {
    const element = dialog.current!; let frame = 0;
    const suspend = () => {suspended.current = true; closeForState();};
    const closed = (event: Event) => {
      if (event.target === element || !suspended.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!latest.current.practice.visible || document.querySelector('dialog:modal')) return;
        suspended.current = false;
        element.parentElement?.querySelector<HTMLButtonElement>('[data-practice-trigger]')?.focus({preventScroll: true});
        if (latest.current.layout === 'modal') openExclusiveModal(element); else if (!element.open) element.show();
      });
    };
    element.addEventListener(suspendDialogEvent, suspend); document.addEventListener('close', closed, true);
    return () => {cancelAnimationFrame(frame); element.removeEventListener(suspendDialogEvent, suspend); document.removeEventListener('close', closed, true); if (element.open) element.close();};
  }, []);
  useEffect(() => {
    if (!practice.visible || !workspace || EditorComponent) return;
    let cancelled = false; setEditorError(false);
    void loadEditor().then((module) => {if (!cancelled) setEditor(() => module.default);}, () => {if (!cancelled) setEditorError(true);});
    return () => {cancelled = true;};
  }, [practice.visible, Boolean(workspace), EditorComponent, attempt]);
  useEffect(() => {
    if (!practice.visible || data) return;
    let cancelled = false;
    void import(/* webpackChunkName: "practice-data" */ '@site/src/practice/editor-bootstrap')
      .then(({editorDataset}) => {if (!cancelled) setData(editorDataset);});
    return () => {cancelled = true;};
  }, [practice.visible, data]);
  useEffect(() => {
    if (!practice.visible || layout !== 'modal') return;
    const viewport = window.visualViewport; const element = dialog.current!;
    const update = () => {
      element.style.setProperty('--practice-viewport-height', (viewport?.height ?? innerHeight) + 'px');
      element.style.setProperty('--practice-viewport-offset', (viewport?.offsetTop ?? 0) + 'px');
    };
    update(); viewport?.addEventListener('resize', update); viewport?.addEventListener('scroll', update);
    return () => {viewport?.removeEventListener('resize', update); viewport?.removeEventListener('scroll', update);};
  }, [practice.visible, layout]);

  const label = practice.context?.toolKey === 'analisis-de-datos/sql' ? 'SQL'
    : practice.context?.toolKey === 'analisis-de-datos/pandas' ? 'pandas' : practice.context?.profile.label ?? 'Código';
  const unavailable = practice.context?.profile.availability !== 'enabled';
  const canExecute = canExecutePractice(practice.state, workspace);
  const status = practice.state.draft?.status;
  const saved = status === 'memory' ? 'Guardado en esta sesión' : status === 'conflict' ? 'Copia recuperable guardada' : status === 'dirty' || status === 'saving' ? 'Guardando…' : 'Guardado local';
  const error = practice.error ?? practice.state.error;
  const tables = unavailable ? data?.tables : practice.state.schema.entities.map((entity) => ({
    name: entity.name, columns: entity.columns, rows: entity.preview?.rows ?? [], rowCount: entity.rowCount, truncated: entity.preview?.truncated}));
  function selectTab(index: number, focus = false) {
    setActiveTab(index);
    if (focus) dialog.current?.querySelector<HTMLButtonElement>(`[data-practice-tab="${index}"]`)?.focus();
  }
  function codeAction(action: () => void | Promise<unknown>) {
    if (codeMenu.current) codeMenu.current.open = false;
    void Promise.resolve().then(action).catch(reason => setMessage(reason instanceof Error ? reason.message : String(reason)));
  }
  return <dialog ref={dialog} id="alldoc-practice-panel" className={styles.panel} data-practice-panel data-layout={layout}
    aria-labelledby={id + '-title'} onClose={() => {
      if (programmaticCloses.current) programmaticCloses.current--;
      else if (!suspended.current) practice.collapse();
    }}>
    <div className={styles.frame}>
      <header className={styles.header}>
        <h2 id={id + '-title'}>Práctica <strong>{label}</strong></h2>
        <div className={styles.actions}>
          <button type="button" aria-label="Buscar un concepto" onClick={() => {void search.openDialog();}}><Icon name="search" size={18} /></button>
          {topics.shouldRender && <button type="button" aria-label="Abrir temas" onClick={topics.toggle}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 4h12M3 9h12M3 14h12" stroke="currentColor" strokeWidth="1.5" /></svg></button>}
          <button type="button" autoFocus aria-label="Volver al apunte" onClick={() => dialog.current?.close()}><Icon name="close" size={19} /></button>
        </div>
      </header>
      <div className={styles.toolbar}>
        <span className={styles.file}>{workspace?.activeFile ?? 'Preparando código…'}</span>
        {practice.state.phase === 'running'
          ? <button type="button" onClick={() => {void practice.manager?.stop();}}>Detener</button>
          : <button type="button" disabled={!canExecute} onClick={() => {
            const current = selection.current;
            void practice.manager?.execute(current?.id === workspace?.id && current?.path === workspace?.activeFile ? current?.range : undefined);
          }}>Ejecutar</button>}
        {!unavailable && <button type="button" disabled={practice.state.phase === 'loading'} onClick={() => {void practice.manager?.resetEnvironment();}}>Reiniciar entorno</button>}
        <details ref={codeMenu} className={styles.codeMenu} onKeyDown={(event) => {
          if (event.key === 'Escape' && codeMenu.current?.open) {
            event.preventDefault(); event.stopPropagation(); codeMenu.current.open = false;
            codeMenu.current.querySelector('summary')?.focus({preventScroll: true});
          }
        }}>
          <summary role="button" aria-label="Opciones de código" title="Opciones de código"><span aria-hidden="true">⋯</span></summary>
          <div role="region" aria-label="Opciones de código" className={styles.codeMenuBody}>
            <button type="button" disabled={!workspace || !practice.manager} onClick={() => codeAction(() => practice.manager?.restoreInitialCode())}>Restaurar código inicial</button>
            {practice.state.draft?.previous && <button type="button" onClick={() => codeAction(() => practice.manager?.restorePreviousCode())}>Recuperar código anterior</button>}
            {status === 'memory' && <button type="button" onClick={() => codeAction(() => practice.manager?.retrySave())}>Reintentar guardado</button>}
          </div>
        </details>
        {activeTab !== 2 && practice.state.events.some((event) => event.type === 'end') && <button type="button" onClick={() => selectTab(2)}>Ver resultados</button>}
      </div>
      <div role="tablist" aria-label="Contenido de práctica" className={styles.tabs}>
        {tabs.map((tab, index) => <button key={tab} type="button" role="tab" id={`${id}-tab-${index}`} data-practice-tab={index}
          aria-controls={`${id}-pane-${index}`} aria-selected={activeTab === index} tabIndex={activeTab === index ? 0 : -1}
          onClick={() => selectTab(index)} onKeyDown={(event) => {
            const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
            if (next !== null) {event.preventDefault(); selectTab(next, true);}
          }}>{tab}</button>)}
      </div>
      <div className={styles.body}>
        <section className={styles.code} role="tabpanel" id={id + '-pane-0'} aria-labelledby={id + '-tab-0'} hidden={activeTab !== 0}>
          {(error || editorError) && <div className={styles.message} role="alert">No se pudo preparar la práctica.
            {error && <p>{error}</p>}
            <button type="button" onClick={() => {if (error) {if (practice.error || !practice.manager) void practice.open(); else void practice.manager.retry();} setAttempt((value) => value + 1);}}>Reintentar</button>
          </div>}
          {!error && !editorError && (!EditorComponent || !workspace) && <p className={styles.message} role="status">Cargando editor…</p>}
          {EditorComponent && workspace && <EditorComponent workspace={workspace} schema={practice.state.schema} helpId={id + '-help'}
            focusRequest={practice.visible && activeTab === 0 ? practice.state.codeAction : 0}
            onChange={(key, path, content) => {
              if (practice.manager?.getSnapshot().context?.workspaceKey !== key) return;
              try {practice.manager.edit(path, content); setMessage(null);} catch (reason) {setMessage(String(reason));}
            }} onSelection={(id, path, range) => {selection.current = {id, path, range};}}
            onComplete={(document, position, signal) => {
              const snapshot = practice.manager?.getSnapshot(); const active = snapshot?.draft?.workspace;
              if (!active || active.id !== workspace?.id || active.files.find((file) => file.path === active.activeFile)?.content !== document) return Promise.resolve(null);
              return practice.manager!.complete(position, signal);
            }}
            onExecute={(selection) => {if (unavailable) setMessage('La ejecución aún no está disponible.'); else if (canExecute) void practice.manager?.execute(selection);}} />}
          <p id={id + '-help'} className={styles.help}>Tab sale del editor · Ctrl+Espacio sugiere</p>
        </section>
        <section role="tabpanel" id={id + '-pane-1'} aria-labelledby={id + '-tab-1'} hidden={activeTab !== 1} className={styles.data}>
          {practice.state.phase === 'loading' && !tables?.length && <p>Preparando datos…</p>}
          {tables ? tables.map((table) => <div key={table.name}>
            <h3>{table.name} <span>{'rowCount' in table ? table.rowCount === undefined ? 'Vista' : table.rowCount + ' filas' : table.rows.length + ' filas'}</span></h3>
            <div role="region" aria-label={'Tabla ' + table.name} tabIndex={0} className={styles.table}>
              <table><caption className="sr-only">Datos de {table.name}</caption>
                <thead><tr>{table.columns.map((column) => <th key={column.name} scope="col">{column.name}<small>{column.type}</small></th>)}</tr></thead>
                <tbody>{table.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{String(cell ?? 'NULL')}</td>)}</tr>)}</tbody>
              </table>
            </div>
            {'truncated' in table && table.truncated === true && <p>Vista previa truncada.</p>}
          </div>) : <p>Cargando datos…</p>}
        </section>
        <section role="tabpanel" id={id + '-pane-2'} aria-labelledby={id + '-tab-2'} hidden={activeTab !== 2} className={styles.results}>
          <PracticeResults events={practice.state.events} revision={workspace?.revision ?? 0} />
        </section>
      </div>
      <div className={styles.status}>
        {unavailable && <p>La ejecución aún no está disponible.</p>}
        {practice.state.phase === 'loading' && <p role="status">Preparando {practice.context?.profile.label ?? 'entorno'}…</p>}
        <span>{saved}</span><span className={styles.scope}>{(practice.state.phase === 'running' ? practice.context?.profile.busyCompletionDescription : undefined)
          ?? practice.context?.profile.completionDescription ?? 'Sugerencias según el perfil'}</span>
        {(message || practice.state.notice) && <p role="status">{message ?? practice.state.notice}</p>}
      </div>
    </div>
  </dialog>;
}
