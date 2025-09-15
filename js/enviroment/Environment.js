import { Sphere } from "./Sphere.js";
import { Circle } from "./Circle.js";
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
        this.init();
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
        return this._scene = scene;
    }





    spawnSpyDrone() {}

    /**
     * Realiza un paso en la simulacion del
     * entorno. Remueve los objetos inactivos
     * y acciona cada objeto vivo.
     * @param {number} deltatime
     * @private
     */
    doStep(deltatime) {
        let self = this;

        // remueve los objetos inactivos
        self.objects = self.activeObjects;
        self.objects.forEach((obj) => {
            obj.exec(deltatime);
        });
    }

    init() { }

    /**
     *
     * @param {EnvironmentObject} obj
     */
    spawnObject(obj) {
        let self = this;
        obj.environment = self;
        self.objects.push(obj);
        "#spawnedObject"
            .asEventWith({ object: obj })
            .dispatchFor(self);        
    }

    destroyObject() { }

    /**
     * Retorna un conjunto de objetos 
     * desplazándose en el entorno,
     * contenidos en el volumen de la esfera.
     * @param {CL3D.Vect3d} c center
     * @param {Number} r radius
     */
    objectsForSphere(c, r) {
        let self = this;
        let s = Sphere.create(c, r);
        let objs = self.movingObjects.filter(obj => s.containsPoint(obj.getPosition()));
        return objs;        
    }

    /**
     * Retorna un conjunto de objetos 
     * desplazándose en el entorno,
     * contenidos en una circunsferencia
     * en el plano xz.
     * @param {Number} c center
     * @param {Number} r radius
     */
    objectsForCircle(c, r) {
        let self = this;
        let s = Circle.create(c, r);
        let objs = self.movingObjects.filter(obj => s.containsPoint(obj.positionXZ));
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