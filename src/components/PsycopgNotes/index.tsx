import CodeBlock from '@theme/CodeBlock';
import {getConcept} from '@site/src/content/concepts';
import {ConceptNote} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import styles from '../SqlNotes/styles.module.css';

const context = `import psycopg
from lab_psycopg import DSN

with psycopg.connect(DSN) as conn:
    with conn.cursor() as cur:
        # Pega aquí el ejemplo.
        pass
    conn.rollback()`;

function PsycopgSetup() {
  return <details className={styles.more}>
    <summary>Preparar tu entorno de PostgreSQL</summary>
    <p>Usa Python 3.10 o posterior y una base de práctica en PostgreSQL 15 o posterior. Los ejemplos con t-strings requieren Python 3.14 o posterior.</p>
    <ol>
      <li>Instala Psycopg 3 en el entorno donde ejecutarás los ejemplos.
        <CodeBlock language="bash">{'python -m pip install "psycopg[binary]>=3.3,<3.4"'}</CodeBlock>
      </li>
      <li>Crea una base de práctica y configura <code>PGHOST</code>, <code>PGPORT</code>, <code>PGDATABASE</code> y <code>PGUSER</code>. Usa <code>PGPASSFILE</code> o <code>PGPASSWORD</code> si hace falta. También puedes usar <code>DATABASE_URL</code>.</li>
      <li>Guarda <a href="/practice/psycopg/lab_psycopg.py" download>lab_psycopg.py</a> junto a tus ejemplos y ejecútalo con <code>python lab_psycopg.py</code>. El script recrea las tablas <code>alldoc_psycopg.clientes</code> y <code>alldoc_psycopg.pedidos</code> con sus datos iniciales.</li>
      <li>Importa <code>DSN</code> para usar la misma configuración. Usa este bloque si el ejemplo necesita <code>conn</code> o <code>cur</code>. Si el ejemplo abre su propia conexión, usa solo las importaciones.
        <CodeBlock language="python">{context}</CodeBlock>
      </li>
    </ol>
  </details>;
}

export function PsycopgCourseCard({note}: {note?: CourseNote}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha desconocida de Psycopg');
  return <ConceptNote concept={{...metadata, ...note}} conceptId={note.id} kind="psycopg" language="python"
    controls={<PsycopgSetup />} formatText={inlineCode} />;
}
