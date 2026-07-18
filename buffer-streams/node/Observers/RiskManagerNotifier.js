const IObserver = require('../Interfaces/IObserver.js');


class RiskManagerNotifier extends IObserver {
    notify(data) {
        console.log('Risk alert', data);
    }
}

module.exports = RiskManagerNotifier;