import {sqlBasePath, sqlConcepts} from './sql';
import type {SearchEntry} from '../lib/search';

export const entries: SearchEntry[] = sqlConcepts.map((concept) => ({
  title: concept.title,
  description: concept.description,
  context: 'Análisis de datos / SQL',
  href: sqlBasePath + '/' + concept.id,
  keywords: concept.keywords,
}));
