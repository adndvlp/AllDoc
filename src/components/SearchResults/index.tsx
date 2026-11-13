import {useEffect, useState, type RefObject} from 'react';
import Link from '@docusaurus/Link';
import Icon from '@site/src/components/Icon';
import {useSearch} from '../SearchProvider';
import {searchKeyboard} from './keyboard';
import styles from './styles.module.css';

export default function SearchResults({id, inputRef, listRef}: {
  id: string;
  inputRef: RefObject<HTMLInputElement | null>;
  listRef: RefObject<HTMLUListElement | null>;
}) {
  const {store, state} = useSearch();
  const [announcement, setAnnouncement] = useState('');
  const loading = state.status === 'idle' || state.status === 'loading';
  const count = state.results.length;
  const label = loading ? 'Cargando apuntes…' : state.status === 'error' ? '' :
    !state.query.trim() ? 'Conceptos para recordar' : count + (count === 1 ? ' resultado' : ' resultados');
  useEffect(() => {
    const timer = window.setTimeout(() => setAnnouncement(label), 300);
    return () => window.clearTimeout(timer);
  }, [label, state.query]);

  return (
    <div id={id} className={styles.region} aria-busy={loading}>
      <p className={styles.label} aria-hidden="true">{label}</p>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      {state.status === 'error' ? (
        <div className={styles.message} role="alert"><strong>No pude cargar los apuntes</strong><button type="button" onClick={() => {void store.retry(); inputRef.current?.focus();}}>Reintentar</button></div>
      ) : !loading && count === 0 ? (
        <div className={styles.message}>
          <strong>{state.query.trim() && state.terms.length === 0 ? 'Escribe un concepto o una acción' : 'No encontré ese concepto'}</strong>
          <p>Prueba con «filtrar», «ordenar» o «SELECT».</p>
        </div>
      ) : !loading && (
        <>
          <ul ref={listRef} role="list" className={styles.results} onKeyDown={searchKeyboard(inputRef, listRef).onResultsKeyDown} aria-label="Resultados de búsqueda">
            {state.results.slice(0, state.visibleCount).map((entry) => (
              <li key={entry.id}>
                <Link to={entry.href} onClick={(event) => {
                  if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) store.chooseResult();
                }}>
                  <span className={styles.icon}><Icon name="book" size={18} /></span>
                  <span className={styles.copy}><span className={styles.context}>{entry.context}</span><strong>{entry.title}</strong><span className={styles.description}>{entry.description}</span></span>
                  <Icon name="arrow" size={17} />
                </Link>
              </li>
            ))}
          </ul>
          {state.visibleCount < count && <button type="button" className={styles.more} onClick={() => {
            const firstNew = state.visibleCount;
            store.showMore();
            requestAnimationFrame(() => listRef.current?.querySelectorAll('a')[firstNew]?.focus());
          }}>Mostrar más resultados <span>{Math.min(state.visibleCount, count)} de {count}</span></button>}
        </>
      )}
    </div>
  );
}
