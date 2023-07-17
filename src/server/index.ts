// --server-root="./src/client"
Deno.serve({
    port: 80
}, (request) => {
    console.log(new URL(request.url).pathname);
    return new Response(Deno.readFileSync('./src/client/index.html'));
})
