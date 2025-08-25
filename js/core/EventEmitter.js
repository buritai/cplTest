

class EventEmitter {

    constructor() {
        this.events = {};
    }

    /**
     * 
     * @param {*} event 
     * @param {*} listener 
     */
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(
            listener => listener !== listenerToRemove
        );
    }

    once(event, listener) {
        const onceWrapper = (...args) => {
            listener.apply(this, args);
            this.off(event, onceWrapper);
        };
        this.on(event, onceWrapper);
    }

    emmit(event, ...args) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener.apply(this, args));
    }

    listenerCount(event) {
        return this.events[event] ? this.events[event].length : 0;
    }

    eventNames() {
        return Object.keys(this.events);
    }
}

export {EventEmitter}