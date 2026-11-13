import Icon from '@site/src/components/Icon';
import {usePersonalLibrary} from '../PersonalLibraryProvider';
import styles from './styles.module.css';

export default function FavoriteButton({conceptId}: {conceptId: string}) {
  const {store, state} = usePersonalLibrary();
  const saved = state.favorites.includes(conceptId);
  const label = saved ? 'Quitar de favoritos' : 'Guardar en favoritos';
  return <button type="button" className={styles.button} disabled={!state.hydrated}
    aria-pressed={saved} aria-label={label} title={label} onClick={() => store.toggleFavorite(conceptId)}>
    <Icon name="star" size={21} />
  </button>;
}

export function LibrarySaveStatus({className}: {className?: string}) {
  const {state} = usePersonalLibrary();
  return <p role="status" className={className}>{state.sessionOnly.recents || state.sessionOnly.favorites ? 'Guardado en esta sesión' : ''}</p>;
}
