const IEventEmitter = require('./Interfaces/IEventEmitter.js');

class OrderEventEmitter extends IEventEmitter {
    constructor() {
        super();
    }
}

module.exports = OrderEventEmitter;