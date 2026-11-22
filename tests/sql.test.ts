import {after, test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {sqlConcepts} from '../src/content/sql.ts';
import {businessDataset} from '../src/practice/datasets/rows/business.ts';
import {sqlSeedFor} from '../src/practice/datasets/materialize.ts';

const database = new DatabaseSync(':memory:');
database.exec('PRAGMA foreign_keys=ON;');
for(const s of sqlSeedFor(businessDataset).statements)database.prepare(s.sql).run(...s.parameters);
after(() => database.close());

// Primer bloque, consultas de una sentencia. Los programas DDL/DML se verifican
// completos y desde semilla limpia en sql-second-block.test.ts con SQLite WASM.
for (const concept of sqlConcepts.filter(c=>c.order<1500)) {
  for (const example of concept.examples) {
    test(concept.title + ' / ' + example.title + ': resultado correcto', () => {
      const statement=database.prepare(example.code);const result = statement.all();
      const rows = result.map((row) => example.output.columns.map((column) => row[column]===null?'NULL':String(row[column])));
      assert.deepEqual(rows, example.output.rows);
      assert.deepEqual(statement.columns().map(c=>c.name), example.output.columns);
    });
  }
}
