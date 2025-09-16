/// <reference lib="deno.ns" />
import * as esbuild from '@esbuild';
import { solidPlugin as esbuildPluginSolidJs } from '@esbuild-plugin-solid';
import { green } from '@std/fmt/colors';
import { parseArgs } from '@std/cli/parse-args';

import denoJson from '../../deno.json' with {type: 'json'}
import filesToCopy from './copy_files_extension_filter.json' with {type: 'json'}

const args = parseArgs<{
  watch: boolean | undefined,
  develop: boolean | undefined,
  logLevel: esbuild.LogLevel
}>(Deno.args);

// convert array to esbuild copy loader object
const loaders = filesToCopy.reduce((
  previouseExtension,
  extension
) => ({
  ...previouseExtension,
  [extension]: 'copy' as esbuild.Loader
}), {})

const copyConfig : esbuild.BuildOptions = {
  allowOverwrite: true,
  logLevel: args.logLevel ?? 'info',
  color: true,
  loader: loaders,
  outdir: './dist',
  outbase: './src/client',
  entryPoints: [
    './src/client/app/**/index.html',
    './src/client/app/**/assets/*',
    './src/client/static/**/*'
  ]
}

const filesConfig : esbuild.BuildOptions = {
  allowOverwrite: true,
  logLevel: args.logLevel ?? 'info',
  legalComments: args.develop ? 'inline' : 'none',
  color: true,
  minify: args.develop ? false : true,
  bundle: true,
  format: 'esm',
  target: 'esnext',
  sourcemap: true,
  sourcesContent: true,
  tsconfig: './deno.json',
  outdir: './dist/app',
  outbase: './src/client/app',
  entryPoints: [
    './src/client/app/index.tsx'
  ],
  supported: {
    'import-attributes': true,
    'nesting': true
  },
  plugins: [
    esbuildPluginSolidJs({solid: {moduleName: '@solid-js/web'}})
  ],
  alias: denoJson.imports
}

console.log('Build process started.');

const timestampNow = Date.now();

if (args.watch) {
  esbuild.context(copyConfig).then((context) => context.watch());
  esbuild.context(filesConfig).then((context) => context.watch());
} else {
  Promise.all([
    esbuild.build(copyConfig),
    esbuild.build(filesConfig),
  ]).then(() => {
    esbuild.stop();
    console.log(green(`esbuild ${esbuild.version} finished build in ${(Date.now() - timestampNow).toString()}ms.`));
  })
}
