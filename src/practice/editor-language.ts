import type {Extension} from '@codemirror/state';
import type {RuntimeSchema} from './contracts.ts';
import type {CompletionSource} from '@codemirror/autocomplete';

export async function editorLanguage(languageId: string, schema: RuntimeSchema, semantic?: CompletionSource): Promise<Extension> {
  if (languageId === 'sql') {
    const [{sql,SQLite,schemaCompletionSource},{sqlSchemaCompletion}]=await Promise.all([
      import(/* webpackChunkName: "practice-sql-language" */ '@codemirror/lang-sql'),
      import(/* webpackChunkName: "practice-sql-language" */ './sql-completion.ts'),
    ]);
    const tables=Object.fromEntries(schema.entities.map(entity=>[entity.name,entity.columns.map(({name})=>name)]));
    return [sql({dialect:SQLite,upperCaseKeywords:true}),SQLite.language.data.of({
      autocomplete:sqlSchemaCompletion(schema,schemaCompletionSource({dialect:SQLite,schema:tables})),
    })];
  }
  if (languageId === 'python') {
    const {python, pythonLanguage, localCompletionSource} = await import(/* webpackChunkName: "practice-python-language" */ '@codemirror/lang-python');
    return [python(), pythonLanguage.data.of({autocomplete: localCompletionSource}),
      ...(semantic ? [pythonLanguage.data.of({autocomplete: semantic})] : [])];
  }
  return [];
}
