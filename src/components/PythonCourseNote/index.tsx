import type {ReactNode} from 'react';
import {getConcept} from '@site/src/content/concepts';
import {ConceptNote, type NoteContent} from '../ConceptNote';
import styles from '../SqlNotes/styles.module.css';

export type CourseNote = Omit<NoteContent, 'title' | 'description'> & {id: string};

export function inlineCode(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    index % 2 ? <code key={index}>{part.slice(1, -1)}</code> : part);
}

export function PythonCourseNote({note, kind, formatText}: {
  note?: CourseNote; kind: 'pandas' | 'openpyxl' | 'numpy' | 'scipy' | 'sqlalchemy' | 'sqlite3' | 'json'; formatText?: (text: string) => ReactNode;
}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de ' + kind);
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind={kind} language="python"
    formatText={formatText}
    afterContent={<a className={styles.datasetLink} href={`/practice/${kind}/datos.py`} download>Descargar los datos de los ejemplos</a>} />;
}
