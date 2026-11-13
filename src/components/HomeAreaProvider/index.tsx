import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import {catalog} from '@site/src/content/catalog';
import type {AreaId} from '@site/src/content/areas';

const initialArea = catalog[0].id;
const Context = createContext<{areaId: AreaId; selectArea: (id: AreaId) => void} | null>(null);

export default function HomeAreaProvider({children}: {children: ReactNode}) {
  const [areaId, selectArea] = useState<AreaId>(initialArea);
  const {pathname} = useLocation();
  // La selección pertenece a la portada; salir permite empezar de nuevo al volver.
  useEffect(() => {if (pathname !== '/') selectArea(initialArea);}, [pathname]);
  return <Context.Provider value={{areaId, selectArea}}>{children}</Context.Provider>;
}

export function useHomeArea() {
  const context = useContext(Context);
  if (!context) throw new Error('La selección de área necesita HomeAreaProvider');
  return context;
}
