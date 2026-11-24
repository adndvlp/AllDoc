import type {EnvironmentManifest} from '../../contracts.ts';
import {pythonPackages} from './packages.ts';

const packages = [{name: 'python', version: pythonPackages.pythonVersion},
  ...Object.values(pythonPackages.lock.packages).map(({name, version}) => ({name, version}))];
const matplotlibDependencies = ['contourpy', 'cycler', 'fonttools', 'kiwisolver', 'packaging', 'pillow', 'pyparsing'];
const profilePackages = new Map<string, {root: string; dependencies: readonly string[]; extraRoots?: readonly string[]}>([
  ['python-openpyxl', {root: 'openpyxl', dependencies: ['et-xmlfile']}],
  ['python-scipy', {root: 'scipy', dependencies: []}],
  ['python-matplotlib', {root: 'matplotlib', dependencies: matplotlibDependencies}],
  ['python-seaborn', {root: 'seaborn', dependencies: ['matplotlib', ...matplotlibDependencies, 'scipy', 'statsmodels', 'patsy']}],
  ['python-sqlalchemy', {root: 'sqlalchemy', dependencies: ['typing-extensions']}],
  ['python-requests', {root: 'requests', extraRoots: ['openpyxl'],
    dependencies: ['certifi', 'charset-normalizer', 'idna', 'urllib3', 'openpyxl', 'et-xmlfile']}],
  ['python-httpx', {root: 'httpx', extraRoots: ['openpyxl', 'beautifulsoup4'],
    dependencies: ['anyio', 'certifi', 'httpcore', 'h11', 'idna', 'sniffio', 'typing-extensions', 'openpyxl', 'et-xmlfile', 'beautifulsoup4', 'soupsieve']}],
]);
const optionalPackages = new Set(Array.from(profilePackages.values()).flatMap(({root, dependencies}) => [root, ...dependencies]));

export function getPythonAdditionalPackages(profileId: string): readonly string[] {
  const additional = profilePackages.get(profileId);
  return additional ? [additional.root, ...(additional.extraRoots ?? [])] : [];
}

export const pythonEnvironment: EnvironmentManifest = Object.freeze({
  version: 'pyodide@' + pythonPackages.runtimeVersion + '/' + pythonPackages.digest.slice(0, 16) + '/productos@1/protocol@1',
  runtime: {id: 'pyodide', version: pythonPackages.runtimeVersion},
  packages: packages.filter(({name}) => !optionalPackages.has(name.toLowerCase())),
});

export function getPythonEnvironment(profileId: string): EnvironmentManifest {
  const additional = profilePackages.get(profileId);
  if (!additional) return pythonEnvironment;
  return Object.freeze({...pythonEnvironment,
    version: pythonEnvironment.version + '/' + additional.root,
    packages: packages.filter(({name}) => {
      const key = name.toLowerCase();
      return !optionalPackages.has(key) || key === additional.root || additional.dependencies.includes(key);
    }),
  });
}
