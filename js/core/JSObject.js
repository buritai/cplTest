import {EventEmitter} from "./EventEmitter.js";
import {Emitter} from "./Emitter.js";

class JSObject extends EventEmitter {

    constructor() {
        super();
        Emitter.call(this);
    }    
}
export {JSObject}