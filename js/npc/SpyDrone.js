import { MovingObject } from "../objects/MovingObject.js";
import { DetectionPulse } from "../objects/DetectionPulse.js";

const OperationalMode = {
    PATROL: 'PATROL',
    ATTACK: 'ATTACK'
};

class SpyDrone extends MovingObject {

    static create() {
        let obj = new SpyDrone();
        obj.init();
        return obj;
    }

    constructor() {
        super();
        
        // CL3D.SceneNode
        /** @type {CL3D.SceneNode} */
        this.node = null;

        /** @type {Enviroment} */
        this.env = null;

        this.mode = OperationalMode.ATTACK        

        // Conjunto de potenciales objetivos
        // detectados en el ultimo pulso de detecccion
        this.targets = [];

        this.lastPulse = 0; // ultimo tick de pulso
    }

    /**
     * @private
     */
    init() {

    }

    /**
     * Retorna true si el estado operacional es patrulla
     * @public
     * @returns {Boolean}
     */
    isPatrol() {
        return self.mode == OperationalMode.PATROL;
    }

    /**
     * Tiempo de vida del pulso sobre el enviroment
     * @returns {number}
     */
    defaultLifespanPulse() {
        return 10;
    }

    defaultRadiusPulse() {
        return 10;
    }

    defaultForcePropagation() {
        return 50;
    }

    get forcePropagation() {
        return this.defaultForcePropagation();
    }

    /**
     * Ejecuta turno del receptor. 
     * Comportamiento de acuerdo al modo operacional
     * @private
     */
    exec() {
        let self = this;

        if(self.isPatrol()) {
            self.lastPulse++;
            if(self.lastPulse > self.defaultTickPulse()) {
                self.emmitPulse();
            }
        }
    }

    emmitPulse() {
        let self = this;

        //self.targets = self.env.objectsForSphere(this.node.getPosition(), self.defaultRadiusPulse());
        let pulse = DetectionPulse.create(self.forcePropagation, self);        
        this.env.spawnPulse(pulse);
    }


}