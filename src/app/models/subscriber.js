export default class Subscriber {
    constructor() {
        this._subscribers = new Map();
    }

    get subscribers() { return this._subscribers; }

    subscribe(event, callback) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    }

    unsubscribe(event, callback) {
        let listeners = this.subscribers.get(event);

        if (listeners && listeners.length) {
            listeners = listeners.filter(l => l !== callback);
            this.subscribers.set(event, listeners);
            return true;
        }

        return false;
    }

    broadcast(event) {
        const events = this.subscribers.get(event);
        if (events) {
            events.forEach(listener => {
                listener();
            });
        }
    }

    unsubscribeAll() {
        this._subscribers = new Map();
    }
}
