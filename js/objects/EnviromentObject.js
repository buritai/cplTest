/**
*  _____           _                                      _   _____ _     _           _   
* |  ___|         (_)                                    | | |  _  | |   (_)         | |  
* | |__ _ ____   ___ _ __ ___  _ __  _ __ ___   ___ _ __ | |_| | | | |__  _  ___  ___| |_ 
* |  __| '_ \ \ / / | '__/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __| | | | '_ \| |/ _ \/ __| __|
* | |__| | | \ V /| | | | (_) | | | | | | | | |  __/ | | | |_\ \_/ / |_) | |  __/ (__| |_ 
* \____/_| |_|\_/ |_|_|  \___/|_| |_|_| |_| |_|\___|_| |_|\__|\___/|_.__/| |\___|\___|\__|
*                                                                       _/ |              
* @author buritai
* Un EnvironmentObject (clase abstracta) es un objeto estatico o dinamico en el entorno 
* que es sujeto de interacción.
*/

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
        this._scale = [1,1,1].asVect3d();

        this._active = true;
    }

    isEnvObject() {
        return true;
    }

    isMovingObject() {
        return false;
    }

    /**
     * Retorna true si el receptor esta activo
     * @returns {boolean}
     */
    get active() {
        return this._active;
    }

    /**
     * Setter de estadfo activo
     * @param {boolean} value
     */
    set active(value) {
        this._active = value;
    }



    /**
     * Obtiene el environment
     * @returns {Environment}
     */
    get environment() {
        return this._env;
    }

    /**
     * Setea el environment
     * @param {Environment} value
     */
    set environment(value) {
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
        this._position = this.node.Pos;
        return this._position;
    }

    /**
     * Setea la posición del receptor. 
     * Por omision sincroniza con el SceneNode
     * @param {array | CL3D.Vector3d}
     */
    set position( value ) {
        if(Array.isArray(value)) {
            this._position = value.asVect3d();
        } else this._position = value;
        this.node.Pos.X = this._position.X;
        this.node.Pos.Y = this._position.Y;
        this.node.Pos.Z = this._position.Z;
        //this.node.updateAbsolutePosition();   
    }

    /**
     * Posicion en el plano XZ
     * @returns {CL3D.asVect2d}
     */
    get positionXZ() {
        return [this.position.X, this.position.Z].asVect2d();
    }

     /**
     * Posicion en el plano XY
     * @returns {CL3D.asVect2d}
     */
    get positionXY() {
        return [this.position.X, this.position.Y].asVect2d();
    }


    /**
     * Metodo anstracto.
     * Cada objeto del entorno debe implementar
     * su metodo exec.
     * @param {Environment} env 
     */
    exec(env) {
        throw Error('Debe ser implementado por las sublases')
    }
}
export {EnvironmentObject}