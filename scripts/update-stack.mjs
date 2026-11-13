import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const projectDirectory = fileURLToPath(new URL('..', import.meta.url));
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const packages = Object.keys({...manifest.dependencies, ...manifest.devDependencies});
const executable = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(args) {
  const result = spawnSync(executable, args, {
    cwd: projectDirectory,
    stdio: 'inherit',
    shell: false,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// npm conserva si una dependencia ya pertenece a dependencies o devDependencies.
// "latest" excluye las etiquetas beta/canary; no se fuerzan conflictos de peers.
run(['install', '--save-exact', ...packages.map((name) => name + '@latest')]);
run(['run', 'typecheck']);
run(['test']);
run(['run', 'build']);
