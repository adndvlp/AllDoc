import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {businessDataset} from '../src/practice/datasets/rows/business.ts';
import {exportSqlDataset} from '../src/practice/datasets/export-sql.ts';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const directory=path.join(root,'static/sql/datasets/negocio-relacional-1');await mkdir(directory,{recursive:true});
for(const dialect of ['sqlite','postgresql','mysql','sqlserver','mariadb','oracle'])await writeFile(path.join(directory,dialect+'.sql'),exportSqlDataset(businessDataset,dialect));
console.log('Seis scripts estáticos preparados: negocio-relacional@1. Sin conexiones externas.');
