import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import {catalog, getTopics, buildCatalog, countConcepts, type AreaDefinition} from '../src/content/catalog.ts';
import {areas} from '../src/content/areas.ts';
import {concepts, getConcept, getConceptsForTopic, docsBasePath, type ConceptMeta} from '../src/content/concepts.ts';
import {entries, buildSearchIndex} from '../src/content/search-index.ts';
import {searchKeywords} from '../src/content/search-keywords.ts';
import {getSqlConcept, sqlConcepts} from '../src/content/sql.ts';
import {createSidebars} from '../src/lib/catalog-sidebar.ts';
import {parseConceptFrontMatter} from '../src/lib/concept-front-matter.ts';
import {searchEntries} from '../src/lib/search.ts';

test('el catálogo conserva tres áreas, diecinueve herramientas y los cinco grupos en su orden', () => {
  assert.deepEqual(catalog.map((area) => area.id), ['analisis-de-datos', 'desarrollo-web', 'ia']);
  assert.deepEqual(getTopics('analisis-de-datos').map((topic) => topic.label), [
    'Excel', 'Power Query', 'SQL', 'Pandas', 'openpyxl', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn',
    'SQLAlchemy', 'sqlite3', 'mysql-connector-python', 'psycopg', 'requests', 'httpx', 'json', 'R', 'Power BI', 'Tableau',
  ]);
  const groups = catalog[0].items.filter((item) => item.kind === 'group');
  assert.deepEqual(groups.map((group) => [group.label, group.items.map((topic) => topic.label)]), [
    ['Tablas y archivos', ['Pandas', 'openpyxl']],
    ['Cálculo científico', ['NumPy', 'SciPy']],
    ['Visualización', ['Matplotlib', 'Seaborn']],
    ['Conexiones SQL', ['SQLAlchemy', 'sqlite3', 'mysql-connector-python', 'psycopg']],
    ['Peticiones y formatos', ['requests', 'httpx', 'json']],
  ]);
  assert.deepEqual(catalog[0].items.filter((item) => item.kind === 'topic').map((item) => item.label), ['Excel', 'Power Query', 'SQL', 'R', 'Power BI', 'Tableau']);
  assert.deepEqual(areas.map((area) => [area.status, area.available]), [['SQL, Pandas · 154 conceptos', true], ['Por explorar', false], ['Por explorar', false]]);
  assert.deepEqual(catalog.map((area) => countConcepts(area.items)), [154, 0, 0]);
  assert.equal(countConcepts(catalog[0].items.filter((item) => item.kind === 'group')), 1);
});

test('el sidebar deriva del catálogo, conserva categorías contraídas y solo enlaza conceptos', () => {
  const sidebars = createSidebars(catalog);
  assert.deepEqual(Object.keys(sidebars), ['analisisDeDatos']);
  const items = sidebars.analisisDeDatos;
  assert.deepEqual(items.map((item) => item.label), catalog[0].items.map((item) => item.label));
  const check = (item: (typeof items)[number]) => {
    assert.equal(item.collapsed, true);
    assert.equal(item.collapsible, true);
    assert.equal(item.link, undefined);
    assert.ok(Array.isArray(item.items));
    for (const child of item.items) {
      if (typeof child === 'object' && child.type === 'category') check(child);
    }
  };
  items.forEach(check);
  assert.deepEqual(items.find((item) => item.label === 'SQL')?.items, getConceptsForTopic('analisis-de-datos', 'sql').map((concept) => concept.docId??concept.id));
  const files = items.find((item) => item.label === 'Tablas y archivos')!;
  assert.ok(Array.isArray(files.items));
  const pandas = files.items.find((item) => typeof item === 'object' && item.type === 'category' && item.label === 'Pandas');
  assert.ok(pandas && typeof pandas === 'object' && pandas.type === 'category');
  assert.deepEqual(pandas.items, ['analisis-de-datos/pandas/dataframe']);
  assert.deepEqual(items[0].items, [{type: 'html', value: '<span class="sidebar-empty-note">Sin apuntes todavía</span>', defaultStyle: false}]);
});

test('metadata, páginas MDX, palabras clave y cuerpos tienen los mismos conceptos e IDs únicos', async () => {
  assert.equal(new Set(concepts.map((concept) => concept.id)).size, concepts.length);
  assert.equal(new Set(concepts.map((concept) => concept.slug)).size, concepts.length);
  assert.deepEqual(Object.keys(searchKeywords).sort(), concepts.map((concept) => concept.id).sort());
  assert.deepEqual(sqlConcepts.map((concept) => concept.conceptId), getConceptsForTopic('analisis-de-datos', 'sql').map((concept) => concept.id));
  for (const concept of concepts) {
    assert.equal(concept.slug, docsBasePath + '/' + concept.id);
    assert.ok(concept.id.startsWith(concept.areaId + '/' + concept.topicId + '/'));
    assert.equal(getConcept(concept.id), concept);
    const mdx = await readFile(path.join('docs', ('docId' in concept&&concept.docId||concept.id) + '.mdx'), 'utf8');
    assert.doesNotMatch(mdx, /^(?:title|description|sidebar_label|sidebar_position):/m);
    if (concept.areaId === 'analisis-de-datos' && concept.topicId === 'sql') {
      assert.ok(mdx.includes('SqlConceptCard concept={notes.find'));
      assert.ok(mdx.includes(getSqlConcept(concept.id)!.key));
      assert.equal(getSqlConcept(concept.id), getSqlConcept(concept.id.slice('analisis-de-datos/sql/'.length)));
      assert.equal(getSqlConcept(concept.id)?.description, concept.description);
    }
  }
  const files = (await readdir('docs/analisis-de-datos/sql',{recursive:true})).filter((name) => name.endsWith('.mdx'));
  assert.deepEqual(files.sort(), getConceptsForTopic('analisis-de-datos', 'sql').map((concept) => (concept.docId??concept.id).slice('analisis-de-datos/sql/'.length) + '.mdx').sort());
  assert.equal(getConcept('desconocido'), undefined);
  assert.equal(getSqlConcept('desconocido'), undefined);
});

test('el índice real conserva rutas y búsquedas y no contiene secciones vacías o el repaso eliminado', () => {
  assert.deepEqual(entries.map((entry) => entry.id), concepts.map((concept) => concept.id));
  for (const entry of entries) {
    const metadata = getConcept(entry.id)!;
    assert.equal(entry.href, metadata.slug);
    assert.equal(entry.title, metadata.title);
    assert.equal(entry.description, metadata.description);
    assert.equal(entry.context, 'Análisis de datos / ' + (metadata.topicId === 'sql' ? 'SQL' : 'Pandas'));
  }
  for (const [query, id] of [['filtrar', 'where'], ['ORDENAR', 'order-by'], ['máximo', 'limit'], ['--', 'comentarios'], ['/*', 'comentarios']]) {
    assert.equal(searchEntries(entries, query)[0]?.id, 'analisis-de-datos/sql/' + id);
  }
  assert.ok(!JSON.stringify(entries).includes('/repaso'));
  assert.deepEqual(searchEntries(entries, 'Excel'), []);
  assert.doesNotMatch(JSON.stringify(catalog), /SELECT \* FROM productos|WHERE precio >=|"examples"|"output"/);
});

const otherAreas: AreaDefinition[] = [
  {id: 'analisis-de-datos', sidebarId: 'datos', number: '01', title: 'Análisis de datos', description: '', icon: 'data', items: [{kind: 'topic', id: 'excel', label: 'Excel'}]},
  {id: 'desarrollo-web', sidebarId: 'web', number: '02', title: 'Desarrollo web', description: '', icon: 'web', items: [{kind: 'topic', id: 'react', label: 'React'}]},
  {id: 'ia', sidebarId: 'ia', number: '03', title: 'IA', description: '', icon: 'ai', items: [{kind: 'topic', id: 'modelos', label: 'Modelos'}]},
];
const otherConcepts: ConceptMeta[] = [
  {id: 'analisis-de-datos/excel/inicio', areaId: 'analisis-de-datos', topicId: 'excel', slug: '/apuntes/analisis-de-datos/excel/inicio', title: 'Inicio', label: '', description: 'Una hoja.', order: 1},
  {id: 'desarrollo-web/react/estado', areaId: 'desarrollo-web', topicId: 'react', slug: '/apuntes/desarrollo-web/react/estado', title: 'Estado', label: '', description: 'Guardar un valor.', order: 2},
  {id: 'desarrollo-web/react/inicio', areaId: 'desarrollo-web', topicId: 'react', slug: '/apuntes/desarrollo-web/react/inicio', title: 'Inicio', label: '', description: 'Un componente.', order: 1},
  {id: 'ia/modelos/inicio', areaId: 'ia', topicId: 'modelos', slug: '/apuntes/ia/modelos/inicio', title: 'Inicio', label: '', description: 'Un modelo.', order: 1},
];

test('catálogo, sidebar y búsqueda admiten conceptos en cualquier área sin depender de SQL', () => {
  const expanded = buildCatalog(otherAreas, otherConcepts);
  assert.deepEqual(expanded.map((area) => countConcepts(area.items)), [1, 2, 1]);
  const index = buildSearchIndex(expanded, {'desarrollo-web/react/estado': ['recordar']});
  assert.deepEqual(index.map((entry) => entry.id), [otherConcepts[0].id, otherConcepts[2].id, otherConcepts[1].id, otherConcepts[3].id]);
  assert.deepEqual(index.map((entry) => entry.context), ['Análisis de datos / Excel', 'Desarrollo web / React', 'Desarrollo web / React', 'IA / Modelos']);
  assert.equal(new Set(index.filter((entry) => entry.title === 'Inicio').map((entry) => entry.id)).size, 3);
  assert.equal(searchEntries(index, 'recordar')[0]?.id, 'desarrollo-web/react/estado');
  assert.deepEqual(createSidebars(expanded).web[0].items, ['desarrollo-web/react/inicio', 'desarrollo-web/react/estado']);
});

test('el catálogo rechaza conceptos huérfanos e IDs repetidos antes de publicar enlaces inválidos', () => {
  assert.throws(() => buildCatalog([], otherConcepts), /sin área o herramienta/);
  assert.throws(() => buildCatalog(otherAreas, [otherConcepts[0], otherConcepts[0]]), /concepto duplicados/);
  assert.throws(() => buildCatalog([otherAreas[0], otherAreas[0]], []), /área duplicados/);
  const duplicate = {...otherAreas[0], items: [otherAreas[0].items[0], otherAreas[0].items[0]]};
  assert.throws(() => buildCatalog([duplicate], []), /catálogo duplicado/);
});

test('Docusaurus recibe la metadata canónica conservando contenido, opciones y descripciones SEO', async () => {
  const parsed = {content: 'Contenido MDX', frontMatter: {hide_table_of_contents: true, custom: 'conservar'}};
  for (const concept of concepts) {
    const result = await parseConceptFrontMatter({filePath: path.resolve('docs', ('docId' in concept&&concept.docId||concept.id) + '.mdx'), fileContent: 'original', defaultParseFrontMatter: async () => parsed});
    const siblings = getConceptsForTopic(concept.areaId, concept.topicId);
    const position = siblings.findIndex(({id}) => id === concept.id);
    assert.equal(result.content, parsed.content);
    assert.deepEqual(result.frontMatter, {
      ...parsed.frontMatter,
      title: concept.title, sidebar_label: concept.title, sidebar_position: concept.order,
      description: ('seoDescription' in concept ? concept.seoDescription : concept.description),
      slug: concept.slug.slice(docsBasePath.length),
      pagination_prev: siblings[position - 1]?.docId??siblings[position - 1]?.id ?? null,
      pagination_next: siblings[position + 1]?.docId??siblings[position + 1]?.id ?? null,
    });
  }
  assert.deepEqual(parsed.frontMatter, {hide_table_of_contents: true, custom: 'conservar'});
  for (const filePath of ['docs/analisis-de-datos/index.mdx', 'docs/desarrollo-web/index.mdx', 'docs/ia/index.mdx', '/private/tmp/analisis-de-datos/sql/select.mdx']) {
    assert.equal(await parseConceptFrontMatter({filePath, fileContent: '', defaultParseFrontMatter: async () => parsed}), parsed);
  }
});
