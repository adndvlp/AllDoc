import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

export function RCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha de R desconocida');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="r" language="r" formatText={inlineCode}
    afterContent={<a className={styles.datasetLink} href="/practice/r/datos.R" download>Descargar los datos de los ejemplos</a>} />;
}
