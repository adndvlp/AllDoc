import {createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode} from 'react';
import {createSearchStore, type SearchStore} from '@site/src/lib/search-store';

const Context = createContext<{store: SearchStore; shortcut: string} | null>(null);

export default function SearchProvider({children}: {children: ReactNode}) {
  const [store] = useState(() => createSearchStore(async () =>
    (await import(/* webpackChunkName: "search-index" */ '@site/src/content/search-index')).entries));
  const [shortcut, setShortcut] = useState('Ctrl K');
  useEffect(() => {if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut('⌘ K');}, []);
  return <Context.Provider value={{store, shortcut}}>{children}</Context.Provider>;
}

export function useSearch() {
  const context = useContext(Context);
  if (!context) throw new Error('El buscador necesita SearchProvider');
  const state = useSyncExternalStore(context.store.subscribe, context.store.getSnapshot, context.store.getServerSnapshot);
  return {...context, state};
}
