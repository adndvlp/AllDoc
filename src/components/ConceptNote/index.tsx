import CodeBlock from '@theme/CodeBlock';
import {useId,type ReactNode} from 'react';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import {usePractice} from '../PracticeProvider';
import styles from '../SqlNotes/styles.module.css';

type TabularOutput = {
  columns: readonly string[]; rows: readonly (readonly string[])[]; rowLabels?: readonly string[];
};
type Example = {id: string; title: string; code: string; practiceCode?: string; hint: string; language?: string; external?: boolean} & (
  | {output: TabularOutput; textOutput?: never; resultLabel?: never}
  | {output?: never; textOutput: string; resultLabel: string}
);
export type NoteContent = {title: string; description: string; examples: readonly Example[]; remember: string; note?: string};

// Solo la acción depende de la sesión. Los cambios del editor no vuelven a
// renderizar el contenido editorial, sus tablas ni el resaltado de código.
function TryExample({example, language}: {example: Example; language: string}) {
  const practice = usePractice();
  if (example.external || practice.context?.profile.languageId !== language) return null;
  return <button className={styles.tryExample} type="button"
    data-practice-example={example.id} aria-label={'Probar este ejemplo: ' + example.title}
    aria-haspopup="dialog" aria-controls="alldoc-practice-panel" title="Probar este ejemplo"
    onClick={(event) => {event.currentTarget.focus({preventScroll: true}); void practice.openExample({id: example.id, code: example.practiceCode ?? example.code, languageId: language});}}>Probar</button>;
}

/** La presentación compacta es común; cada herramienta aporta lenguaje y contenido. */
export function ConceptNote({concept, conceptId, kind, language, htmlClassName = 'concept-note-page', controls, afterContent, renderAction, showResults=true, resultLabel='Ver resultado', formatText}: {
  concept: NoteContent; conceptId: string; kind: string; language: string; htmlClassName?: string;
  controls?:ReactNode;afterContent?:ReactNode;renderAction?:(example:Example)=>ReactNode;showResults?:boolean;resultLabel?:string;
  formatText?: (text: string) => ReactNode;
}) {
  const resultId = useId();
  const format = formatText ?? ((text: string) => text);
  return <HtmlClassNameProvider className={htmlClassName}>
    <section className={styles.concept} {...{[`data-${kind}-concept`]: conceptId}} aria-label={concept.title}>
      <p className={styles.definition}>{format(concept.description)}</p>
      {controls}
      <div className={styles.variants}>
        {concept.examples.map((example, index) => (
          <div key={example.id} className={styles.variant} {...{[`data-${kind}-example`]: example.title}}>
            <div className={styles.variantHeading}>
              <h2 className={styles.variantTitle}>{example.title}</h2>
              {renderAction?renderAction(example):<TryExample example={example} language={example.language ?? language} />}
            </div>
            {example.code&&<CodeBlock language={example.language ?? language}>{example.code}</CodeBlock>}
            {example.hint && <p className={styles.hint}>{format(example.hint)}</p>}
            {showResults&&(example.code||example.hint)&&<details className={styles.result}>
              <summary>{example.output ? <>{resultLabel} <span>{example.output.rows.length} filas</span></> : example.resultLabel}</summary>
              <div className={styles.tableWrapper} role="region" tabIndex={0} aria-labelledby={`${resultId}-${index}`}>
                {example.output ? <table>
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
                </table> : <>
                  <span id={`${resultId}-${index}`} className="sr-only">Resultado de {concept.title}: {example.title}</span>
                  {formatText ? <p className={styles.hint}>{format(example.textOutput)}</p>
                    : <pre className={styles.textResult}>{example.textOutput}</pre>}
                </>}
              </div>
            </details>}
          </div>
        ))}
      </div>
      <p className={styles.remember}>{format(concept.remember)}</p>
      {concept.note && <p className={styles.note}>{format(concept.note)}</p>}
      {afterContent}
    </section>
  </HtmlClassNameProvider>;
}
