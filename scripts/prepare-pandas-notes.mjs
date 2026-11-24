import {mkdir, readFile, writeFile} from 'node:fs/promises';

const source = new URL('../specs/pandas.md', import.meta.url);
const prefix = 'analisis-de-datos/pandas';
const generated = '// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.\n';
const fence = String.fromCharCode(96).repeat(3);

function field(text, label) {
  return text.match(new RegExp(`^\\*\\*${label}\\*\\* (.+)$`, 'm'))?.[1].trim();
}

function keyFor(text, context) {
  const key = field(text, 'Clave')?.slice(1, -1);
  if (!key || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key)) throw new Error(`Clave inválida en ${context}`);
  return key;
}

function parseExample(part, id, note) {
  const [header, ...body] = part.trimEnd().split('\n');
  const text = body.join('\n');
  const matches = text.match(new RegExp(`${fence}python\n([\\s\\S]+?)\n${fence}\n([\\s\\S]+?)^\\*\\*Resultado (comprobado|esperado)\\*\\*\n+${fence}text\n([\\s\\S]+?)\n${fence}$`, 'm'));
  if (!matches) throw new Error(`Ejemplo incompleto en ${id}`);
  const [, sourceCode, hint, status, result] = matches;
  // Pyodide lleva pytz, mientras que sus datos de zona IANA se distribuyen aparte.
  const nativeZone = ".tz_localize('America/Mexico_City')";
  const code = id === 'pandas/series-temporales/zonas-horarias/1' && sourceCode.includes(nativeZone)
    ? 'from pytz import timezone\n\n' + sourceCode.replace(nativeZone, ".tz_localize(timezone('America/Mexico_City'))")
    : sourceCode;
  return {id, title: header.slice(5), code, hint: hint.trim(), textOutput: result,
    resultLabel: status === 'comprobado' ? 'Ver resultado en pandas 2.2.3' : 'Ver resultado esperado',
    ...(note?.startsWith('Requiere ') ? {external: true} : {})};
}

export function parsePandasSource(markdown) {
  const sections = markdown.replaceAll('\r\n', '\n').split(/(?=^## )/m).slice(1);
  const data = sections.shift();
  const sources = sections.pop();
  const bootstrap = data?.match(new RegExp(`${fence}python\n([\\s\\S]+?)\n${fence}`))?.[1];
  if (!data?.startsWith('## Datos compartidos\n') || !sources?.startsWith('## Fuentes\n') || !bootstrap) {
    throw new Error('Faltan los datos compartidos o las fuentes de pandas');
  }
  const groupKeys = new Set();
  const groups = sections.map(section => {
    const [header, ...parts] = section.split(/(?=^### )/m);
    const label = header.split('\n')[0].slice(3);
    const key = keyFor(header, label);
    if (groupKeys.has(key)) throw new Error(`Grupo repetido: ${key}`);
    groupKeys.add(key);
    const noteKeys = new Set();
    const children = parts.map(part => {
      const [summary, ...examples] = part.split(/(?=^#### )/m);
      const leaf = keyFor(summary, key);
      const id = `${prefix}/${key}/${leaf}`;
      const label = summary.split('\n')[0].slice(4);
      const description = field(summary, 'Definición');
      const keywords = field(summary, 'Búsqueda')?.split(/,\s*/);
      const remember = field(summary, 'Para recordar');
      const note = field(summary, 'Nota');
      if (noteKeys.has(leaf) || !label || !description || !keywords?.length || !remember || !examples.length) {
        throw new Error(`Ficha duplicada o incompleta: ${id}`);
      }
      noteKeys.add(leaf);
      return {meta: {id, label, description, keywords}, body: {id, remember, ...(note ? {note} : {}),
        examples: examples.map((example, index) => parseExample(example, `pandas/${key}/${leaf}/${index + 1}`, note))}};
    });
    if (children[0]?.meta.label !== 'Definición') throw new Error(`Falta Definición inicial en ${key}`);
    return {key, label, children};
  });
  return {groups, bootstrap};
}

export async function preparePandasNotes({check = false} = {}) {
  const {groups, bootstrap} = parsePandasSource(await readFile(source, 'utf8'));
  async function emit(name, content) {
    const path = new URL('../' + name, import.meta.url);
    if (check) {
      if (await readFile(path, 'utf8') !== content) throw new Error(`Archivo desactualizado: ${name}`);
      return;
    }
    await mkdir(new URL('.', path), {recursive: true});
    await writeFile(path, content);
  }
  const curriculum = groups.map(({key, label, children}) => ({key, label,
    children: children.map(({meta: {id, label, description}}) => ({id, label, description})),
  }));
  const keywords = Object.fromEntries(groups.flatMap(group => group.children.map(({meta}) => [meta.id, meta.keywords])));
  await emit('src/content/pandas-curriculum.ts', generated + 'export const pandasCurriculum = ' + JSON.stringify(curriculum, null, 2) + ';\n');
  await emit('src/content/pandas-search-keywords.ts', generated + 'export const pandasKeywords: Readonly<Record<string, readonly string[]>> = ' + JSON.stringify(keywords, null, 2) + ';\n');
  await emit('src/practice/datasets/rows/pandas-commerce.ts', generated + 'export const pandasCommerceBootstrap = ' + JSON.stringify(bootstrap) + ';\n');
  await emit('static/practice/pandas/datos.py', bootstrap + '\n');
  for (const group of groups) {
    await emit(`src/content/notes/pandas/${group.key}.ts`, generated + 'export const notes = ' + JSON.stringify(group.children.map(({body}) => body), null, 2) + ';\n');
    for (const {meta} of group.children) {
      const mdx = `---\nhide_table_of_contents: true\n---\n\nimport {PandasCourseCard} from '@site/src/components/PandasNotes';\nimport {notes} from '@site/src/content/notes/pandas/${group.key}';\n\n<PandasCourseCard note={notes.find(note => note.id === ${JSON.stringify(meta.id)})} />\n`;
      await emit(`docs/${meta.id}.mdx`, mdx);
    }
  }
  return groups.reduce((count, group) => count + group.children.length, 0);
}

if (import.meta.main) {
  const count = await preparePandasNotes({check: process.argv.includes('--check')});
  console.log(`pandas: ${count} fichas cotejadas con specs/pandas.md.`);
}
