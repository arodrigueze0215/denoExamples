class IObserver {
    notify(data) {
        throw new Error("Method 'notify' must be implemented.");
    }
}

module.exports = IObserver;