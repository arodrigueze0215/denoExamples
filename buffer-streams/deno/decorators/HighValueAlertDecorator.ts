import type { IOrderEvent } from "../interfaces/IOrderEvent.ts";
import type { IEventEmitter } from "../interfaces/IEventEmitter.ts";

export class HighValueAlertDecorator extends TransformStream<IOrderEvent, IOrderEvent> {
  constructor(eventEmitter: IEventEmitter) {
    super({
      // Hint 1: Arrow function `transform: (chunk, controller) =>` preserves constructor parameter scope (`eventEmitter`).
      transform: (chunk: IOrderEvent, controller: TransformStreamDefaultController<IOrderEvent>) => {
        // TODO: STEP 1 - Calculate Total Order Value
        // Hint: Parse chunk.quantity and chunk.price into numbers before multiplying (quantity * price).
        const totalValue = parseFloat(chunk.quantity) * parseFloat(chunk.price);

        // TODO: STEP 2 - Trigger High Value Alert
        // Hint: If total value > 100000, call eventEmitter.emit(chunk) to notify subscribers.
        if (totalValue > 100000) {
          eventEmitter.emit(chunk);
        }

        // TODO: STEP 3 - Forward Chunk Downstream
        // Hint: Send the chunk to the next stream using controller.enqueue(chunk). 
        //       Remember: a decorator must ALWAYS pass data through regardless of whether an alert was triggered!
        controller.enqueue(chunk);
      }
    });
  }
}
