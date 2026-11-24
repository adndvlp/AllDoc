import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

function TableauSetup() {
  return <details className={styles.more}>
    <summary>Preparar los datos de Tableau</summary>
    <p>El temario usa Tableau Desktop 2024.2 o posterior con la interfaz en inglés. Tableau Desktop Public Edition también permite practicar con los CSV locales. Las fichas indican cuándo usar Prep, Server o Cloud.</p>
    <ol>
      <li>Descarga y descomprime <a href="/practice/tableau/tableau-laboratorio.zip" download>tableau-laboratorio.zip</a>.</li>
      <li>Abre <code>ventas.csv</code> desde <strong>Connect → Text File</strong>. En <strong>Data Source</strong>, comprueba los tipos de fecha y los importes.</li>
      <li>Sigue <code>preparar-datos.md</code> para configurar las dimensiones, crear los campos calculados y comprobar los totales. Conecta los otros CSV cuando una ficha los use.</li>
    </ol>
    <p><a href="https://help.tableau.com/current/pro/desktop/en-us/examples_text.htm">Conectar archivos de texto</a> · <a href="https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_create.htm">Crear campos calculados</a></p>
  </details>;
}

export function TableauCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de Tableau');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="tableau" language="text"
    controls={<TableauSetup />} formatText={inlineCode} />;
}
