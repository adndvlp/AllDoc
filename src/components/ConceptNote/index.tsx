import CodeBlock from '@theme/CodeBlock';
import {useId} from 'react';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import {usePractice} from '../PracticeProvider';
import styles from '../SqlNotes/styles.module.css';

type Example = {id: string; title: string; code: string; hint: string; output: {
  columns: readonly string[]; rows: readonly (readonly string[])[]; rowLabels?: readonly string[];
}};
type Note = {title: string; description: string; examples: readonly Example[]; remember: string; note?: string};

/** La presentación compacta es común; cada herramienta aporta lenguaje y contenido. */
export function ConceptNote({concept, conceptId, kind, language, htmlClassName = 'concept-note-page'}: {
  concept: Note; conceptId: string; kind: string; language: string; htmlClassName?: string;
}) {
  const resultId = useId();
  const practice = usePractice();
  return <HtmlClassNameProvider className={htmlClassName}>
    <section className={styles.concept} {...{[`data-${kind}-concept`]: conceptId}} aria-label={concept.title}>
      <p className={styles.definition}>{concept.description}</p>
      <div className={styles.variants}>
        {concept.examples.map((example, index) => (
          <div key={example.id} className={styles.variant} {...{[`data-${kind}-example`]: example.title}}>
            <div className={styles.variantHeading}>
              <h2 className={styles.variantTitle}>{example.title}</h2>
              {practice.context?.profile.languageId === language && <button className={styles.tryExample} type="button"
                data-practice-example={example.id} aria-label={'Probar este ejemplo: ' + example.title}
                aria-haspopup="dialog" aria-controls="alldoc-practice-panel" title="Probar este ejemplo"
                onClick={(event) => {event.currentTarget.focus({preventScroll: true}); void practice.openExample({id: example.id, code: example.code, languageId: language});}}>Probar</button>}
            </div>
            <CodeBlock language={language}>{example.code}</CodeBlock>
            <p className={styles.hint}>{example.hint}</p>
            <details className={styles.result}>
              <summary>Ver resultado <span>{example.output.rows.length} filas</span></summary>
              <div className={styles.tableWrapper} role="region" tabIndex={0} aria-labelledby={`${resultId}-${index}`}>
                <table>
                  <caption id={`${resultId}-${index}`} className="sr-only">Resultado de {concept.title}: {example.title}</caption>
                  <thead><tr>
                    {example.output.rowLabels && <th scope="col">Índice</th>}
                    {example.output.columns.map((column) => <th key={column} scope="col">{column}</th>)}
                  </tr></thead>
                  <tbody>{example.output.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {example.output.rowLabels && <th scope="row">{example.output.rowLabels[rowIndex]}</th>}
                      {row.map((value, columnIndex) => <td key={columnIndex}>{value}</td>)}
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </details>
          </div>
        ))}
      </div>
      <p className={styles.remember}>{concept.remember}</p>
      {concept.note && <p className={styles.note}>{concept.note}</p>}
    </section>
  </HtmlClassNameProvider>;
}
