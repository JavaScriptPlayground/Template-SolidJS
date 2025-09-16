/// <reference lib="deno.unstable" />

import { parseArgs } from '@std/cli/parse-args';


const args = parseArgs<{
  watch: boolean | undefined,
  develop: boolean | undefined
}>(Deno.args);

await Deno.bundle({
  entrypoints: [
    'src/client/app/index.html'
  ],
  outputDir: './dist',
  minify: !args.develop,
  platform: 'browser',
  packages: 'bundle',
  sourcemap: 'external',
  format: 'esm',
})
