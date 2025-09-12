import { MovingObject } from "../objects/MovingObject.js";
import { DetectionPulse } from "../objects/DetectionPulse.js";
import { Environment } from "../objects/Environment.js";

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

        this._mode = OperationalMode.ATTACK

        // Conjunto de potenciales objetivos
        // detectados en el ultimo pulso de detecccion
        this.targets = [];

        this.lastPulse = null; // ultimo pulso emitido
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

    /**
     * Radio del pulso
     * @returns {number}
     */
    defaultRadiusPulse() {
        return 10;
    }

    /**
     * Propagación default del pulso
     * @returns {number}
     */
    defaultForcePropagation() {
        return 50;
    }

    /**
     * Fuerza propagación del pulso
     * @returns {number}
     */
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
        if(!self.node) return;

        if(self.isPatrol()) {
            if(!self.lastPulse) {
                self.emmitPulse();
            }
        }
    }

    /**
     * Emite un pulso de detección que
     * se propagara por el environment
     */
    emmitPulse() {
        let self = this;        
        let pulse = DetectionPulse.create(self);
        self.lastPulse = pulse;      
        self.env.spawnPulse(pulse);        
    }

    /**
     * La propagacion del ultimo pulso emitido
     * ha colapsado
     * @param {DetectionPulse}} pulse 
     */
    puseColapsed(pulse) {
        this.lastPulse = null;
    }


}