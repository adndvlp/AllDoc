import Layout from '@theme/Layout';
import HomeSearch from '@site/src/components/HomeSearch';
import PersonalShortcuts from '@site/src/components/PersonalShortcuts';
import Catalog from '@site/src/components/Catalog';
import {useHomeArea} from '@site/src/components/HomeAreaProvider';
import styles from './index.module.css';

export default function Home() {
  const {areaId} = useHomeArea();
  return (
    <Layout title="Tu biblioteca personal" description="Apuntes breves, ejemplos claros y conceptos a la mano. Tu biblioteca personal de análisis de datos, desarrollo web e IA.">
      <main className={styles.main}>
        <HomeSearch>
          <PersonalShortcuts />
          <Catalog key={areaId} areaId={areaId} />
        </HomeSearch>
      </main>
    </Layout>
  );
}
