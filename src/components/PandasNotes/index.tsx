import {getPandasConcept} from '@site/src/content/notes/pandas';
import {ConceptNote} from '../ConceptNote';

export function PandasConceptCard({conceptId}: {conceptId: string}) {
  const concept = getPandasConcept(conceptId);
  if (!concept) throw new Error('Concepto pandas desconocido: ' + conceptId);
  return <ConceptNote concept={concept} conceptId={concept.id} kind="pandas" language="python" />;
}
