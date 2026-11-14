import {test} from 'node:test';
import assert from 'node:assert/strict';
import {EditorState} from '@codemirror/state';
import {CompletionContext, type CompletionSource} from '@codemirror/autocomplete';
import {editorLanguage} from '../src/practice/editor-language.ts';
import {editorBootstrap, editorDataset} from '../src/practice/editor-bootstrap.ts';
import {resolvePracticeEditorContext} from '../src/practice/context.ts';

test('editor: semillas reproducibles y manifiestos SQLite/Pyodide fijados', async () => {
  for (const [tool, concept, filename] of [['sql', 'select', 'consulta.sql'], ['pandas', 'dataframe', 'main.py']]) {
    const context = resolvePracticeEditorContext(`/apuntes/analisis-de-datos/${tool}/${concept}`)!;
    const seed = await editorBootstrap(context);
    assert.equal(seed.workspace.id, context.workspaceKey); assert.equal(seed.workspace.activeFile, filename);
    if (tool === 'sql') {
      assert.equal(seed.environment?.runtime.id, 'sqlite-wasm');
      assert.match(seed.environment?.runtime.version ?? '', /^3\./);
      assert.equal(seed.workspace.environmentVersion, seed.environment?.version);
    } else {
      assert.equal(seed.environment?.runtime.id, 'pyodide');
      assert.equal(seed.workspace.environmentVersion, seed.environment?.version);
    }
    assert.equal(seed.schema.entities[0].rowCount, 3);
    assert.deepEqual(seed.schema.entities[0].columns, editorDataset.tables[0].columns);
    assert.match(seed.workspace.files[0].content, tool === 'sql' ? /SELECT \* FROM productos;/ : /pd.DataFrame/);
  }
});

test('editor: CodeMirror SQL sugiere tablas y columnas iniciales; Python completa variables locales', async () => {
  const sql = await editorBootstrap(resolvePracticeEditorContext('/apuntes/analisis-de-datos/sql/select')!);
  async function suggestions(languageId: string, doc: string) {
    const state = EditorState.create({doc, extensions: [await editorLanguage(languageId, sql.schema)]});
    const sources = state.languageDataAt<CompletionSource>('autocomplete', doc.length);
    const results = await Promise.all(sources.map((source) => source(new CompletionContext(state, doc.length, true))));
    return results.flatMap((result) => result?.options.map(({label}) => label) ?? []);
  }
  assert.ok((await suggestions('sql', 'SELECT * FROM pro')).includes('productos'));
  assert.ok((await suggestions('sql', 'SELECT productos.')).includes('nombre'));
  assert.ok((await suggestions('python', 'mi_tabla = 1\nmi_ta')).includes('mi_tabla'));
});
