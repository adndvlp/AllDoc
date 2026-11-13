import {useEffect, useId, useState} from 'react';
import {defaultPalette, getPalette, palettes, paletteStorageKey} from '@site/src/content/palettes';
import type {PaletteId} from '@site/src/content/palettes';
import {useHeaderDisclosure} from '@site/src/hooks/useHeaderDisclosure';
import styles from './styles.module.css';

export default function PaletteSelector() {
  const [selected, setSelected] = useState<PaletteId>(defaultPalette);
  const disclosure = useHeaderDisclosure();
  const groupId = useId();
  const active = getPalette(selected);

  useEffect(() => {
    setSelected(getPalette(document.documentElement.dataset.palette).id);
  }, []);

  function selectPalette(id: PaletteId) {
    document.documentElement.dataset.palette = id;
    setSelected(id);
    disclosure.close(true);
    try {
      localStorage.setItem(paletteStorageKey, id);
    } catch {
      // La vista previa sigue funcionando si el navegador bloquea el guardado.
    }
  }

  return (
    <details ref={disclosure.container} className={styles.control} onToggle={disclosure.onToggle}>
      <summary ref={disclosure.trigger} className={styles.trigger} aria-expanded={disclosure.open} aria-label={'Elegir color de texto: ' + active.name}>
        <span className={styles.preview} aria-hidden="true" style={{color: active.color}}>Aa</span>
        <span className={styles.triggerLabel} data-header-label>Texto</span>
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </summary>
      <div className={styles.panel}>
        <fieldset className={styles.options}>
          <legend>Color de texto</legend>
          {palettes.map((palette) => (
            <label key={palette.id} className={styles.option} data-selected={selected === palette.id}>
              <input className="sr-only" type="radio" name={groupId} value={palette.id} checked={selected === palette.id}
                onChange={() => selectPalette(palette.id)} onClick={() => {if (selected === palette.id) disclosure.close(true);}} />
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
