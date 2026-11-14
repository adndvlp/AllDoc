import {createRequire} from 'node:module';
import {mkdir, writeFile, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {validateRuntimeLocation, runtimeCSP} from '../src/practice/isolation/policy.ts';
const require = createRequire(import.meta.url);
const webpack = require('webpack');
const root = fileURLToPath(new URL('../', import.meta.url));

export async function buildRuntime({appOrigin = process.env.PRACTICE_APP_ORIGIN ?? 'http://127.0.0.1:3000',
  runtimeOrigin = process.env.PRACTICE_ORIGIN ?? 'http://localhost:3001', outDir = '.runtime-build'} = {}) {
  const location = validateRuntimeLocation(appOrigin, runtimeOrigin);
  const output = resolve(root, outDir);
  const stats = await new Promise((yes, no) => {
    const compiler = webpack({mode: 'production', context: root, entry: './src/practice/isolation/frame.ts',
      target: 'web', devtool: false, output: {path: output, filename: 'frame.[contenthash:12].js', chunkFilename: '[name].[contenthash:12].js', clean: true, publicPath: '/'},
      resolve: {extensions: ['.ts', '.js', '.mjs'], conditionNames: ['browser', 'import', '...']},
      module: {rules: [{test: /\.ts$/, exclude: /node_modules/, use: {loader: resolve(root, 'scripts/lib/runtime-typescript-loader.cjs')}}]},
      plugins: [new webpack.DefinePlugin({__APP_ORIGIN__: JSON.stringify(location.appOrigin)})],
      performance: {hints: false}, optimization: {minimize: true}});
    compiler.run((error, result) => compiler.close(() => {
      if (error) no(error); else if (result.hasErrors()) no(new Error(result.toString({all: false, errors: true}))); else yes(result);
    }));
  });
  const assets = stats.compilation.getAssets().map(({name}) => name);
  const entry = assets.find((name) => /^frame\..*\.js$/.test(name));
  await mkdir(output, {recursive: true});
  await writeFile(resolve(output, 'frame.html'), `<!doctype html><html><head><meta charset="utf-8"><title>AllDoc SQL runtime</title><script defer src="/${entry}"></script></head><body></body></html>`);
  const files = ['frame.html', ...assets];
  const integrity = Object.fromEntries(await Promise.all(files.map(async (name) => [name, createHash('sha256').update(await readFile(resolve(output, name))).digest('hex')])));
  const manifest = {...location, csp: runtimeCSP(location), files, integrity};
  await writeFile(resolve(output, 'runtime-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  await writeFile(resolve(output, '_headers'), `/*\n  Content-Security-Policy: ${manifest.csp}\n  Referrer-Policy: no-referrer\n  X-Content-Type-Options: nosniff\n`);
  return manifest;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildRuntime(); console.log('Runtime SQL estático: .runtime-build');
}
