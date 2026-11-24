import {mkdir, readFile, writeFile} from 'node:fs/promises';

export const fence = String.fromCharCode(96).repeat(3);

function field(text, label) {
  return text.match(new RegExp(`^\\*\\*${label}\\*\\* (.+)$`, 'm'))?.[1].trim();
}

function keyFor(text, context) {
  const key = field(text, 'Clave')?.slice(1, -1);
  if (!key || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key)) throw new Error(`Clave inválida en ${context}`);
  return key;
}

export function parseTextExample(part, id, resultHeading) {
  const [header, ...body] = part.trimEnd().split('\n');
  const pattern = new RegExp(
    '^' + fence + 'python\n([\\s\\S]+?)\n' + fence
    + '\n([\\s\\S]+?)^\\*\\*(' + resultHeading + ')\\*\\*\n+' + fence
    + 'text\n([\\s\\S]+?)\n' + fence + '$', 'm',
  );
  const match = body.join('\n').match(pattern);
  if (!match) throw new Error('Ejemplo incompleto en ' + id);
  const [, code, hint, heading, textOutput] = match;
  return {title: header.slice(5), code, hint: hint.trim(), heading, textOutput};
}

const inlineResult = new RegExp(
  '^' + fence + '(python|json|bash)\n([\\s\\S]+?)\n' + fence
  + '\n([\\s\\S]+?)^\\*\\*Resultado esperado\\*\\* (.+)$', 'm',
);
export function parseInlineExample(part, id) {
  const [header, ...body] = part.trimEnd().split('\n');
  const match = body.join('\n').trimStart().match(inlineResult);
  if (!match) throw new Error('Ejemplo incompleto en ' + id);
  const [, language, code, hint, textOutput] = match;
  return {id, title: header.slice(5), language, code, hint: hint.trim(), textOutput,
    resultLabel: 'Ver resultado esperado'};
}

export function parseCourse(markdown, tool, parseExample, keywordSeparator = /,\s*/) {
  const prefix = 'analisis-de-datos/' + tool;
  const sections = markdown.replaceAll('\r\n', '\n').split(/(?=^## )/m).slice(1);
  const data = sections.shift();
  const sources = sections.pop();
  const bootstrap = data?.match(new RegExp(`${fence}python\n([\\s\\S]+?)\n${fence}`))?.[1];
  if (!data?.startsWith('## Datos compartidos\n') || !sources?.startsWith('## Fuentes\n') || !bootstrap) {
    throw new Error('Faltan los datos compartidos o las fuentes de ' + tool);
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
      const keywords = field(summary, 'Búsqueda')?.split(keywordSeparator);
      const remember = field(summary, 'Para recordar');
      const note = field(summary, 'Nota');
      if (noteKeys.has(leaf) || !label || !description || !keywords?.length || !remember || !examples.length) {
        throw new Error(`Ficha duplicada o incompleta: ${id}`);
      }
      noteKeys.add(leaf);
      return {meta: {id, label, description, keywords}, body: {id, remember, ...(note ? {note} : {}),
        examples: examples.map((example, index) => parseExample(example, `${tool}/${key}/${leaf}/${index + 1}`, note))}};
    });
    if (children[0]?.meta.label !== 'Definición') throw new Error(`Falta Definición inicial en ${key}`);
    return {key, label, children};
  });
  return {groups, bootstrap};
}

export async function emitCourse({tool, component, dataset, parse, check}) {
  const {groups, bootstrap} = parse(await readFile(new URL('../../specs/' + tool + '.md', import.meta.url), 'utf8'));
  const generated = `// Generado desde specs/${tool}.md por scripts/prepare-${tool}-notes.mjs.\n`;
  const exportName = dataset.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()) + 'Bootstrap';
  async function emit(name, content) {
    const path = new URL('../../' + name, import.meta.url);
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
  await emit(`src/content/${tool}-curriculum.ts`, generated + `export const ${tool}Curriculum = ` + JSON.stringify(curriculum, null, 2) + ';\n');
  await emit(`src/content/${tool}-search-keywords.ts`, generated + `export const ${tool}Keywords: Readonly<Record<string, readonly string[]>> = ` + JSON.stringify(keywords, null, 2) + ';\n');
  await emit(`src/practice/datasets/rows/${dataset}.ts`, generated + `export const ${exportName} = ` + JSON.stringify(bootstrap) + ';\n');
  await emit(`static/practice/${tool}/datos.py`, bootstrap + '\n');
  for (const group of groups) {
    await emit(`src/content/notes/${tool}/${group.key}.ts`, generated + 'export const notes = ' + JSON.stringify(group.children.map(({body}) => body), null, 2) + ';\n');
    for (const {meta} of group.children) {
      const mdx = `---\nhide_table_of_contents: true\n---\n\nimport {${component}CourseCard} from '@site/src/components/${component}Notes';\nimport {notes} from '@site/src/content/notes/${tool}/${group.key}';\n\n<${component}CourseCard note={notes.find(note => note.id === ${JSON.stringify(meta.id)})} />\n`;
      await emit(`docs/${meta.id}.mdx`, mdx);
    }
  }
  return groups.reduce((count, group) => count + group.children.length, 0);
}
