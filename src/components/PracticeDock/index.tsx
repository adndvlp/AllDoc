import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from 'react';
import {usePractice} from '../PracticeProvider';
import {practiceLayout, practiceSize, type PracticeSpace} from '@site/src/practice/layout';
import PracticePanel from '../PracticePanel';
import styles from './styles.module.css';

export default function PracticeDock({children}: {children: ReactNode}) {
  const practice = usePractice(); const frame = useRef<HTMLDivElement>(null);
  const ruler = useRef<HTMLSpanElement>(null);
  const [space, setSpace] = useState<PracticeSpace>({width: 0, height: 0, rem: 16});
  const [sizes, setSizes] = useState<{parallel?: number; bottom?: number}>({});
  const mode = practiceLayout(space); const bounds = practiceSize(space, mode, mode === 'modal' ? undefined : sizes[mode]);
  const open = practice.visible;
  const label = practice.context?.toolKey === 'analisis-de-datos/sql' ? 'SQL'
    : practice.context?.toolKey === 'analisis-de-datos/pandas' ? 'pandas' : practice.context?.profile.label ?? '';
  useEffect(() => {
    const element = frame.current!;
    const update = () => {
      const rect = element.getBoundingClientRect(); const viewport = window.visualViewport;
      const next = {width: rect.width, height: Math.min(rect.height, viewport?.height ?? innerHeight), rem: parseFloat(getComputedStyle(document.documentElement).fontSize)};
      setSpace((previous) => previous.width === next.width && previous.height === next.height && previous.rem === next.rem ? previous : next);
    };
    const observer = new ResizeObserver(update); observer.observe(element); observer.observe(document.documentElement);
    if (ruler.current) observer.observe(ruler.current);
    const mutation = new MutationObserver(update); mutation.observe(document.documentElement, {attributes: true, attributeFilter: ['style', 'class']});
    window.visualViewport?.addEventListener('resize', update); update();
    return () => {observer.disconnect(); mutation.disconnect(); window.visualViewport?.removeEventListener('resize', update);};
  }, []);
  const setSize = (value?: number) => {if (mode !== 'modal') setSizes((previous) => ({...previous, [mode]: value}));};
  return <div ref={frame} className={styles.workspace} data-practice-layout={open ? mode : 'closed'}
    style={{'--practice-size': bounds.value + 'px'} as CSSProperties}>
    <span ref={ruler} aria-hidden="true" style={{position: 'absolute', width: '1rem', height: '1rem', visibility: 'hidden', pointerEvents: 'none'}} />
    <div className={styles.reading}>
      {children}
      {practice.context && <button className={styles.trigger} data-practice-trigger type="button" aria-expanded={open} aria-controls="alldoc-practice-panel"
        aria-label={'Practicar ' + label} title={'Practicar ' + label} aria-haspopup="dialog"
        onClick={(event) => {event.currentTarget.focus({preventScroll: true}); void practice.open();}}>
        <span className={styles.triggerIcon} aria-hidden="true">&lt;/&gt;</span><span className={styles.triggerLabel} aria-hidden="true">Practicar {label}</span>
      </button>}
    </div>
    {open && mode !== 'modal' && <div role="separator" tabIndex={0} aria-label="Tamaño de práctica"
      aria-orientation={mode === 'parallel' ? 'vertical' : 'horizontal'} aria-valuemin={bounds.min} aria-valuemax={bounds.max} aria-valuenow={bounds.value}
      className={styles.separator} title="Arrastra o usa las flechas. Inicio restablece el tamaño." onKeyDown={(event) => {
        if (event.key === 'Home') {event.preventDefault(); setSize();}
        else if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
          event.preventDefault(); setSize(practiceSize(space, mode, bounds.value + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? 16 : -16)).value);
        }
      }} onDoubleClick={() => setSize()} onPointerDown={(event) => {event.currentTarget.setPointerCapture(event.pointerId);}}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        const rect = frame.current!.getBoundingClientRect();
        setSize(practiceSize(space, mode, mode === 'parallel' ? rect.right - event.clientX : rect.bottom - event.clientY).value);
      }} onPointerUp={(event) => {event.currentTarget.releasePointerCapture(event.pointerId);}} />}
    {practice.context && (practice.requested || practice.manager) && <PracticePanel layout={mode} />}
  </div>;
}
