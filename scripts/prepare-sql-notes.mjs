import {DatabaseSync} from 'node:sqlite';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {businessDataset} from '../src/practice/datasets/rows/business.ts';
import {sqlSeedFor} from '../src/practice/datasets/materialize.ts';
import {sqlCurriculum} from '../src/content/sql/curriculum.ts';
import {publishedSqlMetadata} from '../src/content/sql/published.ts';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const db=new DatabaseSync(':memory:');
try{
 db.exec('PRAGMA foreign_keys=ON;');for(const s of sqlSeedFor(businessDataset).statements)db.prepare(s.sql).run(...s.parameters);
 let count=0;
 for(const group of sqlCurriculum.slice(0,14)){
  const {notes}=await import('../src/content/notes/sql/'+group.key+'.ts');const outputs={};
  for(const note of notes){const m=publishedSqlMetadata.find(c=>c.id===note.conceptId);if(!m)throw new Error('Metadata ausente');
   for(const e of note.examples){const stmt=db.prepare(e.code);const columns=stmt.columns().map(c=>c.name);outputs[e.id]={columns,rows:stmt.all().map(r=>columns.map(c=>r[c]===null?'NULL':String(r[c])))};count++;}
   const filename=path.join(root,'docs',m.docId+'.mdx');await mkdir(path.dirname(filename),{recursive:true});
   await writeFile(filename,'---\nhide_table_of_contents: true\n---\n\nimport {SqlConceptCard} from \'@site/src/components/SqlNotes\';\nimport {notes} from \'@site/src/content/notes/sql/'+group.key+'\';\n\n<SqlConceptCard concept={notes.find(note => note.key === '+JSON.stringify(note.key)+')} />\n');
  }
  await writeFile(path.join(root,'src/content/notes/sql/results',group.key+'.ts'),'// Salida de referencia: SQLite, negocio-relacional@1. Verificación WASM en tests/sql-first-block.test.ts.\nexport default '+JSON.stringify(outputs,null,2)+';\n');
 }
 console.log('SQL: 53 fichas preparadas; '+count+' salidas SQLite guardadas por grupo. Sin ejecutar otros RDBMS.');
}finally{db.close();}
