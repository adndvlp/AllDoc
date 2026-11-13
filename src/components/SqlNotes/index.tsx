import CodeBlock from '@theme/CodeBlock';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import {getSqlConcept} from '@site/src/content/sql';
import styles from './styles.module.css';

export function SqlConceptCard({conceptId}: {conceptId: string}) {
  const concept = getSqlConcept(conceptId);
  if (!concept) throw new Error('Concepto SQL desconocido: ' + conceptId);

  const content = (
    <section
      className={styles.concept}
      data-sql-concept={concept.id}
      aria-label={concept.title}>
      <p className={styles.definition}>{concept.description}</p>
      <div className={styles.variants}>
        {concept.examples.map((example) => (
          <div key={example.title} className={styles.variant} data-sql-example={example.title}>
            <h3 className={styles.variantTitle}>{example.title}</h3>
            <CodeBlock language="sql">{example.code}</CodeBlock>
            <p className={styles.hint}>{example.hint}</p>
            <details className={styles.result}>
              <summary>Ver resultado <span>{example.output.rows.length} filas</span></summary>
              <div className={styles.tableWrapper}>
                <table>
                  <caption className="sr-only">Resultado de {concept.title}: {example.title}</caption>
                  <thead><tr>{example.output.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
                  <tbody>
                    {example.output.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((value, columnIndex) => <td key={columnIndex}>{value}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        ))}
      </div>
      <p className={styles.remember}>{concept.remember}</p>
      {concept.note && <p className={styles.note}>{concept.note}</p>}
    </section>
  );

  return (
    <HtmlClassNameProvider className="sql-concept-page">{content}</HtmlClassNameProvider>
  );
}

