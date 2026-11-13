import {useEffect, useRef} from 'react';
import {useNavbarMobileSidebar, useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import NavbarLogo from '@theme/Navbar/Logo';
import IconClose from '@theme/Icon/Close';

function TopicsDialog() {
  const {shown, toggle} = useNavbarMobileSidebar();
  const {content} = useNavbarSecondaryMenu();
  const dialog = useRef<HTMLDialogElement>(null);
  const closingFromState = useRef(false);
  const pressedOutside = useRef(false);

  useEffect(() => {
    const element = dialog.current!;
    if (shown && !element.open) element.showModal();
    else if (!shown && element.open) {
      closingFromState.current = true;
      element.close();
    }
  }, [shown]);
  useEffect(() => {
    const element = dialog.current!;
    return () => {if (element.open) element.close();};
  }, []);

  function outside(x: number, y: number) {
    const rect = dialog.current!.getBoundingClientRect();
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  }

  return (
    <dialog ref={dialog} className="navbar-sidebar" aria-label="Temas del área"
      onCancel={(event) => {event.preventDefault(); if (shown) toggle();}}
      onClose={() => {
        if (closingFromState.current) closingFromState.current = false;
        else if (shown) toggle();
      }}
      onPointerDown={(event) => {pressedOutside.current = outside(event.clientX, event.clientY);}}
      onPointerUp={(event) => {if (pressedOutside.current && outside(event.clientX, event.clientY) && shown) toggle();}}>
      <div className="navbar-sidebar__brand">
        <NavbarLogo />
        <button type="button" autoFocus className="clean-btn navbar-sidebar__close" aria-label="Cerrar barra de lateral" onClick={toggle}>
          <IconClose color="currentColor" />
        </button>
      </div>
      <div className="navbar-sidebar__item menu">{content}</div>
    </dialog>
  );
}

export default function NavbarMobileSidebar() {
  // El proveedor de Docusaurus descarta shown al pasar a escritorio.
  const {shouldRender} = useNavbarMobileSidebar();
  return shouldRender ? <TopicsDialog /> : null;
}
