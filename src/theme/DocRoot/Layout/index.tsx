import {useEffect, useRef} from 'react';
import type {Props} from '@theme/DocRoot/Layout';
import {useLocation} from '@docusaurus/router';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import DocSidebar from '@theme/DocSidebar';
import styles from './styles.module.css';

export default function DocRootLayout({children}: Props) {
  const sidebar = useDocsSidebar();
  const {pathname, hash} = useLocation();
  const reader = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        let id = hash.slice(1);
        try { id = decodeURIComponent(id); } catch { /* Un hash sin codificar también puede ser un ID válido. */ }
        const target = document.getElementById(id);
        if (target && reader.current?.contains(target)) {
          target.scrollIntoView({block: 'start', behavior: 'instant'});
          return;
        }
      }
      reader.current?.scrollTo({top: 0, left: 0, behavior: 'instant'});
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <div className={styles.frame} data-scroll-layout="docs">
      {sidebar && (
        <aside className={'theme-doc-sidebar-container ' + styles.sidebar}>
          <DocSidebar
            sidebar={sidebar.items}
            path={pathname}
            onCollapse={() => {}}
            isHidden={false}
          />
        </aside>
      )}
      <main
        ref={reader}
        className={styles.reader}
        data-scroll-panel="content"
        tabIndex={0}
        aria-label="Contenido del apunte">
        <div className={'container padding-top--md padding-bottom--lg ' + styles.inner}>
          {children}
        </div>
      </main>
    </div>
  );
}
