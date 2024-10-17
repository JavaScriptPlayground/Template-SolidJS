import { route, type Route } from "@std/http/unstable-route";
import defaultHandler from './request_handler/default_handler.ts';
import pageHandler from './request_handler/page_handler.ts';

const rootDirectory = './dist/';
const routeDirectory = `${rootDirectory}/route/`;

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/static/:asset*" }),
    handler: (request, _info, parameters) => pageHandler(
      request,
      rootDirectory,
      'static/',
      parameters?.pathname.groups.asset
    )
  },
  {
    pattern: new URLPattern({ pathname: '/:page([^\/]+\/?)' }),
    handler: (request, _info, parameters) => pageHandler(
      request,
      routeDirectory,
      parameters?.pathname.groups.page
    )
  },
  {
    pattern: new URLPattern({ pathname: '/:page/:asset*' }),
    handler: (request, _info, parameters) => {
      const {page, asset} = parameters?.pathname.groups ?? {};

      return pageHandler(
        request,
        routeDirectory,
        page,
        asset
      );
    }
  },
  {
    pattern: new URLPattern({ pathname: '/' }),
    handler: (request) => pageHandler(
      request,
      routeDirectory,
      'home/'
    )
  }
];

Deno.serve(
  {port: 8080},
  route(routes, defaultHandler)
);
