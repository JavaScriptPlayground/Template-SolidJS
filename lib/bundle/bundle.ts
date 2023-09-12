import { bundle } from 'https://deno.land/x/emit@0.24.0/mod.ts';
import { parse as parseArgs} from 'https://deno.land/std@0.201.0/flags/mod.ts'
import { ensureDir, exists } from 'https://deno.land/std@0.201.0/fs/mod.ts';
import { dirname } from 'https://deno.land/std@0.201.0/path/mod.ts'

const args = parseArgs(Deno.args)

const bundleConfig = JSON.parse(Deno.readTextFileSync(args.config || new URL(import.meta.resolve('./bundle.json'))))

for (const key in bundleConfig) {
    const src = key
    const dist = bundleConfig[key]

    Promise.all([
        exists(
            src,
            {
                isFile: true
            }
        ),
        ensureDir(dirname(dist))
    ]).then(([srcExists]) => {
        if (!srcExists) {
            console.log(`Skipping: File "${src}" does not exist.`);
            return;
        }

        console.log(`Transpiling: File "${src}".`);
        bundle(src, {
            type: 'module'
        }).then(({code}) => {
            console.log(`Bundling: File "${src}" to "${dist}".`);
            Deno.writeTextFile(dist, code);
        }).then(() => {
            console.log(`Bundling complete.`);
        })
    }).catch((error) => {
        throw new Error('Unexpected Error:' + error.message);  
    })
}



