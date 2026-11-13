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
  let recentIds: readonly string[] = [];
  const resultsFor = (query: string) => {
    if (!index) return [];
    const results = searchPreparedEntries(index, query);
    if (query.trim()) return results;
    const byId = new Map(results.map((entry) => [entry.id, entry]));
    const recent = recentIds.flatMap((id) => byId.has(id) ? [byId.get(id)!] : []);
    const seen = new Set(recent.map(({id}) => id));
    return [...recent, ...results.filter(({id}) => !seen.has(id))];
  };
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
      update({status: 'ready', results: resultsFor(state.query)});
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
    setRecentIds(ids: readonly string[]) {
      const unique = Array.from(new Set(ids));
      if (unique.length === recentIds.length && unique.every((id, i) => recentIds[i] === id)) return;
      recentIds = unique;
      // Una sincronización tardía no mueve enlaces de un diálogo ya abierto.
      if (index && !state.query.trim() && state.surface !== 'dialog') update({results: resultsFor(state.query)});
    },
    setQuery(query: string) {
      if (query === state.query) return;
      update({query, terms: searchTerms(query), visibleCount: 10, results: resultsFor(query)});
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
      if (state.surface !== 'dialog') update({surface: 'dialog', results: resultsFor(state.query)});
      return load();
    },
    closeDialog() {
      if (state.surface === 'dialog') update({surface: inlineMounted ? 'inline' : null});
    },
    chooseResult() {update({query: '', terms: [], surface: null, visibleCount: 10, results: resultsFor('')});},
    showMore() {update({visibleCount: Math.min(state.results.length, state.visibleCount + 10)});},
  };
}

export type SearchStore = ReturnType<typeof createSearchStore>;
