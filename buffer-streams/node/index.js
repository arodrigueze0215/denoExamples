import { join } from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import OrderEventEmitter from './OrderEventEmitter.js';
import RiskManagerNotifier from './Observers/RiskManagerNotifier.js';
import DatabaseLogger from './Observers/DatabaseLogger.js';
import OrderProcessorStream from './streams/OrderProcessorStream.js';
import PriceNormalizerDecorator from './decorators/PriceNormalizerDecorator.js';
import HighValueAlertDecorator from './decorators/HighValueAlertDecorator.js';
import CsvFormatterStream from './streams/CsvFormatterStream.js';

//Sources
const csvFilePath = join(process.cwd(), 'buffer-streams/orders.csv');
const fileStream = fs.createReadStream(csvFilePath);

const outputFilePath = join(process.cwd(), 'buffer-streams/node/processed_orders.csv');
const outputStream = fs.createWriteStream(outputFilePath);

//Event Emitters
const orderEventEmitter = new OrderEventEmitter();

const RiskAlert = new RiskManagerNotifier();
const DatabaseAlert = new DatabaseLogger();

orderEventEmitter.attach(RiskAlert)
orderEventEmitter.attach(DatabaseAlert)

//Streams
const orderProcessorStream = new OrderProcessorStream();
const csvFormatterStream = new CsvFormatterStream();

//Decorators
const priceNormalizerDecorator = new PriceNormalizerDecorator();
const highValueAlertDecorator = new HighValueAlertDecorator(orderEventEmitter);


try {
  await pipeline(
    fileStream,
    orderProcessorStream,
    priceNormalizerDecorator,
    highValueAlertDecorator,
    csvFormatterStream,
    outputStream
  )
  console.log('Pipeline completed successfully.');
} catch (error) {
  console.error('Pipeline failed:', error);
}

