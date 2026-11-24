import type {ReactNode} from 'react';
import {getConcept} from '@site/src/content/concepts';
import {ConceptNote, type NoteContent} from '../ConceptNote';
import styles from '../SqlNotes/styles.module.css';

export type CourseNote = Omit<NoteContent, 'title' | 'description'> & {id: string};

export function inlineCode(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    index % 2 ? <code key={index}>{part.slice(1, -1)}</code> : part);
}

export function PythonCourseNote({note, kind, formatText, downloadLabel = 'Descargar los datos de los ejemplos'}: {
  note?: CourseNote; kind: 'pandas' | 'openpyxl' | 'numpy' | 'scipy' | 'matplotlib' | 'seaborn' | 'sqlalchemy' | 'sqlite3' | 'json' | 'requests' | 'httpx';
  formatText?: (text: string) => ReactNode; downloadLabel?: string;
}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de ' + kind);
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind={kind} language="python"
    formatText={formatText}
    afterContent={<a className={styles.datasetLink} href={`/practice/${kind}/datos.py`} download>{downloadLabel}</a>} />;
}
