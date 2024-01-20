/// <reference lib="deno.ns" />
import * as esbuild from 'https://deno.land/x/esbuild@v0.19.11/mod.js';
import esbuildPluginSass from 'https://deno.land/x/esbuild_plugin_sass@v0.4.2/mod.ts';
import { green } from 'https://deno.land/std@0.211.0/fmt/colors.ts';
import { parseArgs } from 'https://deno.land/std@0.211.0/cli/parse_args.ts';

const args = parseArgs<{
  watch: boolean | undefined,
  develope: boolean | undefined,
  logLevel: esbuild.LogLevel
}>(Deno.args);

console.log('Build process started.');

const timestamp = Date.now()

Promise.all([
  esbuild.context({
    allowOverwrite: true,
    logLevel: args.logLevel ?? 'info',
    color: true,
    outdir: './dist',
    loader: {
      '.html': 'copy',
    },
    entryPoints: [
      './src/**/index.html',
    ]
  }).then((context) => {return args.watch ? context.watch() : context.dispose()}),
  esbuild.context({
    allowOverwrite: true,
    logLevel: args.logLevel ?? 'info',
    legalComments: args.develope ? 'inline' : 'none',
    color: true,
    minify: !args.develope ?? true,
    outdir: './dist',
    entryNames: '[dir]/bundle.min',
    entryPoints: [
      './src/**/index.ts',
      './src/**/index.scss',
    ],
    plugins: [
      esbuildPluginSass()
    ],
  }).then((context) => {return args.watch ? context.watch() : context.dispose()}),
]).then(() => {
  console.log(green(`Build process finished in ${(Date.now() - timestamp).toString()}ms.`));
  
  if (!args.watch) {
    esbuild.stop();
  }
})
