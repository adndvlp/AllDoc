import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {sqlConcepts} from '../../src/content/notes/sql.ts';
import {sqlDialects, getSqlCapability} from '../../src/content/sql/capabilities.ts';
import {sqlCurriculum} from '../../src/content/sql/curriculum.ts';
import {isOfficialSqlSource} from '../../src/content/sql/contracts.ts';
import {resolveNoteExample} from '../../src/content/notes/sql/factory.ts';
import {sha256} from './baseline.ts';

export async function auditSqlEditorial(root: string) {
  const file = await readFile(path.join(root, 'specs/sql/source-inventory.json'));
  const {sources} = JSON.parse(file.toString()) as {sources: {path: string; targets: string[]; empty: boolean}[]};
  const plans = sqlCurriculum.flatMap(group => group.children);
  const byId = new Map(sqlConcepts.map(concept => [concept.conceptId, concept]));
  const reasons: string[] = [];
  if (sqlCurriculum.length !== 34 || plans.length !== 153 || byId.size !== plans.length || sqlConcepts.length !== byId.size) {
    reasons.push('El inventario y los cuerpos SQL tienen distinta cobertura');
  }
  if (sources.length !== 99 || sources.filter(source => source.empty).length !== 11) reasons.push('La cobertura de fuentes no coincide con el inventario');
  for (const source of sources) {
    if (!source.targets.length || source.targets.some(id => !byId.has(id))) reasons.push('Fuente sin ficha publicada: ' + source.path);
  }
  const exampleIds = new Set<string>();
  const examples = [];
  for (const plan of plans) {
    const concept = byId.get(plan.id);
    if (!concept || !concept.description.trim() || !concept.remember.trim() || !concept.examples.length) {
      reasons.push('Ficha incompleta: ' + plan.id);
      continue;
    }
    for (const example of concept.examples) {
      if (exampleIds.has(example.id) || !example.title.trim() || !example.code.trim() || !example.hint.trim() || !example.output.columns.length) {
        reasons.push('Ejemplo incompleto o repetido: ' + example.id);
      }
      exampleIds.add(example.id);
      const variants = sqlDialects.map(({id}) => {
        const {variant, action, alternative} = resolveNoteExample(concept, example, id);
        const valid = getSqlCapability(plan.feature, id).status === 'reviewed'
          && variant.sources.length > 0 && variant.sources.every(source => isOfficialSqlSource(source, id))
          && Boolean(variant.explanation?.trim()) && action.kind !== 'disabled' && action.executesAutomatically === false
          && (id !== 'sqlite' || (action.kind === 'sqlite' && action.code === example.code))
          && (variant.code?.trim() || (action.kind === 'external' && alternative));
        if (!valid) reasons.push('Variante incompleta: ' + example.id + ' / ' + id);
        return {dialect: id, sources: variant.sources, support: variant.support, action: action.kind,
          codeHash: variant.code ? sha256(variant.code) : null};
      });
      examples.push({id: example.id, concept: plan.id, outputHash: sha256(JSON.stringify(example.output)), variants});
    }
  }
  return {
    summary: {sources: sources.length, originalEmpty: sources.filter(source => source.empty).length,
      groups: sqlCurriculum.length, concepts: byId.size, examples: examples.length, dialects: sqlDialects.length},
    inventoryHash: sha256(file),
    sqliteExecutionTests: ['tests/sql-first-block.test.ts', 'tests/sql-second-block.test.ts', 'tests/sql-third-block.test.ts'],
    reasons, examples,
  };
}
