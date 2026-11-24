// IronCalc expande los rangos directamente. Las fórmulas originales se conservan en el borrador.
const tokens = /"(?:[^"]|"")*"|'(?:[^']|'')*'|[A-Za-z_][\w.]*\s*\(|[(){};,]|[^"'(){};,]+?/g;

export function googleSheetsInput(value: string) {
  if (!value.startsWith('=')) return value;
  type Group = {open: string; arg: string; parts: string[]; separators: string[]};
  const groups: Group[] = [{open: '', arg: '', parts: [], separators: []}];
  let offset = 1;
  for (const match of value.slice(1).matchAll(tokens)) {
    const [token] = match;
    if (match.index !== offset - 1) return value;
    offset += token.length;
    const current = groups[groups.length - 1];
    if (token.endsWith('(') || token === '{') {
      groups.push({open: token, arg: '', parts: [], separators: []});
    } else if (token === ',' || token === ';') {
      current.parts.push(current.arg);
      current.separators.push(token);
      current.arg = '';
    } else if (groups.length > 1 && token === (current.open === '{' ? '}' : ')')) {
      groups.pop();
      current.parts.push(current.arg);
      groups[groups.length - 1].arg += render(current, token);
    } else {
      current.arg += token;
    }
  }
  return offset === value.length && groups.length === 1 && !groups[0].parts.length ? '=' + groups[0].arg : value;

  function render({open, parts, separators}: Group, close: string): string {
    const name = open.slice(0, -1).trim().toUpperCase();
    if (name === 'ARRAYFORMULA' && parts.length === 1) return '(' + parts[0] + ')';
    if (name === 'ARRAY_CONSTRAIN' && parts.length === 3) return 'TAKE(' + parts.join(',') + ')';
    if (name === 'FILTER' && parts.length > 2) return `FILTER(${parts[0]},${parts.slice(1).map(part => `(${part})`).join('*')})`;
    if (name === 'SORT' && parts.length === 3) return `SORT(${parts[0]},${parts[1]},IF(${parts[2]},1,-1))`;
    if (open === '{' && parts.some(part => !/^\s*(?:"(?:[^"]|"")*"|[+-]?\d+(?:\.\d+)?|TRUE|FALSE)\s*$/i.test(part))) {
      const rows = [[]] as string[][];
      parts.forEach((part, index) => {
        rows[rows.length - 1].push(part);
        if (separators[index] === ';') rows.push([]);
      });
      if (rows.every(row => row.length === rows[0].length)) {
        const values = rows.map(row => row.length === 1 ? row[0] : 'HSTACK(' + row.join(',') + ')');
        return values.length === 1 ? values[0] : 'VSTACK(' + values.join(',') + ')';
      }
    }
    return open + parts.map((part, index) => part + (separators[index] ?? '')).join('') + close;
  }
}
