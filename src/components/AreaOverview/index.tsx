import {areas, type AreaId} from '@site/src/content/areas';
import Catalog from '../Catalog';
import styles from './styles.module.css';

export default function AreaOverview({areaId}: {areaId: AreaId}) {
  const area = areas.find((item) => item.id === areaId);
  if (!area) throw new Error('Área desconocida: ' + areaId);

  return (
    <div>
      <p className={styles.intro}>{area.description}</p>
      <Catalog key={areaId} areaId={areaId} showHeading={false} />
    </div>
  );
}
