/**
*  _____       _            _   _             _____       _          
* |  __ \     | |          | | (_)           |  __ \     | |         
* | |  | | ___| |_ ___  ___| |_ _  ___  _ __ | |__) |   _| |___  ___ 
* | |  | |/ _ \ __/ _ \/ __| __| |/ _ \| '_ \|  ___/ | | | / __|/ _ \
* | |__| |  __/ ||  __/ (__| |_| | (_) | | | | |   | |_| | \__ \  __/
* |_____/ \___|\__\___|\___|\__|_|\___/|_| |_|_|    \__,_|_|___/\___|
*
* @author buritai
* Un DetectionPulse es un pulso emitido por un dron. Tiene un tiempo de propagacion.
* Una vez que la propagacion llego al máximo el pulso se desvanece en el environment.
* La forma de propagación puede ser esferica o en forma lineal, cilindro de 0.01 de altura
**/

import { Environment } from "../enviroment/Environment.js";
import { EnvironmentObject } from "./EnviromentObject.js";
import { MovingObject } from "./MovingObject.js";

const PropagationMode = {
    SPHERE: 'SPHERE',
    CYLINDER: 'CYLINDER'
};

class DetectionPulse extends EnvironmentObject {

    /**
     * Crea una instancia del receptor
     * @param {number} fP force propagation 
     * @param { MovingObject } emmiter 
     */
    static create(emitter = null, mode = PropagationMode.SPHERE) {
        let pulse = new DetectionPulse();
        //pulse.propagation = fP;
        //pulse.emitter = emitter;
        if(emitter) {
            pulse.position = emitter.node.position;
            this.emmiter
        } else pulse.position = [-143.760406, 36.89867, -2761.190918].asVect3d();
        return pulse;

    }

    constructor() {
        super();
        this._A0 = 1;      // Intensidad inicial (se usará para opacidad)
        this._alpha = 0.02; // Coeficiente de atenuación para opacidad
        this._speed = 1.5;    // Velocidad de expansión (pixeles por frame)
        this._steps = 0;     // pasos de propagacion
        this._maxRadius = 50;
        this._radius = 5;
        this._mode = PropagationMode.SPHERE;
        this._emitter = null;
    }

    /**
     * Getter coeficiente de atenuación
     * @returns {number}
     */
    get alpha() {
        return this._alpha;
    }

    /**
     * Setter coeficiente de atenuación
     * @param {number} value
     */
    set alpha(value) {
        this._alpha = value;
    }

    /**
     * Intensidad inicial, fuerza de propagación
     * @returns {number}
     */
    get A0() {
        return this._A0;
    }

    /**
     * Intensidad inicial, fuerza de propagación
     * @param {number} value
     */
    set A0(value) {
        this._A0 = value;
    }

    /**
     * Velocidad de propgacion
     * @returns {number}
     */
    get speed() {
        return this._speed;
    }

    /**
     * Pasos de propagacion
     * @param {number} value
     */
    set speed(value) {
        this._speed = value;
    }

    /**
     * Pasos de propagacion
     * @return {number}
     */
    get steps() {
        return this._steps;
    }

    /**
     * Pasos de propagacion
     * @param {number} value
     */
    set steps(value) {
        this._steps = value;
    }

    /**
     * Maximo radio de propagacion
     * @returns {number} 
     */
    get maxRadius() {
        return this._maxRadius;
    }

    /**
     * Radio actual de propagacion
     * @returns {number} 
     */
    get radius() {
        return this._radius;
    }

    /**
     * Radio actual de propagacion
     * @param {number} value
     */
    set radius(value) {
        this._radius = value;
    }

    /**
     * Modo de propagacion
     * @returns {number} 
     */
    get mode() {
        return this._mode;
    }

    /**
     * Modo de propagacion
     * @param {string} value
     */
    set mode(value) {
        this._mode = value;
    }

    /**
     * Emisor del pulso
     * @returns {EnvironmentObject} 
     */
    get emitter() {
        return this._emitter;
    }

    /**
     * Emisor del pulso
     * @param {EnvironmentObject} emitter
     */
    set emitter(emitter) {
        this._emitter = emitter;
    }




    /**
     * Esfera actual de propagación
     * @returns {Sphere}
     */
    sphere() {
        let self = this;
        return Sphere.create(self.position, self.radius);
    }

    /**
     * Pulso se propaga y afecta el scene node
     * que wrappea.
     * @param {Environment} env
     */
    exec(env) {
        let self = this;
        let targets = [];
        
        // la propagación llego a su máximo, se debe sacar el pulso del environment
        if(self.radius > self.maxRadius) {
            self.active = false;
            if(self.emitter) self.emitter.pulseColapsed(self)
            return;
        }
        // Propagacion
        self.radius += self.speed;
        self.steps += 1;       
        if(self.mode == PropagationMode.SPHERE){
            self.node.Scale = [self.radius, self.radius, self.radius].asVect3d();            
            targets = env.objectsForSphere(self.position, self.radius);
        } else {
            self.node.Scale = [self.radius, 0.01, self.radius].asVect3d();
            targets = env.objectsForCircle(self.positionXZ, self.radius);
        }

        if(self.emitter.active) {
            self.emitter.detectedTargets(targets);
        }               
    }

    


}
export {DetectionPulse}