import {useEffect,useId,useState,useSyncExternalStore} from 'react';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import {sqlDialects} from '@site/src/content/sql/capabilities';
import {createSqlDialectStore} from '@site/src/content/sql/dialect-store';
import {resolveNoteExample,groupForConcept,type SqlConcept} from '@site/src/content/notes/sql/factory';
import type {SqlDialectId} from '@site/src/content/sql/contracts';
import {usePractice} from '../PracticeProvider';
import {ConceptNote} from '../ConceptNote';
import styles from './styles.module.css';

const dialectStore=createSqlDialectStore(()=>window.localStorage);
function TrySql({concept,exampleId,dialect}:{concept:SqlConcept;exampleId:string;dialect:SqlDialectId}){
 const practice=usePractice();const example=concept.examples.find(e=>e.id===exampleId)!;const {action,alternative}=resolveNoteExample(concept,example,dialect);
 if(action.kind==='external'&&alternative)return <Link className={styles.tryExample} to={alternative.href}>{alternative.label}</Link>;
 if(action.kind==='disabled')return <span>{action.label}</span>;
 if(practice.context?.profile.languageId!=='sql')return null;
 return <button className={styles.tryExample} type="button" data-practice-example={example.id}
  aria-label={action.label+': '+example.title} aria-haspopup="dialog" aria-controls="alldoc-practice-panel"
  onClick={e=>{e.currentTarget.focus({preventScroll:true});void practice.openExample({id:example.id,code:action.code!,languageId:'sql'});}}>
   {action.kind==='sqlite-equivalent'?'Probar equivalente':'Probar en SQLite'}</button>;
}
export function SqlConceptCard({concept}:{concept:SqlConcept|undefined}) {
 const location=useLocation();const id=useId();const dialect=useSyncExternalStore(dialectStore.subscribe,dialectStore.getSnapshot,dialectStore.getServerSnapshot);
 useEffect(()=>{dialectStore.navigate(location.search);},[location.pathname,location.search]);
 const [expanded,setExpanded]=useState(Boolean(concept&&!concept.key.endsWith('/definicion')));
 if(!concept)throw new Error('Ficha SQL desconocida');
 const group=groupForConcept(concept);const label=sqlDialects.find(d=>d.id===dialect)!.label;
 const resolved={...concept,examples:concept.examples.map(e=>{const {variant}=resolveNoteExample(concept,e,dialect);return {...e,code:variant.code??'',hint:e.changes?.[dialect]?.explanation?e.hint+' '+e.changes[dialect]!.explanation:e.hint};})};
 return <ConceptNote concept={resolved} conceptId={concept.id} kind="sql" language="sql" htmlClassName="sql-concept-page" showResults={dialect==='sqlite'} resultLabel={group.order>=20?'Ver resultado final en SQLite':'Ver resultado en SQLite'}
  renderAction={example=><TrySql concept={concept} exampleId={example.id} dialect={dialect}/>}
  controls={<div className={styles.dialectControls}>
   <label htmlFor={id}>Dialecto SQL <select id={id} value={dialect} onChange={e=>{
    const next=e.target.value;dialectStore.select(next);const url=new URL(window.location.href);url.searchParams.set('dialect',next);window.history.replaceState(window.history.state,'',url);
   }}>{sqlDialects.map(d=><option key={d.id} value={d.id}>{d.label}</option>)}</select></label>
   <span>El panel ejecuta SQLite</span>
  </div>}
  afterContent={<>
   {group.order<11&&concept.examples.some(e=>e.output.rows.some(row=>row.includes('NULL'))||/NULL/.test(e.hint+' '+concept.remember))&&<p className={styles.note}>NULL significa que falta un valor. <Link to="/apuntes/analisis-de-datos/sql/null">Ver NULL</Link>.</p>}
   <a className={styles.datasetLink} href={'/sql/datasets/negocio-relacional-1/'+dialect+'.sql'} download>Descargar datos para {label}</a>
   <details className={styles.more} aria-label={'Más de '+group.label} open={expanded} onToggle={e=>setExpanded(e.currentTarget.open)}>
    <summary>Más de {group.label}</summary><nav aria-label={'Apartados de '+group.label}>{group.children.filter(c=>c.stage!=='planned').map(c=><Link key={c.id} to={c.canonicalPath} aria-current={c.id===concept.conceptId?'page':undefined}>{c.label}</Link>)}</nav>
   </details>
   <details className={styles.more}><summary>Fuentes de {label}</summary><p>Revisión documental; las salidas desplegables se han comprobado en SQLite con los datos iniciales.</p>
    {resolveNoteExample(concept,concept.examples[0],dialect).variant.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.targetVersion} · {new URL(s.url).pathname.split('/').at(-1)?.replace(/\.html?$/,'')}<span className="sr-only"> · abre en otra pestaña</span></a>)}
   </details>
  </>}/>;
}
