import type {Props} from '@theme/DocSidebar/Desktop';
import Content from '@theme/DocSidebar/Desktop/Content';
import styles from './styles.module.css';

export default function DocSidebarDesktop({sidebar, path}: Props) {
  return <Content sidebar={sidebar} path={path} className={styles.menu} />;
}
