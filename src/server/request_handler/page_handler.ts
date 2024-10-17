import { serveFile } from '@std/http/file-server';

/**
 * This function handles page requests.
 * 
 * @param request The request from the client
 * @param page The requested page
 * @param defaultFile The default file to serve
 * @returns The page response
 */
export default function pageHandler(
  request : Request,
  page : string | undefined,
  defaultFile = 'index.html'
) : Promise<Response> {
  return serveFile(
    request,
    `./dist/route/${page}/${defaultFile}`
  )
}
