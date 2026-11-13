import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Icon from '@site/src/components/Icon';
import {areas} from '@site/src/content/areas';
import {sqlBasePath, sqlConcepts} from '@site/src/content/sql';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Tu biblioteca personal" description="Apuntes breves, ejemplos claros y conceptos a la mano. Tu biblioteca personal de análisis de datos, desarrollo web e IA.">
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span /> TU BIBLIOTECA PERSONAL</p>
            <h1 id="home-title">Lo que sabes,<br /><span>a la mano.</span></h1>
            <p className={styles.description}>Ese concepto que ya aprendiste y hoy se te escapó.<br className={styles.desktopBreak} /> Encuéntralo, recuérdalo y sigue.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} to="/apuntes/analisis-de-datos">Ver apuntes <Icon name="arrow" size={18} /></Link>
            </div>
            <p className={styles.collectionMeta}>3 áreas <span>·</span> 1 tema <span>·</span> {sqlConcepts.length} conceptos para empezar</p>
          </div>
          <article className={styles.preview} aria-labelledby="preview-title">
            <div className={styles.previewHeader}><span><span className={styles.dot} /> SQL</span><span>CONCEPTO 01</span></div>
            <div className={styles.previewBody}>
              <span className={styles.previewEyebrow}>PARA RECORDAR</span>
              <h2 id="preview-title">SELECT</h2>
              <p>Elige las columnas que quieres ver.</p>
              <CodeBlock language="sql">{sqlConcepts[0].examples[0].code}</CodeBlock>
              <div className={styles.previewReading}><Icon name="book" size={16} /><span>“Muéstrame todos los datos de los productos.”</span></div>
            </div>
            <Link to={sqlBasePath + '/select'} className={styles.previewFooter}><span>Abrir este concepto</span><Icon name="arrow" size={17} /></Link>
          </article>
        </section>

        <section className={styles.areas} aria-labelledby="areas-title">
          <div className={styles.sectionHeading}><h2 id="areas-title">Explora por área</h2><span>Tu conocimiento, en su lugar.</span></div>
          <div className={styles.areaGrid}>
            {areas.map((area) => (
              <Link key={area.id} to={'/apuntes/' + area.id} className={styles.areaCard + (area.available ? ' ' + styles.available : '')}>
                <div className={styles.cardTop}><span className={styles.areaIcon}><Icon name={area.icon} size={25} /></span><span className={styles.areaNumber}>{area.number}</span></div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <div className={styles.cardBottom}><span>{area.available && <span className={styles.statusDot} />}{area.status}</span><Icon name="arrow" size={18} /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.shortcuts} aria-labelledby="shortcuts-title">
          <div className={styles.shortcutHeading}><Icon name="book" size={18} /><h2 id="shortcuts-title">Directo al concepto</h2><span>SQL</span></div>
          <div className={styles.chips}>
            {sqlConcepts.map((concept) => <Link key={concept.id} to={sqlBasePath + '/' + concept.id}>{concept.title}<Icon name="arrow" size={14} /></Link>)}
          </div>
        </section>
      </main>
    </Layout>
  );
}
