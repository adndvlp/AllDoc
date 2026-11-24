import CodeBlock from '@theme/CodeBlock';
import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

const install = `python -m venv .venv
source .venv/bin/activate
python -m pip install 'dbt-core>=1.10.6,<1.11' 'dbt-postgres>=1.10,<1.11'`;

function DbtSetup() {
  return <details className={styles.more}>
    <summary>Preparar el proyecto de dbt</summary>
    <p>El laboratorio usa Python 3.11, dbt Core 1.10 y PostgreSQL 15 o posterior.</p>
    <ol>
      <li>Descarga <a href="/practice/dbt/tienda_dbt.zip" download>tienda_dbt.zip</a>, descomprímelo y abre la carpeta <code>tienda_dbt</code> en tu terminal.</li>
      <li>Crea el entorno virtual e instala dbt con su adaptador de PostgreSQL. En PowerShell activa el entorno con <code>.venv\Scripts\Activate.ps1</code>.
        <CodeBlock language="bash">{install}</CodeBlock>
      </li>
      <li>Crea una base de práctica llamada <code>analytics_lab</code> y ejecuta <code>datos.sql</code> una vez en ella. El archivo crea cuatro clientes y cinco pedidos en el esquema <code>raw</code>.</li>
      <li>Añade el perfil <code>tienda_dbt</code> de <code>profiles.example.yml</code> a <code>~/.dbt/profiles.yml</code>. Ajusta los datos de conexión a tu instancia y configura <code>DBT_ENV_SECRET_PASSWORD</code> en la terminal.</li>
      <li>Comprueba la conexión, construye el proyecto y consulta los ingresos por cliente.
        <CodeBlock language="bash">{'dbt debug\ndbt build\ndbt show --select customer_revenue'}</CodeBlock>
      </li>
    </ol>
    <p>Si una ficha propone una variante de un archivo base, restáuralo al terminar el ejemplo.</p>
  </details>;
}

export function DbtCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de dbt');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="dbt" language="sql"
    controls={<DbtSetup />} formatText={inlineCode} />;
}
