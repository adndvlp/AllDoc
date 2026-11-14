import {getSqlConcept} from '@site/src/content/sql';
import {ConceptNote} from '../ConceptNote';

export function SqlConceptCard({conceptId}: {conceptId: string}) {
  const concept = getSqlConcept(conceptId);
  if (!concept) throw new Error('Concepto SQL desconocido: ' + conceptId);
  return <ConceptNote concept={concept} conceptId={concept.id} kind="sql" language="sql" htmlClassName="sql-concept-page" />;
}
