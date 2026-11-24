import CodeBlock from '@theme/CodeBlock';
import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

const installPython = 'python -m pip install "snowflake-connector-python[pandas]" snowflake-snowpark-python';
const openSession = 'from snowflake.snowpark import Session\nsession = Session.builder.config("connection_name", "alldoc").create()';

function SnowflakeSetup() {
  return <details className={styles.more}>
    <summary>Preparar el laboratorio de Snowflake</summary>
    <ol>
      <li>Descarga <a href="/practice/snowflake/snowflake-laboratorio.zip" download>snowflake-laboratorio.zip</a> y descomprímelo.</li>
      <li>Ejecuta <code>preparar.sql</code> desde Snowsight o un cliente SQL conectado a una cuenta de pruebas, con un rol autorizado. Usa recursos exclusivos para <code>ALLDOC_WH</code> y <code>ALLDOC_LAB.PRACTICE</code>. El script prepara seis tablas de muestra y repone sus datos si lo repites.</li>
      <li>Para las fichas de carga, usa <code>ventas.csv</code> con el stage y el formato que indica la ficha. Para ejecutar <code>PUT</code> con un archivo local, usa Snowflake CLI o un cliente compatible. También puedes subir el archivo a un stage interno desde Snowsight.</li>
      <li>Para los ejemplos de Python, instala las bibliotecas en un entorno virtual.
        <CodeBlock language="bash">{installPython}</CodeBlock>
        Incorpora el bloque <code>[alldoc]</code> de <code>connections.example.toml</code> a tu <code>connections.toml</code>. Completa los datos de tu cuenta y el método de autenticación autorizado. Para las fichas de Snowpark que usan <code>session</code>, abre la sesión así y ciérrala con <code>session.close()</code> al terminar.
        <CodeBlock language="python">{openSession}</CodeBlock>
      </li>
    </ol>
    <p>Al terminar, detén las tareas y servicios creados para la práctica y suspende el warehouse si es exclusivo del laboratorio.</p>
    <p><a href="https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-connect">Configurar la conexión de Python</a> · <a href="https://docs.snowflake.com/en/user-guide/data-load-local-file-system-stage-ui">Subir archivos desde Snowsight</a></p>
  </details>;
}

export function SnowflakeCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de Snowflake');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="snowflake" language="sql"
    controls={<SnowflakeSetup />} formatText={inlineCode} />;
}
