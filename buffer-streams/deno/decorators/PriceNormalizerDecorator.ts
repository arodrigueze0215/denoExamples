import type { IOrderEvent } from "../interfaces/IOrderEvent.ts";

export class PriceNormalizerDecorator extends TransformStream<IOrderEvent, IOrderEvent> {
  constructor() {
    super({
      transform: (chunk: IOrderEvent, controller: TransformStreamDefaultController<IOrderEvent>) => {
        // TODO: STEP 1 - Normalize price
        // Hint: chunk.price is a string. Convert it to a number and format to exactly 2 decimals using .toFixed(2).
        const price = parseFloat(chunk.price).toFixed(2);

        // TODO: STEP 2 - Update the object
        // Hint: Assign the formatted 2-decimal string back to chunk.price.
        chunk.price = price;

        // TODO: STEP 3 - Pass downstream
        // Hint: How do you enqueue the modified chunk using 'controller'?
        controller.enqueue(chunk);
      }
    });
  }
}
