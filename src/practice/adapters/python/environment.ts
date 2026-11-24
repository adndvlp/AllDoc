import type {EnvironmentManifest} from '../../contracts.ts';
import {pythonPackages} from './packages.ts';

const packages = [{name: 'python', version: pythonPackages.pythonVersion},
  ...Object.values(pythonPackages.lock.packages).map(({name, version}) => ({name, version}))];
const profilePackages = new Map<string, {root: string; dependencies: string[]}>([
  ['python-openpyxl', {root: 'openpyxl', dependencies: ['et-xmlfile']}],
  ['python-scipy', {root: 'scipy', dependencies: []}],
  ['python-sqlalchemy', {root: 'sqlalchemy', dependencies: ['typing-extensions']}],
]);
const optionalPackages = new Set(Array.from(profilePackages.values()).flatMap(({root, dependencies}) => [root, ...dependencies]));

export function getPythonAdditionalPackages(profileId: string): readonly string[] {
  const additional = profilePackages.get(profileId);
  return additional ? [additional.root] : [];
}

export const pythonEnvironment: EnvironmentManifest = Object.freeze({
  version: 'pyodide@' + pythonPackages.runtimeVersion + '/' + pythonPackages.digest.slice(0, 16) + '/productos@1/protocol@1',
  runtime: {id: 'pyodide', version: pythonPackages.runtimeVersion},
  packages: packages.filter(({name}) => !optionalPackages.has(name)),
});

export function getPythonEnvironment(profileId: string): EnvironmentManifest {
  const additional = profilePackages.get(profileId);
  if (!additional) return pythonEnvironment;
  return Object.freeze({...pythonEnvironment,
    version: pythonEnvironment.version + '/' + additional.root,
    packages: packages.filter(({name}) => !optionalPackages.has(name) || name === additional.root || additional.dependencies.includes(name)),
  });
}
