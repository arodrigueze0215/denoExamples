import { authMiddleware, validateMiddleware, createUserMiddleware, executeMiddlewares } from "./middleware.ts";

Deno.serve((request: Request) => {
    const response = new Response("Middleware initialized", { status: 200 });
    executeMiddlewares({req: request, res: response, middlewareList: [authMiddleware, validateMiddleware, createUserMiddleware]});
    return response;
});