import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

function PowerBiSetup() {
  return <details className={styles.more}>
    <summary>Preparar el modelo de Power BI</summary>
    <p>Usa Power BI Desktop en Windows para preparar el modelo. Cada ficha indica cuándo necesitas Power BI Service, Fabric o Report Builder.</p>
    <ol>
      <li>Descarga y descomprime <a href="/practice/powerbi/powerbi-laboratorio.zip" download>powerbi-laboratorio.zip</a>.</li>
      <li>Importa los siete CSV desde <strong>Inicio → Obtener datos → Texto o CSV</strong>. Selecciona UTF-8 y conserva los nombres de los archivos sin la extensión.</li>
      <li>Sigue <code>preparar-modelo.md</code> para asignar tipos, crear las relaciones, añadir <code>Calendario</code> y definir cada medida inicial por separado.</li>
    </ol>
    <p>Las fórmulas DAX usan nombres de funciones en inglés y comas entre argumentos. Ajusta los separadores si tu configuración regional lo requiere.</p>
    <p><a href="https://learn.microsoft.com/en-us/power-query/connectors/text-csv">Importar desde Texto o CSV</a> · <a href="https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships">Crear relaciones en Desktop</a></p>
  </details>;
}

export function PowerBiCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de Power BI');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="powerbi" language="dax"
    controls={<PowerBiSetup />} formatText={inlineCode} />;
}
