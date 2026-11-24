import {useEffect, useMemo, useRef, useState, type KeyboardEvent} from 'react';
import {usePractice} from '../PracticeProvider';
import {cellAddress, EXCEL_COLUMNS, EXCEL_ROWS, getSpreadsheet, readExcelEdits, sheetsWorkbook} from '@site/src/practice/adapters/excel/workbook';
import {excelSuggestions} from '@site/src/practice/adapters/excel/suggestions';
import styles from './styles.module.css';

const arrows: Record<string, readonly [number, number]> = {ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1]};

export default function ExcelWorkbook({datasetId}: {datasetId: string}) {
  const practice = usePractice();
  const workbook = getSpreadsheet(datasetId);
  const {state, manager, error} = practice;
  const draft = state.draft;
  const workspace = draft?.workspace.id === practice.context?.workspaceKey ? draft?.workspace : undefined;
  const file = workspace?.files[0];
  const [sheet, setSheet] = useState(workbook.scratch);
  const [cell, setCell] = useState({row: 1, column: 1});
  const [edit, setEdit] = useState<{value: string; caret: number} | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const calculated = useRef('');
  const edits = useMemo(() => readExcelEdits(file?.content ?? '{}', workbook), [file?.content, workbook]);
  const rows = workbook.sheets.find(item => item.name === sheet)?.rows;
  const preview = state.schema.entities.find(entity => entity.name === sheet)?.preview;
  const address = cellAddress(sheet, cell.row, cell.column);
  const raw = edits[address] ?? rows?.[cell.row - 1]?.[cell.column - 1] ?? '';
  const value = edit?.value ?? raw;
  const suggestions = edit ? excelSuggestions(edit.value, edit.caret, workbook === sheetsWorkbook) : null;
  const ready = state.phase === 'ready' && Boolean(workspace);

  useEffect(() => {
    setSheet(workbook.scratch);
    setCell({row: 1, column: 1});
    setEdit(null);
  }, [state.codeAction, workbook]);

  useEffect(() => {
    if (!ready || !workspace || !file || !manager) return;
    const key = state.generation + '/' + workspace.revision;
    if (calculated.current === key) return;
    calculated.current = key;
    if (file.content !== '{}' || state.schema.version > 0) void manager.execute();
  }, [ready, state.generation, state.schema.version, workspace, file, manager]);

  function select(row: number, column: number) {
    setCell({row, column});
    setEdit(null);
  }
  function move(event: KeyboardEvent<HTMLButtonElement>, row: number, column: number) {
    if (event.key === 'Enter' || event.key === 'F2') {
      event.preventDefault();
      input.current?.focus();
      return;
    }
    const delta = arrows[event.key];
    if (!delta) return;
    event.preventDefault();
    const nextRow = Math.min(EXCEL_ROWS, Math.max(1, row + delta[0]));
    const nextColumn = Math.min(EXCEL_COLUMNS.length, Math.max(1, column + delta[1]));
    select(nextRow, nextColumn);
    grid.current?.querySelector<HTMLButtonElement>(`[data-excel-cell="${cellAddress(sheet, nextRow, nextColumn)}"]`)?.focus();
  }
  function apply() {
    if (!ready || !file || !manager || !edit) return;
    manager.edit(file.path, JSON.stringify({...edits, [address]: edit.value}));
    setEdit(null);
  }

  if (error || state.phase === 'error') return <div className={styles.book} role="alert">
    <p>No se pudo preparar el libro. {error ?? state.error}</p>
    <button type="button" onClick={() => void (error ? practice.open() : manager?.retry())}>Reintentar</button>
  </div>;

  return <section className={styles.book} data-excel-workbook aria-label="Libro de práctica">
    <nav className={styles.sheets} aria-label="Hojas del libro">
      {workbook.sheets.map(({name}) => <button key={name} type="button" aria-pressed={sheet === name} onClick={() => {
        setSheet(name); select(1, 1); grid.current?.scrollTo({top: 0, left: 0});
      }}>{name}</button>)}
    </nav>
    <form className={styles.formula} onSubmit={event => {event.preventDefault(); apply();}}>
      <output aria-label="Celda activa">{address}</output>
      <input ref={input} type="text" aria-label="Valor o fórmula" aria-autocomplete="list" spellCheck={false}
        autoCapitalize="off" autoComplete="off" maxLength={8192} value={value} disabled={!ready}
        onChange={event => setEdit({value: event.target.value, caret: event.target.selectionStart ?? event.target.value.length})}
        onKeyDown={event => {if (event.key === 'Escape' && edit) {event.stopPropagation(); setEdit(null);}}} />
      <button type="submit" disabled={!ready || !edit}>Aplicar</button>
    </form>
    {suggestions?.items.length ? <div className={styles.suggestions} aria-label="Sugerencias de fórmula">
      {suggestions.items.map(item => <button key={item.label} type="button" onClick={() => {
        const next = value.slice(0, suggestions.from) + item.insertText + value.slice(suggestions.to);
        const caret = suggestions.from + item.insertText.length;
        setEdit({value: next, caret});
        input.current?.focus();
        requestAnimationFrame(() => input.current?.setSelectionRange(caret, caret));
      }}>{item.label}</button>)}
    </div> : null}
    <div ref={grid} className={styles.grid} tabIndex={0} role="region" aria-label={'Cuadrícula ' + sheet}>
      <table role="grid" aria-label={'Hoja ' + sheet}>
        <thead><tr><th scope="col" aria-label="Fila" />{EXCEL_COLUMNS.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>{Array.from({length: EXCEL_ROWS}, (_, index) => {
          const row = index + 1;
          return <tr key={row}><th scope="row">{row}</th>{EXCEL_COLUMNS.map((letter, i) => {
            const column = i + 1, active = row === cell.row && column === cell.column;
            const location = cellAddress(sheet, row, column);
            const display = preview?.rows[index]?.[i] ?? rows?.[index]?.[i] ?? '';
            return <td key={letter} aria-selected={active}><button type="button" data-excel-cell={location} tabIndex={active ? 0 : -1}
              aria-label={letter + row + (display === '' ? ', vacía' : ', ' + display)}
              onClick={() => select(row, column)} onDoubleClick={() => input.current?.focus()}
              onKeyDown={event => move(event, row, column)}>{display}</button></td>;
          })}</tr>;
        })}</tbody>
      </table>
    </div>
    <div className={styles.actions}>
      <button type="button" disabled={!ready} onClick={() => void manager?.restoreInitialCode()}>Restaurar libro</button>
      {state.draft?.previous && <button type="button" onClick={() => manager?.restorePreviousCode()}>Recuperar libro anterior</button>}
    </div>
  </section>;
}
