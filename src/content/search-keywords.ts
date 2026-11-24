import {concepts,type ConceptId} from './concepts.ts';
import {pandasKeywords} from './pandas-search-keywords.ts';
import {jsonKeywords} from './json-search-keywords.ts';
import {numpyKeywords} from './numpy-search-keywords.ts';
import {scipyKeywords} from './scipy-search-keywords.ts';
import {matplotlibKeywords} from './matplotlib-search-keywords.ts';
import {seabornKeywords} from './seaborn-search-keywords.ts';
import {excelKeywords} from './excel-search-keywords.ts';
import {googleSheetsKeywords} from './google-sheets-search-keywords.ts';
import {rKeywords} from './r-search-keywords.ts';
import {sqlalchemyKeywords} from './sqlalchemy-search-keywords.ts';
import {sqlite3Keywords} from './sqlite3-search-keywords.ts';
import {openpyxlKeywords} from './openpyxl-search-keywords.ts';
import {requestsKeywords} from './requests-search-keywords.ts';
import {httpxKeywords} from './httpx-search-keywords.ts';
import {mysqlConnectorPythonKeywords} from './mysql-connector-python-search-keywords.ts';
import {psycopgKeywords} from './psycopg-search-keywords.ts';
import {dbtKeywords} from './dbt-search-keywords.ts';
import {powerQueryKeywords} from './power-query-search-keywords.ts';
import {pysparkKeywords} from './pyspark-search-keywords.ts';
import {airflowKeywords} from './airflow-search-keywords.ts';
import {snowflakeKeywords} from './snowflake-search-keywords.ts';
import {powerbiKeywords} from './powerbi-search-keywords.ts';
import {tableauKeywords} from './tableau-search-keywords.ts';

const legacy:Readonly<Record<string,readonly string[]>> = {
  'analisis-de-datos/sql/select': ['elegir', 'seleccionar', 'columnas', 'mostrar', 'consultar', 'tabla', 'from', 'origen', 'asterisco', 'todas', 'varias', 'coma', 'especificas', 'productos', 'nombre', 'precio', 'negocio'],
  'analisis-de-datos/sql/where': ['filtrar', 'filtro', 'condicion', 'condición', 'mayor', 'igual', 'filas', 'precio', 'productos'],
  'analisis-de-datos/sql/order-by': ['ordenar', 'orden', 'ascendente', 'descendente', 'asc', 'desc', 'precio', 'barato', 'caro'],
  'analisis-de-datos/sql/limit': ['limitar', 'maximo', 'máximo', 'cantidad', 'primeros', 'cinco', 'tres', '5', '3', 'filas', 'productos'],
  'analisis-de-datos/sql/comentarios': ['comentario', 'comentarios', 'notas', 'anotar', 'documentar', 'guiones', 'bloque', 'linea', 'línea', '--', '/*', '*/'],
  'analisis-de-datos/pandas/dataframe': ['crear', 'tabla', 'pandas', 'python', 'dataframe', 'columnas', 'filas', 'listas', 'productos', 'datos'],
};
// Nombres equivalentes llevan a la misma identidad, favorito y sesión SQL.
const sqlAliases:Readonly<Record<string,readonly string[]>>={
 'text-functions/length':['LENGTH','CHAR_LENGTH','CHARACTER_LENGTH','LEN'],
 'text-functions/substring':['SUBSTR','SUBSTRING'],
 'text-functions/concat':['CONCAT','concatenar'],
 'aggregation/string-aggregate':['GROUP_CONCAT','STRING_AGG','LISTAGG'],
 'insert/ignore':['INSERT OR IGNORE','INSERT IGNORE','ON CONFLICT','DO NOTHING'],
 'insert/replace':['INSERT OR REPLACE','REPLACE INTO'],
 'create-table/primary-key':['IDENTITY','AUTO_INCREMENT','GENERATED ALWAYS','autoincremento'],
 'alter-table/rename-column':['sp_rename','RENAME COLUMN'],
 'alter-table/rename-table':['sp_rename','RENAME TABLE'],
 'indexes/consultar':['pg_indexes','sys.indexes','USER_INDEXES','information_schema.statistics'],
 'except/equivalentes':['MINUS','EXCEPT'],
 'transactions/begin':['START TRANSACTION','BEGIN TRANSACTION'],
};
export const searchKeywords = Object.fromEntries(concepts.map(concept => [concept.id,
  legacy[concept.id] ?? excelKeywords[concept.id] ?? googleSheetsKeywords[concept.id] ?? rKeywords[concept.id] ?? pandasKeywords[concept.id] ?? openpyxlKeywords[concept.id] ?? numpyKeywords[concept.id]
  ?? scipyKeywords[concept.id] ?? matplotlibKeywords[concept.id] ?? seabornKeywords[concept.id]
  ?? sqlalchemyKeywords[concept.id] ?? sqlite3Keywords[concept.id]
    ?? mysqlConnectorPythonKeywords[concept.id] ?? psycopgKeywords[concept.id] ?? jsonKeywords[concept.id]
    ?? requestsKeywords[concept.id] ?? httpxKeywords[concept.id] ?? dbtKeywords[concept.id] ?? powerQueryKeywords[concept.id]
    ?? pysparkKeywords[concept.id] ?? airflowKeywords[concept.id] ?? snowflakeKeywords[concept.id] ?? powerbiKeywords[concept.id]
    ?? tableauKeywords[concept.id]
    ?? [concept.title, concept.label, concept.description,
    ...(sqlAliases[concept.id.replace('analisis-de-datos/sql/', '')] ?? [])],
])) as Record<ConceptId, readonly string[]>;
