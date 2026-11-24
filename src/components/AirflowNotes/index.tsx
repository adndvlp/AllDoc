import CodeBlock from '@theme/CodeBlock';
import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

const install = [
  'python3.11 -m venv .venv',
  'source .venv/bin/activate',
  'export AIRFLOW_HOME="$HOME/airflow-alldoc"',
  'V=3.1.7',
  'C="https://raw.githubusercontent.com/apache/airflow/constraints-$V/constraints-3.11.txt"',
  'python -m pip install "apache-airflow==$V" --constraint "$C"',
].join('\n');

const loadLab = [
  'mkdir -p "$AIRFLOW_HOME/dags" /tmp/alldoc_airflow',
  'cp orders.csv /tmp/alldoc_airflow/orders.csv',
  'cp dag_resumen_ventas.py "$AIRFLOW_HOME/dags/"',
  'airflow standalone',
].join('\n');

function AirflowSetup() {
  return <details className={styles.more}>
    <summary>Preparar el laboratorio de Airflow</summary>
    <p>Usa Python 3.11 con Airflow 3.1.7 en Linux, macOS o WSL2. Mantén el mismo entorno virtual y <code>AIRFLOW_HOME</code> en las terminales del laboratorio.</p>
    <ol>
      <li>Descarga <a href="/practice/airflow/airflow-laboratorio.zip" download>airflow-laboratorio.zip</a>. Descomprime y abre la carpeta <code>airflow-laboratorio</code> en la terminal.</li>
      <li>Instala la versión del temario con las dependencias fijadas para Python 3.11.
        <CodeBlock language="bash">{install}</CodeBlock>
      </li>
      <li>Copia los pedidos y el DAG de ventas a su ubicación de práctica e inicia Airflow.
        <CodeBlock language="bash">{loadLab}</CodeBlock>
      </li>
      <li>Abre <code>http://localhost:8080</code> con las credenciales que muestra la terminal. Activa <code>alldoc_resumen_ventas</code> y pulsa Trigger DAG. Revisa la ejecución en Grid y Logs. El DAG escribe el resumen en <code>/tmp/alldoc_airflow/resumen.json</code>.</li>
    </ol>
    <p>Para los fragmentos destinados al cuerpo de un DAG, copia <code>dag_ejemplo.py</code> a <code>dags/</code> con un ID único y sustituye <code>pass</code>, conservando la indentación. Las fichas indican cuándo usar un archivo completo, ejecutar un comando en la terminal o configurar un servicio externo.</p>
    <p><a href="https://airflow.apache.org/docs/apache-airflow/3.1.7/start.html">Inicio rápido de Apache Airflow 3.1.7</a></p>
  </details>;
}

export function AirflowCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de Airflow');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="airflow" language="python"
    controls={<AirflowSetup />} formatText={inlineCode} />;
}
