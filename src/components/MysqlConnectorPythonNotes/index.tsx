import CodeBlock from '@theme/CodeBlock';
import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

const files = '/practice/mysql-connector-python';

function MysqlSetup() {
  return <details className={styles.more}>
    <summary>Preparar tu entorno de MySQL</summary>
    <p>Usa Python 3.11 o posterior y una instancia de MySQL 8.4 LTS.</p>
    <ol>
      <li>Instala el conector en el entorno donde ejecutarás los ejemplos.
        <CodeBlock language="bash">{'python -m pip install "mysql-connector-python>=9.4,<10"'}</CodeBlock>
      </li>
      <li>Ejecuta <a href={`${files}/datos.sql`} download>datos.sql</a> en el cliente MySQL o Workbench. El script crea la base de laboratorio con cuatro clientes y cinco pedidos.</li>
      <li>Guarda <a href={`${files}/lab_mysql.py`} download>lab_mysql.py</a> junto a tus scripts. Configura <code>MYSQL_USER</code> y <code>MYSQL_PASSWORD</code> con tu cuenta de laboratorio. Si tu servidor usa otra dirección o puerto, configura <code>MYSQL_HOST</code> y <code>MYSQL_PORT</code>.</li>
      <li>Ejecuta estas importaciones antes de los ejemplos Python.
        <CodeBlock language="python">{'from lab_mysql import abrir, CONFIG\nimport mysql.connector\nfrom decimal import Decimal\nfrom datetime import date, datetime, timedelta'}</CodeBlock>
      </li>
    </ol>
  </details>;
}

export function MysqlConnectorPythonCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de MySQL Connector/Python');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="mysql-connector-python" language="python"
    controls={<MysqlSetup />} formatText={inlineCode} />;
}
