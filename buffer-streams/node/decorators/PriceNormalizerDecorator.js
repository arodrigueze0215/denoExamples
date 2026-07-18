import { Transform } from 'stream';

class PriceNormalizerDecorator extends Transform {
  constructor() {
    // TODO: STEP 1 - Enable Object Mode
    // Hint: Currently, super() runs in the default binary/string mode.
    // What configuration object needs to be passed to super() so this stream 
    // can receive and output JavaScript objects on both ends?
    const config = {
      objectMode: true,
      readableObjectMode: true,
      writableObjectMode: true
    }
    super(config);
  }

  _transform(chunk, encoding, callback) {
    // TODO: STEP 2 - Normalize the 'price' field
    // Hint 1: 'chunk' is a JavaScript object (e.g., representing a CSV line).
    // Hint 2: Check the type of chunk.price. Is it a number or a string when parsed from CSV?
    // Hint 3: Round the price to exactly 2 decimal places. Look into parseFloat() and Number.prototype.toFixed().
    // Hint 4: After modifying the price in the object, how do you send this modified object to the next stream?
    // Hint 5: Don't forget to call callback() at the end to keep the pipeline flowing.

    const normalizedPrice = Number(chunk.price).toFixed(2);
    chunk.price = normalizedPrice;


    this.push(chunk);
    callback()
  }
}

export default PriceNormalizerDecorator;
