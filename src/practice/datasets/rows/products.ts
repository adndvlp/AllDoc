import {productsManifest} from '../manifest.ts';
import type {PracticeDataset} from '../types.ts';

export const productsDataset: PracticeDataset = Object.freeze({
  reference: productsManifest.reference,
  tables: Object.freeze([Object.freeze({
    ...productsManifest.tables[0],
    rows: Object.freeze([
      Object.freeze(['Teclado', 'Accesorios', 500]),
      Object.freeze(['Mouse', 'Accesorios', 250]),
      Object.freeze(['Monitor', 'Pantallas', 3500]),
    ]),
  })]),
});
