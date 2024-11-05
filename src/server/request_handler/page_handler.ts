import { serveFile } from '@std/http/file-server';

/**
 * This function handles page requests.
 * 
 * @param request The request from the client
 * @param root The root directory
 * @param page The requested page
 * @param file The file to serve
 * @returns The page response
 */
export default function pageHandler(
  request : Request,
  root : string,
  page : string | undefined,
  file : string = 'index.html'
) : Promise<Response> {
  return serveFile(
    request,
    `${root}/${page ?? ''}/${file}`
  )
}
