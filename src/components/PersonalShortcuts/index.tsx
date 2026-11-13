import {useId, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {catalog, getTopics} from '@site/src/content/catalog';
import {getConcept} from '@site/src/content/concepts';
import {SHORTCUTS_LIMIT} from '@site/src/lib/personal-library';
import Icon from '@site/src/components/Icon';
import {LibrarySaveStatus} from '../FavoriteButton';
import {usePersonalLibrary} from '../PersonalLibraryProvider';
import styles from './styles.module.css';

const topicNames = new Map(catalog.flatMap((area) => getTopics(area.id).map((topic) => [`${area.id}/${topic.id}`, `${topic.label} · ${area.title}`])));

function Collection({title, ids, removable = false}: {title: string; ids: readonly string[]; removable?: boolean}) {
  const {store} = usePersonalLibrary();
  const [expanded, setExpanded] = useState(false);
  const section = useRef<HTMLElement>(null);
  const id = useId();
  if (!ids.length) return null;
  const visible = expanded ? ids : ids.slice(0, SHORTCUTS_LIMIT);
  return <section ref={section} aria-labelledby={id + '-title'} className={styles.collection}>
    <div className={styles.heading}><Icon name={removable ? 'star' : 'book'} size={18} /><h2 id={id + '-title'}>{title}</h2></div>
    <ul id={id + '-list'} className={styles.list}>
      {visible.map((conceptId, index) => {
        const concept = getConcept(conceptId)!;
        return <li key={concept.id}>
          <Link to={concept.slug}><strong>{concept.title}</strong><span>{topicNames.get(`${concept.areaId}/${concept.topicId}`)}</span></Link>
          {removable && <button type="button" aria-label={`Quitar ${concept.title} de favoritos`} title="Quitar de favoritos" onClick={(event) => {
            const focused = event.currentTarget === document.activeElement;
            store.toggleFavorite(concept.id);
            if (focused) requestAnimationFrame(() => {
              const controls = section.current?.querySelectorAll<HTMLButtonElement>('li button');
              const next = controls?.[Math.min(index, controls.length - 1)];
              if (next) next.focus();
              else document.querySelector<HTMLInputElement>('[data-search-surface="inline"] input')?.focus();
            });
          }}><Icon name="close" size={17} /></button>}
        </li>;
      })}
    </ul>
    {ids.length > SHORTCUTS_LIMIT && <button type="button" className={styles.more} aria-expanded={expanded} aria-controls={id + '-list'}
      onClick={() => setExpanded((value) => !value)}>{expanded ? 'Ver menos' : `Ver todos los ${title.toLowerCase()}`}<span>{ids.length}</span></button>}
  </section>;
}

export default function PersonalShortcuts() {
  const {state} = usePersonalLibrary();
  if (!state.hydrated || (!state.recents.length && !state.favorites.length)) return null;
  return <div className={styles.shortcuts} data-personal-shortcuts>
    <Collection title="Recientes" ids={state.recents.map(({conceptId}) => conceptId)} />
    <Collection title="Favoritos" ids={state.favorites} removable />
    <LibrarySaveStatus className={styles.status} />
  </div>;
}
