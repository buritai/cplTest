import { JSObject } from "./JSObject.js";
export class LevelMap extends JSObject{

    static create() {
        return new LevelMap();
    }

    /**
     * Crea una instancia con la escena
     * @param {CL3D.Scene} scene
     * @returns {LevelMap} lvl
     */
    static createWith(scene) {
        let lvl = new LevelMap();
        lvl.scene = scene;
        return lvl;
    }

    constructor() {
        super();
        this._scene = null;
        this.init();
    }

    /**
     * Obtiene la escena del receptor.
     * @access public
     * @returns {CL3D.Scene}
     */
    get scene() {
        return this._scene;
    }

    /**
     * Setea la escena del receptor.
     * @access public
     * @param {CL3D.Scene} scene  {CL3D.Scene}
     */
    set scene(scene) {
        this._scene = scene;
    }

    init(){}
    
}

