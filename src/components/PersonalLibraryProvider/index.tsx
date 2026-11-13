import {createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import {concepts} from '@site/src/content/concepts';
import {createPersonalLibrary, type PersonalLibrary} from '@site/src/lib/personal-library';
import {useSearch} from '../SearchProvider';

const Context = createContext<PersonalLibrary | null>(null);

export default function PersonalLibraryProvider({children}: {children: ReactNode}) {
  const [store] = useState(() => createPersonalLibrary(concepts));
  useEffect(() => {
    let storage: Storage | null = null;
    try {storage = window.localStorage;} catch { /* La biblioteca continúa en memoria. */ }
    store.hydrate(storage);
    const sync = (event: StorageEvent) => {
      if (storage && event.storageArea === storage) store.receiveStorage(event.key, event.newValue);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [store]);
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export function usePersonalLibrary() {
  const store = useContext(Context);
  if (!store) throw new Error('La biblioteca necesita PersonalLibraryProvider');
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  return {store, state};
}

export function PersonalLibraryEffects() {
  const {pathname} = useLocation();
  const {store, state} = usePersonalLibrary();
  const {store: search} = useSearch();
  useEffect(() => {store.activateRoute(pathname);}, [store, pathname]);
  useEffect(() => {search.setRecentIds(state.recents.map(({conceptId}) => conceptId));}, [search, state.recents]);
  return null;
}
