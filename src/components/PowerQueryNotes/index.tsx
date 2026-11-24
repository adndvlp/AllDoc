import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

function PowerQuerySetup() {
  return <details className={styles.more}>
    <summary>Preparar los datos de Power Query</summary>
    <p>Usa el editor de Power Query en Power BI Desktop o en Excel. Los conectores y algunos comandos dependen de la versión y la plataforma.</p>
    <ol>
      <li>Descarga <a href="/practice/power-query/power-query-datos.zip" download>power-query-datos.zip</a> y descomprímelo.</li>
      <li>En Power BI Desktop, abre <strong>Inicio → Transformar datos → Nueva fuente → Consulta en blanco</strong>. En Excel, usa <strong>Datos → Obtener datos → Consulta en blanco</strong> cuando esté disponible.</li>
      <li>Crea una consulta por archivo. Abre el Editor avanzado, pega el contenido completo y nombra las consultas <code>Pedidos</code>, <code>Clientes</code>, <code>Leads</code>, <code>Presupuesto</code> e <code>Importacion</code>.</li>
      <li>Usa una consulta en blanco para pegar cada ejemplo M. Para practicar los pasos de la interfaz, duplica la consulta base cuando necesites modificarla.</li>
    </ol>
  </details>;
}

export function PowerQueryCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de Power Query');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="power-query" language="powerquery"
    controls={<PowerQuerySetup />} formatText={inlineCode} />;
}
