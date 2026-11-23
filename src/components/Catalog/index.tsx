import {useId} from 'react';
import Link from '@docusaurus/Link';
import {catalog, countConcepts, type CatalogNode} from '@site/src/content/catalog';
import type {AreaId} from '@site/src/content/areas';
import type {ConceptMeta} from '@site/src/content/concepts';
import {sqlPathForLocation} from '@site/src/content/sql/placements';
import Icon from '@site/src/components/Icon';
import TopicIcon from '@site/src/components/TopicIcon';
import styles from './styles.module.css';

function Concepts({concepts,areaId,compact=false}:{concepts:readonly ConceptMeta[];areaId:AreaId;compact?:boolean}){
 return <ul className={styles.concepts}>{concepts.map(concept=><li key={concept.id}>
  <Link to={compact?sqlPathForLocation(concept.id,areaId as 'analisis-de-datos'|'lenguajes')??concept.slug:concept.slug} aria-label={compact?concept.label:undefined}>
   <span><strong>{compact?concept.label:concept.title}</strong><span>{compact?concept.description:concept.label}</span></span><Icon name="arrow" size={16}/>
  </Link>
 </li>)}</ul>;
}

function CatalogItem({node, prefix}: {node: CatalogNode; prefix: string}) {
  const count = countConcepts([node]);
  const hint = node.kind === 'group' ? node.items.map((item) => item.label).join(' · ') : '';
  const descriptionId = `${prefix}-${node.id}-description`;
  return <li data-catalog-item={node.id}>
    <details className={styles.disclosure}>
      <summary className={styles.trigger} aria-label={node.label} aria-describedby={count || hint ? descriptionId : undefined}>
        <span className={styles.chevron} aria-hidden="true">›</span>
        <span className={styles.icon}><TopicIcon label={node.label} /></span>
        <span className={styles.copy}><span className={styles.name}>{node.label}</span>{hint && <span className={styles.hint}>{hint}</span>}</span>
        <span id={descriptionId} className={styles.count}>{count ? `${count} ${count === 1 ? 'concepto' : 'conceptos'}` : null}<span className="sr-only">{hint ? ` ${hint}` : ''}</span></span>
      </summary>
      {node.kind === 'group' ? <ul className={styles.nested}>{node.items.map((item) => <CatalogItem key={item.id} node={item} prefix={prefix} />)}</ul>
        : node.sections?.length?<ul className={styles.nested}>{node.sections.map(group=><li key={group.id} data-sql-group={group.id}>
          <details className={styles.disclosure}><summary className={styles.trigger} aria-label={group.label}>
           <span className={styles.chevron} aria-hidden="true">›</span><span className={styles.copy}><span className={styles.name}>{group.label}</span></span>
           <span className={styles.count}>{group.concepts.length} conceptos</span>
          </summary><Concepts concepts={group.concepts} areaId={node.areaId} compact/></details>
        </li>)}</ul>
        : node.concepts.length ?<Concepts concepts={node.concepts} areaId={node.areaId}/>: <p className={styles.emptyTopic}>Sin apuntes todavía</p>}
    </details>
  </li>;
}

export default function Catalog({areaId, showHeading = true}: {areaId: AreaId; showHeading?: boolean}) {
  const id = useId();
  const area = catalog.find((item) => item.id === areaId)!;
  const count = countConcepts(area.items);
  return <section className={styles.catalog} aria-label={`Catálogo de ${area.title}`} data-catalog={area.id}>
    <header className={styles.heading}>
      {showHeading && <h2>{area.title}</h2>}
      {count > 0 && <p>{count} {count === 1 ? 'concepto' : 'conceptos'}</p>}
    </header>
    {area.items.length ? <ul className={styles.list}>{area.items.map((node) => <CatalogItem key={node.id} node={node} prefix={id} />)}</ul>
      : <p className={styles.emptyArea}>Sin apuntes todavía</p>}
  </section>;
}
