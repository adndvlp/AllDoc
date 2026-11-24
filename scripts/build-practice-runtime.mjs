import {createRequire} from 'node:module';
import {mkdir, writeFile, readFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {validateRuntimeLocation, runtimeCSP} from '../src/practice/isolation/policy.ts';
import {pythonPackages} from '../src/practice/adapters/python/packages.ts';
import {compatiblePythonPin} from './lib/python-assets.ts';
import {publishRAssets, readRLock, rRepoPath} from './lib/r-assets.mjs';
const require = createRequire(import.meta.url);
const webpack = require('webpack');
const root = fileURLToPath(new URL('../', import.meta.url));

export async function buildRuntime({appOrigin = process.env.PRACTICE_APP_ORIGIN ?? 'http://127.0.0.1:3000',
  runtimeOrigin = process.env.PRACTICE_ORIGIN ?? 'http://localhost:3001', outDir = '.runtime-build'} = {}) {
  const location = validateRuntimeLocation(appOrigin, runtimeOrigin);
  if (!compatiblePythonPin(require('pyodide/package.json').version, pythonPackages)) throw new Error('Cambió Pyodide. Ejecuta npm run prepare:python antes de compilar el runtime');
  const rLock = await readRLock(root);
  const rRepository = rRepoPath(rLock);
  const output = resolve(root, outDir);
  const stats = await new Promise((yes, no) => {
    const compiler = webpack({mode: 'production', context: root, entry: './src/practice/isolation/frame.ts',
      target: 'web', devtool: false, output: {path: output, filename: 'frame.[contenthash:12].js', chunkFilename: '[name].[contenthash:12].js', clean: true, publicPath: '/'},
      resolve: {extensions: ['.ts', '.js', '.mjs'], conditionNames: ['browser', 'import', '...']},
      module: {rules: [
        {test: /[/\\]pyodide[/\\](?:pyodide(?:\.asm)?\.mjs|pyodide\.asm\.wasm|python_stdlib\.zip)$/, type: 'asset/resource',
          generator: {filename: 'python/' + pythonPackages.runtimeVersion + '/[name][ext]'}},
        {test: /\.ts$/, exclude: /node_modules/, use: {loader: resolve(root, 'scripts/lib/runtime-typescript-loader.cjs')}},
      ]},
      plugins: [new webpack.DefinePlugin({__APP_ORIGIN__: JSON.stringify(location.appOrigin), __WEBR_REPO_PATH__: JSON.stringify(rRepository)}), {
        apply(compiler) {compiler.hooks.thisCompilation.tap('AllDocPythonPackages', (compilation) => {
          compilation.hooks.processAssets.tapPromise({name: 'AllDocPythonPackages', stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL}, async () => {
            // La distribución ya está minificada. Volver a transformar el glue
            // de Emscripten separaría los bytes publicados de los verificados.
            for (const asset of compilation.getAssets()) {
              if (asset.name.startsWith('python/') && asset.name.endsWith('.mjs')) compilation.updateAsset(asset.name, asset.source, {...asset.info, minimized: true});
            }
            for (const item of Object.values(pythonPackages.lock.packages)) {
              const source = resolve(root, '.python-packages', pythonPackages.runtimeVersion, item.file_name);
              let bytes;
              try {bytes = await readFile(source);} catch {throw new Error('Faltan paquetes Python. Ejecuta npm run prepare:python');}
              if (createHash('sha256').update(bytes).digest('hex') !== item.sha256) throw new Error('Checksum Python incorrecto. Ejecuta npm run prepare:python');
              compilation.emitAsset('python/' + pythonPackages.runtimeVersion + '/' + item.file_name, new webpack.sources.RawSource(bytes));
            }
          });
        });},
      }],
      performance: {hints: false}, optimization: {minimize: true}});
    compiler.run((error, result) => compiler.close(() => {
      if (error) no(error); else if (result.hasErrors()) no(new Error(result.toString({all: false, errors: true}))); else yes(result);
    }));
  });
  const assets = stats.compilation.getAssets().map(({name}) => name);
  const entry = assets.find((name) => /^frame\..*\.js$/.test(name));
  await mkdir(output, {recursive: true});
  await writeFile(resolve(output, 'frame.html'), `<!doctype html><html><head><meta charset="utf-8"><title>AllDoc practice runtime</title><script defer src="/${entry}"></script></head><body></body></html>`);
  const ironCalc = dirname(require.resolve('@ironcalc/wasm/wasm_bg.wasm'));
  const notices = await Promise.all(['LICENSE-MIT', 'THIRD-PARTY-NOTICES.md'].map(name => readFile(resolve(ironCalc, name), 'utf8')));
  const license = 'ironcalc-licenses.txt';
  await writeFile(resolve(output, license), notices.join('\n\n'));
  const rAssets = [];
  await publishRAssets(root, rLock, async (name, bytes) => {
    const path = resolve(output, name);
    await mkdir(dirname(path), {recursive: true});
    await writeFile(path, bytes);
    rAssets.push(name);
  });
  const files = ['frame.html', ...assets, license, ...rAssets];
  const integrity = Object.fromEntries(await Promise.all(files.map(async (name) => [name, createHash('sha256').update(await readFile(resolve(output, name))).digest('hex')])));
  const manifest = {...location, csp: runtimeCSP(location), files, integrity};
  await writeFile(resolve(output, 'runtime-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  await writeFile(resolve(output, '_headers'), `/*\n  Content-Security-Policy: ${manifest.csp}\n  Referrer-Policy: no-referrer\n  X-Content-Type-Options: nosniff\n`);
  return manifest;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildRuntime(); console.log('Runtime de práctica estático: .runtime-build');
}
