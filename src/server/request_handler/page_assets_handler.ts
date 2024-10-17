import { serveFile } from '@std/http/file-server';

/**
 * This function handles requests for page assets.
 * 
 * @param request The request from the client
 * @param page The requested page
 * @param path The path to the asset that was requested
 * @returns The asset response
 */
export default function pageAssetsHandler(
  request : Request,
  page : string | undefined,
  path : string | undefined
) : Promise<Response> {
  return serveFile(
    request,
    `./dist/route/${page}/${path}`
  )
}
