import { serveDir } from '@std/http/file-server'

const rootDirectory = './dist/';

Deno.serve(
  {port: 8080},
  (request) => serveDir(request, {
    fsRoot: rootDirectory
  })
);
