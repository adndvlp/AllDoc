import {after, test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {sqlConcepts} from '../src/content/sql.ts';

const database = new DatabaseSync(':memory:');
database.exec("CREATE TABLE productos (nombre TEXT, categoria TEXT, precio INTEGER); INSERT INTO productos VALUES ('Teclado', 'Accesorios', 500), ('Mouse', 'Accesorios', 250), ('Monitor', 'Pantallas', 3500);");
after(() => database.close());

for (const concept of sqlConcepts) {
  for (const example of concept.examples) {
    test(concept.title + ' / ' + example.title + ': resultado correcto', () => {
      const result = database.prepare(example.code).all();
      const rows = result.map((row) => example.output.columns.map((column) => String(row[column])));
      assert.deepEqual(rows, example.output.rows);
      assert.deepEqual(Object.keys(result[0] ?? {}), example.output.columns);
    });
  }
}
