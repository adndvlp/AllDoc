import {getPandasConcept} from '@site/src/content/notes/pandas';
import {getConcept} from '@site/src/content/concepts';
import {ConceptNote, type NoteContent} from '../ConceptNote';
import styles from '../SqlNotes/styles.module.css';

export function PandasConceptCard({conceptId}: {conceptId: string}) {
  const concept = getPandasConcept(conceptId);
  if (!concept) throw new Error('Concepto pandas desconocido: ' + conceptId);
  return <ConceptNote concept={concept} conceptId={concept.id} kind="pandas" language="python" />;
}

export function PandasCourseCard({note}: {note?: Omit<NoteContent, 'title' | 'description'> & {id: string}}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha de pandas desconocida');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="pandas" language="python"
    afterContent={<a className={styles.datasetLink} href="/practice/pandas/datos.py" download>Descargar los datos de los ejemplos</a>} />;
}
