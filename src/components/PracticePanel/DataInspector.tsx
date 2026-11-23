import {memo,useState} from 'react';
import type {RuntimeSchema} from '@site/src/practice/contracts';
import Region from './Region';
import styles from './styles.module.css';

function DataInspector({schema,workspaceKey,open,onToggle,loading}:{schema:RuntimeSchema;workspaceKey:string;open:boolean;onToggle():void;loading:boolean}){
 const [selected,setSelected]=useState<Record<string,string>>({});
 const [showSchema,setShowSchema]=useState(false);
 const entity=schema.entities.find(e=>e.name===selected[workspaceKey])??schema.entities.find(e=>e.name==='productos')??schema.entities.find(e=>e.kind==='dataframe')??schema.entities[0];
 return <Region name="data" label="Datos" open={open} onToggle={onToggle} tools={<>
  <label className={styles.tableChoice}>Tabla <select aria-label="Tabla de datos" value={entity?.name??''} disabled={!schema.entities.length}
   onChange={event=>setSelected(previous=>({...previous,[workspaceKey]:event.target.value}))}>
   {!schema.entities.length&&<option value="">Sin tablas</option>}
   {schema.entities.map(e=><option key={e.name} value={e.name}>{e.name}</option>)}
  </select></label>
  {entity&&<span className={styles.rowCount}>{entity.rowCount===undefined?'Sin recuento':entity.rowCount+' filas'}</span>}
  <button type="button" aria-expanded={showSchema} onClick={()=>{setShowSchema(value=>!value);if(!open)onToggle();}}>Ver esquema</button>
 </>}>
  {showSchema&&<div className={styles.schema} role="region" aria-label="Esquema actual" tabIndex={0}>
   <ul>{schema.entities.map(e=><li key={e.name}><strong>{e.name}</strong>
    <p>{e.columns.map(c=>c.name+' · '+c.type+(c.primaryKey?' · clave primaria':'')).join('; ')}</p>
    {!!e.foreignKeys?.length&&<ul>{e.foreignKeys.map((key,index)=><li key={index}>{key.columns.join(', ')} → {key.table} ({key.targetColumns.map(c=>c??'clave primaria').join(', ')})</li>)}</ul>}
   </li>)}</ul>
  </div>}
  {loading&&!entity?<p>Preparando datos…</p>:!entity?<p>No hay entidades para inspeccionar.</p>:<>
   <div role="region" aria-label={'Tabla '+entity.name} tabIndex={0} className={styles.table+' '+styles.dataPreview}>
    <table><caption className="sr-only">Datos de {entity.name}</caption>
     <thead><tr>{entity.columns.map(column=><th key={column.name} scope="col">{column.name}{column.primaryKey&&<abbr title="Clave primaria"> PK</abbr>}<small>{column.type}</small></th>)}</tr></thead>
     <tbody>{entity.preview?.rows.slice(0,20).map((row,index)=><tr key={index}>{row.map((cell,column)=><td key={column}>{String(cell??'NULL')}</td>)}</tr>)}</tbody>
    </table>
   </div>
   {!entity.preview&&<p>Esta entidad no tiene vista previa.</p>}
   {entity.preview?.truncated&&<p>Vista previa truncada: {Math.min(entity.preview.rows.length,20)} de {entity.rowCount??'las'} filas. Las consultas usan todos los datos.</p>}
  </>}
 </Region>;
}
export default memo(DataInspector);
