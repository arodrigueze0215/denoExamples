import { join } from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import OrderEventEmitter from './OrderEventEmitter.js';
import IOrderEvent from './Interfaces/IOrderEvent.js';
import RiskManagerNotifier from './Observers/RiskManagerNotifier.js';
import DatabaseLogger from './Observers/DatabaseLogger.js';
import OrderProcessorStream from './streams/OrderProcessorStream.js';



const orderEvent = new IOrderEvent();
const RiskAlert = new RiskManagerNotifier();
const DatabaseAlert = new DatabaseLogger();


const dummyOrderEventEmitter = new OrderEventEmitter();

dummyOrderEventEmitter.attach(RiskAlert)
dummyOrderEventEmitter.attach(DatabaseAlert)
dummyOrderEventEmitter.emit(orderEvent)

const csvFilePath = join(process.cwd(), 'buffer-streams/node/orders.csv');
const orderProcessorStream = new OrderProcessorStream();
const fileStream = fs.createReadStream(csvFilePath);

const orderDestinyFunc = async (sourceStream) => {
  for await (const order of sourceStream) {
    console.log('Order proceed from async generator')
    console.log('======================')
    console.log(order)
    console.log('======================')
  }
};

try {
  await pipeline(
    fileStream,
    orderProcessorStream,
    orderDestinyFunc
  )
} catch (error) {
  console.error('Pipeline failed:', error);
}

