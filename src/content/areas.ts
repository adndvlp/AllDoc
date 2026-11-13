import type {IconName} from '../components/Icon';
import {sqlConcepts} from './sql';

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

export const areas: Area[] = [
  {
    id: 'analisis-de-datos',
    number: '01',
    title: 'Análisis de datos',
    description: 'Consultar, entender y trabajar con datos.',
    icon: 'data',
    status: 'SQL · ' + sqlConcepts.length + ' conceptos',
    available: true,
  },
  {
    id: 'desarrollo-web',
    number: '02',
    title: 'Desarrollo web',
    description: 'Las piezas con las que construyes para la web.',
    icon: 'web',
    status: 'Por explorar',
    available: false,
  },
  {
    id: 'ia',
    number: '03',
    title: 'IA',
    description: 'Ideas y herramientas de inteligencia artificial.',
    icon: 'ai',
    status: 'Por explorar',
    available: false,
  },
];
