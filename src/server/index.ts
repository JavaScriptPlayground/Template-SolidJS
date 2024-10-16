import { route, type Route } from "@std/http/unstable-route";
import { serveDir, serveFile } from "@std/http/file-server";

const routes: Route[] = [
  // {
  //   pattern: new URLPattern({ pathname: "/static/*" }),
  //   handler: (request: Request) => serveDir(request)
  // },
  // {
  //   pattern: new URLPattern({ pathname: "/component" }),
  //   handler: (request: Request) => serveDir(
  //     request,
  //     {fsRoot: './dist/component/'}
  //   )
  // },
  {
    pattern: new URLPattern({ pathname: "/:page" }),
    handler: (request, _info, parameters) => {
      
      console.log('/dist/route/' + (parameters?.pathname.groups.page || 'home'));
      
      return serveFile(
        request,
        '/dist/route/' + (parameters?.pathname.groups.page ?? 'home')
      )
    }
  }
];

function defaultHandler(_req: Request) : Response {
  return new Response("Not found", { status: 404 });
}

Deno.serve(route(routes, defaultHandler));
