import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {sqlConcepts} from './src/content/sql';

const emptySection = (label: string) => ({
  type: 'category' as const,
  label,
  collapsed: true,
  collapsible: true,
  items: [
    {
      type: 'html' as const,
      value: '<span class="sidebar-empty-note">Sin apuntes todavía</span>',
      defaultStyle: false,
    },
  ],
});

const topicGroup = (label: string, sections: string[]) => ({
  type: 'category' as const,
  label,
  className: 'sidebar-topic-group',
  collapsed: true,
  collapsible: true,
  items: sections.map(emptySection),
});

const sidebars: SidebarsConfig = {
  analisisDeDatos: [
    emptySection('Excel'),
    emptySection('Power Query'),
    {
      type: 'category',
      label: 'SQL',
      collapsed: true,
      collapsible: true,
      items: sqlConcepts.map((concept) => 'analisis-de-datos/sql/' + concept.id),
    },
    topicGroup('Tablas y archivos', ['Pandas', 'openpyxl']),
    topicGroup('Cálculo científico', ['NumPy', 'SciPy']),
    topicGroup('Visualización', ['Matplotlib', 'Seaborn']),
    topicGroup('Conexiones SQL', [
      'SQLAlchemy',
      'sqlite3',
      'mysql-connector-python',
      'psycopg',
    ]),
    topicGroup('Peticiones y formatos', ['requests', 'httpx', 'json']),
    emptySection('R'),
    emptySection('Power BI'),
    emptySection('Tableau'),
  ],
};

export default sidebars;
