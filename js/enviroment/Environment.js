import { Sphere } from "./Sphere.js";
import { EnvironmentObject } from "../objects/EnviromentObject.js";
import { DetectionPulse } from "../objects/DetectionPulse.js";

import {JSObject} from "../core/JSObject";

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
        this.terrain = null;

        // CL3D.Scene 
        this.enviroment = null;
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
     * Obtiene todos los objetos en movimiento
     * @returns {EnvironmentObject[]}
     */
    get movingObjects() {
        return this.objects.filter(obj => obj.isMovingObject());
    }

    spawnSpyDrone() {}

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
     * desplazandose en el entorno, 
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
        
        let s = pulse.sphere();        
        //let objs = self.movingObjects.filter(obj => s.containsPoint(obj.getPosition()));
        self.spawnObject(pulse);
        return objs;        
    }
    

}