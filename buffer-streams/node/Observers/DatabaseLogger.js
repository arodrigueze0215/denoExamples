const IObserver = require('../Interfaces/IObserver.js');


class DatabaseLogger extends IObserver {
    notify(data) {
        console.log('Store alert', data);
    }
}

module.exports = DatabaseLogger;