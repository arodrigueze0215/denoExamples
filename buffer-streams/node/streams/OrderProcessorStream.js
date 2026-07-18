
import { Transform } from 'stream';

class OrderProcessorStream extends Transform {
  constructor() {
    const options = {
      readableObjectMode: true,
      writableObjectMode: false
    }
    super(options)

  }

  _transform(chunk, encoding, callback) {
    //transform chunk buffer to string
    const csvContent = chunk.toString();
    //split the string to lines
    csvContent.split(/\r?\n/).forEach((line, index) => {
      //trim the line
      const trimmedLine = line.trim();

      //skip empty lines
      if (!trimmedLine) return;
      //split the line to array
      const lineArray = trimmedLine.split(',');

      //first line is header
      if (index === 0) {
        this.headers = lineArray;
      } else {
        //other lines are data
        const orderObject = {};
        this.headers.forEach((header, i) => {
          orderObject[header.trim()] = lineArray[i];
        });
        //push the order object
        this.push(orderObject);
      }
    });

    callback()
  }
}

export default OrderProcessorStream
