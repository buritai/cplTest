import { JSObject } from "./JSObject.js";

class SoundManager extends JSObject{

    static create() {
        return new SoundManager();
    }

    constructor() {
        super();
    }

    init() {}
}
export { SoundManager }