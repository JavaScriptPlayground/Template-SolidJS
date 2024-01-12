/// <reference lib="deno.ns" />
import * as esbuild from 'https://deno.land/x/esbuild@v0.19.11/mod.js';
import sassPlugin from 'https://deno.land/x/esbuild_plugin_sass@v0.4.1/mod.ts';
import { bold } from 'https://deno.land/std@0.211.0/fmt/colors.ts';
import { parseArgs } from 'https://deno.land/std@0.211.0/cli/parse_args.ts';

const args = parseArgs<{
  watch: boolean | undefined;
  develope: boolean | undefined;
}>(Deno.args);

const HTMLConfig: esbuild.BuildOptions = {
  allowOverwrite: true,
  logLevel: 'info',
  color: true,
  outdir: './dist',
  loader: {
    '.html': 'copy',
  },
  entryPoints: [
    './src/**/index.html',
  ]
};

const SASSConfig: esbuild.BuildOptions = {
  allowOverwrite: true,
  logLevel: 'info',
  legalComments: args.develope ? 'inline' : 'none',
  color: true,
  minify: !args.develope ?? true,
  outdir: './dist',
  entryNames: '[dir]/bundle.min',
  entryPoints: [
    './src/**/index.scss',
  ],
  plugins: [
    sassPlugin()
  ],
};

const TSConfig: esbuild.BuildOptions = {
  tsconfig: './tsconfig.json',
  allowOverwrite: true,
  logLevel: 'info',
  legalComments: args.develope ? 'inline' : 'none',
  color: true,
  bundle: true,
  minify: !args.develope ?? true,
  target: 'ES6',
  format: 'esm',
  outdir: './dist',
  entryNames: '[dir]/bundle.min',
  entryPoints: [
    './src/**/index.ts',
  ],
};

if (!args.watch) {
  console.log(bold('Coping HTML files...'));

  await esbuild.build(HTMLConfig);

  console.log(bold('Transpiling & Bundling SCSS files...'));

  await esbuild.build(SASSConfig);

  console.log(bold('Transpiling & Bundling TypeScript files...'));

  await esbuild.build(TSConfig);

  console.log(bold('Build process finished.'));
  esbuild.stop();
} else {
  await esbuild.context(HTMLConfig).then((context) => context.watch());
  await esbuild.context(SASSConfig).then((context) => context.watch());
  await esbuild.context(TSConfig).then((context) => context.watch());
}
