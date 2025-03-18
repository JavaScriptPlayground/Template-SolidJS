import { route, type Route } from "@std/http/unstable-route";
import pageHandler from './request_handler/page_handler.ts';

const rootDirectory = './dist/';
const appDirectory = `${rootDirectory}/app/`;

const routes : Route[] = [
  {
    pattern: new URLPattern({ pathname: "/static/:staticAsset*" }),
    handler: (request, _info, parameters) => pageHandler(
      request,
      rootDirectory,
      'static/',
      parameters?.pathname.groups.staticAsset
    )
  },
  {
    pattern: new URLPattern({ pathname: '/index.js' }),
    handler: (request, _info, parameters) => {
      console.log('page', parameters?.pathname.groups.page);
      
      return pageHandler(request, appDirectory, '', 'index.js')
    }
  },
  {
    pattern: new URLPattern({ pathname: '/app:page(|\/.*)' }),
    handler: (request, _info, parameters) => {
      console.log('page', parameters?.pathname.groups.page);
      
      return pageHandler(request, appDirectory, '')
    }
  },
];

Deno.serve(
  {port: 8080},
  route(routes, (request) => pageHandler(request, appDirectory, '404'))
);
