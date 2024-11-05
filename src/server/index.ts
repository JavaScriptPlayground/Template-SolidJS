import { route, type Route } from "@std/http/unstable-route";
import { serveFile } from "@std/http";
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
    pattern: new URLPattern({ pathname: '/:path*' }),
    handler: (request, _info, parameters) => {
      console.log(parameters?.pathname.groups.path)
      return serveFile(request, appDirectory+'index.html')
    }
  },
  {
    pattern: new URLPattern({ pathname: '/:page/:dynamicAsset*' }),
    handler: (request, _info, parameters) => {
      const {page, dynamicAsset} = parameters?.pathname.groups ?? {};

      return pageHandler(
        request,
        appDirectory,
        page,
        dynamicAsset
      );
    }
  }
];

Deno.serve(
  {port: 8080},
  route(routes, (request) => pageHandler(request, appDirectory, '404'))
);
