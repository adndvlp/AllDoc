import {useEffect, useId, useRef} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import SearchBar from '@theme/SearchBar';
import PaletteSelector from '@site/src/components/PaletteSelector';
import {areas} from '@site/src/content/areas';
import {useHomeArea} from '@site/src/components/HomeAreaProvider';
import {useHeaderDisclosure} from '@site/src/hooks/useHeaderDisclosure';
import styles from './styles.module.css';

export default function NavbarContent() {
  const {pathname} = useLocation();
  const previousPath = useRef(pathname);
  const mobileSidebar = useNavbarMobileSidebar();
  const {areaId, selectArea} = useHomeArea();
  const currentArea = areas.find((area) => pathname === '/' ? area.id === areaId
    : pathname === '/apuntes/' + area.id || pathname.startsWith('/apuntes/' + area.id + '/')) ?? areas[0];
  const hasTopics = pathname !== '/' && currentArea.available;
  const disclosure = useHeaderDisclosure();
  const panelId = useId();
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      if (mobileSidebar.shown) mobileSidebar.toggle();
    }
  }, [pathname, mobileSidebar]);

  useEffect(() => {
    const navbar = frame.current!.closest<HTMLElement>('.navbar')!;
    // Solo las ventanas emergentes necesitan esta medida; el layout usa flex.
    const update = () => document.documentElement.style.setProperty('--alldoc-header-height', navbar.getBoundingClientRect().height + 'px');
    const observer = new ResizeObserver(update);
    observer.observe(navbar);
    update();
    return () => {observer.disconnect(); document.documentElement.style.removeProperty('--alldoc-header-height');};
  }, []);

  function choices(closeAfterChoosing = false) {
    return areas.map((area) => {
      const active = currentArea.id === area.id;
      const onChoose = () => {if (closeAfterChoosing) disclosure.close(true);};
      if (pathname === '/') return <button key={area.id} type="button" className={styles.area}
        aria-pressed={active} onClick={() => {selectArea(area.id); onChoose();}}>{area.title}</button>;
      return <Link key={area.id} to={'/apuntes/' + area.id} className={styles.area}
        aria-current={active ? 'page' : undefined} onClick={onChoose}>{area.title}</Link>;
    });
  }

  return (
    <div ref={frame} className={'navbar__inner ' + styles.frame}>
      <div className={styles.identity} data-has-topics={hasTopics}>
        {hasTopics && <NavbarMobileSidebarToggle />}
        <NavbarLogo />
      </div>
      <div className={styles.areas}>
        <nav className={styles.desktopAreas} aria-label="Áreas de estudio">{choices()}</nav>
        <details ref={disclosure.container} className={styles.selector} onToggle={disclosure.onToggle}>
          <summary ref={disclosure.trigger} role="button" className={styles.trigger}
            aria-label={'Elegir área: ' + currentArea.title} aria-expanded={disclosure.open} aria-controls={panelId}>
            <span>{currentArea.title}</span>
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </summary>
          <nav id={panelId} className={styles.panel} aria-label="Áreas de estudio">{choices(true)}</nav>
        </details>
      </div>
      <div className={styles.actions}>
        <SearchBar />
        <PaletteSelector />
      </div>
    </div>
  );
}
