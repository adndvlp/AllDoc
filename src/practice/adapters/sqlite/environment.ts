import type {EnvironmentManifest} from '../../contracts.ts';

// La dependencia se actualiza con latest; cada entorno publicado queda fijado al lockfile.
export const sqliteEnvironment: EnvironmentManifest = Object.freeze({
  version: 'sqlite@3.54.1-build1/productos@1/protocol@1',
  runtime: {id: 'sqlite-wasm', version: '3.54.1'},
  packages: [{name: '@sqlite.org/sqlite-wasm', version: '3.54.1-build1'}],
});
