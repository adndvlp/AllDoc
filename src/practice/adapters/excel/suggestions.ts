const names = [
  'ABS', 'AND', 'AVERAGE', 'AVERAGEIFS', 'CHOOSE', 'CHOOSECOLS', 'CLEAN', 'CONCAT',
  'COUNT', 'COUNTA', 'COUNTBLANK', 'COUNTIF', 'COUNTIFS', 'DATE', 'DAYS', 'EDATE',
  'EOMONTH', 'EXACT', 'FILTER', 'FIND', 'HSTACK', 'IF', 'IFERROR', 'IFNA', 'IFS',
  'INDEX', 'INT', 'IRR', 'ISBLANK', 'ISNUMBER', 'LAMBDA', 'LEFT', 'LEN', 'LET',
  'LOWER', 'MATCH', 'MAX', 'MEDIAN', 'MID', 'MIN', 'MONTH', 'NETWORKDAYS', 'NPV',
  'OR', 'PMT', 'PRODUCT', 'REPLACE', 'RIGHT', 'ROUND', 'SEARCH', 'SEQUENCE',
  'SORT', 'SORTBY', 'SUBSTITUTE', 'SUM', 'SUMIF', 'SUMIFS', 'SUMPRODUCT', 'TEXT',
  'TEXTJOIN', 'TEXTSPLIT', 'TODAY', 'TRANSPOSE', 'TRIM', 'UNIQUE', 'UPPER', 'VLOOKUP',
  'VSTACK', 'XLOOKUP', 'XMATCH', 'YEAR',
];
const googleSheetsNames = [...names, 'ARRAYFORMULA', 'ARRAY_CONSTRAIN'].sort();

export function excelSuggestions(formula: string, position: number, googleSheets = false) {
  const before = formula.slice(0, position);
  const token = before.startsWith('=') && !/"[^"]*$/.test(before.replace(/"(?:[^"]|"")*"/g, ''))
    ? before.match(/[A-Za-z][A-Za-z.]*$/)?.[0]?.toUpperCase() : undefined;
  const from = token ? position - token.length : position;
  const available = googleSheets ? googleSheetsNames : names;
  return {from, to: position, items: token ? available.filter(name => name.startsWith(token)).slice(0, 8)
    .map(label => ({label, insertText: label + '('})) : []};
}
