import { JSObject } from "../core/JSObject";


class MovingObject extends JSObject {

    constructor() {
        super();
        this.direction = [0,0,0].asVector3d();
    }

    isMovingObject() {
        return true;
    }

    /**
     * Obtiene la dirección del receptor
     * @returns {CL3D.Vector3d}
     */
    get direction() {
        return this._direction;
    }

    /**
     * Setea la dirección del receptor
     * @param {array | CL3D.Vector3d}
     */
    set direction( value ) {
        if(Array.isArray(value)) {
            this._direction = value.asVect3d();
        } else this._direction = value;
    }

}
export {MovingObject}