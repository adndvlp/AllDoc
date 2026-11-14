import type {EnvironmentManifest} from '../../contracts.ts';
import {pythonPackages} from './packages.ts';

export const pythonEnvironment: EnvironmentManifest = Object.freeze({
  version: 'pyodide@' + pythonPackages.runtimeVersion + '/' + pythonPackages.digest.slice(0, 16) + '/productos@1/protocol@1',
  runtime: {id: 'pyodide', version: pythonPackages.runtimeVersion},
  packages: [{name: 'python', version: pythonPackages.pythonVersion},
    ...Object.values(pythonPackages.lock.packages).map(({name, version}) => ({name, version}))],
});
