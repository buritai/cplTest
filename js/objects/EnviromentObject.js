import { JSObject } from "../core/JSObject.js";
import { Environment } from "../enviroment/Environment.js";

class EnvironmentObject extends JSObject {


    constructor() {
        super();

        /** @type {CL3D.SceneNode} */
        this._node = null;

        /** @type {Environment} */
        this._env = null;

        this._position = [0,0,0].asVect3d();
    }

    isEnvObject() {
        return true;
    }

    isMovingObject() {
        return false;
    }

    /**
     * Obtiene el environment
     * @returns {Environment}
     */
    get env() {
        return this._env;
    }

    /**
     * Setea el environment
     * @param {Environment} value
     */
    set env(value) {
        this._env = value;
    }

    /**
     * Obtiene Nodo de la escena asociado
     * @returns {CL3D.SceneNode}
     */
    get node() {
        return this._node;
    }

    /**
     * Setea nodo de la escena asociado
     * @param {CL3D.SceneNode} value
     */
    set node(value) {
        this._node = value;
    }

    /**
     * Obtiene la posición del receptor
     * @returns {CL3D.Vector3d}
     */
    get position() {
        return this._position;
    }

    /**
     * Setea la posición del receptor
     * @param {array | CL3D.Vector3d}
     */
    set position( value ) {
        if(Array.isArray(value)) {
            this._position = value.asVect3d();
        } else this._position = value;
    }


}
export {EnvironmentObject}