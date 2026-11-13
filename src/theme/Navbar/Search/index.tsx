import type {Props} from '@theme/Navbar/Search';
import styles from './styles.module.css';

export default function NavbarSearch({children, className}: Props) {
  return <div className={[styles.search, className].filter(Boolean).join(' ')}>{children}</div>;
}
