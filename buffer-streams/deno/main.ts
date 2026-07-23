// TODO: IMPORTS
// Hint 1: Import TextLineStream from "jsr:@std/streams@1/text-line-stream" to convert text stream chunks into line-by-line chunks.
// Hint 2: Import OrderEventEmitter from "./OrderEventEmitter.ts".
// Hint 3: Import RiskManagerNotifier from "./observers/RiskManagerNotifier.ts".
// Hint 4: Import DatabaseLogger from "./observers/DatabaseLogger.ts".
// Hint 5: Import OrderProcessorStream from "./streams/OrderProcessorStream.ts".
// Hint 6: Import PriceNormalizerDecorator from "./decorators/PriceNormalizerDecorator.ts".
// Hint 7: Import HighValueAlertDecorator from "./decorators/HighValueAlertDecorator.ts".
// Hint 8: Import CsvFormatterStream from "./streams/CsvFormatterStream.ts".
import { TextLineStream } from "jsr:@std/streams@1/text-line-stream";
import { OrderEventEmitter } from "./OrderEventEmitter.ts";
import { RiskManagerNotifier } from "./observers/RiskManagerNotifier.ts";
import { DatabaseLogger } from "./observers/DatabaseLogger.ts";
import { OrderProcessorStream } from "./streams/OrderProcessorStream.ts";
import { PriceNormalizerDecorator } from "./decorators/PriceNormalizerDecorator.ts";
import { HighValueAlertDecorator } from "./decorators/HighValueAlertDecorator.ts";
import { CsvFormatterStream } from "./streams/CsvFormatterStream.ts";

// Event Emitter
const orderEventEmitter = new OrderEventEmitter();

// TODO: STEP 1 - Setup Event Emitters & Observers
// Hint 1: Instantiate RiskManagerNotifier and DatabaseLogger.
// Hint 2: Instantiate OrderEventEmitter.
// Hint 3: Attach both notifier and logger observers to the event emitter instance using .attach().
const riskManagerNotifier = new RiskManagerNotifier();
const databaseLogger = new DatabaseLogger();

orderEventEmitter.attach(riskManagerNotifier);
orderEventEmitter.attach(databaseLogger);

// TODO: STEP 2 - Open Input & Output File Streams in Deno
// Hint 1: Use `await Deno.open("../orders.csv")` to open the shared input CSV file.
// Hint 2: Use `await Deno.create("./processed_orders.csv")` to create the destination output file.
const inputFile = await Deno.open(new URL("../orders.csv", import.meta.url));
const outputFile = await Deno.create(new URL("./processed_orders.csv", import.meta.url));

// TODO: STEP 3 - Instantiate Stream Components
// Hint 1: Create instances of OrderProcessorStream, PriceNormalizerDecorator, CsvFormatterStream.
// Hint 2: Create HighValueAlertDecorator passing your event emitter instance to its constructor.

const orderProcessorStream = new OrderProcessorStream();
const priceNormalizerDecorator = new PriceNormalizerDecorator();
const csvFormatterStream = new CsvFormatterStream();
const highValueAlertDecorator = new HighValueAlertDecorator(orderEventEmitter);

// TODO: STEP 4 - Build & Execute the Web Streams Pipeline
// Hint 1: Start from `inputFile.readable`.
// Hint 2: Chain using `.pipeThrough(...)`:
//         1. `new TextDecoderStream()` -> converts file Uint8Array bytes to UTF-8 text strings
//         2. `new TextLineStream()` -> splits text string into line-by-line string chunks
//         3. `orderProcessorStream` -> converts string lines to IOrderEvent objects
//         4. `priceNormalizerDecorator` -> rounds price to 2 decimals
//         5. `highValueAlertDecorator` -> evaluates > $100k and triggers observers
//         6. `csvFormatterStream` -> converts IOrderEvent objects back to CSV row strings
//         7. `new TextEncoderStream()` -> converts CSV strings back to Uint8Array bytes for disk I/O
// Hint 3: End the pipeline using `.pipeTo(outputFile.writable)`.
// Hint 4: Don't forget `await` on the whole pipeThrough/pipeTo chain!
await inputFile.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream())
  .pipeThrough(orderProcessorStream)
  .pipeThrough(priceNormalizerDecorator)
  .pipeThrough(highValueAlertDecorator)
  .pipeThrough(csvFormatterStream)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(outputFile.writable);