import { route, type Route } from "@std/http/unstable-route";
import { serveDir, serveFile } from "@std/http/file-server";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/static/:asset*" }),
    handler: (request, _info, parameters) => serveFile(
      request,
      './dist/static/' + parameters?.pathname.groups.asset
    )
  },
  {
    pattern: new URLPattern({ pathname: "/:page(.*)" }),
    handler: (request) => serveDir(
      request,
      {fsRoot: './dist/route/'}
    )
  }
];

function defaultHandler(_req: Request) : Response {
  return new Response("Not found", { status: 404 });
}

Deno.serve(route(routes, defaultHandler));
