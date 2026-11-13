import Link from '@docusaurus/Link';
import {areas, type AreaId} from '@site/src/content/areas';
import {sqlConcepts} from '@site/src/content/sql';
import Icon from '../Icon';
import styles from './styles.module.css';

export default function AreaOverview({areaId}: {areaId: AreaId}) {
  const area = areas.find((item) => item.id === areaId);
  if (!area) throw new Error('Área desconocida: ' + areaId);

  return (
    <div>
      <p className={styles.intro}>{area.description}</p>
      {area.available ? (
        <div className={styles.topic}>
          <span className={styles.icon}><Icon name="data" size={26} /></span>
          <span><strong>SQL</strong><span>Habla con tus datos.</span><small>{sqlConcepts.length} conceptos · Consultas básicas</small></span>
        </div>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}><Icon name={area.icon} size={30} /></span>
          <h2>El siguiente apunte empieza aquí.</h2>
          <p>Esta área está lista para crecer con lo que vayas aprendiendo.</p>
          <Link to="/apuntes/analisis-de-datos">Explorar análisis de datos <Icon name="arrow" size={16} /></Link>
        </div>
      )}
    </div>
  );
}
