/// <reference lib="deno.ns" />
import * as esbuild from "https://deno.land/x/esbuild@v0.19.11/mod.js";
import sass from "https://deno.land/x/denosass@1.0.6/mod.ts"
import { bold } from "https://deno.land/std@0.211.0/fmt/colors.ts";

const sassPlugin: esbuild.Plugin = {
    name: "esbuild-plugin-sass",
    setup: (build) => {
        build.onLoad(
            { filter: /\.scss$/ },
            async (args) => {
                const file = await Deno.readTextFile(args.path)
                
                const css = sass(
                    file,
                    { style: build.initialOptions.minify ? 'compressed' : 'expanded' }
                ).to_string()

                if (css instanceof Map) {
                    return {
                        contents: css.get('index'),
                        loader: 'css'
                    }
                } else if (typeof css === 'string') {
                    return {
                        contents: css,
                        loader: 'css'
                    }
                } else {
                    return {
                        contents: '',
                        loader: 'css'
                    }
                }
            }
        )
    }
}

console.log(bold('Coping HTML files...'))
await esbuild.build({
    allowOverwrite: true,
    logLevel: 'info',
    outdir: './dist',
    loader: {
        '.html': 'copy'
    },
    entryPoints: [
        './src/**/index.html'
    ]
})

console.log(bold('Transpiling & Bundling SCSS files...'))
await esbuild.build({
    allowOverwrite: true,
    logLevel: 'info',
    minify: true,
    legalComments: 'inline',
    outdir: './dist',
    entryNames: '[dir]/bundle.min',
    entryPoints: [
        './src/**/index.scss'
    ],
    plugins: [
        sassPlugin
    ]
})

console.log(bold('Transpiling & Bundling TypeScript files...'))
await esbuild.build({
    tsconfig: './tsconfig.json',
    allowOverwrite: true,
    logLevel: 'info',
    bundle: true,
    minify: true,
    target: 'ES6',
    format: 'esm',
    outdir: './dist',
    entryNames: '[dir]/bundle.min',
    entryPoints: [
        './src/**/index.ts'
    ]
})

console.log(bold('Build process finished.'))
esbuild.stop()
