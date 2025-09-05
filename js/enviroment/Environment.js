import { Sphere } from "./Sphere.js";
import { EnvironmentObject } from "../objects/EnviromentObject.js";
import { DetectionPulse } from "../objects/DetectionPulse.js";

import {JSObject} from "../core/JSObject.js";

class Environment extends JSObject {

    static create() {
        let obj = new Environment();        
        return obj;
    }

    constructor() {
        super();

        /**
         * Objetos del entorno
         * @type {EnvironmentObject[]}
         * @private
         */
        this._objects = [];

        // CL3D.SceneNode (terrain)
        this._terrain = null;

        // CL3D.Scene 
        this._scene = null;
        obj.init();
    }

    /**
     * Obtiene todos los objetos
     * @returns {EnvironmentObject[]}
     */
    get objects() {
        return this._objects;
    }

    /**
     * Setea todos los objetos
     * @returns {EnvironmentObject[]} objs
     */
    set objects(objs) {
        return this._objects = objs;
    }

    /**
     * Obtiene todos los objetos en movimiento
     * @returns {EnvironmentObject[]}
     */
    get movingObjects() {
        return this.objects.filter(obj => obj.isMovingObject());
    }

    /**
     * Obtiene todos los objetos en movimiento
     * @returns {EnvironmentObject[]}
     */
    get activeObjects() {
        return this.objects.filter(obj => obj.active);
    }

    /**
     * Obtiene el terreno
     * @returns {CL3D.SceneNode}
     */
    get terrain() {
        return this._terrain;
    }

    /**
     * Setea el terreno
     * @param {CL3D.SceneNode} node
     */
    set terrain(node) {
        return this._terrain = node;
    }

    /**
     * Obtiene la escena CopperCube
     * @returns {CL3D.Scene}
     */
    get scene() {
        return this._scene;
    }

    /**
     * Setea el terreno
     * @param {CL3D.Scene} scene
     */
    set scene(scene) {
        return this._scene = node;
    }





    spawnSpyDrone() {}

    /**
     * Realiza un paso en la simulacion del
     * entorno. Remueve los objetos inactivos
     * y acciona cada objeto vivo.
     * @private
     */
    doStep() {
        // remueve los objetos inactivos
        this.objects = this.activeObjects;
        this.objects.forEach((obj) => {
            obj.exec();
        });
    }

    init() { }

    /**
     *
     * @param {EnvironmentObject} obj
     */
    spawnObject(obj) {
        let self = this;
        obj.env = self;
        self.objects.push(obj);
        self.dispatchEvent("spawnedObject", { object: obj } );
    }

    destroyObject() { }

    /**
     * Retorna un conjunto de objetos 
     * desplazándose en el entorno,
     * contenidos en el volumen de la esfera.
     * @param {Number} c ecenter
     * @param {Number} r radius
     */
    objectsForSphere(c, r) {
        let self = this;
        let s = Sphere.create(c, r);
        let objs = self.movingObjects.filter(obj => s.containsPoint(obj.getPosition()));
        return objs;        
    }

    /**
     * Crea un pulso que se propaga en el environment
     * desplazándose en forma de onda esférica.
     * @param {DetectionPulse} pulse
     */
    spawnPulse(pulse) {
        let self = this;        
              
        //let objs = self.movingObjects.filter(obj => s.containsPoint(obj.getPosition()));
        self.spawnObject(pulse);
         
    }


}
export {Environment}