# Deno Middleware Chaining Example

This example was created for an advanced Deno course to demonstrate a fundamental web development concept: **middleware**. It shows how to create and execute a chain of middleware functions for incoming HTTP requests in a simple, understandable way, without relying on external frameworks.

## What is Middleware?

In web frameworks, middleware refers to functions that have access to the request object (`req`), the response object (`res`), and a `next` function to pass control to the next middleware in the application’s request-response cycle.

These functions can:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

## How This Example Works

This project is split into two main files:

### `middleware.ts`

This file contains the core logic for our middleware pattern.

1.  **Middleware Functions**: We define several simple middleware functions like `authMiddleware`, `validateMiddleware`, and `createUserMiddleware`. Each follows the signature `(req: Request, res: Response, next: () => void) => void`. They perform a task (in this case, logging to the console) and then crucially call `next()` to pass control along the chain.

2.  **`executeMiddlewares` Function**: This is the heart of the pattern. It's a function that takes an array of middleware. It uses a **closure** to manage the execution flow.
    - It initializes an `index` to `0`.
    - It defines an inner `next()` function.
    - When `next()` is called, it checks if there are more middleware functions to run. If so, it increments the index and executes the current middleware, passing it the `req`, `res`, and the very same `next` function.
    - This creates a chain: each middleware calls `next()`, which in turn calls the *next* middleware.

### `index.ts`

This is the server's entry point. It starts a Deno web server using `Deno.serve`. For each incoming request, it:

1.  Creates an initial `Response` object.
2.  Defines an array of the middleware functions we want to execute for the request (`[authMiddleware, validateMiddleware, createUserMiddleware]`).
3.  Calls `executeMiddlewares`, passing it the request, response, and the list of middleware.
4.  Returns the response to the client.

## How to Run the Example

1.  Make sure you are in the `Middleware` directory.
2.  Run the server using the following Deno command:

    ```bash
    deno run --allow-net index.ts
    ```

3.  Send a request to `http://localhost:8000` using a tool like `curl` or your web browser.

    ```bash
    curl http://localhost:8000
    ```

4.  You will see the output of each middleware logged in your terminal in the order they were passed to `executeMiddlewares`.