import {useEffect, useId, useRef, useState} from 'react';
import {defaultPalette, getPalette, palettes, paletteStorageKey} from '@site/src/content/palettes';
import type {PaletteId} from '@site/src/content/palettes';
import styles from './styles.module.css';

export default function PaletteSelector() {
  const [selected, setSelected] = useState<PaletteId>(defaultPalette);
  const container = useRef<HTMLDetailsElement>(null);
  const groupId = useId();
  const active = getPalette(selected);

  useEffect(() => {
    setSelected(getPalette(document.documentElement.dataset.palette).id);
    const dismiss = (event: PointerEvent) => {
      if (container.current && event.target instanceof Node && !container.current.contains(event.target)) {
        container.current.open = false;
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && container.current?.open) {
        event.preventDefault();
        container.current.open = false;
        container.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  function selectPalette(id: PaletteId) {
    document.documentElement.dataset.palette = id;
    setSelected(id);
    try {
      localStorage.setItem(paletteStorageKey, id);
    } catch {
      // La vista previa sigue funcionando si el navegador bloquea el guardado.
    }
  }

  return (
    <details ref={container} className={styles.control}>
      <summary className={styles.trigger} aria-label={'Elegir color de texto: ' + active.name}>
        <span className={styles.preview} aria-hidden="true" style={{color: active.color}}>Aa</span>
        <span className={styles.triggerLabel}>Texto</span>
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </summary>
      <div className={styles.panel}>
        <fieldset className={styles.options}>
          <legend>Color de texto</legend>
          {palettes.map((palette) => (
            <label key={palette.id} className={styles.option} data-selected={selected === palette.id}>
              <input className="sr-only" type="radio" name={groupId} value={palette.id} checked={selected === palette.id} onChange={() => selectPalette(palette.id)} />
              <span className={styles.sample} aria-hidden="true" style={{color: palette.color}}>Aa</span>
              <span className={styles.copy}><strong style={{color: palette.color}}>{palette.name}</strong><small>{palette.description}</small></span>
              <span className={styles.check} aria-hidden="true">{selected === palette.id ? '✓' : ''}</span>
            </label>
          ))}
        </fieldset>
        <p className={styles.hint}>Cambia al instante. Se recuerda tu elección.</p>
      </div>
    </details>
  );
}
