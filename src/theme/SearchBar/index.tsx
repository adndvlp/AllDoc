import {useCallback, useEffect, useId, useRef, useState} from 'react';
import type {KeyboardEvent} from 'react';
import Link from '@docusaurus/Link';
import Icon from '@site/src/components/Icon';
import {searchEntries, type SearchEntry} from '@site/src/lib/search';
import styles from './styles.module.css';

export default function SearchBar() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const resultsList = useRef<HTMLUListElement>(null);
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shortcut, setShortcut] = useState('Ctrl K');
  const labelId = useId();
  const resultsId = useId();
  const results = searchEntries(entries, query);

  const openSearch = useCallback(async () => {
    if (dialog.current?.open) {
      input.current?.focus();
      return;
    }
    dialog.current?.showModal();
    input.current?.focus();
    setLoading(true);
    setError(false);
    try {
      // El contenido del índice se descarga al abrir el buscador.
      const index = await import('@site/src/content/search-index');
      setEntries(index.entries);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut('⌘ K');
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        void openSearch();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openSearch]);

  const focusResult = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      resultsList.current?.querySelector('a')?.focus();
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      resultsList.current?.querySelector('a')?.click();
    }
  };

  const moveResult = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const links = [...(resultsList.current?.querySelectorAll('a') ?? [])];
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next = current + (event.key === 'ArrowDown' ? 1 : -1);
    if (next < 0) input.current?.focus();
    else links[Math.min(next, links.length - 1)]?.focus();
  };

  return (
    <>
      <button className={styles.trigger} type="button" onClick={() => void openSearch()} aria-haspopup="dialog" aria-label="Buscar un concepto">
        <Icon name="search" size={17} /><span>Buscar un concepto</span><kbd>{shortcut}</kbd>
      </button>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby={labelId} onClick={(event) => {if (event.target === event.currentTarget) dialog.current?.close();}}>
        <div className={styles.panel}>
          <div className={styles.inputRow}>
            <Icon name="search" size={21} />
            <label htmlFor={labelId + '-input'} id={labelId} className="sr-only">Buscar en tus apuntes</label>
            <input ref={input} id={labelId + '-input'} type="search" placeholder="¿Qué quieres recordar?" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={focusResult} aria-controls={resultsId} autoComplete="off" autoCapitalize="none" enterKeyHint="search" spellCheck={false} />
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Cerrar buscador"><Icon name="close" size={18} /></button>
          </div>
          <p className={styles.resultLabel} aria-live="polite">{loading ? 'Buscando tus apuntes…' : error ? 'No se pudo cargar el índice. Cierra el buscador y vuelve a abrirlo.' : query.trim() ? results.length + (results.length === 1 ? ' resultado' : ' resultados') : 'PARA RECORDAR · SQL'}</p>
          {!loading && !error && (
            <ul ref={resultsList} id={resultsId} className={styles.results} onKeyDown={moveResult} aria-label="Resultados de búsqueda">
              {results.map((entry) => (
                <li key={entry.href}>
                  <Link to={entry.href} onClick={() => dialog.current?.close()}>
                    <span className={styles.resultIcon}><Icon name="book" size={18} /></span>
                    <span><span className={styles.context}>{entry.context}</span><strong>{entry.title}</strong><span className={styles.resultDescription}>{entry.description}</span></span>
                    <Icon name="arrow" size={17} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!loading && !error && results.length === 0 && (
            <div className={styles.empty}><strong>Aún no hay un apunte para eso.</strong><p>Prueba con “filtrar”, “ordenar” o “SQL”.</p></div>
          )}
          <div className={styles.footer}><span><kbd>↑</kbd> <kbd>↓</kbd> para moverte</span><span><kbd>Enter</kbd> abrir <kbd>Esc</kbd> cerrar</span></div>
        </div>
      </dialog>
    </>
  );
}
