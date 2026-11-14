import {useEffect, useId, useRef} from 'react';
import Icon from '@site/src/components/Icon';
import {useSearch} from '../SearchProvider';
import SearchResults from '../SearchResults';
import {searchKeyboard} from '../SearchResults/keyboard';
import styles from './styles.module.css';

export default function SearchDialog() {
  const {store, state} = useSearch();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const closingFromState = useRef(false);
  const pressedOutside = useRef(false);
  const id = useId();
  const open = state.surface === 'dialog';

  useEffect(() => {
    const element = dialog.current!;
    if (open) {
      if (!element.open) element.showModal();
      input.current?.focus();
    } else if (element.open) {
      closingFromState.current = true;
      element.close();
    }
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (dialog.current?.open) input.current?.focus();
        else {
          // Cerrar la ventana de origen antes de showModal conserva un único
          // diálogo y permite que el retorno nativo del foco tenga un destino visible.
          const topics = document.querySelector<HTMLDialogElement>('dialog.navbar-sidebar[open]');
          if (topics) {
            topics.close();
            document.querySelector<HTMLButtonElement>('[data-header-search]')?.focus({preventScroll: true});
          } else {
            const disclosure = document.activeElement?.closest<HTMLDetailsElement>('.navbar__inner details[open]');
            if (disclosure) {
              disclosure.open = false;
              disclosure.querySelector('summary')?.focus({preventScroll: true});
            }
          }
          void store.openDialog();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [store]);

  useEffect(() => {
    const viewport = window.visualViewport;
    const element = dialog.current;
    if (!open || !viewport || !element) return;
    const update = () => {
      element.style.setProperty('--search-viewport-height', viewport.height + 'px');
      element.style.setProperty('--search-viewport-offset', viewport.offsetTop + 'px');
      element.style.setProperty('--search-viewport-top-gap', Math.min(viewport.height * .1, 100) + 'px');
    };
    update();
    viewport.addEventListener('resize', update);
    viewport.addEventListener('scroll', update);
    return () => {
      viewport.removeEventListener('resize', update);
      viewport.removeEventListener('scroll', update);
      element.style.removeProperty('--search-viewport-height');
      element.style.removeProperty('--search-viewport-offset');
      element.style.removeProperty('--search-viewport-top-gap');
    };
  }, [open]);

  const outside = (x: number, y: number) => {
    const bounds = dialog.current!.getBoundingClientRect();
    return x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom;
  };

  return (
    <dialog ref={dialog} closedby="any" className={styles.dialog} aria-labelledby={id + '-label'} data-search-surface="dialog"
      onClose={() => {
        if (closingFromState.current) closingFromState.current = false;
        else if (!dialog.current?.open) store.closeDialog();
      }}
      onPointerDown={(event) => {if (!('closedBy' in HTMLDialogElement.prototype)) pressedOutside.current = outside(event.clientX, event.clientY);}}
      onPointerUp={(event) => {if (!('closedBy' in HTMLDialogElement.prototype) && pressedOutside.current && outside(event.clientX, event.clientY)) dialog.current?.close();}}>
      <div className={styles.panel}>
        <div className={styles.inputRow}>
          <Icon name="search" size={21} />
          <label id={id + '-label'} htmlFor={id + '-input'} className="sr-only">Buscar en tus apuntes</label>
          {/* text + searchbox conserva Esc nativo sin que el input search lo consuma para borrar. */}
          <input ref={input} id={id + '-input'} type="text" role="searchbox" autoFocus placeholder="¿Qué quieres recordar?"
            value={state.query} onChange={(event) => store.setQuery(event.target.value)} onKeyDown={searchKeyboard(input, list).onInputKeyDown}
            aria-controls={open ? id + '-results' : undefined} autoComplete="off" autoCapitalize="none" enterKeyHint="search" spellCheck={false} />
          {state.query && <button type="button" aria-label="Limpiar búsqueda" onClick={() => {store.setQuery(''); input.current?.focus();}}><Icon name="close" size={16} /></button>}
          <button type="button" aria-label="Cerrar buscador" onClick={() => dialog.current?.close()}><Icon name="close" size={19} /></button>
        </div>
        <div className={styles.scrollArea}>
          {open && <SearchResults id={id + '-results'} inputRef={input} listRef={list} />}
        </div>
        <div className={styles.hints}><span><kbd>↑</kbd> <kbd>↓</kbd> para moverte</span><span><kbd>Enter</kbd> abrir <kbd>Esc</kbd> cerrar</span></div>
      </div>
    </dialog>
  );
}
