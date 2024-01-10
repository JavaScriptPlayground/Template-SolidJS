/// <reference lib="deno.ns" />
import * as esbuild from 'https://deno.land/x/esbuild@v0.19.11/mod.js';
import { parseArgs } from 'https://deno.land/std@0.211.0/cli/parse_args.ts';

const args = parseArgs<{
    watch : boolean,
    dev : boolean
}>(Deno.args);

'Watcher Process started.'

const HTMLContext = await esbuild.context({
    allowOverwrite: true,
    outdir: './dist',
    loader: {
        '.html': 'copy'
    },
    entryPoints: [
        './src/**/index.html'
    ]
})

const typeScripContext = await esbuild.context({
    tsconfig: './tsconfig.json',
    allowOverwrite: true,
    bundle: true,
    minify: !(args.dev === true),
    target: 'ES6',
    format: 'esm',
    outdir: './dist',
    entryNames: '[dir]/bundle.min',
    entryPoints: [
        './src/**/index.ts'
    ]
})

if (args.watch) {
    HTMLContext.watch()
    typeScripContext.watch()
}
