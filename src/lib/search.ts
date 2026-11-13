export type SearchEntry = {
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

export function searchEntries(
  entries: SearchEntry[],
  query: string,
): SearchEntry[] {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return entries;

  return entries
    .map((entry, position) => {
      const title = normalizeSearch(entry.title);
      const text = normalizeSearch([
        entry.title,
        entry.description,
        entry.context,
        ...entry.keywords,
      ].join(' '));
      if (!terms.every((term) => text.includes(term))) return null;
      const score = terms.reduce(
        (sum, term) => sum + (title === term ? 10 : title.startsWith(term) ? 5 : 1),
        0,
      );
      return {entry, score, position};
    })
    .filter((result) => result !== null)
    .sort((a, b) => b.score - a.score || a.position - b.position)
    .map(({entry}) => entry);
}
