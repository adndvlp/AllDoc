import {useId,type ReactNode} from 'react';
import styles from './styles.module.css';

export default function PracticeRegion({name,label,open,onToggle,tools,children}:{
 name:'data'|'editor'|'results';label:string;open:boolean;onToggle():void;tools?:ReactNode;children:ReactNode;
}){
 const id=useId();
 return <section className={styles.region} data-practice-region={name} aria-labelledby={id+'-title'}>
  <div className={styles.regionHeader}>
   <h3 id={id+'-title'}><button type="button" aria-expanded={open} aria-controls={id+'-content'} onClick={onToggle}>
    <span aria-hidden="true">{open?'▾':'▸'}</span> {label}
   </button></h3>{tools}
  </div>
  <div id={id+'-content'} className={styles.regionContent} hidden={!open}>{children}</div>
 </section>;
}
