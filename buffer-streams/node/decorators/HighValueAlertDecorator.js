import { Transform } from 'stream';
import IOrderEvent from '../Interfaces/IOrderEvent.js';

class HighValueAlertDecorator extends Transform {
  constructor(eventEmitter) {
    // TODO: STEP 1 - Configure Stream Object Mode & Observer/EventEmitter integration
    // Hint 1: Pass the required objectMode configuration to super().
    // Hint 2: Notice that JavaScript does not support multiple inheritance (cannot extend Transform AND OrderEventEmitter simultaneously).
    // Hint 3: How can you use Composition or Dependency Injection to associate an OrderEventEmitter instance with this decorator?
    const config = {
      objectMode: true,
      readableObjectMode: true,
      writableObjectMode: true
    }
    super(config);

    this.eventEmitter = eventEmitter;
  }

  _transform(chunk, encoding, callback) {
    // TODO: STEP 2 - Evaluate Order Value and Trigger Observers
    // Hint 1: Extract 'quantity' and 'price' from the chunk object. Remember to parse them to numbers before multiplying!
    // Hint 2: Calculate total value: quantity * price.
    // Hint 3: If total value > 100000:
    //         Trigger your eventEmitter/observers with the order event data.
    // Hint 4: Regardless of whether the order is high-value or not (Decorator role), 
    //         how do you pass the chunk to the next stream in the pipeline?
    // Hint 5: Don't forget to invoke callback() to keep the stream moving.
    const valueToProcess = Number(chunk.quantity) * Number(chunk.price)

    if (valueToProcess > 100000) {
      const dataChunk = new IOrderEvent(
        chunk.id,
        chunk.asset,
        chunk.quantity,
        chunk.price,
        chunk.status
      )
      this.eventEmitter.emit(dataChunk)
    }
    this.push(chunk)
    callback()
  }
}

export default HighValueAlertDecorator;
