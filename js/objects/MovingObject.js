import { EnvironmentObject } from "./EnviromentObject.js";


class MovingObject extends EnvironmentObject {

    constructor() {
        super();
        this._direction = [0,0,0].asVect3d();
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