class IEventEmitter {
    constructor() {
        this.observers = [];
    }

    attach(observer) {
        this.observers.push(observer);
    }

    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    emit(data) {
        this.observers.forEach(observer => observer.notify(data));
    }
}

module.exports = IEventEmitter;
