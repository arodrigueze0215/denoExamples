import { Transform } from 'stream';

class CsvFormatterStream extends Transform {

  constructor() {
    // TODO: STEP 1 - Configure Stream Modes
    // Hint 1: This stream receives JavaScript objects on its input (writable side).
    // Hint 2: This stream emits plain text / string CSV rows on its output (readable side).
    // What configuration options (writableObjectMode vs readableObjectMode) should be passed to super()?
    const config = {
      writableObjectMode: true,
      readableObjectMode: false,
    }
    super(config);

    // Hint 3: You may need a flag or tracker to ensure the CSV header is emitted only once before data rows.
    this.csvHeader = 'id,asset,quantity,price,status\n';
    this.isFirstChunk = true;
  }

  _transform(chunk, encoding, callback) {
    // TODO: STEP 2 - Convert Object to CSV String
    // Hint 1: If this.isFirstChunk is true, construct and push the CSV header first: "id,asset,quantity,price,status\n"
    //         Don't forget to update the flag so it doesn't print on subsequent rows!
    // Hint 2: Format the chunk object into a comma-separated line ending with a newline character:
    //         `${chunk.id},${chunk.asset},${chunk.quantity},${chunk.price},${chunk.status}\n`
    // Hint 3: Send the formatted string downstream using this.push().
    // Hint 4: Invoke callback() to allow the stream pipeline to continue processing.

    if (this.isFirstChunk) {
      this.push(this.csvHeader);
      this.isFirstChunk = false;
    }

    const csvLine = `${chunk.id},${chunk.asset},${chunk.quantity},${chunk.price},${chunk.status}\n`;
    this.push(csvLine);
    callback();
  }
}

export default CsvFormatterStream;
