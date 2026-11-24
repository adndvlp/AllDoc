import {useEffect, useState} from 'react';
import type {RuntimeEvent} from '@site/src/practice/contracts';
import styles from '../PracticePanel/styles.module.css';

function WorkbookDownload({path, bytes}: Extract<RuntimeEvent, {type: 'file'}>) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const type = path.toLowerCase().endsWith('.xltx')
      ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.template'
      : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const created = URL.createObjectURL(new Blob([new Uint8Array(bytes)], {type}));
    setUrl(created);
    return () => URL.revokeObjectURL(created);
  }, [path, bytes]);
  return <p><a href={url} download={path.split('/').at(-1)}>Descargar {path}</a></p>;
}

export default function PracticeResults({events, revision}: {events: readonly RuntimeEvent[]; revision: number}) {
  if (!events.length) return <p>Todavía no has ejecutado código.</p>;
  const end = events.slice().reverse().find((event) => event.type === 'end');
  return <>
    {events[0].revision !== revision && <p role="status">Este resultado corresponde a una versión anterior del código.</p>}
    {events.map((event, index) => {
      if (event.type === 'stream') return <pre key={index}>{event.text}</pre>;
      if (event.type === 'error') return <p key={index} role="alert">{event.file && <strong>{event.file}{event.line ? ':' + event.line : ''}{event.column ? ':' + event.column : ''}: </strong>}{event.message}</p>;
      if (event.type === 'file') return <WorkbookDownload key={index} {...event} />;
      if (event.type === 'table') return <div key={index}>
        <div className={styles.table} role="region" aria-label={`Tabla de resultado ${index + 1}`} tabIndex={0}>
          <table><caption className="sr-only">Resultado {index + 1}</caption>
            <thead><tr>{event.columns.map((column, columnIndex) => <th key={columnIndex} scope="col">{column.name}</th>)}</tr></thead>
            <tbody>{event.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, columnIndex) => <td key={columnIndex}>{String(cell ?? 'NULL')}</td>)}</tr>)}</tbody>
          </table>
        </div>
        {event.truncated && <p>Vista previa truncada.</p>}
      </div>;
      return null;
    })}
    {end?.type === 'end' && <p role="status">{({success: 'Ejecución completada', error: 'La ejecución terminó con error', cancelled: 'Ejecución detenida', timeout: 'Se alcanzó el tiempo máximo'})[end.status]}</p>}
  </>;
}
