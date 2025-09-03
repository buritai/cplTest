import { JSObject } from "../core/JSObject";


class MovingObject extends JSObject {

    constructor() {
        super();
        this.direction = [0,0,0].asVector3d();
    }

    isMovingObject() {
        return true;
    }

}
export {MovingObject}