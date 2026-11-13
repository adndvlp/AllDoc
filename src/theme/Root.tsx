import type {ReactNode} from 'react';
import SearchProvider from '@site/src/components/SearchProvider';
import SearchDialog from '@site/src/components/SearchDialog';
import PersonalLibraryProvider, {PersonalLibraryEffects} from '@site/src/components/PersonalLibraryProvider';
import HomeAreaProvider from '@site/src/components/HomeAreaProvider';

export default function Root({children}: {children: ReactNode}) {
  return <SearchProvider><PersonalLibraryProvider><HomeAreaProvider><PersonalLibraryEffects /><SearchDialog />{children}</HomeAreaProvider></PersonalLibraryProvider></SearchProvider>;
}
