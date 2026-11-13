import OriginalNavbarContent from '@theme-original/Navbar/Content';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {areas} from '@site/src/content/areas';
import {useHomeArea} from '@site/src/components/HomeAreaProvider';
import styles from './styles.module.css';

export default function NavbarContent() {
  const {pathname} = useLocation();
  const {areaId, selectArea} = useHomeArea();

  return (
    <>
      <OriginalNavbarContent />
      <nav className={styles.areas} aria-label="Áreas de estudio">
        {areas.map((area) => {
          const href = '/apuntes/' + area.id;
          const active = pathname === href || pathname.startsWith(href + '/');
          if (pathname === '/') return <button key={area.id} type="button" className={styles.area}
            aria-pressed={areaId === area.id} onClick={() => selectArea(area.id)}>{area.title}</button>;
          return (
            <Link key={area.id} to={href} className={styles.area} aria-current={active ? 'page' : undefined}>
              {area.title}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
