export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  context: string;
  href: string;
  keywords: string[];
};

export function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

const auxiliaryWords = new Set(['como', 'que', 'es', 'el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'en', 'para', 'con', 'al', 'y']);

export function searchTerms(query: string): string[] {
  return normalizeSearch(query).replace(/[¿?¡!]/g, ' ').split(/\s+/)
    .filter((term) => term.length > 0 && !auxiliaryWords.has(term));
}

export function prepareSearchIndex(entries: readonly SearchEntry[]) {
  return entries.map((entry, position) => ({
    entry, position,
    title: normalizeSearch(entry.title),
    text: normalizeSearch([entry.title, entry.description, entry.context, ...entry.keywords].join(' ')),
  }));
}

export type PreparedSearchIndex = ReturnType<typeof prepareSearchIndex>;

export function searchPreparedEntries(index: PreparedSearchIndex, query: string): SearchEntry[] {
  if (!query.trim()) return index.map((item) => item.entry);
  const terms = searchTerms(query);
  if (terms.length === 0) return [];
  const phrase = terms.join(' ');
  return index
    .map(({entry, position, title, text}) => {
      if (!terms.every((term) => text.includes(term))) return null;
      const score = (title === phrase ? 1000 : title.startsWith(phrase) ? 100 : 0) + terms.reduce(
        (sum, term) => sum + (title === term ? 10 : title.startsWith(term) ? 5 : 1),
        0,
      );
      return {entry, score, position};
    })
    .filter((result) => result !== null)
    .sort((a, b) => b.score - a.score || a.position - b.position)
    .map(({entry}) => entry);
}

export function searchEntries(entries: readonly SearchEntry[], query: string): SearchEntry[] {
  return searchPreparedEntries(prepareSearchIndex(entries), query);
}
