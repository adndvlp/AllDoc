import CodeBlock from '@theme/CodeBlock';
import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

function PysparkSetup() {
  return <details className={styles.more}>
    <summary>Preparar el laboratorio de PySpark</summary>
    <p>Los ejemplos usan PySpark 4.1.0, Python 3.10 o posterior y Java 17 o posterior compatible con Spark.</p>
    <ol>
      <li>Instala PySpark en tu entorno virtual.
        <CodeBlock language="bash">{'python -m pip install "pyspark==4.1.0"'}</CodeBlock>
      </li>
      <li>Descarga <a href="/practice/pyspark/lab_pyspark.py" download>lab_pyspark.py</a>. Desde su carpeta, abre una sesión nueva con los siete DataFrames y los archivos de ejemplo.
        <CodeBlock language="bash">{'python -i lab_pyspark.py'}</CodeBlock>
        En un notebook de Jupyter puedes usar <code>%run lab_pyspark.py</code>.
      </li>
      <li>Ejecuta el código de cada ficha en esa sesión, siguiendo su nota cuando indique otro entorno. Termina con <code>spark.stop()</code>.</li>
    </ol>
    <p>La preparación guarda los datos en un directorio temporal. Los ejemplos de Spark Connect, Kafka, catálogos externos y pipelines declarativos requieren su propio entorno.</p>
    <p><a href="https://spark.apache.org/docs/4.1.0/api/python/getting_started/install.html">Instalación y dependencias opcionales</a> · <a href="https://spark.apache.org/docs/4.1.0/">Guía de Apache Spark 4.1.0</a></p>
  </details>;
}

export function PysparkCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de PySpark');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="pyspark" language="python"
    controls={<PysparkSetup />} formatText={inlineCode} />;
}
