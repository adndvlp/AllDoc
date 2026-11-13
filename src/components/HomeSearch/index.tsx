import {useEffect, useId, useRef, type ReactNode} from 'react';
import Icon from '@site/src/components/Icon';
import {useSearch} from '../SearchProvider';
import SearchResults from '../SearchResults';
import {searchKeyboard} from '../SearchResults/keyboard';
import styles from './styles.module.css';

export default function HomeSearch({children}: {children: ReactNode}) {
  const {store, state, shortcut} = useSearch();
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const hasQuery = state.query.trim().length > 0;
  const showResults = (hasQuery || state.status === 'error') && state.surface !== 'dialog';
  useEffect(() => {store.mountInline(); return store.releaseInline;}, [store]);

  return (
    <>
      <section className={styles.search} aria-labelledby={id + '-title'} data-search-surface="inline">
        <h1 id={id + '-title'}>¿Qué quieres <span>recordar?</span></h1>
        <p id={id + '-help'} className={styles.help}>Busca un concepto o lo que quieres hacer.</p>
        <form role="search" aria-label="Buscar conceptos" className={styles.field}
          onSubmit={(event) => {event.preventDefault(); list.current?.querySelector('a')?.click();}}>
          <Icon name="search" size={21} />
          <label htmlFor={id + '-input'} className="sr-only">Buscar en tus apuntes</label>
          <input ref={input} id={id + '-input'} type="search" placeholder="Buscar un concepto o cómo hacer algo…" value={state.query}
            onFocus={() => void store.activateInline()} onChange={(event) => store.setQuery(event.target.value)} onKeyDown={searchKeyboard(input, list).onInputKeyDown}
            aria-describedby={id + '-help'} aria-controls={showResults ? id + '-results' : undefined}
            autoComplete="off" autoCapitalize="none" enterKeyHint="search" spellCheck={false} />
          {hasQuery ? <button type="button" aria-label="Limpiar búsqueda" onClick={() => {store.setQuery(''); input.current?.focus();}}><Icon name="close" size={18} /></button> : <kbd aria-hidden="true">{shortcut}</kbd>}
          <button type="submit" aria-label="Abrir primer resultado" disabled={!showResults || state.status !== 'ready' || !state.results.length}><Icon name="arrow" size={21} /></button>
        </form>
        {showResults && <div className={styles.results}><SearchResults id={id + '-results'} inputRef={input} listRef={list} /></div>}
      </section>
      <div hidden={hasQuery}>{children}</div>
    </>
  );
}
