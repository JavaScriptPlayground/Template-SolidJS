import { route, type Route } from "@std/http/unstable-route";
import pageHandler from './request_handler/page_handler.ts';

const rootDirectory = './dist/';
const appDirectory = `${rootDirectory}/app/`;

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/-/:staticAsset*" }),
    handler: (request, _info, parameters) => pageHandler(
      request,
      rootDirectory,
      'static/',
      parameters?.pathname.groups.staticAsset
    )
  },
  {
    pattern: new URLPattern({ pathname: '/:path*/assets/:dynamicAsset*' }),
    handler: (request, _info, parameters) => {
      const {path, dynamicAsset} = parameters?.pathname.groups ?? {};
      return pageHandler(
        request,
        appDirectory,
        path,
        '/assets/' + dynamicAsset
      );
    }
  },
  {
    pattern: new URLPattern({ pathname: '/:path(.*)' }),
    handler: (request) => {
      return pageHandler(request, appDirectory, '')
    }
  }
];

Deno.serve(
  {port: 8080},
  route(routes, (request) => pageHandler(request, appDirectory, '404'))
);
