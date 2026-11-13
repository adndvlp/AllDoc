import Icon from '@site/src/components/Icon';
import {useSearch} from '@site/src/components/SearchProvider';
import styles from './styles.module.css';

export default function SearchBar() {
  const {store, state, shortcut} = useSearch();
  return (
    <button className={styles.trigger} data-header-search type="button" aria-haspopup="dialog" aria-expanded={state.surface === 'dialog'} aria-label="Buscar un concepto"
      onClick={(event) => {event.currentTarget.focus({preventScroll: true}); void store.openDialog();}}>
      <Icon name="search" size={17} /><span data-header-label>Buscar un concepto</span><kbd>{shortcut}</kbd>
    </button>
  );
}
