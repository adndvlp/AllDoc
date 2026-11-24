import {useEffect, useState} from 'react';
import type {RuntimeEvent} from '@site/src/practice/contracts';
import styles from '../PracticePanel/styles.module.css';

function useArtifactUrl(bytes: Uint8Array, type: string) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const created = URL.createObjectURL(new Blob([new Uint8Array(bytes)], {type}));
    setUrl(created);
    return () => URL.revokeObjectURL(created);
  }, [bytes, type]);
  return url;
}

function ArtifactDownload({path, bytes}: Extract<RuntimeEvent, {type: 'file'}>) {
  const extension = path.toLowerCase().split('.').at(-1);
  const type = extension === 'xlsx' || extension === 'xltx'
    ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.' + (extension === 'xlsx' ? 'sheet' : 'template')
    : 'application/octet-stream';
  const url = useArtifactUrl(bytes, type);
  return <p><a href={url} download={path.split('/').at(-1)}>Descargar {path}</a></p>;
}

function PlotResult({title, bytes, number}: Extract<RuntimeEvent, {type: 'figure'}> & {number: number}) {
  const url = useArtifactUrl(bytes, 'image/png');
  return <figure className={styles.resultFigure}>
    <figcaption>{title}</figcaption>
    {url && <img src={url} alt={title} />}
    <a href={url} download={`grafica-${number}.png`}>Descargar gráfica PNG</a>
  </figure>;
}

export default function PracticeResults({events, revision}: {events: readonly RuntimeEvent[]; revision: number}) {
  if (!events.length) return <p>Todavía no has ejecutado código.</p>;
  const end = events.slice().reverse().find((event) => event.type === 'end');
  let figureNumber = 0;
  return <>
    {events[0].revision !== revision && <p role="status">Este resultado corresponde a una versión anterior del código.</p>}
    {events.map((event, index) => {
      if (event.type === 'stream') return <pre key={index}>{event.text}</pre>;
      if (event.type === 'error') return <p key={index} role="alert">{event.file && <strong>{event.file}{event.line ? ':' + event.line : ''}{event.column ? ':' + event.column : ''}: </strong>}{event.message}</p>;
      if (event.type === 'figure') return <PlotResult key={index} number={++figureNumber} {...event} />;
      if (event.type === 'file') return <ArtifactDownload key={index} {...event} />;
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
