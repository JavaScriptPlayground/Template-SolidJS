import type * as esbuild from '@esbuild';


export function copy() : esbuild.Plugin {
  return ({
    name: 'copy',
    setup(build) : void {
      build.onLoad({filter: /.*/}, (args) => {
        return {
          contents: Deno.readTextFileSync(args.path),
          loader: 'copy',
        }
      })
    }
  })
}
