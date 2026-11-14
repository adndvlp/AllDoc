import {getConcept, type ConceptMeta} from '../concepts.ts';
import {productsDataset} from '../../practice/datasets/products.ts';
import {pandasExampleCode} from '../../practice/datasets/materialize.ts';

export type PandasConcept = ConceptMeta & {examples: {id: string; title: string; code: string; hint: string;
  output: {columns: string[]; rows: string[][]; rowLabels: string[]}}[]; remember: string};

const metadata = getConcept('analisis-de-datos/pandas/dataframe')!;
const products = productsDataset.tables[0];
export const pandasDataframe: PandasConcept = {...metadata, examples: [{
  id: 'pandas/dataframe/productos', title: 'Crear una tabla de productos',
  code: pandasExampleCode(products), hint: 'Cada lista forma una columna.',
  output: {columns: products.columns.map(({name}) => name), rows: products.rows.map((row) => row.map(String)),
    rowLabels: products.rows.map((_, index) => String(index))},
}], remember: 'DataFrame organiza tus datos en filas y columnas.'};

export function getPandasConcept(id: string): PandasConcept | undefined {
  return id === metadata.id || id === 'dataframe' ? pandasDataframe : undefined;
}
