import type { IOrderEvent } from "../interfaces/IOrderEvent.ts";

export class CsvFormatterStream extends TransformStream<IOrderEvent, string> {
  private isFirstChunk = true;
  private csvHeader = "id,asset,quantity,price,status\n";

  constructor() {
    super({
      // Hint 1: Generics <IOrderEvent, string> mean input is an object and output is a formatted string.
      // Hint 2: Arrow function `transform: (chunk, controller) =>` allows access to `this.isFirstChunk` and `this.csvHeader`.
      transform: (chunk: IOrderEvent, controller: TransformStreamDefaultController<string>) => {
        // TODO: STEP 1 - Emit Header on First Chunk
        // Hint: If this.isFirstChunk is true, enqueue this.csvHeader first, then set this.isFirstChunk = false.
        if (this.isFirstChunk) {
          controller.enqueue(this.csvHeader);
          this.isFirstChunk = false;
        }

        // TODO: STEP 2 - Format Object into CSV Line
        // Hint: Construct a comma-separated string ending with '\n': 
        //       `${chunk.id},${chunk.asset},${chunk.quantity},${chunk.price},${chunk.status}\n`
        const csvLine = `${chunk.id},${chunk.asset},${chunk.quantity},${chunk.price},${chunk.status}\n`;

        // TODO: STEP 3 - Forward CSV String Downstream
        // Hint: Pass the formatted row string to controller.enqueue(csvLine).
        controller.enqueue(csvLine);
      }
    });
  }
}
