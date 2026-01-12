const IEventEmitter = require('./interfaces/IEventEmitter.js');

class OrderEventEmitter extends IEventEmitter {
    constructor() {
        super();
    }
}

module.exports = OrderEventEmitter;