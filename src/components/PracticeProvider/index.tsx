import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import {resolvePracticeEditorContext} from '@site/src/practice/context';
import type {SessionSnapshot} from '@site/src/practice/session-manager';
import type {createBrowserPracticeSession} from '@site/src/practice/browser-session';

type Session = ReturnType<typeof createBrowserPracticeSession>;
const empty: SessionSnapshot = {context: null, openRequested: false, visible: false, phase: 'hidden', generation: 0,
  draft: null, schema: {version: 0, entities: []}, events: [], notice: null, error: null};
const getEmpty = () => empty; const subscribeEmpty = () => () => {};

function usePracticeController() {
  const {pathname} = useLocation();
  const context = useMemo(() => resolvePracticeEditorContext(pathname), [pathname]);
  const [session, setSession] = useState<Session | null>(null);
  const [requested, setRequested] = useState(false); const [error, setError] = useState<string | null>(null);
  const current = useRef({context, requested}); current.current = {context, requested};
  const handle = useRef<Session | null>(null); const pending = useRef<Promise<Session> | null>(null); const dead = useRef(false);
  const state = useSyncExternalStore(session?.manager.subscribe ?? subscribeEmpty, session?.manager.getSnapshot ?? getEmpty, getEmpty);
  const open = useCallback(async () => {
    current.current.requested = true; setRequested(true); setError(null);
    try {
      pending.current ??= import(/* webpackChunkName: "practice-session" */ '@site/src/practice/browser-session')
        .then(({createBrowserPracticeSession}) => createBrowserPracticeSession()).catch((reason) => {pending.current = null; throw reason;});
      const value = await pending.current;
      if (dead.current) {await value.dispose(); return;}
      if (!handle.current) {handle.current = value; setSession(value);}
      await value.manager.setContext(current.current.context);
      if (current.current.requested) await value.manager.open();
    } catch (reason) {if (!dead.current) setError(reason instanceof Error ? reason.message : String(reason));}
  }, []);
  const collapse = useCallback(() => {
    current.current.requested = false; setRequested(false); void handle.current?.manager.collapse();
  }, []);
  useEffect(() => {void handle.current?.manager.setContext(context);}, [context]);
  useEffect(() => {
    dead.current = false;
    const flush = () => {void handle.current?.flush();};
    window.addEventListener('pagehide', flush);
    return () => {dead.current = true; window.removeEventListener('pagehide', flush); void handle.current?.dispose();};
  }, []);
  return {context, state, manager: session?.manager ?? null, requested, visible: Boolean(context && requested), open, collapse, error};
}
const Context = createContext<ReturnType<typeof usePracticeController> | null>(null);
export default function PracticeProvider({children}: {children: ReactNode}) {
  const value = usePracticeController(); return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function usePractice() {
  const context = useContext(Context); if (!context) throw new Error('Falta PracticeProvider'); return context;
}
