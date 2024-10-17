import { route, type Route } from "@std/http/unstable-route";
import { serveFile } from "@std/http/file-server";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/static/:asset*" }),
    handler: (request, _info, parameters) => serveFile(
      request,
      './dist/static/' + parameters?.pathname.groups.asset
    )
  },
  {
    pattern: new URLPattern({ pathname: '/:page([^\/]+\/?)' }),
    handler: (request, _info, parameters) => serveFile(
      request,
      `./dist/route/${parameters?.pathname.groups.page}/index.html`
    )
  },
  {
    pattern: new URLPattern({ pathname: '/:page/:asset*' }),
    handler: (request, _info, parameters) => {
      const groups = parameters?.pathname.groups;
      return serveFile(
        request,
        `./dist/route/${groups?.page}/${groups?.asset}`
      )
    }
  },
  {
    pattern: new URLPattern({ pathname: '/' }),
    handler: (request) => serveFile(
      request,
      `./dist/route/home/index.html`
    )
  }
];

function defaultHandler(_req: Request) : Response {
  return new Response("Not found", { status: 404 });
}

Deno.serve(
  {port: 8080},
  route(routes, defaultHandler)
);
