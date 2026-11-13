import {useLocation} from '@docusaurus/router';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import {areas, type AreaId} from '@site/src/content/areas';
import {useHomeArea} from '../HomeAreaProvider';
import styles from './styles.module.css';

export default function AreaNavbarItem({areaId, mobile = false}: {areaId: AreaId; mobile?: boolean}) {
  const {pathname} = useLocation();
  const selection = useHomeArea();
  const sidebar = useNavbarMobileSidebar();
  const area = areas.find((item) => item.id === areaId)!;
  if (pathname !== '/') return <DefaultNavbarItem mobile={mobile} to={'/apuntes/' + area.id}
    label={area.title} activeBaseRegex={`^/apuntes/${area.id}(?:/|$)`} />;

  const button = <button type="button" className={mobile ? `menu__link ${styles.mobile}` : `navbar__item navbar__link ${styles.desktop}`}
    aria-pressed={selection.areaId === area.id} onClick={() => {
      selection.selectArea(area.id);
      if (mobile && sidebar.shown) sidebar.toggle();
    }}>{area.title}</button>;
  return mobile ? <li className="menu__list-item">{button}</li> : button;
}
