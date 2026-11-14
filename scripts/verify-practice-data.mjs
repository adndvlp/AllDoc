import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {getPandasConcept} from '../src/content/notes/pandas.ts';

// Verificación nativa adicional; no instala Python ni paquetes en el runtime web.
const note = getPandasConcept('analisis-de-datos/pandas/dataframe');
assert.ok(note, 'Falta el miniapunte pandas');
const data = await createDatasetAdapter().materialize({id: 'productos-basico', version: 1}, 'pyodide', new AbortController().signal);
const code = String.raw`
import ast, base64, json, os, pathlib, sys, tempfile
import pandas as pd
payload = json.load(sys.stdin)
expected = [['Teclado', 'Accesorios', 500], ['Mouse', 'Accesorios', 250], ['Monitor', 'Pantallas', 3500]]
with tempfile.TemporaryDirectory(prefix='alldoc-pandas-') as directory:
    os.chdir(directory)
    for item in payload['files']:
        path = pathlib.Path(item['path'])
        assert not path.is_absolute() and '..' not in path.parts
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(base64.b64decode(item['bytes']))
    prepared = {}
    exec(payload['bootstrap'], prepared)
    assert prepared['productos'].values.tolist() == expected
    assert prepared['productos']['precio'].dtype.kind in 'iu'
    prepared['productos'].loc[0, 'precio'] = -1
    restored = {}
    exec(payload['bootstrap'], restored)
    assert restored['productos'].values.tolist() == expected
    tree = ast.parse(payload['code'])
    assert isinstance(tree.body[-1], ast.Expr)
    scope = {}
    exec(compile(ast.Module(body=tree.body[:-1], type_ignores=[]), '<apunte>', 'exec'), scope)
    result = eval(compile(ast.Expression(tree.body[-1].value), '<apunte>', 'eval'), scope)
    assert isinstance(result, pd.DataFrame)
    assert result.values.tolist() == expected
    assert list(result.columns) == ['nombre', 'categoria', 'precio']
    assert list(result.index) == [0, 1, 2]
    assert result['precio'].dtype.kind in 'iu'
    assert [[str(value) for value in row] for row in result.values.tolist()] == payload['output']['rows']
print(json.dumps({'status': 'passed', 'python': sys.version.split()[0], 'pandas': pd.__version__, 'rows': len(result), 'priceType': str(result['precio'].dtype), 'checks': ['bootstrap', 'reset', 'example', 'columns', 'index', 'numeric-price', 'editorial-output']}))
`;
const result = spawnSync('python3', ['-c', code], {encoding: 'utf8', input: JSON.stringify({
  bootstrap: data.bootstrap, files: data.files.map((file) => ({path: file.path, bytes: Buffer.from(file.bytes).toString('base64')})),
  code: note.examples[0].code, output: note.examples[0].output,
})});
if (result.error) throw new Error('La verificación nativa requiere python3 y pandas: ' + result.error.message);
if (result.status !== 0) throw new Error('Falló la verificación Python/pandas:\n' + result.stderr.slice(-2500));
console.log(result.stdout.trim());
