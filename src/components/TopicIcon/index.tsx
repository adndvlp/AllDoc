import type {IconType} from 'react-icons';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  LuArrowLeftRight,
  LuCalculator,
  LuChartNoAxesCombined,
  LuCloud,
  LuDatabase,
  LuLayers,
  LuNetwork,
  LuSheet,
  LuTable2,
  LuWorkflow,
} from 'react-icons/lu';
import {
  SiApacheairflow,
  SiApachespark,
  SiDatabricks,
  SiJson,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiR,
  SiScipy,
  SiSnowflake,
  SiSqlalchemy,
  SiSqlite,
} from 'react-icons/si';
import {PiMicrosoftExcelLogoFill} from 'react-icons/pi';
import {IoLogoTableau} from 'react-icons/io5';
import styles from './styles.module.css';

type TopicIconDefinition = {
  kind: 'brand' | 'related-brand' | 'generic' | 'group';
} & (
  | {icon: IconType}
  | {src: string; onLight?: boolean; crop?: {viewBox: string; width: number; height: number}}
);

export const topicIcons: Record<string, TopicIconDefinition> = {
  Excel: {icon: PiMicrosoftExcelLogoFill, kind: 'brand'},
  'Google Sheets': {icon: LuSheet, kind: 'generic'},
  'Power Query': {src: '/img/topics/power-query.svg', kind: 'brand'},
  SQL: {icon: LuDatabase, kind: 'generic'},
  Pandas: {icon: SiPandas, kind: 'brand'},
  openpyxl: {
    src: '/img/topics/openpyxl.webp',
    kind: 'brand',
    onLight: true,
    crop: {viewBox: '130 0 49 35', width: 179, height: 35},
  },
  NumPy: {icon: SiNumpy, kind: 'brand'},
  SciPy: {icon: SiScipy, kind: 'brand'},
  Matplotlib: {src: '/img/topics/matplotlib.svg', kind: 'brand'},
  Seaborn: {src: '/img/topics/seaborn.svg', kind: 'brand'},
  SQLAlchemy: {icon: SiSqlalchemy, kind: 'brand'},
  sqlite3: {icon: SiSqlite, kind: 'related-brand'},
  'mysql-connector-python': {icon: SiMysql, kind: 'related-brand'},
  psycopg: {icon: SiPostgresql, kind: 'related-brand'},
  requests: {src: '/img/topics/requests.png', kind: 'brand'},
  httpx: {src: '/img/topics/httpx.png', kind: 'brand', onLight: true},
  json: {icon: SiJson, kind: 'brand'},
  R: {icon: SiR, kind: 'brand'},
  'Power BI': {src: '/img/topics/power-bi.svg', kind: 'brand'},
  Tableau: {icon: IoLogoTableau, kind: 'brand'},
  dbt: {icon: LuLayers, kind: 'generic'},
  Alteryx: {icon: LuWorkflow, kind: 'generic'},
  'Apache Spark': {icon: SiApachespark, kind: 'brand'},
  'Apache Airflow': {icon: SiApacheairflow, kind: 'brand'},
  Databricks: {icon: SiDatabricks, kind: 'brand'},
  Snowflake: {icon: SiSnowflake, kind: 'brand'},
  'Hojas de cálculo': {icon: LuTable2, kind: 'group'},
  'Tablas y archivos': {icon: LuTable2, kind: 'group'},
  'Cálculo científico': {icon: LuCalculator, kind: 'group'},
  Visualización: {icon: LuChartNoAxesCombined, kind: 'group'},
  'Conexiones SQL': {icon: LuDatabase, kind: 'group'},
  'Peticiones y formatos': {icon: LuNetwork, kind: 'group'},
  'Transformación de datos': {icon: LuArrowLeftRight, kind: 'group'},
  'Plataformas de datos': {icon: LuCloud, kind: 'group'},
};

export default function TopicIcon({label, className}: {label: string; className?: string}) {
  const definition = topicIcons[label];
  const src = useBaseUrl(definition && 'src' in definition ? definition.src : '/');
  if (!definition) return null;

  if ('src' in definition) {
    const imageClassName = [styles.image, definition.onLight && styles.onLight, className].filter(Boolean).join(' ');

    if (definition.crop) {
      return (
        <svg
          width={16}
          height={16}
          viewBox={definition.crop.viewBox}
          aria-hidden="true"
          focusable="false"
          className={imageClassName}
          data-topic-icon={label}
          data-icon-kind={definition.kind}>
          <image href={src} width={definition.crop.width} height={definition.crop.height} />
        </svg>
      );
    }

    return (
      <img
        src={src}
        width={16}
        height={16}
        alt=""
        aria-hidden="true"
        decoding="async"
        className={imageClassName}
        data-topic-icon={label}
        data-icon-kind={definition.kind}
      />
    );
  }

  const Component = definition.icon;

  return (
    <Component
      size={16}
      aria-hidden="true"
      focusable="false"
      className={className}
      data-topic-icon={label}
      data-icon-kind={definition.kind}
    />
  );
}
