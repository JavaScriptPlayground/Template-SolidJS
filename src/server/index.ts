import { route, type Route } from "@std/http/unstable-route";
import { serveFile } from "@std/http/file-server";
import defaultHandler from './request_handler/default_handler.ts';
import pageHandler from './request_handler/page_handler.ts';
import pageAssetsHandler from './request_handler/page_assets_handler.ts';

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/static/:asset*" }),
    handler: (request, _info, parameters) => serveFile(
      request,
      `./dist/static/${parameters?.pathname.groups.asset}`
    )
  },
  {
    pattern: new URLPattern({ pathname: '/:page([^\/]+\/?)' }),
    handler: (request, _info, parameters) => pageHandler(request, parameters?.pathname.groups.page)
  },
  {
    pattern: new URLPattern({ pathname: '/:page/:asset*' }),
    handler: (request, _info, parameters) => {
      const {page, asset} = parameters?.pathname.groups ?? {}

      return pageAssetsHandler(request, page, asset)
    }
  },
  {
    pattern: new URLPattern({ pathname: '/' }),
    handler: (request) => pageHandler(request, 'home')
  }
];

Deno.serve(
  {port: 8080},
  route(routes, defaultHandler)
);
