/**
 * This function handles default requests
 * 
 * @returns The default response
 */
export default function defaultHandler() : Response {
  return new Response(
    "Not found",
    { status: 404 }
  );
}
