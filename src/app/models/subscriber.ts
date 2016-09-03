
export default class Subscriber {
    private _subscribers: Map<string, Array<Function>>;

    constructor() {
        this._subscribers = new Map<string, Array<Function>>();
    }

    get subscribers(): Map<string, Array<Function>> { return this._subscribers; }

    subscribe(event: string, callback: Function): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    }

    unsubscribe(event: string, callback: Function): boolean {
        let listeners = this.subscribers.get(event);

        if (listeners && listeners.length) {
            listeners = listeners.filter(l => l !== callback);
            this.subscribers.set(event, listeners);
            return true;
        }

        return false;
    }

    broadcast(event: string): void {
        const events: Array<Function> = this.subscribers.get(event);
        if (events) {
            events.forEach(listener => {
                listener();
            });
        }
    }

    unsubscribeAll(): void {
        this._subscribers = new Map<string, Array<Function>>();
    }
}
