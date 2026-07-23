import type { IOrderEvent } from "../interfaces/IOrderEvent.ts";

export class OrderProcessorStream extends TransformStream<string, IOrderEvent> {
  // Hint 1: You need a place to remember the CSV column headers (e.g., ['id', 'asset', 'quantity', 'price', 'status']).
  //         Define a private class property here: private headers: string[] = [];
  private headers: string[] = [];

  constructor() {
    super({
      // Hint 2: Notice the arrow function syntax `transform: (chunk, controller) =>`.
      //         Using an arrow function preserves `this` so you can access `this.headers`.
      transform: (chunk: string, controller: TransformStreamDefaultController<IOrderEvent>) => {
        // TODO: STEP 1 - Clean incoming line
        // Hint: 'chunk' is a single line of text from the CSV.
        //       Trim whitespace. If the trimmed line is empty, return early to skip it.

        // TODO: STEP 2 - Split line into columns
        // Hint: Split the line by comma (',') into an array of values.

        // TODO: STEP 3 - Handle Header vs Data lines
        // Hint 3.1: If this.headers is empty (first row of file):
        //           Save the split array into this.headers and do not enqueue anything.
        //
        // Hint 3.2: If this.headers already exists (data rows):
        //           Construct an object that satisfies the IOrderEvent interface 
        //           (id, asset, quantity, price, status).
        //
        // TODO: STEP 4 - Forward the object to the next stream
        // Hint: In Web Streams API, what method on 'controller' sends the object to the downstream pipeline?
        if (chunk.trim() === "") return;

        const columns = chunk.split(",").map(col => col.trim());

        if (this.headers.length === 0) {
          this.headers = columns;
          return;
        }

        const orderEvent: IOrderEvent = {
          id: columns[0],
          asset: columns[1],
          quantity: columns[2],
          price: columns[3],
          status: columns[4],
        }

        controller.enqueue(orderEvent);
      }
    });
  }
}
