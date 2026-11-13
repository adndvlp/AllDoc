import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import HomeSearch from '@site/src/components/HomeSearch';
import Icon from '@site/src/components/Icon';
import {areas} from '@site/src/content/areas';
import {getConceptsForTopic} from '@site/src/content/concepts';
import styles from './index.module.css';

export default function Home() {
  const sqlConcepts = getConceptsForTopic('analisis-de-datos', 'sql');
  return (
    <Layout title="Tu biblioteca personal" description="Apuntes breves, ejemplos claros y conceptos a la mano. Tu biblioteca personal de análisis de datos, desarrollo web e IA.">
      <main className={styles.main}>
        <HomeSearch>
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
              {sqlConcepts.map((concept) => <Link key={concept.id} to={concept.slug}>{concept.title}<Icon name="arrow" size={14} /></Link>)}
            </div>
          </section>
        </HomeSearch>
      </main>
    </Layout>
  );
}
