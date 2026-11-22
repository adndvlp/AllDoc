import initSQLite from '@sqlite.org/sqlite-wasm';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {createSQLiteEngine} from '../src/practice/adapters/sqlite/core.ts';
import {getPublishedSqlCurriculum} from '../src/content/sql/curriculum.ts';
import {publishedSqlMetadata} from '../src/content/sql/published.ts';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sqlite=await initSQLite({print(){},printErr(){}});const engine=createSQLiteEngine(sqlite);
try{
 engine.init(await createDatasetAdapter().materialize({id:'negocio-relacional',version:1},'sqlite-wasm',new AbortController().signal));
 let count=0,notesCount=0;
 for(const group of getPublishedSqlCurriculum()){
  const {notes}=await import('../src/content/notes/sql/'+group.key+'.ts');const outputs={};
  for(const note of notes){const m=publishedSqlMetadata.find(c=>c.id===note.conceptId);if(!m)throw new Error('Metadata ausente');
   for(const e of note.examples){
    // Cada programa empieza desde la misma semilla. El parser real acepta
    // varias sentencias, literales con ; y efectos DDL/DML sin dividir por regex.
    engine.reset();const events=[];
    engine.run({runId:'editorial-'+(++count),workspaceId:'editorial',generation:1,revision:1,entryFile:'consulta.sql',files:[{path:'consulta.sql',languageId:'sql',content:e.code}]},v=>events.push(v));
    const error=events.find(v=>v.type==='error');if(error)throw new Error(e.id+': '+error.message);
    const table=events.filter(v=>v.type==='table').at(-1);if(!table||table.truncated)throw new Error('Falta salida final completa: '+e.id);
    outputs[e.id]={columns:table.columns.map(c=>c.name),rows:table.rows.map(r=>r.map(v=>v===null?'NULL':String(v)))};
   }
   notesCount++;
   const filename=path.join(root,'docs',m.docId+'.mdx');await mkdir(path.dirname(filename),{recursive:true});
   await writeFile(filename,'---\nhide_table_of_contents: true\n---\n\nimport {SqlConceptCard} from \'@site/src/components/SqlNotes\';\nimport {notes} from \'@site/src/content/notes/sql/'+group.key+'\';\n\n<SqlConceptCard concept={notes.find(note => note.key === '+JSON.stringify(note.key)+')} />\n');
  }
  await writeFile(path.join(root,'src/content/notes/sql/results',group.key+'.ts'),(group.order<15?'// Salida de referencia: SQLite, negocio-relacional@1. Verificación WASM en tests/sql-first-block.test.ts.':'// Salida de referencia: SQLite WASM, negocio-relacional@1; semilla limpia por ejemplo.')+'\nexport default '+JSON.stringify(outputs,null,2)+';\n');
 }
 console.log('SQL: '+notesCount+' fichas preparadas; '+count+' salidas SQLite guardadas por grupo. Sin ejecutar otros RDBMS.');
}finally{engine.dispose();}
