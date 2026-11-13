import {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import {useSearch} from '@site/src/components/SearchProvider';

export function useHeaderDisclosure() {
  const container = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const {pathname} = useLocation();
  const {state} = useSearch();
  const close = useCallback((restoreFocus = false) => {
    if (container.current) container.current.open = false;
    setOpen(false);
    if (restoreFocus) trigger.current?.focus({preventScroll: true});
  }, []);

  useEffect(() => {close();}, [pathname, close]);
  useEffect(() => {if (state.surface === 'dialog') close();}, [state.surface, close]);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) close();
    };
    const escape = (event: KeyboardEvent) => {
      if (!event.defaultPrevented && !event.isComposing && event.key === 'Escape' && container.current?.open) {
        event.preventDefault();
        close(true);
      }
    };
    // Al cambiar de composición no debe quedar abierto un selector oculto.
    const observer = new ResizeObserver(() => {
      if (!trigger.current?.getClientRects().length) close();
    });
    if (trigger.current) observer.observe(trigger.current);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      observer.disconnect();
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [close]);

  return {container, trigger, open, close, onToggle: () => setOpen(container.current?.open ?? false)};
}
