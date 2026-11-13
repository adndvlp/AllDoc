import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import IconMenu from '@theme/Icon/Menu';

export default function MobileSidebarToggle() {
  const {shown, toggle} = useNavbarMobileSidebar();
  return <button type="button" className="navbar__toggle clean-btn" aria-label="Alternar barra lateral" aria-expanded={shown}
    onClick={(event) => {event.currentTarget.focus({preventScroll: true}); toggle();}}><IconMenu /></button>;
}
