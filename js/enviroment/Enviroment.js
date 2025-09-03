import { Sphere } from "./Sphere.js";

class Enviroment extends JSObject {

    static create() {
        let obj = new Enviroment();
        
        return obj;
    }

    constructor() {
        super();
        
        this.movingObjects = [];
        // CL3D.SceneNode (terrain)
        this.terrain = null;

        // CL3D.Scene 
        this.enviroment = null;
        obj.init();
    }


    spawnSpyDrone() {}

    init() { }

    spawnObject() {
        self.dispatchEvent("spawnedObject", {} );
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
     * Crea un pulso que se propaga en el enviroment
     * desplazandose en el entorno en forma de onda esferica.
     * @param {Number} c center
     * @param {Number} r radius
     */
    spawnPulse(pulse) {
        let self = this;
        let s = Sphere.create(c, r);        
        let objs = self.movingObjects.filter(obj => s.containsPoint(obj.getPosition()));
        self.spawnObject(pulse);
        return objs;        
    }


    addMovingObject(obj) {
        this.addMovingObject.add(obj);        
    }

}