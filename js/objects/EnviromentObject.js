import { JSObject } from "../core/JSObject.js";

class EnviromentObject extends JSObject {

    constructor() {
        super();
        this.position = [0,0,0].asVect3d();        
    }

    isEnvObject() {
        return true;
    }

    isMovingObject() {
        return false;
    }
}
export {EnviromentObject}