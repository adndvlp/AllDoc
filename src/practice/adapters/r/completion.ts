import type {CompletionRequest, CompletionResult} from '../../contracts.ts';

const functions = {
  base: ['c', 'data.frame', 'head', 'length', 'mean', 'names', 'print', 'seq', 'str', 'sum', 'summary', 'table'],
  dplyr: ['arrange', 'count', 'distinct', 'filter', 'group_by', 'left_join', 'mutate', 'select', 'summarise', 'ungroup'],
  tidyr: ['complete', 'drop_na', 'fill', 'pivot_longer', 'pivot_wider', 'replace_na', 'separate_wider_delim'],
  ggplot2: ['aes', 'facet_wrap', 'geom_bar', 'geom_boxplot', 'geom_col', 'geom_line', 'geom_point', 'geom_smooth', 'ggplot', 'ggsave', 'labs', 'theme_minimal'],
  readr: ['read_csv', 'read_delim', 'write_csv'],
  stringr: ['str_detect', 'str_replace', 'str_squish', 'str_trim'],
} as const;

export async function completeR(request: CompletionRequest, exportsFor: (name: string) => Promise<string[]>): Promise<CompletionResult> {
  const before = request.document.slice(0, request.position).split('\n').at(-1) ?? '';
  const [, namespace, entity, prefix = ''] = /(?:([A-Za-z][\w.]*)::|([A-Za-z.][\w.]*)\$)?([\w.]*)$/.exec(before)!;
  const known = functions[namespace as keyof typeof functions] ?? [];
  const options = entity ? request.schema.entities.find(item => item.name === entity)?.columns.map(({name}) => name) ?? []
    : namespace ? [...await exportsFor(namespace), ...known]
      : [...request.schema.entities.map(({name}) => name), ...functions.base, ...functions.dplyr, ...functions.tidyr];
  const to = request.position + (request.document.slice(request.position).match(/^[\w.]*/)?.[0].length ?? 0);
  const items = Array.from(new Set(options)).filter(label => label.startsWith(prefix) && /^[A-Za-z.][\w.]*$/.test(label))
    .slice(0, 50).map(label => ({label, insertText: label, detail: entity ? 'columna' : namespace ?? 'R'}));
  return {requestId: request.requestId, workspaceId: request.workspaceId, generation: request.generation,
    revision: request.revision, file: request.file, from: request.position - prefix.length, to, items};
}
