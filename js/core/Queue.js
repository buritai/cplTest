import { JSObject } from "./JSObject.js";

class Queue extends JSObject {

    static create() {
        let obj = new Queue();
        obj.init();
        return obj;
    }

    constructor() {
        super();
        this._elements = [];        
    }

    get elements() {
        return this._elements;
    }

    set elements(elems) {
        this._elements = elems;
    }

    init() {}

    push(object) {
        this.elements.push(object);
    }

    pop() {
        return this.elements.shift();
    }

    head() {
        if(this.isEmpty()) return null;
        return this.elements[0];
    }

    tail() {
        if(this.isEmpty()) return null;
        return this.elements[this.elements.length -1];
    }

    isEmpty() {
        return (this.elements.length == 0);
    }

    notEmpty() {
        return (!this.isEmpty());
    }

    size() {
        return this.elements.length;
    }
}
export {Queue}