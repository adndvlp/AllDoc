import type {SqlConceptPlan,SqlGroupPlan} from './contracts.ts';

type Leaf = readonly [key:string,label:string,feature?:string];
type Group = readonly [key:string,label:string,children:readonly Leaf[]];
// Metadata compartida: nunca importa cuerpos, filas ni motores.
const definitions: readonly Group[] = [
  ['select','SELECT',[
    ['todas-las-columnas','Todas las columnas'],['columnas-concretas','Columnas concretas'],
    ['alias','Alias AS'],['comentarios','Comentarios','comments'],
  ]],
  ['limit','LIMIT',[['filas','Máximo de filas'],['offset','OFFSET','offset']]],
  ['where','WHERE',[
    ['operadores','Operadores'],['tipos','Texto, números y fechas'],['and','AND'],['or','OR'],['not','NOT'],['combinaciones','AND, OR y NOT'],
  ]],
  ['between','BETWEEN',[['rango','Extremos incluidos'],['not-between','NOT BETWEEN']]],
  ['in','IN',[['lista','Lista de valores'],['not-in','NOT IN']]],
  ['like','LIKE',[['comodines','Comodines % y _'],['not-like','NOT LIKE']]],
  ['order-by','ORDER BY',[['asc','ASC'],['desc','DESC'],['varias-columnas','Varias columnas'],['con-limit','ORDER BY y LIMIT','limit']]],
  ['distinct','DISTINCT',[['columna','Una columna'],['varias-columnas','Combinación de columnas']]],
  ['join','JOIN',[
    ['on','Condición ON'],['alias','Alias de tablas'],['self-join','Self join','self-join'],['cross-join','CROSS JOIN','cross-join'],
  ]],
  ['outer-joins','JOIN externos',[
    ['left-join','LEFT JOIN','left-join'],['right-join','RIGHT JOIN','right-join'],
    ['full-outer-join','FULL OUTER JOIN','full-outer-join'],['anti-join','Anti join','anti-join'],
  ]],
  ['null','NULL',[['is-null','IS NULL'],['is-not-null','IS NOT NULL'],['nullif','NULLIF','nullif']]],
  ['coalesce','COALESCE',[['alternativas','Varios valores alternativos']]],
  ['case','CASE WHEN',[['condiciones','Condiciones y ELSE']]],
  ['cast','CAST',[['conversion','Conversión explícita'],['tipos','Tipos por motor']]],
  ['text-functions','Funciones de texto',[
    ['upper','UPPER','upper'],['lower','LOWER','lower'],['length','Longitud','length'],
    ['substring','Subcadena','substring'],['trim','TRIM','trim'],['replace','REPLACE','replace'],['concat','Concatenación','concat'],
  ]],
  ['numeric-functions','Funciones numéricas',[['round','ROUND','round'],['abs','ABS','abs'],['division','División y redondeo','division']]],
  ['aggregation','Agregación',[
    ['count','COUNT','count'],['sum','SUM','sum'],['avg','AVG','avg'],['min','MIN','min'],['max','MAX','max'],
    ['string-aggregate','Concatenación agregada','string-aggregate'],['combinaciones','Combinar agregados'],['con-where','Agregados con WHERE'],
  ]],
  ['group-by','GROUP BY',[
    ['varias-columnas','Agrupar varias columnas'],['having','HAVING','having'],['where-y-having','WHERE y HAVING','having'],
  ]],
  ['logical-order','Orden de ejecución',[['orden-logico','Orden lógico'],['plan-fisico','Orden lógico y plan físico']]],
  ['insert','INSERT INTO',[
    ['columnas','Columnas explícitas'],['varias-filas','Varias filas'],['sin-lista','Valores sin lista de columnas'],
    ['ignore','Conflictos: IGNORE','insert-ignore'],['replace','Conflictos: REPLACE','insert-replace'],
  ]],
  ['update','UPDATE',[['varias-columnas','Modificar varias columnas'],['comprobar-con-select','Comprobar con SELECT']]],
  ['delete','DELETE',[['condiciones','Eliminar con condición'],['comprobar-con-select','Comprobar con SELECT']]],
  ['create-table','CREATE TABLE',[
    ['tipos','Tipos de datos'],['if-not-exists','IF NOT EXISTS','create-table-if-not-exists'],
    ['primary-key','PRIMARY KEY','primary-key'],['not-null','NOT NULL','not-null'],['unique','UNIQUE','unique'],
    ['default','DEFAULT','default'],['check','CHECK','check'],['foreign-key','FOREIGN KEY','foreign-key'],
    ['varias-foreign-key','Varias claves foráneas','foreign-key'],
    ['on-delete-cascade','ON DELETE CASCADE','on-delete-cascade'],['on-delete-set-null','ON DELETE SET NULL','on-delete-set-null'],
  ]],
  ['alter-table','ALTER TABLE',[
    ['add-column','Añadir columna','add-column'],['rename-column','Renombrar columna','rename-column'],
    ['rename-table','Renombrar tabla','rename-table'],['drop-column','Eliminar columna','drop-column'],
  ]],
  ['drop-table','DROP TABLE',[['if-exists','IF EXISTS','drop-table-if-exists']]],
  ['views','Vistas',[
    ['create-view','CREATE VIEW','create-view'],['con-join','Vista con JOIN','create-view'],
    ['if-not-exists','Creación condicional','view-if-not-exists'],['replace-view','Reemplazar vista','replace-view'],['drop-view','DROP VIEW','drop-view'],
  ]],
  ['indexes','Índices',[
    ['simple-y-compuesto','Índice simple y compuesto','create-index'],['unique','Índice UNIQUE','unique-index'],
    ['consultar','Consultar índices','inspect-indexes'],['drop','DROP INDEX','drop-index'],
  ]],
  ['subqueries','Subconsultas',[
    ['where','Subconsulta en WHERE'],['in','Subconsulta en IN'],['select','Subconsulta en SELECT'],
    ['exists','EXISTS','exists'],['not-exists','NOT EXISTS','exists'],
  ]],
  ['union','UNION',[['union-all','UNION ALL','union-all'],['order-by','ORDER BY del resultado combinado']]],
  ['intersect','INTERSECT',[['columnas','Columnas compatibles']]],
  ['except','EXCEPT',[['equivalentes','Equivalentes por motor']]],
  ['cte','CTE',[['with','WITH'],['multiples','Múltiples CTE']]],
  ['window-functions','Funciones de ventana',[
    ['over','OVER'],['partition-by','PARTITION BY'],['order-by','PARTITION BY y ORDER BY'],['frame','Marco de filas'],
    ['row-number','ROW_NUMBER','row-number'],['rank','RANK y DENSE_RANK','rank'],['lag-lead','LAG y LEAD','lag-lead'],['agregados','Agregados de ventana'],
  ]],
  ['transactions','Transacciones',[['begin','Iniciar transacción'],['commit','COMMIT'],['rollback','ROLLBACK'],['autocommit','Autocommit','autocommit']]],
];

const prefix='analisis-de-datos/sql/';
export const publishedSqlGroupCount=23;
const published=new Map(['select','where','order-by','limit','comentarios'].map(id=>[prefix+id,'/apuntes/'+prefix+id]));
const legacyIds: Readonly<Record<string,string>>={
  'select/definicion':'select','where/definicion':'where','order-by/definicion':'order-by',
  'limit/definicion':'limit','select/comentarios':'comentarios',
};
export const sqlCurriculum: readonly SqlGroupPlan[] = Object.freeze(definitions.map(([key,label,leaves],index)=>Object.freeze({
  key,label,order:index+1,collapsed:true as const,
  children:Object.freeze([['definicion','Definición',key] as Leaf,...leaves].map(([leaf,label,feature],i):SqlConceptPlan=>{
    const conceptKey=key+'/'+leaf;
    const id=prefix+(legacyIds[conceptKey]??(leaf==='definicion'?key:conceptKey));
    return Object.freeze({key:conceptKey,id,label,order:i+1,feature:feature??key,
      canonicalPath:published.get(id)??'/apuntes/'+id,file:conceptKey+'.mdx',
      stage:published.has(id)?'published-legacy':index<publishedSqlGroupCount?'published':'planned'});
  })),
})));
export const sqlConceptPlans: readonly SqlConceptPlan[]=Object.freeze(sqlCurriculum.flatMap(g=>g.children));

export function inspectSqlCurriculum(groups:readonly SqlGroupPlan[]):string[] {
  const errors:string[]=[],seen=new Set<string>(),paths=new Set<string>(),files=new Set<string>();
  const register=(key:string)=>{if(seen.has(key))errors.push('Identidad duplicada: '+key);seen.add(key);};
  const segment=/^[a-z][a-z0-9-]*$/;
  if(!groups.length)errors.push('Currículo vacío');
  groups.forEach((g,i)=>{
    register(g.key);
    if(!segment.test(g.key)||g.order!==i+1||!g.label.trim()||/^\d+[.\-]/.test(g.label)||g.collapsed!==true)errors.push('Grupo inválido: '+g.key);
    if(g.children[0]?.key!==g.key+'/definicion'||g.children[0]?.label!=='Definición')errors.push('Falta Definición inicial: '+g.key);
    if(!g.children.length)errors.push('Grupo vacío: '+g.key);
    g.children.forEach((c,j)=>{
      register(c.id);register(c.key);
      if(!c.key.startsWith(g.key+'/')||c.key.split('/').length!==2||!c.key.split('/').every(p=>segment.test(p))||c.order!==j+1||!c.feature||!c.label.trim()||/^\d+[.\-]/.test(c.label))errors.push('Concepto inválido: '+c.key);
      if(c.file!==c.key+'.mdx'||files.has(c.file))errors.push('Archivo inválido: '+c.file);files.add(c.file);
      if(c.canonicalPath!=='/apuntes/'+c.id||!c.id.startsWith(prefix)||paths.has(c.canonicalPath))errors.push('Ruta inválida: '+c.canonicalPath);paths.add(c.canonicalPath);
      if(!['planned','published-legacy','published'].includes(c.stage)||(c.stage==='published-legacy'&&!published.has(c.id)))errors.push('Estado no publicable: '+c.id);
      const expected=legacyIds[c.key];if(expected&&c.id!==prefix+expected)errors.push('Identidad histórica cambiada: '+c.key);
      const suffix=expected??(c.key.endsWith('/definicion')?g.key:c.key);
      if(c.id!==prefix+suffix)errors.push('Identidad incoherente con el árbol: '+c.key);
      if(expected&&c.stage!=='published-legacy')errors.push('Concepto histórico oculto: '+c.key);
    });
  });
  return errors;
}

/** Solo los bloques entregados se publican; el resto sigue planificado. */
export function getPublishedSqlCurriculum():readonly SqlGroupPlan[] {
  return Object.freeze(sqlCurriculum.map(g=>Object.freeze({...g,children:Object.freeze(g.children.filter(c=>c.stage!=='planned'))})).filter(g=>g.children.length));
}
