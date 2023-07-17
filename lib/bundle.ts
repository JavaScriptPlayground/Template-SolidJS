import { bundle } from "https://deno.land/x/emit@0.24.0/mod.ts";

bundle('./src/index.ts').then(result => Deno.writeTextFile('./dist/index.bundle.js', result.code))
