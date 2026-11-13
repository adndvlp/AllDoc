import {prepareSearchIndex, searchPreparedEntries, searchTerms, type PreparedSearchIndex, type SearchEntry} from './search.ts';

export type SearchSurface = 'inline' | 'dialog' | null;
export type SearchSnapshot = {
  query: string;
  surface: SearchSurface;
  status: 'idle' | 'loading' | 'ready' | 'error';
  results: readonly SearchEntry[];
  terms: readonly string[];
  visibleCount: number;
};

export function createSearchStore(importEntries: () => Promise<readonly SearchEntry[]>) {
  const initial: SearchSnapshot = {query: '', surface: null, status: 'idle', results: [], terms: [], visibleCount: 10};
  let state = initial;
  let index: PreparedSearchIndex | null = null;
  let inFlight: Promise<void> | null = null;
  let inlineMounted = false;
  const listeners = new Set<() => void>();
  const update = (patch: Partial<SearchSnapshot>) => {
    state = {...state, ...patch};
    listeners.forEach((notify) => notify());
  };

  const load = (): Promise<void> => {
    if (inFlight) return inFlight;
    if (index) return Promise.resolve();
    update({status: 'loading'});
    inFlight = Promise.resolve().then(importEntries).then((entries) => {
      index = prepareSearchIndex(entries);
      update({status: 'ready', results: searchPreparedEntries(index, state.query)});
    }).catch(() => {
      update({status: 'error', results: []});
    }).finally(() => {inFlight = null;});
    return inFlight;
  };

  return {
    subscribe(notify: () => void) {listeners.add(notify); return () => {listeners.delete(notify);};},
    getSnapshot: () => state,
    getServerSnapshot: () => initial,
    load,
    retry: load,
    setQuery(query: string) {
      if (query === state.query) return;
      update({query, terms: searchTerms(query), visibleCount: 10, results: index ? searchPreparedEntries(index, query) : []});
    },
    mountInline() {inlineMounted = true;},
    releaseInline() {
      inlineMounted = false;
      if (state.surface === 'inline') update({surface: null});
    },
    activateInline() {
      if (state.surface !== 'dialog') update({surface: 'inline'});
      return load();
    },
    openDialog() {
      if (state.surface !== 'dialog') update({surface: 'dialog'});
      return load();
    },
    closeDialog() {
      if (state.surface === 'dialog') update({surface: inlineMounted ? 'inline' : null});
    },
    chooseResult() {update({query: '', terms: [], surface: null, visibleCount: 10, results: index ? searchPreparedEntries(index, '') : []});},
    showMore() {update({visibleCount: Math.min(state.results.length, state.visibleCount + 10)});},
  };
}

export type SearchStore = ReturnType<typeof createSearchStore>;
