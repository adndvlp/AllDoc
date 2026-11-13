import type {ReactNode} from 'react';
import SearchProvider from '@site/src/components/SearchProvider';
import SearchDialog from '@site/src/components/SearchDialog';

export default function Root({children}: {children: ReactNode}) {
  return <SearchProvider><SearchDialog />{children}</SearchProvider>;
}
