import {createIsolatedRuntime} from '../../isolation/browser.ts';
export const createSQLiteRuntime = () => createIsolatedRuntime({label: 'SQL'});
