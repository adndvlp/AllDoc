import type {IconName} from '../components/Icon';
import {catalog, getTopics} from './catalog.ts';

export type AreaId = 'analisis-de-datos' | 'desarrollo-web' | 'ia';

type Area = {
  id: AreaId;
  number: string;
  title: string;
  description: string;
  icon: IconName;
  status: string;
  available: boolean;
};

export const areas: Area[] = catalog.map(({items, sidebarId, ...area}) => {
  const topics = getTopics(area.id).filter((topic) => topic.concepts.length > 0);
  const count = topics.reduce((total, topic) => total + topic.concepts.length, 0);
  return {
    ...area,
    status: count ? topics.map((topic) => topic.label).join(', ') + ' · ' + count + (count === 1 ? ' concepto' : ' conceptos') : 'Por explorar',
    available: count > 0,
  };
});
