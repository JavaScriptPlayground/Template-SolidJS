import type * as esbuild from '@esbuild';


export function transformScriptTags(options?: {
  pattern?: RegExp,
  replaceExtensionWith?: string
}) : esbuild.Plugin {
  return ({
    name: 'html-script-tags',
    setup(build) : void {
      build.onLoad({filter: /\.html$/}, (args) => {
        return {
          contents: Deno.readTextFileSync(args.path).replace(
            options?.pattern ?? /(?<=<script.*src=")(.*)(?=".*>)/gm,
            (_, scriptSrcPath : string) => {
              return scriptSrcPath.replace(/\.tsx?$/, options?.replaceExtensionWith ?? '.js')
            }
          ),
          loader: 'copy',
        }
      })
    }
  })
}
