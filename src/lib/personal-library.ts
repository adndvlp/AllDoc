export const RECENTS_KEY = 'alldoc-recents-v1';
export const FAVORITES_KEY = 'alldoc-favorites-v1';
export const RECENTS_LIMIT = 20;
export const SHORTCUTS_LIMIT = 6;

export type Recent = {conceptId: string; visitedAt: number};
export type LibrarySnapshot = {
  hydrated: boolean;
  recents: readonly Recent[];
  favorites: readonly string[];
  sessionOnly: {recents: boolean; favorites: boolean};
};
export type LibraryStorage = Pick<Storage, 'getItem' | 'setItem'>;
type Collection = 'recents' | 'favorites';

function parse(raw: string | null): Record<string, unknown> | null {
  try {
    const value: unknown = JSON.parse(raw ?? 'null');
    return value && typeof value === 'object' && 'version' in value && value.version === 1
      ? value as Record<string, unknown> : null;
  } catch {return null;}
}

export function readRecents(raw: string | null, knownIds: ReadonlySet<string>): Recent[] {
  const value = parse(raw);
  if (!Array.isArray(value?.items)) return [];
  const byId = new Map<string, Recent>();
  for (const item of value.items) {
    if (!item || typeof item !== 'object') continue;
    const {conceptId, visitedAt} = item;
    if (typeof conceptId !== 'string' || !knownIds.has(conceptId) || typeof visitedAt !== 'number'
      || !Number.isFinite(visitedAt) || Math.abs(visitedAt) > 8.64e15) continue;
    if (!byId.has(conceptId) || byId.get(conceptId)!.visitedAt < visitedAt) byId.set(conceptId, {conceptId, visitedAt});
  }
  return Array.from(byId.values()).sort((a, b) => b.visitedAt - a.visitedAt
    || (a.conceptId < b.conceptId ? -1 : a.conceptId > b.conceptId ? 1 : 0)).slice(0, RECENTS_LIMIT);
}

export function readFavorites(raw: string | null, knownIds: ReadonlySet<string>): string[] {
  const value = parse(raw);
  if (!Array.isArray(value?.conceptIds)) return [];
  return Array.from(new Set(value.conceptIds.filter((id): id is string => typeof id === 'string' && knownIds.has(id))));
}

export function createPersonalLibrary(entries: readonly {id: string; slug: string}[], now: () => number = Date.now) {
  const knownIds = new Set(entries.map(({id}) => id));
  const normalizePath = (path: string) => path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const routes = new Map(entries.map(({id, slug}) => [normalizePath(slug), id]));
  const initial: LibrarySnapshot = {hydrated: false, recents: [], favorites: [], sessionOnly: {recents: false, favorites: false}};
  let state = initial;
  let storage: LibraryStorage | null = null;
  const readable = {recents: false, favorites: false};
  let activeRoute: string | null = null;
  const pendingVisits: string[] = [];
  const listeners = new Set<() => void>();
  const update = (patch: Partial<LibrarySnapshot>) => {
    state = {...state, ...patch};
    listeners.forEach((notify) => notify());
  };
  const persist = (collection: Collection, value: unknown): boolean => {
    if (!storage || !readable[collection]) return false;
    try {
      storage.setItem(collection === 'recents' ? RECENTS_KEY : FAVORITES_KEY, JSON.stringify(value));
      return true;
    } catch {return false;}
  };
  const visit = (conceptId: string) => {
    const visitedAt = Math.max(now(), (state.recents[0]?.visitedAt ?? -Infinity) + 1);
    const recents = [{conceptId, visitedAt}, ...state.recents.filter((item) => item.conceptId !== conceptId)].slice(0, RECENTS_LIMIT);
    const saved = persist('recents', {version: 1, items: recents});
    update({recents, sessionOnly: {...state.sessionOnly, recents: !saved}});
  };

  return {
    subscribe(notify: () => void) {listeners.add(notify); return () => {listeners.delete(notify);};},
    getSnapshot: () => state,
    getServerSnapshot: () => initial,
    hydrate(adapter: LibraryStorage | null) {
      if (state.hydrated) return;
      storage = adapter;
      const read = (collection: Collection, key: string) => {
        if (!storage) return null;
        try {const raw = storage.getItem(key); readable[collection] = true; return raw;} catch {return null;}
      };
      const recents = readRecents(read('recents', RECENTS_KEY), knownIds);
      const favorites = readFavorites(read('favorites', FAVORITES_KEY), knownIds);
      update({hydrated: true, recents, favorites});
      pendingVisits.splice(0).forEach(visit);
    },
    activateRoute(pathname: string) {
      const path = normalizePath(pathname);
      if (path === activeRoute) return;
      activeRoute = path;
      const id = routes.get(path);
      if (!id) return;
      if (state.hydrated) visit(id); else pendingVisits.push(id);
    },
    toggleFavorite(id: string) {
      if (!state.hydrated || !knownIds.has(id)) return;
      const favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites, id];
      const saved = persist('favorites', {version: 1, conceptIds: favorites});
      update({favorites, sessionOnly: {...state.sessionOnly, favorites: !saved}});
    },
    // Un evento de otra pestaña actualiza solo su colección, sin volver a escribir.
    receiveStorage(key: string | null, raw: string | null) {
      if (!state.hydrated) return;
      if (key === RECENTS_KEY) update({recents: readRecents(raw, knownIds), sessionOnly: {...state.sessionOnly, recents: false}});
      else if (key === FAVORITES_KEY) update({favorites: readFavorites(raw, knownIds), sessionOnly: {...state.sessionOnly, favorites: false}});
      else if (key === null) update({recents: [], favorites: [], sessionOnly: {recents: false, favorites: false}});
    },
  };
}

export type PersonalLibrary = ReturnType<typeof createPersonalLibrary>;
